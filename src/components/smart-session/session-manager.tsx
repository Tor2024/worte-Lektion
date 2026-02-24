"use client";

import { useState, useEffect, useMemo } from 'react';
import { useStudyQueue } from '@/hooks/use-study-queue';
import { StudyQueueItem } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { storage } from '@/lib/storage';
import { NeuralMap } from '../neural-map';
import { Progress } from '@/components/ui/progress';
import { BrainCircuit, CheckCircle, XCircle, ArrowRight, Layers, Target, PenTool, Siren } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { PrimingView } from '@/components/smart-session/priming-view';
import { RecognitionView } from '@/components/smart-session/recognition-view';
import { ProductionView } from '@/components/smart-session/production-view';
import { RemedialView } from '@/components/smart-session/remedial-view';
import { ConsolidationView } from '@/components/smart-session/consolidation-view';
import { formatGermanWord } from '@/lib/german-utils';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

type GlobalPhase = 'priming' | 'recognition' | 'narrative' | 'production' | 'remedial';
type SessionState = 'loading' | 'intro' | 'warmup' | 'active' | 'consolidation' | 'summary';

interface SmartSessionManagerProps {
    folderId?: string;
}

export function SmartSessionManager({ folderId }: SmartSessionManagerProps) {
    const { getDailySession, updateItemStatus, overdueCount, dailyLimit, isLoading } = useStudyQueue();
    const [sessionQueue, setSessionQueue] = useState<StudyQueueItem[]>([]);
    const [sessionState, setSessionState] = useState<SessionState>('loading');
    const [sessionMode, setSessionMode] = useState<'learning' | 'review-only'>('learning');
    const [sessionNumber, setSessionNumber] = useState(1);

    // Batch Management
    const BATCH_SIZE = 4; // Increased from 2 for better cognitive flow
    const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

    // Phase Management
    const [currentPhase, setCurrentPhase] = useState<GlobalPhase>('priming');
    const [phaseIndex, setPhaseIndex] = useState(0); // Index within the current batch

    // Drill State (Phase 2)
    const [recognitionHits, setRecognitionHits] = useState<Record<string, number>>({});

    // Refresh State: Words that were forgotten and need re-priming
    const [refreshWords, setRefreshWords] = useState<Set<string>>(new Set());

    // Score/Results
    const [results, setResults] = useState<Record<string, 'success' | 'fail'>>({});

    // Narrative Anchoring: Story for each batch
    const [batchStories, setBatchStories] = useState<Record<number, string>>({});
    const [isNarrativeGenerating, setIsNarrativeGenerating] = useState(false);

    // Warm-up State
    const [warmupIndex, setWarmupIndex] = useState(0);
    const leeches = useMemo(() => sessionQueue.filter(w => (w.consecutiveMistakes || 0) >= 3), [sessionQueue]);

    useEffect(() => {
        // Only load session if we are in 'loading' state
        if (sessionState !== 'loading') return;

        // CRITICAL FIX: Wait for queue to load from storage
        if (isLoading) return;

        // New session structure: { items, mode, sessionNumber }
        const session = getDailySession(folderId);

        // Wait for queue to be ready (if empty, retry later or show empty state if truly empty)
        // For now, getDailySession returns empty array if not ready

        setSessionQueue(session.items);
        setSessionMode(session.mode);
        setSessionNumber(session.sessionNumber);

        // Only transition state if we actually have items
        // If items are empty but we expect them, stay in loading?
        // getDailySession returns [] if localQueue is empty.
        // But localQueue loads async.
        // We should check if studyQueue is loaded.
        // For now, let's assume it loads fast enough or returns valid empty array.

        setSessionState(session.items.length > 0 ? 'intro' : 'summary');
    }, [getDailySession, sessionState, folderId, isLoading]);

    // Derived: Current batch words
    const currentBatchWords = useMemo(() => {
        const start = currentBatchIndex * BATCH_SIZE;
        return sessionQueue.slice(start, start + BATCH_SIZE);
    }, [sessionQueue, currentBatchIndex]);

    const totalBatches = Math.ceil(sessionQueue.length / BATCH_SIZE);

    // Derived: Current item based on phaseIndex within current batch
    const currentItem = useMemo(() => {
        if (currentPhase === 'priming') {
            // SMART SKIP LOGIC:
            // 1. Always show Priming for NEW words or words in REFRESH mode.
            // 2. Show Priming for words with interval < 7 (Check-in).
            // 3. Skip for words with interval >= 7.
            const needsPriming = currentBatchWords.filter(w => {
                const isNew = w.status === 'new';
                const isRefresh = refreshWords.has(w.id);
                const isShortInterval = (w.interval || 0) < 7;
                return isNew || isRefresh || isShortInterval;
            });

            if (needsPriming.length === 0) return null; // Phase will auto-advance in useEffect or handleNext
            return needsPriming[phaseIndex] || null;
        }

        if (currentPhase === 'recognition') {
            // In recognition, we filter for words that haven't reached 2 hits yet
            const pendingWords = currentBatchWords.filter(w => (recognitionHits[w.id] || 0) < 2);
            if (pendingWords.length === 0) return null;
            return pendingWords[phaseIndex % pendingWords.length];
        }

        if (currentPhase === 'narrative' || currentPhase === 'production') {
            return currentBatchWords[phaseIndex] || null;
        }

        return currentBatchWords[phaseIndex];
    }, [currentBatchWords, phaseIndex, currentPhase, recognitionHits, refreshWords]);

    // AUTO-ADVANCE phase if no items need current phase
    useEffect(() => {
        if (sessionState !== 'active') return;

        if (currentPhase === 'priming') {
            const needsPriming = currentBatchWords.filter(w => {
                const isNew = w.status === 'new';
                const isRefresh = refreshWords.has(w.id);
                const isShortInterval = (w.interval || 0) < 7;
                return isNew || isRefresh || isShortInterval;
            });

            if (needsPriming.length === 0) {
                setCurrentPhase('recognition');
                setPhaseIndex(0);
            } else if (phaseIndex >= needsPriming.length) {
                setCurrentPhase('recognition');
                setPhaseIndex(0);
            }
        }
    }, [currentPhase, currentBatchWords, phaseIndex, sessionState, refreshWords]);

    const handleNext = (result: 'success' | 'fail') => {
        if (!currentItem) return;

        if (currentPhase === 'priming') {
            const needsPriming = currentBatchWords.filter(w => {
                const isNew = w.status === 'new';
                const isRefresh = refreshWords.has(w.id);
                const isShortInterval = (w.interval || 0) < 7;
                return isNew || isRefresh || isShortInterval;
            });

            if (phaseIndex < needsPriming.length - 1) {
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
                    setCurrentPhase('narrative');
                    setPhaseIndex(0);
                } else {
                    // Move to next pending word in batch
                    setPhaseIndex(i => i + 1);
                }
            } else {
                // FORGOT WORD LOGIC:
                // If fail in recognition, add to RefreshWords and go back to Priming for THIS word
                setRefreshWords(prev => new Set(prev).add(currentItem.id));
                setRecognitionHits(prev => ({ ...prev, [currentItem.id]: 0 }));
                setResults(prev => ({ ...prev, [currentItem.id]: 'fail' }));

                // Jump back to Priming
                setCurrentPhase('priming');
                setPhaseIndex(0); // The currentItem logic will find this word in the needsPriming list
            }
        }
        else if (currentPhase === 'narrative') {
            if (phaseIndex < currentBatchWords.length - 1) {
                setPhaseIndex(i => i + 1);
            } else {
                setCurrentPhase('production');
                setPhaseIndex(0);
            }
        }
        else if (currentPhase === 'production') {
            const finalResult = result === 'fail' ? 'fail' : (results[currentItem.id] === 'fail' ? 'fail' : 'success');
            const updatedResults: Record<string, 'success' | 'fail'> = { ...results, [currentItem.id]: finalResult };
            setResults(updatedResults);

            // SAVE PROGRESS IMMEDIATELY for this word
            updateItemStatus(currentItem.id, finalResult as 'success' | 'fail');

            if (phaseIndex < currentBatchWords.length - 1) {
                setPhaseIndex(i => i + 1);
            } else {
                // Production finished for this batch
                if (currentBatchIndex < totalBatches - 1) {
                    // Move to next batch, start with priming
                    setCurrentBatchIndex(i => i + 1);
                    setCurrentPhase('priming');
                    setPhaseIndex(0);
                    // Clear refresh flags for the new batch
                    setRefreshWords(new Set());
                } else {
                    // All batches finished, move to consolidation
                    setSessionState('consolidation');
                }
            }
        }
    };

    const updateBatchStory = (newSentence: string) => {
        setBatchStories(prev => ({
            ...prev,
            [currentBatchIndex]: (prev[currentBatchIndex] ? prev[currentBatchIndex] + " " : "") + newSentence
        }));
    };

    if (sessionState === 'loading') return <div className="p-10 text-center animate-pulse text-primary font-bold">Синхронизация нейро-слоев...</div>;

    if (sessionState === 'intro') {
        return (
            <div className="flex flex-col items-center justify-center p-8 text-center space-y-6 max-w-lg mx-auto mt-10">
                <div className="relative">
                    <BrainCircuit className="h-24 w-24 text-primary animate-pulse" />
                    <Badge className="absolute -top-2 -right-2 bg-green-500">v2.2</Badge>
                </div>

                {sessionMode === 'review-only' ? (
                    <>
                        <h1 className="text-4xl font-black tracking-tighter">РЕЖИМ ПОВТОРЕНИЯ</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Сессия #{sessionNumber}. Дневной лимит достигнут (2 сессии).
                            <br />Повторяем <strong>{sessionQueue.length}</strong> слов, изученных сегодня.
                        </p>
                        <div className="w-full bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 p-4 rounded-xl">
                            <span className="text-blue-700 dark:text-blue-400 font-bold">
                                🔄 Только повторение — новых слов нет
                            </span>
                        </div>
                    </>
                ) : (
                    <>
                        <h1 className="text-4xl font-black tracking-tighter">ПАКЕТНЫЙ РЕЖИМ</h1>
                        <p className="text-muted-foreground text-lg leading-relaxed">
                            Сессия #{sessionNumber}/2. Подготовлено <strong>{sessionQueue.length}</strong> объектов.
                            <br />Разбито на <strong>{totalBatches} этапа</strong> по {BATCH_SIZE} слов.
                            <br /><span className="block mt-2 font-mono text-sm">ЗНАКОМСТВО → ДРИЛЛ (x2) → КОНТЕКСТ</span>
                        </p>

                        {/* Overdue words warning */}
                        {overdueCount > 0 && (
                            <div className="w-full bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 p-4 rounded-xl text-center">
                                <span className="text-amber-700 dark:text-amber-400 font-bold">
                                    ⚠️ + {Math.min(overdueCount, 40)} просроченных слов в конце
                                </span>
                            </div>
                        )}
                    </>
                )}

                <Button size="lg" className="w-full text-xl h-16 shadow-xl hover:scale-[1.02] transition-transform" onClick={() => {
                    if (leeches.length > 0) {
                        setSessionState('warmup');
                    } else {
                        setSessionState('active');
                    }
                }}>
                    {sessionMode === 'review-only' ? 'Начать Повторение' : 'Начать Сессию'}
                </Button>
            </div>
        );
    }

    if (sessionState === 'warmup') {
        const currentLeech = leeches[warmupIndex];
        return (
            <div className="flex flex-col items-center justify-center p-8 space-y-8 max-w-lg mx-auto mt-10">
                <div className="flex items-center gap-2 text-red-500 font-bold uppercase tracking-widest text-sm">
                    <Siren className="h-5 w-5 animate-pulse" />
                    Разминка: Вход в поток
                </div>
                <Card className="w-full border-2 border-red-500/20 shadow-2xl bg-red-50/30">
                    <CardContent className="p-8 text-center space-y-4">
                        <div className="text-4xl font-black text-red-600">{formatGermanWord(currentLeech.word)}</div>
                        <div className="text-2xl italic text-slate-600 border-t pt-4">{currentLeech.word.russian}</div>
                        {currentLeech.mnemonic && (
                            <div className="mt-4 p-3 bg-amber-100/50 rounded-lg text-sm text-amber-900 border border-amber-200">
                                💡 {currentLeech.mnemonic}
                            </div>
                        )}
                    </CardContent>
                </Card>
                <Button size="lg" className="w-full h-16 text-xl" onClick={() => {
                    if (warmupIndex < leeches.length - 1) {
                        setWarmupIndex(i => i + 1);
                    } else {
                        setSessionState('active');
                    }
                }}>
                    Вспомнил ({warmupIndex + 1}/{leeches.length})
                </Button>
            </div>
        );
    }

    if (sessionState === 'summary') {
        const finalScore = Object.values(results).filter(r => r === 'success').length;
        return (
            <div className="flex flex-col items-center justify-center p-4 text-center space-y-8 max-w-4xl mx-auto">
                <div className="space-y-2">
                    <h1 className="text-4xl font-black tracking-tighter">СИНХРОНИЗАЦИЯ ЗАВЕРШЕНА</h1>
                    <p className="text-muted-foreground text-lg italic">
                        Уровень усвоения: {Math.round((finalScore / sessionQueue.length) * 100)}%. Новые нейронные связи прописаны успешно.
                    </p>
                </div>

                <div className="w-full">
                    <NeuralMap
                        items={sessionQueue}
                        title="Результат сессии: Ваши новые нейроны"
                    />
                </div>

                <div className="flex flex-col items-center gap-4 w-full max-w-lg">
                    <div className="text-6xl font-black text-primary">{finalScore}/{sessionQueue.length}</div>
                    <Button asChild size="lg" className="w-full h-16 text-xl shadow-2xl hover:scale-[1.02] transition-transform rounded-2xl">
                        <Link href="/">Вернуться в штаб</Link>
                    </Button>
                </div>
            </div>
        );
    }

    if (sessionState === 'consolidation') {
        return (
            <div className="min-h-[500px] flex flex-col justify-center">
                <ConsolidationView
                    items={sessionQueue}
                    onComplete={() => {
                        // SAVE SESSION PROGRESS
                        const successIds = Object.entries(results)
                            .filter(([_, result]) => result === 'success')
                            .map(([id]) => id);

                        storage.incrementSession(successIds);
                        setSessionState('summary');
                    }}
                />
            </div>
        );
    }

    // From here on, sessionState MUST be 'active'

    // Active View Calculations
    const getPhaseTitle = () => {
        switch (currentPhase) {
            case 'priming': return 'Фаза 1: Знакомство';
            case 'recognition': return 'Фаза 2: Дрилл (x2)';
            case 'narrative': return 'Контекстная прелюдия';
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
        ? (phaseIndex / (currentBatchWords.length || 1)) * 100
        : currentPhase === 'recognition'
            ? (currentBatchWords.filter(w => (recognitionHits[w.id] || 0) >= 2).length / (currentBatchWords.length || 1)) * 100
            : (phaseIndex / (currentBatchWords.length || 1)) * 100;

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
                            : `${Math.min(phaseIndex + 1, currentBatchWords.length)} / ${currentBatchWords.length}`
                        }
                    </Badge>
                </div>
                <Progress value={progressValue} className="h-2 shadow-inner" />
                <Progress value={phaseProgressValue} className="h-1 bg-primary/10" />
            </div>

            <div className="min-h-[500px] flex flex-col justify-center">
                {currentItem ? (
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
                                <RecognitionView key={`${currentItem.id}-${recognitionHits[currentItem.id] || 0}`} item={currentItem} onResult={handleNext} />
                            </div>
                        )}
                        {currentPhase === 'narrative' && (
                            <div className="space-y-6">
                                <div className="p-8 bg-blue-50/30 border-2 border-dashed border-blue-200 rounded-3xl relative">
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                                        История батча
                                    </div>
                                    <p className="text-xl leading-relaxed italic text-slate-700">
                                        {batchStories[currentBatchIndex] || "ИИ готовит контекст..."}
                                    </p>
                                </div>
                                <Button size="lg" className="w-full h-16 text-xl" onClick={() => handleNext('success')}>
                                    К упражнениям →
                                </Button>
                            </div>
                        )}
                        {currentPhase === 'production' && (
                            <ProductionView
                                key={currentItem.id}
                                item={currentItem}
                                storyContext={batchStories[currentBatchIndex] || ""}
                                onStoryUpdate={updateBatchStory}
                                onResult={handleNext}
                            />
                        )}
                    </>
                ) : (
                    /* Fallback UI when currentItem is NULL - fixes stuck UI bug */
                    <div className="text-center space-y-4 p-8">
                        <BrainCircuit className="h-16 w-16 mx-auto text-muted-foreground animate-pulse" />
                        <p className="text-muted-foreground">Переход к следующему этапу...</p>
                        <Button
                            variant="outline"
                            onClick={() => {
                                // Auto-advance to next phase if stuck
                                if (currentPhase === 'recognition') {
                                    setCurrentPhase('production');
                                    setPhaseIndex(0);
                                } else if (currentBatchIndex < totalBatches - 1) {
                                    setCurrentBatchIndex(i => i + 1);
                                    setCurrentPhase('priming');
                                    setPhaseIndex(0);
                                } else {
                                    setSessionState('consolidation');
                                }
                            }}
                        >
                            Продолжить →
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
