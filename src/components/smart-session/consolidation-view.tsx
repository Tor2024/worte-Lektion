
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatGermanWord } from '@/lib/german-utils';
import { BrainCircuit, Check, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { useSpeech } from '@/hooks/use-speech';
import { commonWords } from '@/lib/common-words';
import { cn } from '@/lib/utils';

interface ConsolidationViewProps {
    items: StudyQueueItem[];
    onComplete: () => void;
}

export function ConsolidationView({ items, onComplete }: ConsolidationViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [score, setScore] = useState(0);
    const { speak, speakSequence, isLoaded } = useSpeech();

    const currentItem = items[currentIndex];

    // Play Russian word on load
    useEffect(() => {
        if (!isLoaded || !currentItem) return;
        speak(currentItem.word.russian, 'ru-RU');
    }, [speak, currentItem, isLoaded]);

    const options = useMemo(() => {
        if (!currentItem) return [];

        const otherSessionWords = items
            .filter(it => it.id !== currentItem.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const distractors = [...otherSessionWords];

        if (distractors.length < 3) {
            const moreDistractors = commonWords
                .filter(w => w.german !== currentItem.word.german && !distractors.some(d => d.word.german === w.german))
                .sort(() => Math.random() - 0.5)
                .slice(0, 3 - distractors.length)
                .map(w => ({ word: w }));

            distractors.push(...(moreDistractors as any[]));
        }

        const correctDisplay = formatGermanWord(currentItem.word);
        const allOptions = distractors.map(d => formatGermanWord(d.word));
        allOptions.push(correctDisplay);

        return allOptions.sort(() => Math.random() - 0.5);
    }, [currentItem, items]);

    const handleSelect = async (option: string) => {
        if (selectedOption || !currentItem) return;

        setSelectedOption(option);
        const correctDisplay = formatGermanWord(currentItem.word);
        const correct = option === correctDisplay;
        setIsCorrect(correct);

        if (correct) {
            setScore(s => s + 1);
            await speak(formatGermanWord(currentItem.word), 'de-DE');
        }

        await new Promise(r => setTimeout(r, 800));

        if (currentIndex < items.length - 1) {
            setCurrentIndex(i => i + 1);
            setSelectedOption(null);
            setIsCorrect(null);
        } else {
            onComplete();
        }
    };

    if (!currentItem) return null;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-8 w-full max-w-2xl mx-auto px-4"
        >
            <div className="w-full space-y-3">
                <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-[0.2em] text-primary/60">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-3 w-3 text-amber-500" />
                        Финальный марафон
                    </div>
                    <span>{currentIndex + 1} / {items.length}</span>
                </div>
                <div className="h-1.5 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary to-primary/60 shadow-[0_0_10px_rgba(var(--primary),0.5)]"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                    />
                </div>
            </div>

            <Card className="w-full bg-slate-950 border-white/10 shadow-2xl overflow-hidden relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <CardContent className="p-10 flex flex-col items-center text-center space-y-6 relative z-10">
                    <div className="text-primary/40 text-[10px] uppercase tracking-[0.3em] font-black">Переведите в уме</div>
                    <div className="text-5xl font-black text-white tracking-tight drop-shadow-lg group-hover:scale-105 transition-transform duration-500">
                        {currentItem.word.russian}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 col-span-2"
                    >
                        {options.map((option, idx) => {
                            const isTarget = option === formatGermanWord(currentItem.word);
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
                                        "h-20 text-xl font-bold rounded-2xl border-2 transition-all duration-300 relative overflow-hidden bg-slate-900/50",
                                        !selectedOption && "hover:border-primary/50 hover:bg-primary/5 hover:scale-[1.02] border-white/5",
                                        isTarget && selectedOption && "bg-green-600 border-green-500 text-white shadow-[0_0_20px_rgba(34,197,94,0.3)]",
                                        isSelected && !isTarget && "bg-red-600 border-red-500 text-white"
                                    )}
                                    onClick={() => handleSelect(option)}
                                    disabled={!!selectedOption}
                                >
                                    {option}
                                    {isSelected && (isTarget ? <Check className="absolute right-4 h-6 w-6 stroke-[3]" /> : <X className="absolute right-4 h-6 w-6 stroke-[3]" />)}
                                </Button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="pt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground opacity-40">
                <BrainCircuit className="h-3 w-3" /> Автоматизм и скорость реакции
            </div>
        </motion.div>
    );
}
