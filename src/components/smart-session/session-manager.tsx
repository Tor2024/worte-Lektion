"use client";

import { useState, useEffect, useMemo } from 'react';
import { useStudyQueue } from '@/hooks/use-study-queue';
import { StudyQueueItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, CheckCircle, XCircle, ArrowRight, Layers, Target, PenTool } from 'lucide-react';
import { PrimingView } from '@/components/smart-session/priming-view';
import { RecognitionView } from '@/components/smart-session/recognition-view';
import { ProductionView } from '@/components/smart-session/production-view';
import { RemedialView } from '@/components/smart-session/remedial-view';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type GlobalPhase = 'priming' | 'recognition' | 'production' | 'remedial';
type SessionState = 'loading' | 'intro' | 'active' | 'summary';

export function SmartSessionManager() {
    const { getDailySession, updateItemStatus } = useStudyQueue();
    const [sessionQueue, setSessionQueue] = useState<StudyQueueItem[]>([]);
    const [sessionState, setSessionState] = useState<SessionState>('loading');

    // Batch Management
    const BATCH_SIZE = 5;
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

    // Phase Management
    const [currentPhase, setCurrentPhase] = useState<GlobalPhase>('priming');
    const [phaseIndex, setPhaseIndex] = useState(0); // Index within the current batch

    // Drill State (Phase 2)
    const [recognitionHits, setRecognitionHits] = useState<Record<string, number>>({});

    // Score/Results
    const [results, setResults] = useState<Record<string, 'success' | 'fail'>>({});

    useEffect(() => {
        const items = getDailySession(20);
        setSessionQueue(items);
        setSessionState(items.length > 0 ? 'intro' : 'summary');
    }, [getDailySession]);

    // Derived: Current batch words
    const currentBatchWords = useMemo(() => {
        const start = currentBatchIndex * BATCH_SIZE;
        return sessionQueue.slice(start, start + BATCH_SIZE);
    }, [sessionQueue, currentBatchIndex]);

    const totalBatches = Math.ceil(sessionQueue.length / BATCH_SIZE);

    // Derived: Current item based on phaseIndex within current batch
    const currentItem = useMemo(() => {
        if (currentPhase === 'recognition') {
            // In recognition, we filter for words that haven't reached 2 hits yet
            const pendingWords = currentBatchWords.filter(w => (recognitionHits[w.id] || 0) < 2);
            if (pendingWords.length === 0) return null;
            return pendingWords[phaseIndex % pendingWords.length];
        }
        return currentBatchWords[phaseIndex];
    }, [currentBatchWords, phaseIndex, currentPhase, recognitionHits]);

    const handleNext = (result: 'success' | 'fail') => {
        if (!currentItem) return;

        if (currentPhase === 'priming') {
            if (phaseIndex < currentBatchWords.length - 1) {
                setPhaseIndex(i => i + 1);
            } else {
                // Move to Recognition for this batch
                setCurrentPhase('recognition');
                setPhaseIndex(0);
            }
        }
        else if (currentPhase === 'recognition') {
            if (result === 'success') {
                const newHits = (recognitionHits[currentItem.id] || 0) + 1;
                setRecognitionHits(prev => ({ ...prev, [currentItem.id]: newHits }));

                // Check if all words in current batch reached 2 hits
                const allDone = currentBatchWords.every(w => {
                    const hits = w.id === currentItem.id ? newHits : (recognitionHits[w.id] || 0);
                    return hits >= 2;
                });

                if (allDone) {
                    setCurrentPhase('production');
                    setPhaseIndex(0);
                } else {
                    // Move to next pending word in batch
                    setPhaseIndex(i => i + 1);
                }
            } else {
                // Fail in recognition resets hits for this word
                setRecognitionHits(prev => ({ ...prev, [currentItem.id]: 0 }));
                setPhaseIndex(i => i + 1);
                setResults(prev => ({ ...prev, [currentItem.id]: 'fail' }));
            }
        }
        else if (currentPhase === 'production') {
            const finalResult = result === 'fail' ? 'fail' : (results[currentItem.id] === 'fail' ? 'fail' : 'success');
            const updatedResults: Record<string, 'success' | 'fail'> = { ...results, [currentItem.id]: finalResult };
            setResults(updatedResults);

            if (phaseIndex < currentBatchWords.length - 1) {
                setPhaseIndex(i => i + 1);
            } else {
                // Production finished for this batch
                if (currentBatchIndex < totalBatches - 1) {
                    // Move to next batch, start with priming
                    setCurrentBatchIndex(i => i + 1);
                    setCurrentPhase('priming');
                    setPhaseIndex(0);
                } else {
                    // End Session: Sync results back to queue
                    sessionQueue.forEach(item => {
                        const res = (updatedResults[item.id] || 'success') as 'success' | 'fail';
                        updateItemStatus(item.id, res);
                    });
                    setSessionState('summary');
                }
            }
        }
    };

    if (sessionState === 'loading') return <div className="p-10 text-center animate-pulse text-primary font-bold">Синхронизация нейро-слоев...</div>;

    if (sessionState === 'intro') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto mt-10">
                <div className="relative">
                    <BrainCircuit className="h-24 w-24 text-primary animate-pulse" />
                    <Badge className="absolute -top-2 -right-2 bg-green-500">v2.0 Beta</Badge>
                </div>
                <h1 className="text-4xl font-black tracking-tighter">ПАКЕТНЫЙ РЕЖИМ</h1>
                <p className="text-muted-foreground text-lg leading-relaxed">
                    Подготовлено <strong>{sessionQueue.length}</strong> объектов.
                    <br />Разбито на <strong>{totalBatches} этапа</strong> по {BATCH_SIZE} слов.
                    <br /><span className="block mt-2 font-mono text-sm">ЗНАКОМСТВО → ДРИЛЛ (x2) → КОНТЕКСТ</span>
                </p>
                <Button size="lg" className="w-full text-xl h-16 shadow-xl hover:scale-[1.02] transition-transform" onClick={() => setSessionState('active')}>
                    Начать Сессию
                </Button>
            </div>
        );
    }

    if (sessionState === 'summary') {
        const finalScore = Object.values(results).filter(r => r === 'success').length;
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto mt-10">
                <div className="bg-green-100 p-6 rounded-full">
                    <CheckCircle className="h-24 w-24 text-green-500" />
                </div>
                <h1 className="text-4xl font-black">СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА</h1>
                <div className="text-7xl font-black text-primary">{finalScore}/{sessionQueue.length}</div>
                <p className="text-muted-foreground text-lg italic">
                    Уровень усвоения: {Math.round((finalScore / sessionQueue.length) * 100)}%. Новые нейронные связи прописаны успешно.
                </p>
                <Button asChild size="lg" className="w-full h-14 text-lg">
                    <Link href="/">Вернуться в штаб</Link>
                </Button>
            </div>
        );
    }

    // Active View Calculations
    const getPhaseTitle = () => {
        switch (currentPhase) {
            case 'priming': return 'Фаза 1: Знакомство';
            case 'recognition': return 'Фаза 2: Дрилл (x2)';
            case 'production': return 'Фаза 3: Контекст';
            default: return '';
        }
    };

    const getPhaseIcon = () => {
        switch (currentPhase) {
            case 'priming': return <Layers className="h-5 w-5" />;
            case 'recognition': return <Target className="h-5 w-5" />;
            case 'production': return <PenTool className="h-5 w-5" />;
            default: return null;
        }
    };

    const progressValue = ((currentBatchIndex * 3 + (currentPhase === 'priming' ? 0 : currentPhase === 'recognition' ? 1 : 2)) / (totalBatches * 3)) * 100;

    // Phase relative progress
    const phaseProgressValue = currentPhase === 'priming'
        ? (phaseIndex / currentBatchWords.length) * 100
        : currentPhase === 'recognition'
            ? (currentBatchWords.filter(w => (recognitionHits[w.id] || 0) >= 2).length / currentBatchWords.length) * 100
            : (phaseIndex / currentBatchWords.length) * 100;

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <div className="flex items-center gap-2 text-primary font-bold">
                            {getPhaseIcon()}
                            {getPhaseTitle()}
                        </div>
                        <div className="text-[10px] text-muted-foreground font-mono uppercase tracking-tighter">
                            Этап {currentBatchIndex + 1} из {totalBatches}
                        </div>
                    </div>
                    <Badge variant="outline" className="font-mono">
                        {currentPhase === 'recognition'
                            ? `${currentBatchWords.filter(w => (recognitionHits[w.id] || 0) >= 2).length} / ${currentBatchWords.length} ГОТОВО`
                            : `${phaseIndex + 1} / ${currentBatchWords.length}`
                        }
                    </Badge>
                </div>
                <Progress value={progressValue} className="h-2 shadow-inner" />
                <Progress value={phaseProgressValue} className="h-1 bg-primary/10" />
            </div>

            <div className="min-h-[500px] flex flex-col justify-center">
                {currentItem && (
                    <>
                        {currentPhase === 'priming' && (
                            <PrimingView key={currentItem.id} item={currentItem} onNext={() => handleNext('success')} />
                        )}
                        {currentPhase === 'recognition' && (
                            <div className="space-y-4">
                                <div className="flex justify-center gap-2 mb-4">
                                    {[1, 2].map(h => (
                                        <div
                                            key={h}
                                            className={cn(
                                                "w-12 h-2 rounded-full",
                                                (recognitionHits[currentItem.id] || 0) >= h ? "bg-green-500 shadow-[0_0_10px_purple-400]" : "bg-muted"
                                            )}
                                        />
                                    ))}
                                </div>
                                <RecognitionView key={currentItem.id} item={currentItem} onResult={handleNext} />
                            </div>
                        )}
                        {currentPhase === 'production' && (
                            <ProductionView key={currentItem.id} item={currentItem} onResult={handleNext} />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
