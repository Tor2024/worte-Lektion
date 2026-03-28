'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Trophy, BrainCircuit } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useSpeech } from '@/hooks/use-speech';
import { formatGermanWord } from '@/lib/german-utils';
import { commonWords } from '@/lib/common-words';

interface ConsolidationViewProps {
    items: StudyQueueItem[];
    onComplete: () => void;
}

export function ConsolidationView({ items, onComplete }: ConsolidationViewProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const { speak, isLoaded, stop } = useSpeech();

    const currentItem = items[currentIndex];

    // 1. AUTO-SPEAK THE RUSSIAN QUESTION (Stage 3 Logic)
    useEffect(() => {
        if (!isLoaded || selectedOption || !currentItem) return;
        
        const timer = setTimeout(() => {
            speak(currentItem.word.russian, 'ru-RU');
        }, 400);
        
        return () => {
            clearTimeout(timer);
            stop();
        };
    }, [currentIndex, isLoaded]);

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
    }, [currentItem?.id, items]);

    const handleSelect = async (option: string) => {
        if (selectedOption || !currentItem) return;

        setSelectedOption(option);
        
        // 2. SPEAK THE GERMAN SELECTION (Stage 3 Logic)
        speak(option, 'de-DE');

        const correctDisplay = formatGermanWord(currentItem.word);
        const correct = option === correctDisplay;
        setIsCorrect(correct);

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
            className="flex flex-col items-center space-y-10 w-full max-w-4xl mx-auto px-4"
        >
            <div className="w-full space-y-4">
                <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-[0.3em] text-primary/60">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500 animate-pulse" />
                        Финальный марафон (Автоматизм)
                    </div>
                    <div className="bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                        {currentIndex + 1} / {items.length}
                    </div>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5 p-0.5">
                    <motion.div
                        className="h-full bg-gradient-to-r from-primary via-primary/80 to-primary/40 shadow-[0_0_20px_rgba(var(--primary),0.6)] rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                        transition={{ type: "spring", stiffness: 100, damping: 15 }}
                    />
                </div>
            </div>

            <Card className="w-full bg-slate-950 border-2 border-primary/20 shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden relative rounded-[3rem] group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />
                
                <CardContent className="p-12 sm:p-20 flex flex-col items-center text-center space-y-8 relative z-10">
                    <div className="text-primary/40 text-[10px] uppercase tracking-[0.4em] font-black bg-primary/5 px-6 py-2 rounded-full border border-primary/10">Мгновенный перевод</div>
                    <div className="text-6xl sm:text-7xl font-black text-white italic tracking-tighter drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)] group-hover:scale-105 transition-transform duration-700">
                        {currentItem.word.russian}
                    </div>
                </CardContent>
            </Card>

            <div className="w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                        className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full"
                    >
                        {options.map((option, idx) => {
                            const isTarget = option === formatGermanWord(currentItem.word);
                            const isSelected = selectedOption === option;

                            return (
                                <Button
                                    key={idx}
                                    variant="outline"
                                    className={cn(
                                        "h-24 text-2xl font-black rounded-3xl border-2 transition-all duration-300 relative overflow-hidden",
                                        !selectedOption && "bg-white/5 border-white/10 hover:border-primary hover:bg-primary/5 hover:scale-[1.03] active:scale-95 text-slate-300 hover:text-white shadow-xl",
                                        isTarget && selectedOption && "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] z-20",
                                        isSelected && !isTarget && "bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] z-20 opacity-100"
                                    )}
                                    onClick={() => handleSelect(option)}
                                    disabled={!!selectedOption}
                                >
                                    <span className="relative z-10">{option}</span>
                                    {isSelected && (isTarget ? <Check className="absolute right-6 h-8 w-8 stroke-[4]" /> : <X className="absolute right-6 h-8 w-8 stroke-[4]" />)}
                                </Button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>

            <div className="pt-6 flex items-center gap-4 text-emerald-500/30 text-[10px] uppercase font-black tracking-[0.3em] animate-pulse">
                <BrainCircuit className="h-4 w-4" />
                <span>Реакция и Автоматизм</span>
            </div>
        </motion.div>
    );
}
