
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatGermanWord } from '@/lib/german-utils';
import { BrainCircuit, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useMemo } from 'react';
import { commonWords } from '@/lib/common-words'; // Fallback for distractors

interface RecognitionViewProps {
    item: StudyQueueItem;
    onResult: (result: 'success' | 'fail') => void;
}

export function RecognitionView({ item, onResult }: RecognitionViewProps) {
    const { word } = item;
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const options = useMemo(() => {
        // Simple distractor logic: grab 3 random words from commonWords that are NOT the current word
        const distractors = commonWords
            .filter(w => w.german !== word.german)
            .sort(() => Math.random() - 0.5)
            .slice(0, 3)
            .map(w => w.russian);

        const allOptions = [...distractors, word.russian].sort(() => Math.random() - 0.5);
        return allOptions;
    }, [word]);

    const handleSelect = (option: string) => {
        if (selectedOption) return; // Block double click

        setSelectedOption(option);
        const correct = option === word.russian;
        setIsCorrect(correct);

        // Auto-advance after small delay
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
            <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs tracking-widest">
                <BrainCircuit className="h-4 w-4" /> Фаза 2: Пассивное Узнавание
            </div>

            <Card className="w-full bg-card border-none shadow-xl">
                <CardContent className="p-12 flex flex-col items-center text-center">
                    <div className="text-5xl font-black text-foreground mb-2">
                        {formatGermanWord(word)}
                    </div>
                    <p className="text-muted-foreground">Выберите правильный перевод</p>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {options.map((option, idx) => {
                    const isSelected = selectedOption === option;
                    const isTarget = option === word.russian;

                    let variant: "outline" | "default" | "destructive" | "secondary" = "outline";

                    if (selectedOption) {
                        if (isTarget) variant = "default"; // Always show correct answer green
                        else if (isSelected && !isTarget) variant = "destructive"; // Show selected wrong answer red
                        else variant = "secondary"; // Fade others
                    }

                    return (
                        <Button
                            key={idx}
                            variant={variant as any}
                            className={`h-16 text-lg relative ${isTarget && selectedOption ? 'bg-green-600 hover:bg-green-700 text-white border-green-600' : ''}`}
                            onClick={() => handleSelect(option)}
                            disabled={!!selectedOption}
                        >
                            {option}
                            {isSelected && (isTarget ? <Check className="absolute right-4" /> : <X className="absolute right-4" />)}
                        </Button>
                    );
                })}
            </div>
        </motion.div>
    );
}
