
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
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { commonWords } from '@/lib/common-words';
import { decomposeGermanWord, type DecomposeOutput } from '@/ai/flows/decompose-german-word';
import { getVerbFamily, type VerbFamilyOutput } from '@/ai/flows/get-verb-family';
import { getRektionLogic, type RektionLogicOutput } from '@/ai/flows/get-rektion-logic';
import { getWordCluster, type WordClusterOutput } from '@/ai/flows/get-word-cluster';
import { VerbFamilyTree } from './verb-family-tree';
import { WordClusterView } from './word-cluster-view';
import { Loader2, Info, Network, ArrowRight, MapPin, Link, Activity, Layers, Sparkles, Lightbulb, BookOpen, Repeat, Languages } from 'lucide-react';
import { FormattedGermanWord } from '../formatted-german-word';
import { UnifiedWordHeader } from './unified-word-header';
import { InfoModule } from './info-module';

interface PrimingViewProps {
    item: StudyQueueItem;
    onNext: () => void;
    onMarkAsKnown: () => void;
    isRefresh?: boolean;
}

export function PrimingView({ item, onNext, onMarkAsKnown, isRefresh }: PrimingViewProps) {
    const { word } = item;
    const { speak, speakSequence, stop, isLoaded } = useSpeech();
    const [decomposition, setDecomposition] = useState<DecomposeOutput | null>(null);
    const [isDecomposing, setIsDecomposing] = useState(false);
    const [verbFamily, setVerbFamily] = useState<VerbFamilyOutput | null>(null);
    const [isFetchingFamily, setIsFetchingFamily] = useState(false);
    const [rektionLogic, setRektionLogic] = useState<RektionLogicOutput | null>(null);
    const [isFetchingRektion, setIsFetchingRektion] = useState(false);
    const [wordCluster, setWordCluster] = useState<WordClusterOutput | null>(null);
    const [isFetchingCluster, setIsFetchingCluster] = useState(false);

    // Anti-Confusion: Identify the most dangerous partner
    const confusionPartnerId = useMemo(() => {
        if (!item.confusedWith) return null;
        const ids = Object.keys(item.confusedWith);
        if (ids.length === 0) return null;
        // Sort by mistake count and take the top one
        return ids.sort((a, b) => (item.confusedWith![b] || 0) - (item.confusedWith![a] || 0))[0];
    }, [item.confusedWith]);

    const confusionPartner = useMemo(() => {
        if (!confusionPartnerId) return null;
        return commonWords.find((w: any) => w.german === confusionPartnerId);
    }, [confusionPartnerId]);

    // Decomposition Effect
    useEffect(() => {
        setDecomposition(null);
        setVerbFamily(null);
        setRektionLogic(null);
        setWordCluster(null); // Reset all on word change
        if (word.german.includes(' ') || word.german.length > 10) {
            setIsDecomposing(true);
            decomposeGermanWord({ german: word.german })
                .then(setDecomposition)
                .catch((err: Error) => console.error("Decomposition failed", err))
                .finally(() => setIsDecomposing(false));
        }

        // Auto-fetch Rektion Logic if word has governance
        if ((word as any).governance && (word as any).governance.length > 0) {
            fetchRektionLogic();
        }
    }, [word.german]);

    const fetchRektionLogic = async () => {
        const gov = (word as any).governance?.[0];
        if (!gov || isFetchingRektion) return;

        setIsFetchingRektion(true);
        try {
            const data = await getRektionLogic({
                german: formatGermanWord(word),
                preposition: gov.preposition,
                case: gov.case,
                russian: word.russian
            });
            setRektionLogic(data);
        } catch (err: any) {
            console.error("Rektion Logic fetch failed", err);
        } finally {
            setIsFetchingRektion(false);
        }
    };

    const fetchWordCluster = async () => {
        if (isFetchingCluster || wordCluster) return;
        setIsFetchingCluster(true);
        try {
            const data = await getWordCluster(formatGermanWord(word), word.type);
            setWordCluster(data);
        } catch (err: any) {
            console.error("Failed to fetch word cluster", err);
        } finally {
            setIsFetchingCluster(false);
        }
    };

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

        const cleanText = (text: string) => text.replace(/<[^>]*>/g, '');

        const playAudioFlow = async () => {
            if (!active) return;

            const sequence: { text: string, lang: string }[] = [
                { text: formatGermanWord(word), lang: 'de-DE' },
                { text: word.russian, lang: 'ru-RU' }
            ];

            if ((word as any).collocations?.[0]) {
                const anchor = (word as any).collocations[0];
                sequence.push({ text: anchor.phrase, lang: 'de-DE' });
                sequence.push({ text: anchor.translation, lang: 'ru-RU' });
            } else if ('example' in word && word.example) {
                sequence.push({ text: cleanText(word.example), lang: 'de-DE' });
                if ('exampleMeaning' in word && (word as any).exampleMeaning) {
                    sequence.push({ text: (word as any).exampleMeaning, lang: 'ru-RU' });
                }
            }

            // Small initial delay
            await new Promise(r => setTimeout(r, 600));
            if (!active) return;

            await speakSequence(sequence);
        };

        playAudioFlow();

        return () => {
            active = false;
            stop();
        };
    }, [item.id, isLoaded, speak, stop]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-6 w-full max-w-4xl mx-auto"
        >
            {/* Header / Phase Indicator */}
            <div className="flex items-center justify-between w-full px-4">
                <div className="flex items-center gap-3 text-primary/60 uppercase text-[10px] tracking-[0.2em] font-black">
                    <Activity className="h-4 w-4 animate-pulse" />
                    <span>{isRefresh ? '🔄 Нейро-синхронизация' : 'Фаза 1: Загрузка Образа'}</span>
                </div>
                {item.consecutiveMistakes >= 3 && (
                    <Badge variant="destructive" className="animate-pulse flex gap-1 items-center font-black text-[9px] uppercase tracking-tighter">
                        <Siren className="h-3 w-3" /> Сложное Слово (Leech)
                    </Badge>
                )}
            </div>

            <Card className="w-full bg-white dark:bg-slate-950 border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden rounded-[3rem] relative">
                {/* Accent Line */}
                <div className={cn(
                    "h-1.5 w-full bg-gradient-to-r",
                    isRefresh ? "from-orange-500 to-red-600" : "from-blue-600 to-indigo-600"
                )} />

                <CardContent className="p-8 sm:p-12 flex flex-col items-center space-y-10">
                    
                    {/* 1. UNIFIED HEADER */}
                    <UnifiedWordHeader 
                        word={word} 
                        showRussian={true} 
                        className="mb-4"
                    />

                    {/* 2. MODULAR KNOWLEDGE GRID */}
                    <div className="w-full flex flex-wrap gap-4 justify-center">
                        
                        {/* REKTION / GOVERNANCE MODULE */}
                        {(word.type === 'verb' || word.type === 'adjective') && (word as any).governance && (word as any).governance.length > 0 && (
                            <InfoModule 
                                title="Логика управления" 
                                icon={MapPin} 
                                variant={((word as any).governance[0].case === 'Akkusativ' ? 'error' : 'success') as any}
                                fullWidth
                            >
                                <div className="space-y-4">
                                    {(word as any).governance.map((gov: any, idx: number) => (
                                        <div key={idx} className="flex flex-col gap-2">
                                            <div className="flex items-center gap-3 text-2xl font-black text-slate-900 dark:text-white">
                                                <span>+ {gov.preposition === "без предлога" ? (word.german.toLowerCase().includes('sich') ? 'sich' : '∅') : gov.preposition}</span>
                                                <Badge className={cn(
                                                    "px-3 py-1 rounded-lg text-xs font-black uppercase tracking-tight",
                                                    gov.case === 'Akkusativ' ? "bg-red-600 text-white" :
                                                    gov.case === 'Dativ' ? "bg-emerald-600 text-white" : "bg-primary text-white"
                                                )}>
                                                    {gov.case}
                                                </Badge>
                                                {gov.preposition !== "без предлога" && (
                                                    <span className="text-xs text-muted-foreground font-bold lowercase opacity-50">
                                                        ({gov.case === 'Akkusativ' ? 'wohin?' : 'wo?'})
                                                    </span>
                                                )}
                                            </div>
                                            {rektionLogic?.logic && (
                                                <p className="text-xs text-muted-foreground border-l-2 border-primary/20 pl-4 py-1 italic">
                                                    {rektionLogic.logic}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </InfoModule>
                        )}

                        {/* DECOMPOSITION MODULE */}
                        {(isDecomposing || decomposition) && (
                            <InfoModule title="Разбор конструкции" icon={Layers} variant="primary">
                                {isDecomposing ? (
                                    <div className="flex items-center gap-2 animate-pulse text-xs">
                                        <Loader2 className="h-3 w-3 animate-spin" /> Анализ структуры...
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="grid grid-cols-1 gap-1">
                                            {decomposition?.components.map((c: any, i: number) => (
                                                <div key={i} className="flex justify-between items-center text-sm border-b border-primary/5 pb-1">
                                                    <span className="font-bold text-slate-800 dark:text-slate-200">{c.word}</span>
                                                    <span className="text-muted-foreground text-xs">{c.translation}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {decomposition?.explanation && (
                                            <p className="text-[10px] opacity-60 mt-2 leading-tight">{decomposition.explanation}</p>
                                        )}
                                    </div>
                                )}
                            </InfoModule>
                        )}

                        {/* MNEMONIC MODULE */}
                        {(item.mnemonic || (word as any).mnemonic) && (
                            <InfoModule title="Инсайт для памяти" icon={Lightbulb} variant="warning">
                                <p className="italic text-slate-700 dark:text-slate-300">
                                    &ldquo;{item.mnemonic || (word as any).mnemonic}&rdquo;
                                </p>
                            </InfoModule>
                        )}

                        {/* SYNONYMS MODULE */}
                        {(word as any).synonyms && (word as any).synonyms.length > 0 && (
                            <InfoModule title="Синонимы" icon={Repeat} variant="indigo">
                                <div className="flex flex-wrap gap-2">
                                    {(word as any).synonyms.map((s: any, idx: number) => (
                                        <div key={idx} className="bg-indigo-500/5 px-2 py-1 rounded-lg border border-indigo-500/10 text-xs text-indigo-700 dark:text-indigo-300 transition-colors hover:bg-indigo-500/10">
                                            <span className="font-bold">{s.word}</span>
                                            <span className="ml-1 opacity-60">({s.translation})</span>
                                        </div>
                                    ))}
                                </div>
                            </InfoModule>
                        )}

                        {/* ANTONYMS MODULE */}
                        {(word as any).antonyms && (word as any).antonyms.length > 0 && (
                            <InfoModule title="Антонимы" icon={Languages} variant="rose">
                                <div className="flex flex-wrap gap-2">
                                    {(word as any).antonyms.map((a: any, idx: number) => (
                                        <div key={idx} className="bg-rose-500/5 px-2 py-1 rounded-lg border border-rose-500/10 text-xs text-rose-700 dark:text-rose-300 transition-colors hover:bg-rose-500/10">
                                            <span className="font-bold">{a.word}</span>
                                            <span className="ml-1 opacity-60">({a.translation})</span>
                                        </div>
                                    ))}
                                </div>
                            </InfoModule>
                        )}

                    </div>

                    {/* 3. PRIMARY CONTEXT (Large Anchor/Example) */}
                    <div className="w-full flex flex-col items-center">
                        {(word as any).collocations?.[0] ? (
                            <div className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-primary/10 p-8 rounded-[2.5rem] relative group overflow-hidden">
                                <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <BookOpen className="h-24 w-24" />
                                </div>
                                <div className="absolute top-4 left-6 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                    Лексический якорь
                                </div>
                                <div className="space-y-4 pt-4">
                                    <p className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight pl-4 border-l-4 border-primary">
                                        {(word as any).collocations[0].phrase}
                                    </p>
                                    <p className="text-lg text-muted-foreground italic pl-4">— {(word as any).collocations[0].translation}</p>
                                </div>
                            </div>
                        ) : ('example' in word && word.example && (
                            <div className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-primary/10 p-8 rounded-[2.5rem] relative group">
                                <div className="absolute top-4 left-6 px-3 py-1 bg-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                    B2 Beruf Phrase
                                </div>
                                <div className="space-y-4 pt-4">
                                    <p className="text-xl md:text-2xl font-black text-slate-900 dark:text-white leading-tight tracking-tight pl-4 border-l-4 border-primary"
                                       dangerouslySetInnerHTML={{ __html: word.example }}
                                    />
                                    {'exampleMeaning' in word && (word as any).exampleMeaning && (
                                        <p className="text-lg text-muted-foreground italic pl-4">— {(word as any).exampleMeaning}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* 4. AI-ENHANCED VIEWS (Family / Cluster) */}
                    <div className="w-full flex flex-col gap-4">
                        {(word.type === 'verb' && !verbFamily) && (
                            <Button variant="ghost" className="w-full h-12 rounded-2xl hover:bg-primary/5 text-primary/60 border border-dashed border-primary/20" onClick={fetchVerbFamily} disabled={isFetchingFamily}>
                                {isFetchingFamily ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Network className="h-4 w-4 mr-2" />}
                                Семейство глагола (логика приставок)
                            </Button>
                        )}
                        {verbFamily && <VerbFamilyTree data={verbFamily} currentVerb={formatGermanWord(word)} />}
                        
                        {!wordCluster && (
                            <Button variant="ghost" className="w-full h-12 rounded-2xl hover:bg-indigo-500/5 text-indigo-500/60 border border-dashed border-indigo-500/20" onClick={fetchWordCluster} disabled={isFetchingCluster}>
                                {isFetchingCluster ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Sparkles className="h-4 w-4 mr-2" />}
                                Расширить до кластера (СУЩ + ГЛАГ + ПРИЛ)
                            </Button>
                        )}
                        {wordCluster && <WordClusterView data={wordCluster} currentWord={formatGermanWord(word)} />}
                    </div>
                </CardContent>
            </Card>

            {/* ACTION BUTTONS */}
            <div className="w-full max-w-sm flex flex-col gap-3">
                <Button 
                    size="lg" 
                    className="w-full h-16 text-xl font-black uppercase tracking-widest bg-gradient-to-r from-blue-600 to-indigo-700 shadow-2xl hover:scale-[1.02] active:scale-95 transition-all rounded-3xl" 
                    onClick={onNext}
                >
                    Запомнил <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
                <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-muted-foreground/60 hover:text-green-600 font-bold uppercase text-[9px] tracking-widest" 
                    onClick={onMarkAsKnown}
                >
                    Знаю отлично (пропустить)
                </Button>
            </div>
        </motion.div>
    );
}
