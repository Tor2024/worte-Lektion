
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatGermanWord, getGenderColorClass } from '@/lib/german-utils';
import { BrainCircuit, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { useSpeech } from '@/hooks/use-speech';
import { commonWords } from '@/lib/common-words';
import { cn } from '@/lib/utils';

interface RecognitionViewProps {
    item: StudyQueueItem;
    onResult: (result: 'success' | 'fail') => void;
    onMarkAsKnown: () => void;
    direction?: 0 | 1; // 0 = DE->RU, 1 = RU->DE
}

export function RecognitionView({ item, onResult, onMarkAsKnown, direction: forcedDirection }: RecognitionViewProps) {
    const { word } = item;
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { speak, isLoaded } = useSpeech();

    // If forcedDirection is provided, use it. Otherwise, fallback to random (for standalone usage).
    const direction = useMemo(() =>
        forcedDirection !== undefined ? forcedDirection : (Math.random() > 0.5 ? 1 : 0),
        [item.id, forcedDirection]);

    useEffect(() => {
        if (isLoaded && direction === 0) {
            speak(formatGermanWord(word));
        }
    }, [speak, word, isLoaded, direction]);

    const options = useMemo(() => {
        // Distractors based on direction
        const distractors = commonWords
            .filter(w => w.german !== word.german)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => direction === 0 ? w.russian : formatGermanWord(w));

        const correct = direction === 0 ? word.russian : formatGermanWord(word);
        const allOptions = [...distractors, correct].sort(() => Math.random() - 0.5);
        return allOptions;
    }, [word, direction]);

    const handleSelect = (option: string) => {
        if (selectedOption) return;

        setSelectedOption(option);
        const correctValue = direction === 0 ? word.russian : formatGermanWord(word);
        const correct = option === correctValue;
        setIsCorrect(correct);

        if (correct && direction === 1) {
            speak(formatGermanWord(word));
        }

        setTimeout(() => {
            onResult(correct ? 'success' : 'fail');
        }, 1500);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center space-y-8"
        >
            <div className="flex items-center gap-2 text-primary uppercase text-[10px] font-black tracking-[0.2em] animate-pulse">
                <BrainCircuit className="h-4 w-4" /> Фаза 2: Укрепление нейронной связи
            </div>

            <Card className="w-full bg-slate-950 border-primary/20 shadow-2xl relative overflow-hidden group">
                {/* Visual "Neural" element */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <div className="absolute -right-10 -top-10 w-40 h-40 bg-primary/10 blur-3xl rounded-full group-hover:bg-primary/20 transition-colors" />

                <CardContent className="p-12 flex flex-col items-center text-center relative z-10">
                    <div className="text-sm font-bold text-primary/60 mb-4 uppercase tracking-widest">
                        {direction === 0 ? "Понимаете ли вы это слово?" : "Как это будет по-немецки?"}
                    </div>

                    <div className="flex flex-col items-center gap-1 mb-6">
                        <div className="text-5xl font-black tracking-tighter text-white h-[60px]">
                            {direction === 0 ? formatGermanWord(word) : word.russian}
                        </div>
                        {/* Governance Section (Rektion) as Hint */}
                        {((word.type === 'verb' || word.type === 'adjective') && (word as any).governance && (word as any).governance.length > 0) && (
                            <div className="flex flex-col items-center gap-2 mt-4 w-full max-w-[280px]">
                                {(word as any).governance.map((gov: any, idx: number) => (
                                    <div key={idx} className="flex flex-col items-center bg-white/5 py-2 px-3 rounded-xl border border-white/10 w-full transition-colors hover:bg-white/10">
                                        <div className="flex items-center gap-2 text-lg font-black">
                                            <span className="text-primary">+ {gov.preposition}</span>
                                            <span className={cn(
                                                "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                                                gov.case === 'Akkusativ' ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                                                    gov.case === 'Dativ' ? "bg-emerald-500/20 text-green-500 border border-emerald-500/30" :
                                                        "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                            )}>
                                                {gov.case}
                                            </span>
                                        </div>
                                        {gov.meaning && (
                                            <div className="text-[10px] font-bold text-primary/60 italic">
                                                ({gov.meaning})
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Legacy case fallback for verbs */}
                        {word.type === 'verb' && !((word as any).governance && (word as any).governance.length > 0) && ((word as any).preposition || (word as any).case) && (
                            <div className="text-lg font-black text-primary/80 tracking-tight mt-4 flex items-center gap-2">
                                <span>+ {(word as any).preposition || ""}</span>
                                <span className={cn(
                                    "px-1.5 py-0.5 rounded text-[8px] font-black uppercase tracking-widest",
                                    (word as any).case === 'Akkusativ' ? "bg-red-500/20 text-red-500 border border-red-500/30" :
                                        (word as any).case === 'Dativ' ? "bg-emerald-500/20 text-green-500 border border-emerald-500/30" :
                                            "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                                )}>
                                    {(word as any).case}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-primary/40" />
                        <p className="text-muted-foreground text-sm font-medium">Выберите правильный вариант</p>
                        <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-primary/40" />
                    </div>
                </CardContent>
            </Card>

            <div className="flex flex-col gap-4 w-full">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                    {options.map((option, idx) => {
                        const isTarget = option === (direction === 0 ? word.russian : word.german);
                        const isSelected = selectedOption === option;

                        let variant: "outline" | "default" | "destructive" | "secondary" = "outline";
                        if (selectedOption) {
                            if (isTarget) variant = "default";
                            else if (isSelected) variant = "destructive";
                            else variant = "secondary";
                        }

                        return (
                            <Button
                                key={idx}
                                variant={variant as any}
                                className={cn(
                                    "h-20 text-lg font-bold rounded-2xl border-2 transition-all duration-300 relative overflow-hidden",
                                    !selectedOption && "hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02]",
                                    isTarget && selectedOption && "bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]",
                                    isSelected && !isTarget && "bg-red-600 border-red-500 text-white"
                                )}
                                onClick={() => handleSelect(option)}
                                disabled={!!selectedOption}
                            >
                                {option}
                                {isSelected && (isTarget ? <Check className="absolute right-4" /> : <X className="absolute right-4" />)}
                            </Button>
                        );
                    })}
                </div>

                {!selectedOption && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-green-400 hover:bg-white/5 opacity-50 hover:opacity-100 transition-all mx-auto"
                        onClick={onMarkAsKnown}
                    >
                        Знаю это слово отлично (пропустить)
                    </Button>
                )}
            </div>
        </motion.div>
    );
}
