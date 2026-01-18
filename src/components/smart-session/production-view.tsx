
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Loader2, Sparkles, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { generateClozeWithAI, type GenerateClozeOutput } from '@/ai/flows/generate-cloze';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface ProductionViewProps {
    item: StudyQueueItem;
    onResult: (result: 'success' | 'fail') => void;
}

export function ProductionView({ item, onResult }: ProductionViewProps) {
    const { word } = item;
    const [isLoading, setIsLoading] = useState(true);
    const [clozeData, setClozeData] = useState<GenerateClozeOutput | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

    // Fetch AI context on mount
    useEffect(() => {
        let mounted = true;
        const fetchContext = async () => {
            setIsLoading(true);
            // This is a server action call, make sure it's exposed or wrapped
            // For now, assuming generateClozeWithAI is a server action usable here
            const data = await generateClozeWithAI(word);
            if (mounted) {
                setClozeData(data);
                setIsLoading(false);
            }
        };
        fetchContext();
        return () => { mounted = false; };
    }, [word]);

    const handleSubmit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!clozeData) return;

        const normalizedUser = userAnswer.trim().toLowerCase();
        const normalizedCorrect = clozeData.missingWord.trim().toLowerCase();

        let isCorrect = normalizedUser === normalizedCorrect;

        // Multi-answer check
        if (!isCorrect && clozeData.acceptedAnswers && clozeData.acceptedAnswers.length > 0) {
            isCorrect = clozeData.acceptedAnswers.some(ans => ans.toLowerCase() === normalizedUser);
        }

        setFeedback(isCorrect ? 'correct' : 'incorrect');
    };

    const handleContinue = () => {
        onResult(feedback === 'correct' ? 'success' : 'fail');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4 text-center animate-pulse">
                <Sparkles className="h-12 w-12 text-primary animate-spin" />
                <p className="text-muted-foreground">AI создает контекст для <strong>{word.german}</strong>...</p>
            </div>
        );
    }

    if (!clozeData) return <div>Ошибка загрузки контекста.</div>;

    // Split sentence by ___ to inject input
    const parts = clozeData.sentenceWithBlank.split('___');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-8"
        >
            <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs tracking-widest">
                <BrainCircuit className="h-4 w-4" /> Фаза 3: Активный Контекст
            </div>

            <Card className="w-full bg-card border-2 border-primary/10 shadow-xl overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-8">

                    <div className="text-2xl sm:text-3xl font-medium leading-relaxed max-w-xl text-center">
                        {parts[0]}
                        <span className="inline-block border-b-2 border-primary mx-1 min-w-[100px] font-bold text-primary align-baseline relative top-[-2px]">
                            {feedback ? (
                                <span className={feedback === 'correct' ? 'text-green-600' : 'text-red-600'}>
                                    {feedback === 'correct' ? clozeData.missingWord : userAnswer}
                                </span>
                            ) : (
                                <span className="opacity-0">placeholder</span>
                            )}
                        </span>
                        {parts[1]}
                    </div>

                    <div className="text-muted-foreground italic flex flex-col gap-1 items-center">
                        <div>{clozeData.translation}</div>
                        {clozeData.hint && <div className="text-xs bg-muted px-2 py-1 rounded text-primary">{clozeData.hint}</div>}
                    </div>

                    {!feedback && (
                        <form onSubmit={handleSubmit} className="w-full max-w-sm flex gap-2 mt-8">
                            <Input
                                autoFocus
                                placeholder="Впишите слово..."
                                className="h-12 text-lg"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                            <Button size="icon" className="h-12 w-12" type="submit" disabled={!userAnswer}>
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    )}

                </CardContent>
            </Card>

            {feedback && (
                <div className="w-full max-w-md animate-in slide-in-from-bottom-4 fade-in">
                    <Alert variant={feedback === 'correct' ? 'default' : 'destructive'} className="mb-4">
                        <AlertTitle>
                            {feedback === 'correct' ? (
                                <div className="flex flex-col gap-1">
                                    <span>Отлично!</span>
                                    {userAnswer.trim().toLowerCase() !== clozeData.missingWord.toLowerCase() && (
                                        <span className="text-xs font-normal opacity-90">
                                            (Основной вариант: {clozeData.missingWord})
                                        </span>
                                    )}
                                </div>
                            ) : 'Ошибка'}
                        </AlertTitle>
                        <AlertDescription className="mt-2 text-sm leading-relaxed">
                            {feedback === 'incorrect' && (
                                <div className="space-y-3">
                                    <p>Правильно: <span className="font-bold underline text-lg">{clozeData.missingWord}</span></p>

                                    {clozeData.acceptedAnswers && clozeData.acceptedAnswers.length > 1 && (
                                        <p className="text-xs text-muted-foreground">
                                            Также верно: {clozeData.acceptedAnswers.filter(a => a !== clozeData.missingWord).join(', ')}
                                        </p>
                                    )}

                                    {(clozeData as any).grammarExplanation && (
                                        <div className="bg-background/20 p-2 rounded">
                                            <strong>Почему так?</strong><br />
                                            {(clozeData as any).grammarExplanation}
                                        </div>
                                    )}

                                    {(clozeData as any).examples && (clozeData as any).examples.length > 0 && (
                                        <div>
                                            <strong>Примеры:</strong>
                                            <ul className="list-disc pl-4 mt-1 space-y-1 italic text-xs">
                                                {(clozeData as any).examples.map((ex: string, i: number) => (
                                                    <li key={i}>{ex}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            )}
                        </AlertDescription>
                    </Alert>
                    <Button size="lg" className="w-full" onClick={handleContinue}>
                        Продолжить
                    </Button>
                </div>
            )}
        </motion.div>
    );
}
