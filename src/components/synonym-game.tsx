
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { verifySynonymAnswer } from '@/ai/flows/verify-synonym-answer';
import { Loader2 } from 'lucide-react';

export interface SynonymItem {
    id: string;
    originalSentence: string;
    weakWord?: string; // Made optional for backward compatibility
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

    const [checkingId, setCheckingId] = useState<string | null>(null);
    const [customFeedbacks, setCustomFeedbacks] = useState<{ [key: string]: string }>({});

    const checkAnswer = async (id: string, target: string, originalSentence: string, weakWord?: string) => {
        const userAns = answers[id] || '';

        // 1. Fast Strict Match
        if (userAns.toLowerCase().trim() === target.toLowerCase().trim()) {
            handleResult(id, true);
            return;
        }

        // 2. AI Validation for inexact matches
        setCheckingId(id);
        try {
            // Import dynamically or pass as prop? 
            // Since this is a client component, we simply call the server action we just imported.
            // Note: We need to import verifySynonymAnswer at top of file. 
            // For now, assuming it's imported.

            const result = await verifySynonymAnswer({
                originalSentence,
                weakWord: weakWord || '',
                userAnswer: userAns,
                targetSynonym: target
            });

            if (result.isCorrect) {
                // User was correct!
                setCustomFeedbacks(prev => ({ ...prev, [id]: result.feedback }));
                handleResult(id, true);
            } else {
                // User was wrong, show AI explanation
                setCustomFeedbacks(prev => ({ ...prev, [id]: result.feedback }));
                handleResult(id, false);
            }
        } catch (error) {
            console.error("AI Validation failed", error);
            // Fallback to basic error
            handleResult(id, false);
        } finally {
            setCheckingId(null);
        }
    };

    const handleResult = (id: string, isCorrect: boolean) => {
        setResults(prev => ({ ...prev, [id]: isCorrect }));

        const item = items.find(i => i.id === id);
        // Check completion
        if (isCorrect && items.every(i => (i.id === id ? true : results[i.id]))) {
            if (onComplete) setTimeout(onComplete, 1500);
        }
    };

    // Helper to highlight the weak word
    const renderSentence = (sentence: string, weakWord?: string) => {
        if (!weakWord) return sentence;

        const parts = sentence.split(new RegExp(`(${weakWord})`, 'gi'));
        return (
            <span>
                {parts.map((part, i) =>
                    part.toLowerCase() === weakWord.toLowerCase() ? (
                        <span key={i} className="font-bold text-destructive underline decoration-wavy decoration-destructive/50 underline-offset-4 mx-1">
                            {part}
                        </span>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    return (
        <div className="space-y-6">
            {items.map((item) => {
                const isCorrect = results[item.id] === true;
                const isWrong = results[item.id] === false;
                const isDone = isCorrect || isWrong;

                return (
                    <Card key={item.id} className="overflow-hidden">
                        <CardHeader className="bg-muted/30 pb-3">
                            <div className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Слабый стиль (A2):</div>
                            <p className="text-lg italic text-muted-foreground">"{renderSentence(item.originalSentence, item.weakWord)}"</p>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="font-bold text-orange-600">B2 Upgrade:</span>
                                    <Input
                                        placeholder="Какое слово подойдет лучше?"
                                        value={answers[item.id] || ''}
                                        onChange={(e) => setAnswers(prev => ({ ...prev, [item.id]: e.target.value }))}
                                        className={cn("max-w-xs", isCorrect && "border-green-500 bg-green-50", isWrong && "border-red-500 bg-red-50")}
                                        disabled={isDone}
                                    />
                                    {!isDone && <Button size="sm" onClick={() => checkAnswer(item.id, item.targetSynonym, item.originalSentence, item.weakWord)}>Check</Button>}
                                </div>

                                {isCorrect && (
                                    <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-md text-green-800 dark:text-green-300 text-sm animate-in fade-in slide-in-from-top-2">
                                        <p className="font-bold mb-1">Perfekt! "{item.betterSentence}"</p>
                                        <p>{item.explanation}</p>
                                    </div>
                                )}

                                {isWrong && (
                                    <div className="bg-red-100 dark:bg-red-900/30 p-3 rounded-md text-red-800 dark:text-red-300 text-sm animate-in fade-in slide-in-from-top-2">
                                        <p className="font-bold mb-1">Не совсем. Правильный вариант:</p>
                                        <p className="text-lg font-bold my-1">{item.targetSynonym}</p>
                                        <p className="italic mb-2">"{item.betterSentence}"</p>
                                        <p className="text-xs opacity-90 uppercase font-bold text-muted-foreground">Почему:</p>
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
