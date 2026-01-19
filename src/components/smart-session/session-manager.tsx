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

    // Phase Management
    const [currentPhase, setCurrentPhase] = useState<GlobalPhase>('priming');
    const [phaseIndex, setPhaseIndex] = useState(0); // Index within the current phase

    // Drill State (Phase 2)
    const [recognitionHits, setRecognitionHits] = useState<Record<string, number>>({});

    // Score/Results
    const [results, setResults] = useState<Record<string, 'success' | 'fail'>>({});

    useEffect(() => {
        const items = getDailySession(20);
        setSessionQueue(items);
        setSessionState(items.length > 0 ? 'intro' : 'summary');
    }, [getDailySession]);

    // Derived: Current item based on phaseIndex
    const currentItem = useMemo(() => {
        if (currentPhase === 'recognition') {
            // In recognition, we filter for words that haven't reached 2 hits yet
            const pendingWords = sessionQueue.filter(w => (recognitionHits[w.id] || 0) < 2);
            return pendingWords[phaseIndex % pendingWords.length];
        }
        return sessionQueue[phaseIndex];
    }, [sessionQueue, phaseIndex, currentPhase, recognitionHits]);

    const handleNext = (result: 'success' | 'fail') => {
        if (!currentItem) return;

        if (currentPhase === 'priming') {
            if (phaseIndex < sessionQueue.length - 1) {
                setPhaseIndex(i => i + 1);
            } else {
                // Move to Recognition
                setCurrentPhase('recognition');
                setPhaseIndex(0);
            }
        }
        else if (currentPhase === 'recognition') {
            if (result === 'success') {
                const newHits = (recognitionHits[currentItem.id] || 0) + 1;
                setRecognitionHits(prev => ({ ...prev, [currentItem.id]: newHits }));

                // Check if all words reached 2 hits
                const allDone = sessionQueue.every(w => {
                    const hits = w.id === currentItem.id ? newHits : (recognitionHits[w.id] || 0);
                    return hits >= 2;
                });

                if (allDone) {
                    setCurrentPhase('production');
                    setPhaseIndex(0);
                } else {
                    // Move to next pending word
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
            setResults(prev => ({ ...prev, [currentItem.id]: finalResult }));

            if (phaseIndex < sessionQueue.length - 1) {
                setPhaseIndex(i => i + 1);
            } else {
                // End Session: Sync results back to queue
                // Create a complete results map for the update
                const finalResultsMap = { ...results, [currentItem.id]: finalResult };
                sessionQueue.forEach(item => {
                    const res = (finalResultsMap[item.id] || 'success') as 'success' | 'fail';
                    updateItemStatus(item.id, res);
                });
                setSessionState('summary');
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
                    <br />Слова будут усвоены через 3 фазы:
                    <span className="block mt-2 font-mono text-sm">ЗНАКОМСТВО → ДРИЛЛ (x2) → КОНТЕКСТ</span>
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

    const progressValue = currentPhase === 'priming'
        ? (phaseIndex / sessionQueue.length) * 33
        : currentPhase === 'recognition'
            ? 33 + (Object.values(recognitionHits).reduce((a, b) => a + Math.min(b, 2), 0) / (sessionQueue.length * 2)) * 33
            : 66 + (phaseIndex / sessionQueue.length) * 34;

    return (
        <div className="max-w-2xl mx-auto p-4 space-y-8">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-primary font-bold">
                        {getPhaseIcon()}
                        {getPhaseTitle()}
                    </div>
                    <Badge variant="outline" className="font-mono">
                        {currentPhase === 'recognition'
                            ? `${sessionQueue.filter(w => (recognitionHits[w.id] || 0) >= 2).length} / ${sessionQueue.length} ГОТОВО`
                            : `${phaseIndex + 1} / ${sessionQueue.length}`
                        }
                    </Badge>
                </div>
                <Progress value={progressValue} className="h-3 shadow-inner" />
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
