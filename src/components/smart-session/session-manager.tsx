
'use client';

import { useState, useEffect } from 'react';
import { useStudyQueue } from '@/hooks/use-study-queue';
import { StudyQueueItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { PrimingView } from '@/components/smart-session/priming-view';
import { RecognitionView } from '@/components/smart-session/recognition-view';
import { ProductionView } from '@/components/smart-session/production-view';
import { RemedialView } from '@/components/smart-session/remedial-view';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

type SessionState = 'loading' | 'intro' | 'active' | 'summary';

export function SmartSessionManager() {
    const { getDailySession, updateItemStatus, queue } = useStudyQueue();
    const [sessionQueue, setSessionQueue] = useState<StudyQueueItem[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [sessionState, setSessionState] = useState<SessionState>('loading');
    const [currentStep, setCurrentStep] = useState<'priming' | 'recognition' | 'production' | 'remedial'>('priming');
    const [score, setScore] = useState(0);

    useEffect(() => {
        // Init session
        const items = getDailySession(20); // Get 20 items max
        setSessionQueue(items);
        setSessionState(items.length > 0 ? 'intro' : 'summary');
    }, [getDailySession]);

    const currentItem = sessionQueue[currentIndex];

    // Determine initial step based on item status
    useEffect(() => {
        if (!currentItem) return;

        if (currentItem.status === 'leech') {
            setCurrentStep('remedial');
        } else if (currentItem.status === 'new') {
            setCurrentStep('priming');
        } else {
            setCurrentStep('recognition'); // Skip priming for reviews
        }
    }, [currentItem]);


    const handleNext = (result: 'success' | 'fail') => {
        // Logic to move between steps or words
        // 3D Flow:
        // New: Priming -> Recognition -> Production
        // Review: Recognition -> Production

        if (result === 'fail') {
            // If fail, we generally update status and maybe move to next or stay?
            // For now, simple logic: Fail instantly moves to next word to keep flow, but marks as fail
            updateItemStatus(currentItem.id, 'fail');
            goToNextWord();
            return;
        }

        // Success logic
        if (currentStep === 'priming') {
            setCurrentStep('recognition');
        } else if (currentStep === 'remedial') {
            setCurrentStep('production');
        } else if (currentStep === 'recognition') {
            setCurrentStep('production');
        } else if (currentStep === 'production') {
            // Full success!
            updateItemStatus(currentItem.id, 'success');
            setScore(s => s + 1);
            goToNextWord();
        }
    };

    const goToNextWord = () => {
        if (currentIndex < sessionQueue.length - 1) {
            setCurrentIndex(i => i + 1);
        } else {
            setSessionState('summary');
        }
    };

    if (sessionState === 'loading') return <div className="p-10 text-center animate-pulse">Загрузка нейро-связей...</div>;

    if (sessionState === 'intro') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto mt-10">
                <BrainCircuit className="h-24 w-24 text-primary mb-4" />
                <h1 className="text-3xl font-headline font-bold">Готовность к загрузке</h1>
                <p className="text-muted-foreground text-lg">
                    Мы подготовили <strong>{sessionQueue.length}</strong> объектов для интеграции в память.
                    <br />
                    <span className="text-sm opacity-75">(Включая приоритетные глаголы)</span>
                </p>
                <Button size="lg" className="w-full text-lg h-14" onClick={() => setSessionState('active')}>
                    Начать Синхронизацию
                </Button>
            </div>
        );
    }

    if (sessionState === 'summary') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto mt-10">
                <CheckCircle className="h-24 w-24 text-green-500 mb-4" />
                <h1 className="text-3xl font-headline font-bold">Сессия Завершена</h1>
                <div className="text-6xl font-black text-primary">{score}/{sessionQueue.length}</div>
                <p className="text-muted-foreground">
                    Нейронные связи обновлены. Следующее повторение запланировано.
                </p>
                <Button asChild size="lg" className="w-full">
                    <Link href="/">Вернуться на базу</Link>
                </Button>
            </div>
        );
    }

    // Active View
    const progress = ((currentIndex) / sessionQueue.length) * 100;

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-6">
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                <span>Прогресс</span>
                <span>{currentIndex + 1} / {sessionQueue.length}</span>
            </div>
            <Progress value={progress} className="h-2" />

            <div className="min-h-[400px]">
                {currentStep === 'priming' && (
                    <PrimingView item={currentItem} onNext={() => handleNext('success')} />
                )}
                {currentStep === 'recognition' && (
                    <RecognitionView item={currentItem} onResult={handleNext} />
                )}
                {currentStep === 'production' && (
                    <ProductionView item={currentItem} onResult={handleNext} />
                )}
                {currentStep === 'remedial' && (
                    <RemedialView word={currentItem.word} onComplete={() => handleNext('success')} />
                )}
            </div>
        </div>
    );
}
