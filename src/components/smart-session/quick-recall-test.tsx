'use client';

import { useState, useEffect, useMemo } from 'react';
import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Timer, CheckCircle, XCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { formatGermanWord } from '@/lib/german-utils';

interface QuickRecallTestProps {
    /** The words from the just-completed session */
    sessionWords: StudyQueueItem[];
    /** Called when the mini-test is completed */
    onComplete: (correctCount: number, totalCount: number) => void;
    /** Called if user dismisses the test */
    onDismiss: () => void;
}

const TEST_SIZE = 5;
const DELAY_SECONDS = 10 * 60; // 10 minutes

export function QuickRecallTest({ sessionWords, onComplete, onDismiss }: QuickRecallTestProps) {
    const [phase, setPhase] = useState<'waiting' | 'testing' | 'done'>('waiting');
    const [timeLeft, setTimeLeft] = useState(DELAY_SECONDS);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [showAnswer, setShowAnswer] = useState(false);
    const [results, setResults] = useState<boolean[]>([]);

    // Select the 5 hardest words from the session (by consecutiveMistakes, then by lowest interval)
    const testWords = useMemo(() => {
        return [...sessionWords]
            .sort((a, b) => {
                const mistakeDiff = (b.consecutiveMistakes || 0) - (a.consecutiveMistakes || 0);
                if (mistakeDiff !== 0) return mistakeDiff;
                return (a.interval || 0) - (b.interval || 0);
            })
            .slice(0, TEST_SIZE);
    }, [sessionWords]);

    // Countdown timer
    useEffect(() => {
        if (phase !== 'waiting') return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setPhase('testing');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [phase]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (correct: boolean) => {
        const newResults = [...results, correct];
        setResults(newResults);
        setShowAnswer(false);

        if (currentIndex < testWords.length - 1) {
            setCurrentIndex(i => i + 1);
        } else {
            setPhase('done');
            const correctCount = newResults.filter(Boolean).length;
            onComplete(correctCount, testWords.length);
        }
    };

    if (testWords.length === 0) return null;

    // Phase: Waiting
    if (phase === 'waiting') {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="fixed bottom-6 right-6 z-50"
            >
                <Card className="w-80 border-2 border-primary/20 shadow-2xl bg-card/95 backdrop-blur-sm">
                    <CardContent className="p-4 space-y-3">
                        <div className="flex items-center gap-2 text-primary font-bold text-sm">
                            <Timer className="h-4 w-4 animate-pulse" />
                            Микро-тест через {formatTime(timeLeft)}
                        </div>
                        <p className="text-xs text-muted-foreground">
                            Быстрая проверка {testWords.length} самых сложных слов из сессии.
                            Это критическое окно для закрепления!
                        </p>
                        <div className="flex gap-2">
                            <Button size="sm" className="flex-1" onClick={() => setPhase('testing')}>
                                <Zap className="h-3 w-3 mr-1" /> Начать сейчас
                            </Button>
                            <Button size="sm" variant="ghost" onClick={onDismiss}>
                                Отмена
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    // Phase: Testing
    if (phase === 'testing') {
        const currentWord = testWords[currentIndex];
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
                <Card className="w-full max-w-md border-2 border-primary/30 shadow-2xl">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <Badge variant="secondary" className="font-mono">
                                <Zap className="h-3 w-3 mr-1" /> {currentIndex + 1}/{testWords.length}
                            </Badge>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                Микро-Тест
                            </span>
                        </div>

                        <div className="text-center space-y-4">
                            <div className="text-3xl font-black text-primary">
                                {currentWord.word.russian}
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Вспомните немецкое слово
                            </p>

                            <AnimatePresence>
                                {showAnswer && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="text-2xl font-black text-foreground border-2 border-primary/20 rounded-xl p-4 bg-primary/5"
                                    >
                                        {formatGermanWord(currentWord.word)}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {!showAnswer ? (
                            <Button className="w-full h-14 text-lg" onClick={() => setShowAnswer(true)}>
                                Показать ответ
                            </Button>
                        ) : (
                            <div className="flex gap-3">
                                <Button
                                    className="flex-1 h-14 bg-red-500 hover:bg-red-600 text-white"
                                    onClick={() => handleAnswer(false)}
                                >
                                    <XCircle className="h-5 w-5 mr-2" /> Забыл
                                </Button>
                                <Button
                                    className="flex-1 h-14 bg-green-500 hover:bg-green-600 text-white"
                                    onClick={() => handleAnswer(true)}
                                >
                                    <CheckCircle className="h-5 w-5 mr-2" /> Помню
                                </Button>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    // Phase: Done
    const correctCount = results.filter(Boolean).length;
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed bottom-6 right-6 z-50"
        >
            <Card className="w-80 border-2 border-green-500/30 shadow-2xl bg-card/95 backdrop-blur-sm">
                <CardContent className="p-4 space-y-2 text-center">
                    <CheckCircle className="h-8 w-8 text-green-500 mx-auto" />
                    <div className="font-bold text-lg">
                        {correctCount}/{testWords.length} правильно!
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {correctCount === testWords.length
                            ? '🎉 Отлично! Нейросвязи закреплены!'
                            : 'Продолжайте повторять — завтра будет легче!'}
                    </p>
                    <Button size="sm" variant="ghost" className="w-full" onClick={onDismiss}>
                        Закрыть
                    </Button>
                </CardContent>
            </Card>
        </motion.div>
    );
}
