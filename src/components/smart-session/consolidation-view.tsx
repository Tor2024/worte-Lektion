
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatGermanWord } from '@/lib/german-utils';
import { BrainCircuit, Check, X, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
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

    const currentItem = items[currentIndex];

    const options = useMemo(() => {
        if (!currentItem) return [];

        // Use other words from the session as distractors first
        const otherSessionWords = items
            .filter(it => it.id !== currentItem.id)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3);

        const distractors = [...otherSessionWords];

        // If not enough session words, fill with commonWords
        if (distractors.length < 3) {
            const moreDistractors = commonWords
                .filter(w => w.german !== currentItem.word.german && !distractors.some(d => d.word.german === w.german))
                .sort(() => Math.random() - 0.5)
                .slice(0, 3 - distractors.length)
                .map(w => ({ word: w })); // Mock StudyQueueItem structure enough for formatGermanWord

            distractors.push(...(moreDistractors as any[]));
        }

        const correctDisplay = formatGermanWord(currentItem.word);
        const allOptions = distractors.map(d => formatGermanWord(d.word));
        allOptions.push(correctDisplay);

        return allOptions.sort(() => Math.random() - 0.5);
    }, [currentItem, items]);

    const handleSelect = (option: string) => {
        if (selectedOption || !currentItem) return;

        setSelectedOption(option);
        const correctDisplay = formatGermanWord(currentItem.word);
        const correct = option === correctDisplay;
        setIsCorrect(correct);

        if (correct) {
            setScore(s => s + 1);
        }

        setTimeout(() => {
            if (currentIndex < items.length - 1) {
                setCurrentIndex(i => i + 1);
                setSelectedOption(null);
                setIsCorrect(null);
            } else {
                onComplete();
            }
        }, 1200);
    };

    if (!currentItem) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center space-y-8 w-full max-w-xl mx-auto"
        >
            <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-500" />
                        Финальное закрепление
                    </div>
                    <span>{currentIndex + 1} / {items.length}</span>
                </div>
                <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-amber-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                    />
                </div>
            </div>

            <Card className="w-full bg-card border-2 border-amber-500/20 shadow-2xl overflow-hidden">
                <CardContent className="p-12 flex flex-col items-center text-center space-y-4">
                    <div className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Как это на немецком?</div>
                    <div className="text-5xl font-black text-foreground drop-shadow-sm">
                        {currentItem.word.russian}
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 gap-3 w-full">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="grid grid-cols-1 gap-3"
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
                                        "h-16 text-xl font-bold transition-all duration-200",
                                        isTarget && selectedOption && "bg-green-600 hover:bg-green-700 text-white border-green-600 shadow-[0_0_15px_rgba(22,163,74,0.4)]",
                                        isSelected && !isTarget && "bg-red-600 hover:bg-red-700 text-white border-red-600"
                                    )}
                                    onClick={() => handleSelect(option)}
                                    disabled={!!selectedOption}
                                >
                                    {option}
                                    {isSelected && (isTarget ? <Check className="ml-2 h-6 w-6" /> : <X className="ml-2 h-6 w-6" />)}
                                </Button>
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
