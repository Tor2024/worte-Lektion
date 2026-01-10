
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export interface SynonymItem {
    id: string;
    originalSentence: string;
    targetSynonym: string;
    betterSentence: string;
    explanation: string;
}

interface SynonymGameProps {
    items: SynonymItem[];
    onComplete?: () => void;
}

export function SynonymGame({ items, onComplete }: SynonymGameProps) {
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [results, setResults] = useState<{ [key: string]: boolean }>({});

    const checkAnswer = (id: string, target: string) => {
        const userAns = answers[id] || '';
        if (userAns.toLowerCase().trim() === target.toLowerCase().trim()) {
            const newResults = { ...results, [id]: true };
            setResults(newResults);

            // Check completion
            const allCorrect = items.every(item => newResults[item.id]);
            if (allCorrect && onComplete) {
                setTimeout(onComplete, 1500);
            }
        } else {
            alert(`Почти! Правильное слово: ${target}`);
            setResults(prev => ({ ...prev, [id]: false })); // Reveal answer (simulated logic for now)
        }
    };

    return (
        <div className="space-y-6">
            {items.map((item) => {
                const isCorrect = results[item.id] === true;

                return (
                    <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-3">
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Слабый стиль (A2):</div>
                            <p className="text-lg italic text-muted-foreground">"{item.originalSentence}"</p>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-orange-600">B2 Upgrade:</span>
                                    <Input
                                        placeholder="Какое слово подойдет лучше?"
                                        value={answers[item.id] || ''}
                                        onChange={(e) => setAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                                        className={cn("max-w-xs", isCorrect && "border-green-500 bg-green-50")}
                                        disabled={isCorrect}
                                    />
                                    {!isCorrect && <Button size="sm" onClick={() => checkAnswer(item.id, item.targetSynonym)}>Check</Button>}
                                </div>

                                {isCorrect && (
                                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md text-green-800 dark:text-green-300 text-sm animate-in fade-in slide-in-from-top-2">
                                        <p className="font-bold mb-1">Perfekt! "{item.betterSentence}"</p>
                                        <p>{item.explanation}</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
