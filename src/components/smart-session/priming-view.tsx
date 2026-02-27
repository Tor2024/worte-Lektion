
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpeakButton } from '@/components/speak-button';
import { formatGermanWord, getGenderColorClass, getRussianType } from '@/lib/german-utils';
import { BrainCircuit, Siren } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
import { useSpeech } from '@/hooks/use-speech';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { decomposeGermanWord, type DecomposeOutput } from '@/ai/flows/decompose-german-word';
import { getVerbFamily, type VerbFamilyOutput } from '@/ai/flows/get-verb-family';
import { VerbFamilyTree } from './verb-family-tree';
import { Loader2, Info, Network } from 'lucide-react';

interface PrimingViewProps {
    item: StudyQueueItem;
    onNext: () => void;
    onMarkAsKnown: () => void;
}

export function PrimingView({ item, onNext, onMarkAsKnown }: PrimingViewProps) {
    const { word } = item;
    const { speak, stop, isLoaded } = useSpeech();
    const [decomposition, setDecomposition] = useState<DecomposeOutput | null>(null);
    const [isDecomposing, setIsDecomposing] = useState(false);
    const [verbFamily, setVerbFamily] = useState<VerbFamilyOutput | null>(null);
    const [isFetchingFamily, setIsFetchingFamily] = useState(false);

    // Decomposition Effect
    useEffect(() => {
        setDecomposition(null);
        setVerbFamily(null); // Reset when word changes
        if (word.german.includes(' ') || word.german.length > 10) {
            setIsDecomposing(true);
            decomposeGermanWord({ german: word.german })
                .then(setDecomposition)
                .catch(err => console.error("Decomposition failed", err))
                .finally(() => setIsDecomposing(false));
        }
    }, [word.german]);

    const fetchVerbFamily = async () => {
        if (isFetchingFamily || verbFamily) return;
        setIsFetchingFamily(true);
        try {
            const data = await getVerbFamily({ verb: formatGermanWord(word), russian: word.russian });
            setVerbFamily(data);
        } catch (err) {
            console.error("Failed to fetch verb family", err);
        } finally {
            setIsFetchingFamily(false);
        }
    };

    useEffect(() => {
        if (!isLoaded) return;
        let active = true;

        const playAudioFlow = async () => {
            const pause = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
            if (!active) return;

            // Small initial delay
            await pause(500);
            if (!active) return;

            // 1. German Word
            await speak(formatGermanWord(word), 'de-DE');
            if (!active) return;
            await pause(1200);
            if (!active) return;

            // 2. Russian Translation
            await speak(word.russian, 'ru-RU');
            if (!active) return;
            await pause(1500);
            if (!active) return;

            // 3. German Example
            if ('example' in word && word.example) {
                await speak(word.example, 'de-DE');
                if (!active) return;
                await pause(1200);
            }
            if (!active) return;

            // 4. Russian Example Meaning
            if ('exampleMeaning' in word && (word as any).exampleMeaning) {
                await speak((word as any).exampleMeaning, 'ru-RU');
            }
        };

        playAudioFlow();

        return () => {
            active = false;
            stop();
        };
    }, [word, isLoaded, speak, stop]);

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-4"
        >
            <div className="flex items-center gap-3 text-muted-foreground uppercase text-[10px] tracking-[0.2em] font-bold">
                <BrainCircuit className="h-4 w-4" />
                <span>Фаза 1: Загрузка Образа</span>
                {(item.consecutiveMistakes || 0) >= 3 && (
                    <Badge variant="destructive" className="ml-2 animate-pulse flex gap-1 items-center">
                        <Siren className="h-3 w-3" /> Сложное Слово (Leech)
                    </Badge>
                )}
                {word.level && (
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">
                        {word.level}
                    </Badge>
                )}
            </div>

            <Card className="w-full bg-card border-none shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
                <CardContent className="p-6 sm:p-8 flex flex-col items-center text-center space-y-4">

                    <div className="space-y-3 w-full">
                        <div className="flex flex-col gap-0 items-center justify-center">
                            <div className="text-5xl font-black tracking-tight text-primary">
                                {formatGermanWord(word)}
                            </div>
                            {/* Specific Governance Display for Verbs and Adjectives */}
                            {/* Governance Section (Rektion) */}
                            {(word.type === 'verb' || word.type === 'adjective') && (word as any).governance && (word as any).governance.length > 0 && (
                                <div className="flex flex-col items-center gap-2 mt-2 w-full">
                                    {(word as any).governance.map((gov: any, idx: number) => (
                                        <div key={idx} className="flex flex-col items-center bg-primary/5 p-3 rounded-xl border border-primary/10 w-full max-w-sm">
                                            <div className="flex items-center gap-2 text-xl font-black">
                                                <span className="text-primary">+ {gov.preposition}</span>
                                                <span className={cn(
                                                    "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest flex items-center gap-1",
                                                    gov.case === 'Akkusativ' ? "bg-red-500/20 text-red-600 border border-red-500/30" :
                                                        gov.case === 'Dativ' ? "bg-emerald-500/20 text-emerald-600 border border-emerald-500/30" :
                                                            "bg-slate-500/20 text-slate-500 border border-slate-500/30"
                                                )}>
                                                    {gov.case}
                                                    {gov.preposition && gov.preposition !== "без предлога" && (
                                                        <span className="opacity-60 lowercase font-medium text-[8px]">
                                                            ({gov.case === 'Akkusativ' ? 'wohin?' : gov.case === 'Dativ' ? 'wo?' : ''})
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                            {gov.meaning && (
                                                <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 mt-1 italic">
                                                    ({gov.meaning})
                                                </div>
                                            )}
                                            {gov.example && (
                                                <div className="mt-1 text-[10px] text-muted-foreground leading-relaxed border-t border-primary/10 pt-1 w-full italic">
                                                    &ldquo;{gov.example}&rdquo;
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Legacy case fallback for verbs */}
                            {word.type === 'verb' && !((word as any).governance && (word as any).governance.length > 0) && ((word as any).preposition || (word as any).case) && (
                                <div className="text-2xl font-black text-primary/80 tracking-tight mt-4 flex items-center gap-2">
                                    <span>+ {(word as any).preposition || ""}</span>
                                    <span className={cn(
                                        "px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-widest",
                                        (word as any).case === 'Akkusativ' ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                                            (word as any).case === 'Dativ' ? "bg-emerald-500/20 text-green-500 border border-emerald-500/30" :
                                                "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                    )}>
                                        {(word as any).case}
                                    </span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-0">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/50">{getRussianType(word.type)}</div>
                            <div className="text-2xl text-foreground font-black italic">
                                {word.russian}
                            </div>
                        </div>

                        {/* Synonyms (Unobtrusive & Non-Italic) */}
                        {(word as any).synonyms && (word as any).synonyms.length > 0 && (
                            <div className="mt-2 flex flex-wrap justify-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity">
                                {(word as any).synonyms.map((s: any, idx: number) => (
                                    <span key={idx} className="text-xs font-medium text-muted-foreground px-2 py-0.5 rounded-full bg-muted/50 border border-border/50">
                                        ≈ {s.word} ({s.translation})
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="flex gap-4">
                        <SpeakButton text={formatGermanWord(word)} size="lg" />
                    </div>

                    {/* Word Breakdown (Decomposition) */}
                    {isDecomposing && (
                        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground animate-pulse py-2">
                            <Loader2 className="h-3 w-3 animate-spin" /> Разбираем слово на части...
                        </div>
                    )}

                    {decomposition && (
                        <div className="w-full max-w-sm bg-muted/30 p-4 rounded-xl border border-dashed border-primary/20 text-left space-y-2 animate-in fade-in slide-in-from-top-2">
                            <div className="text-[10px] font-bold uppercase tracking-widest text-primary/60 flex items-center gap-1">
                                <Info className="h-3 w-3" /> Разбор конструкции:
                            </div>
                            <div className="grid grid-cols-1 gap-1">
                                {decomposition.components.map((c, i) => (
                                    <div key={i} className="text-sm flex justify-between gap-4">
                                        <span className="font-bold text-slate-700">{c.word} {c.pronunciation && <span className="text-[10px] text-muted-foreground font-normal">[{c.pronunciation}]</span>}</span>
                                        <span className="text-slate-500">{c.translation}</span>
                                    </div>
                                ))}
                            </div>
                            {decomposition.explanation && (
                                <p className="text-[10px] italic text-muted-foreground pt-1 border-t border-primary/10">
                                    {decomposition.explanation}
                                </p>
                            )}
                        </div>
                    )}

                    {/* Verb Family Integration */}
                    {word.type === 'verb' && !verbFamily && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="mt-2 gap-2 border-primary/20 text-primary/60 hover:text-primary transition-all rounded-full h-8 px-4"
                            onClick={fetchVerbFamily}
                            disabled={isFetchingFamily}
                        >
                            {isFetchingFamily ? <Loader2 className="h-3 w-3 animate-spin" /> : <Network className="h-3 w-3" />}
                            <span className="text-[10px] font-bold uppercase tracking-tight">Семейство глагола (логика приставок)</span>
                        </Button>
                    )}

                    {verbFamily && (
                        <VerbFamilyTree data={verbFamily} currentVerb={formatGermanWord(word)} />
                    )}

                    {/* Context Example (Compact) */}
                    {'example' in word && (
                        <div className="bg-primary/5 p-4 rounded-xl text-md relative mt-2 w-full max-w-sm border border-primary/10">
                            <span className="text-2xl absolute -top-3 -left-1 opacity-10">❝</span>
                            <p
                                className="italic text-foreground/70 leading-relaxed text-sm"
                                dangerouslySetInnerHTML={{ __html: word.example }}
                            />
                        </div>
                    )}

                    {/* Verb Conjugations (Compact) */}
                    {word.type === 'verb' && (word as any).conjugations && (
                        <div className="w-full max-w-sm mt-2 p-3 bg-primary/5 rounded-xl border border-primary/10">
                            <h4 className="text-[9px] font-bold uppercase tracking-widest text-primary/40 mb-2">Спряжение (Präsens)</h4>
                            <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">ich</span>
                                    <span className="font-bold">{(word as any).conjugations.ich}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">wir</span>
                                    <span className="font-bold">{(word as any).conjugations.wir}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">du</span>
                                    <span className="font-bold">{(word as any).conjugations.du}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">ihr</span>
                                    <span className="font-bold">{(word as any).conjugations.ihr}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">er/sie/es</span>
                                    <span className="font-bold">{(word as any).conjugations.er_sie_es}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">sie/Sie</span>
                                    <span className="font-bold">{(word as any).conjugations.sie_Sie}</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Semantic Bridge: Synonyms & Collocations (Compact) */}
                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                        {(word as any).synonyms && (word as any).synonyms.length > 0 && (
                            <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100 text-left">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-2">Синонимы</h4>
                                <div className="space-y-1">
                                    {(word as any).synonyms.map((s: any, i: number) => (
                                        <div key={i} className="text-sm">
                                            <span className="font-bold text-blue-600">{s.word}</span>
                                            <span className="text-muted-foreground ml-2">— {s.translation}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {(word as any).collocations && (word as any).collocations.length > 0 && (
                            <div className="p-4 bg-purple-50/50 rounded-xl border border-purple-100 text-left">
                                <h4 className="text-[10px] font-bold uppercase tracking-widest text-purple-400 mb-2">Коллокации</h4>
                                <div className="space-y-1">
                                    {(word as any).collocations.map((c: any, i: number) => (
                                        <div key={i} className="text-sm">
                                            <span className="font-bold text-purple-600">{c.phrase}</span>
                                            <span className="text-muted-foreground ml-2">— {c.translation}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Mnemonic */}
                    {(item.mnemonic || ((item.consecutiveMistakes || 0) >= 3 && (word as any).mnemonic)) && (
                        <div className={cn(
                            "mt-4 p-3 border rounded-lg text-sm italic w-full max-w-md text-left",
                            (item.consecutiveMistakes || 0) >= 3
                                ? "bg-amber-100 border-amber-400 text-amber-900 shadow-lg"
                                : "bg-amber-50 border-amber-200 text-amber-900"
                        )}>
                            <span className="font-bold uppercase text-[10px] block mb-1 opacity-70">💡 Мнемоника (ассоциация):</span>
                            &ldquo;{item.mnemonic || (word as any).mnemonic}&rdquo;
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="w-full max-w-sm space-y-4">
                <div className="flex flex-col gap-2">
                    <Button size="lg" className="w-full h-16 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg" onClick={onNext}>
                        Запомнил
                    </Button>
                    <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-green-600 hover:bg-green-50" onClick={onMarkAsKnown}>
                        Знаю отлично (пропустить)
                    </Button>
                </div>
                <p className="text-xs text-center text-muted-foreground opacity-70">
                    Нажмите, когда четко представите образ слова.
                </p>
            </div>
        </motion.div>
    );
}
