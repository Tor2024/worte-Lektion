
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Check, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface CollocationItem {
    id: string;
    baseWord: string;
    collocation: string;
    translation: string;
    exampleSentence: string;
    gapSentence: string;
    hiddenPart: string;
}

interface CollocationGameProps {
    items: CollocationItem[];
    onComplete?: () => void;
}

export function CollocationGame({ items, onComplete }: CollocationGameProps) {
    const [revealed, setRevealed] = useState<string[]>([]);

    const toggleReveal = (id: string) => {
        const newRevealed = revealed.includes(id) ? revealed : [...revealed, id];
        setRevealed(newRevealed);

        // Check completion
        if (newRevealed.length === items.length && onComplete) {
            // Small delay to let the user see the last reveal
            setTimeout(onComplete, 1500);
        }
    };

    return (
        <div className="space-y-4">
            {items.map((item) => {
                const isRevealed = revealed.includes(item.id);
                return (
                    <Card key={item.id} className={cn("transition-all border-l-4", isRevealed ? "border-l-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-l-muted")}>
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <CardTitle className="text-lg">
                                    {item.baseWord}
                                </CardTitle>
                                <Button variant="ghost" size="sm" onClick={() => toggleReveal(item.id)}>
                                    {isRevealed ? <Check className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                            </div>
                            <CardDescription>
                                {item.translation}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-medium mb-2 p-3 bg-background rounded-md border">
                                {isRevealed ? (
                                    <span className="text-indigo-600 dark:text-indigo-400 font-bold">{item.collocation}</span>
                                ) : (
                                    <span>
                                        {item.gapSentence}
                                    </span>
                                )}
                            </div>
                            {isRevealed && (
                                <p className="text-sm text-muted-foreground mt-2 italic">
                                    "{item.exampleSentence}"
                                </p>
                            )}
                        </CardContent>
                    </Card>
                );
            })}
        </div>
    );
}
