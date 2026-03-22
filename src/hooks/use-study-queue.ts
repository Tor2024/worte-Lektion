'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '@/lib/storage';
import { StudyQueueItem } from '@/lib/types';
import { useCustomFolders } from './use-custom-folders';
import { generateMnemonic } from '@/ai/flows/generate-mnemonic';

export function useStudyQueue() {
    const [localQueue, setLocalQueue] = useState<StudyQueueItem[]>([]);
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
    const [dailyStats, setDailyStats] = useState<{ lastSessionDate: number, sessionCount: number }>({ lastSessionDate: 0, sessionCount: 0 });
    const { folders, updateWordInFolder } = useCustomFolders();

    useEffect(() => {
        setLocalQueue(storage.getStudyQueue());
        setDailyStats(storage.getDailySessionData());
        setIsInitialLoadDone(true);

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'deutsch-learning-study-queue-v1' && event.newValue) {
                try {
                    const next = JSON.parse(event.newValue);
                    setLocalQueue(prev => {
                        if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
                        return next;
                    });
                } catch (e) {
                    console.error("Failed to sync queue from storage", e);
                }
            }
            if (event.key === 'deutsch-daily-session-v1' && event.newValue) {
                try {
                    const next = JSON.parse(event.newValue);
                    setDailyStats(next);
                } catch (e) {
                    console.error("Failed to sync session data", e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const syncWithFolders = useCallback(() => {
        if (!isInitialLoadDone) return;
        if (folders.length === 0) return;

        const existingQueue = storage.getStudyQueue();
        const newItems: StudyQueueItem[] = [];
        const existingIds = new Set(existingQueue.map((item: StudyQueueItem) => item.id));
        let hasChanges = false;

        folders.forEach(folder => {
            const folderWords = folder.words || [];
            folderWords.forEach(userWord => {
                const german = userWord?.word?.german?.trim();
                const wordId = german || userWord.id || `unknown-${Math.random()}`;

                if (!existingIds.has(wordId)) {
                    const sm2 = userWord.sm2State || {};
                    const hasHistory = (sm2.repetitions || 0) > 0;

                    newItems.push({
                        id: wordId,
                        word: userWord.word || { german: '?', russian: '?', type: 'other' },
                        status: hasHistory ? (sm2.interval > 7 ? 'review' : 'learning') : 'new',
                        currentStage: 'priming',
                        nextReviewNum: sm2.nextReviewDate || Date.now(),
                        interval: sm2.interval || 0,
                        easeFactor: sm2.easeFactor || 2.5,
                        tags: [folder.id],
                        consecutiveMistakes: 0
                    });
                    hasChanges = true;
                }
            });
        });

        if (hasChanges) {
            const updatedQueue = [...existingQueue, ...newItems];
            setLocalQueue(updatedQueue);
            storage.setStudyQueue(updatedQueue);
        }
    }, [folders, isInitialLoadDone]);

    useEffect(() => {
        if (isInitialLoadDone && folders.length > 0) {
            syncWithFolders();
        }
    }, [folders, isInitialLoadDone, syncWithFolders]);

    // Session mode type for UI display
    type SessionMode = 'learning' | 'review-only';

    const getDailySession = useCallback((folderId?: string, productionMode?: string): { items: StudyQueueItem[], mode: SessionMode, sessionNumber: number } => {
        let queueToProcess = localQueue;

        // FILTER BY FOLDER ID IF PROVIDED
        if (folderId) {
            queueToProcess = localQueue.filter(item => item.tags && item.tags.includes(folderId));
        }

        if (queueToProcess.length === 0) return { items: [], mode: 'learning', sessionNumber: 1 };

        const dailyData = storage.getDailySessionData();
        const sessionNumber = dailyData.sessionCount + 1; // Next session number
        const now = Date.now();

        // Dynamic limit: 100 words when skipping production phase, 70 otherwise
        const DAILY_LIMIT = productionMode === 'skip' ? 100 : 70;

        const LEVEL_PRIORITY: Record<string, number> = {
            'Beruf': 100, 'B2': 90, 'B1': 80, 'A2': 70, 'A1': 60, 'A0': 50
        };

        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);

        // 1. Get ALL overdue words (past due date)
        const overdueWords = queueToProcess
            .filter((item: StudyQueueItem) =>
                item.status !== 'new' && item.nextReviewNum < now
            )
            .sort((a, b) => (a.nextReviewNum || 0) - (b.nextReviewNum || 0));

        // 2. Get words due TODAY (not overdue)
        const dueTodayWords = queueToProcess
            .filter((item: StudyQueueItem) =>
                item.status !== 'new' &&
                item.nextReviewNum >= now &&
                item.nextReviewNum <= todayEnd.getTime()
            )
            .sort((a, b) => (a.nextReviewNum || 0) - (b.nextReviewNum || 0));

        // 3. Get new words
        const newWords = queueToProcess
            .filter((item: StudyQueueItem) => item.status === 'new');

        // 4. Get leech words 
        const leechWords = queueToProcess
            .filter((item: StudyQueueItem) => item.status === 'leech' || (item.consecutiveMistakes || 0) >= 3)
            .sort((a, b) => (b.consecutiveMistakes || 0) - (a.consecutiveMistakes || 0));

        // Review-only mode triggers ONLY if there is nothing else left to learn or review
        const totalPending = leechWords.length + overdueWords.length + dueTodayWords.length + newWords.length;

        if (totalPending === 0) {
            let reviewPool = queueToProcess.filter((item: StudyQueueItem) =>
                dailyData.learnedTodayIds.includes(item.id)
            );
            if (reviewPool.length > 0) {
                return { items: reviewPool, mode: 'review-only', sessionNumber };
            }
        }

        // 5. Build the session pool
        // Order: Leeches → Due Today → Overdue → New Words (Only if Overdue is 0)
        let mainPool: StudyQueueItem[] = [];
        let remainingSlots = DAILY_LIMIT;

        const isBacklogCritical = overdueWords.length > 50;

        // 5a. Leeches (up to 15 slots max so we don't overwhelm)
        const leechesToAdd = leechWords.slice(0, Math.min(leechWords.length, remainingSlots, 15));
        mainPool = [...mainPool, ...leechesToAdd];
        remainingSlots -= leechesToAdd.length;

        // 5b. Due today (HIGHEST PRIORITY after leeches to prevent snowball effect)
        // We must do today's work today, otherwise they become tomorrow's overdue.
        if (remainingSlots > 0 && dueTodayWords.length > 0) {
            const dueTodayToAdd = dueTodayWords.slice(0, remainingSlots);
            mainPool = [...mainPool, ...dueTodayToAdd];
            remainingSlots -= dueTodayToAdd.length;
        }

        // 5c. Overdue words (Takes up ALL remaining slots to clear the backlog)
        if (remainingSlots > 0 && overdueWords.length > 0) {
            // Take oldest overdue but shuffle a larger pool to avoid getting stuck on the same hard words
            const overdueFiltered = overdueWords.filter(w => !mainPool.some(m => m.id === w.id));
            const candidatesToShuffle = overdueFiltered.slice(0, remainingSlots * 2);
            candidatesToShuffle.sort(() => Math.random() - 0.5);

            const overdueToAdd = candidatesToShuffle.slice(0, remainingSlots);
            mainPool = [...mainPool, ...overdueToAdd];
            remainingSlots -= overdueToAdd.length;
        }

        // 5d. New Words (ONLY IF OVERDUE IS 0 AND FREE SLOTS REMAIN)
        // This is the strict lock: no new words until debts are paid.
        if (remainingSlots > 0 && overdueWords.length === 0 && newWords.length > 0) {
            const newToAdd = newWords.slice(0, Math.min(newWords.length, 25, remainingSlots));
            mainPool = [...mainPool, ...newToAdd];
            remainingSlots -= newToAdd.length;
        }

        // Fast Recovery Mode: If user has a critical backlog (> 50 overdue)
        // Force the session into 'review-only' mode. This skips the heavy "Narrative/Production" 
        // phases and lets the user quickly drill (Recognition) through 100 words in 10 minutes.
        if (isBacklogCritical && mainPool.length > 0) {
             // We still deduplicate
             const uniqueMap = new Map();
             mainPool.forEach(item => {
                 if (!uniqueMap.has(item.id)) uniqueMap.set(item.id, item);
             });
             return { items: Array.from(uniqueMap.values()), mode: 'review-only', sessionNumber };
        }

        // Fallback Review-only 
        if (mainPool.length === 0) {
            let reviewPool = queueToProcess.filter((item: StudyQueueItem) =>
                dailyData.learnedTodayIds.includes(item.id)
            );
            if (reviewPool.length > 0) {
                return { items: reviewPool, mode: 'review-only', sessionNumber };
            }
        }

        // Final session
        let finalItems = [...mainPool];

        // CRITICAL FIX: Deduplicate items by ID to strictly prevent repeats in the same session
        const uniqueMap = new Map();
        finalItems.forEach(item => {
            if (!uniqueMap.has(item.id)) {
                uniqueMap.set(item.id, item);
            }
        });
        finalItems = Array.from(uniqueMap.values());

        if (finalItems.length === 0) return { items: [], mode: 'learning', sessionNumber };

        // Group by level for better distribution
        const levelGroups: Record<number, StudyQueueItem[]> = {};
        finalItems.forEach((item: any) => {
            const level = item.word?.level ? LEVEL_PRIORITY[item.word.level as keyof typeof LEVEL_PRIORITY] : 0;
            if (!levelGroups[level]) levelGroups[level] = [];
            levelGroups[level].push(item);
        });

        const sortedLevels = Object.keys(levelGroups).map(Number).sort((a, b) => b - a);
        const finalSelection: StudyQueueItem[] = [];

        for (const level of sortedLevels) {
            const itemsInLevel = levelGroups[level];
            const typeGroups: Record<string, StudyQueueItem[]> = {};

            itemsInLevel.forEach(item => {
                const type = item.word?.type || 'other';
                if (!typeGroups[type]) typeGroups[type] = [];
                typeGroups[type].push(item);
            });

            Object.values(typeGroups).forEach((group: any) => group.sort(() => Math.random() - 0.5));
            const types = Object.keys(typeGroups);
            let hasItems = true;
            const groupIterators: Record<string, number> = {};
            types.forEach(t => groupIterators[t] = 0);

            while (hasItems) {
                hasItems = false;
                for (const type of types) {
                    const idx = groupIterators[type];
                    if (idx < typeGroups[type].length) {
                        finalSelection.push(typeGroups[type][idx]);
                        groupIterators[type]++;
                        hasItems = true;
                        if (finalSelection.length >= DAILY_LIMIT) break;
                    }
                }
                if (finalSelection.length >= DAILY_LIMIT) break;
            }
            if (finalSelection.length >= DAILY_LIMIT) break;
        }
        return { items: finalSelection, mode: 'learning' as SessionMode, sessionNumber };
    }, [localQueue]);

    const updateItemStatus = useCallback(async (wordId: string, result: 'success' | 'fail', confusedWithId?: string) => {
        const item = localQueue.find((i: any) => i.id === wordId);
        if (!item) return;

        let newStatus = item.status;
        let newMistakes = item.consecutiveMistakes;
        let nextInterval = item.interval || 0;
        let nextEase = item.easeFactor || 2.5;
        let currentConfusedWith = { ...(item.confusedWith || {}) };

        if (result === 'fail') {
            newMistakes++;
            newStatus = newMistakes >= 3 ? 'leech' : 'learning';
            nextInterval = 0; // Reset to 0 days for immediate re-learning
            nextEase = Math.max(1.3, nextEase - 0.2); // Decrease ease factor

            if (confusedWithId) {
                currentConfusedWith[confusedWithId] = (currentConfusedWith[confusedWithId] || 0) + 1;
            }

            // Generate mnemonic if it becomes a leech and doesn't have one
            if (newStatus === 'leech' && !item.mnemonic) {
                try {
                    const { mnemonic } = await generateMnemonic({
                        german: item.word.german,
                        russian: item.word.russian
                    });
                    item.mnemonic = mnemonic;

                    // Persist mnemonic back to the source folder if it's a custom word
                    const folder = folders.find(f => f.id === item.tags[0]);
                    if (folder) {
                        const originalWord = folder.words.find(w => w.id === item.id || w.word.german === item.word.german);
                        if (originalWord) {
                            updateWordInFolder(folder.id, { ...originalWord, mnemonic });
                        }
                    }
                } catch (e) {
                    console.error("Failed to generate mnemonic", e);
                }
            }
        } else {
            newMistakes = 0;
            if (item.status === 'new') {
                newStatus = 'learning';
                nextInterval = 1;
            } else if (item.status === 'learning') {
                newStatus = 'review';
                nextInterval = 3;
            } else {
                newStatus = 'review';
                // User-defined sequence: 1 -> 3 -> 7 -> 15 -> 30 -> 45 -> 60+
                if (nextInterval <= 1) nextInterval = 3;
                else if (nextInterval <= 3) nextInterval = 7;
                else if (nextInterval <= 7) nextInterval = 15;
                else if (nextInterval <= 15) nextInterval = 30;
                else if (nextInterval <= 30) nextInterval = 45;
                else if (nextInterval <= 45) nextInterval = 60;
                else {
                    // Success calculations (SM2 based) for long-term retention
                    nextInterval = Math.ceil(nextInterval * nextEase);
                }
            }
        }

        const nextDate = Date.now() + (1000 * 60 * 60 * 24 * nextInterval);

        const nextQueue = localQueue.map((i: StudyQueueItem) =>
            i.id === wordId
                ? {
                    ...item,
                    status: newStatus,
                    consecutiveMistakes: newMistakes,
                    nextReviewNum: nextDate,
                    interval: nextInterval,
                    easeFactor: nextEase,
                    mnemonic: item.mnemonic,
                    confusedWith: currentConfusedWith
                }
                : i
        );
        setLocalQueue(nextQueue);
        storage.setStudyQueue(nextQueue);
    }, [localQueue]);

    const updateMnemonic = useCallback(async (wordId: string, mnemonic: string) => {
        const item = localQueue.find((i: any) => i.id === wordId);
        if (!item) return;

        // 1. Update local state & storage
        const nextQueue = localQueue.map((i: StudyQueueItem) =>
            i.id === wordId ? { ...i, mnemonic } : i
        );
        setLocalQueue(nextQueue);
        storage.setStudyQueue(nextQueue);

        // 2. Persist to source folder
        const folderId = item.tags?.[0];
        if (folderId) {
            const folder = folders.find(f => f.id === folderId);
            if (folder) {
                const originalWord = folder.words.find(w => w.id === item.id || w.word.german === item.word.german);
                if (originalWord) {
                    updateWordInFolder(folderId, { ...originalWord, mnemonic });
                }
            }
        }
    }, [localQueue, folders, updateWordInFolder]);

    const setAsKnown = useCallback(async (wordId: string) => {
        const item = localQueue.find((i: any) => i.id === wordId);
        if (!item) return;

        // Set to a very long interval (6 months) and mark as review
        const nextInterval = 180;
        const nextDate = Date.now() + (1000 * 60 * 60 * 24 * nextInterval);

        const nextQueue = localQueue.map((i: StudyQueueItem) =>
            i.id === wordId
                ? {
                    ...i,
                    status: 'review' as const,
                    consecutiveMistakes: 0,
                    nextReviewNum: nextDate,
                    interval: nextInterval,
                    easeFactor: 2.5
                }
                : i
        );
        setLocalQueue(nextQueue);
        storage.setStudyQueue(nextQueue);

        // Also update SM2 state in folder if possible
        const folderId = item.tags?.[0];
        if (folderId) {
            const folder = folders.find(f => f.id === folderId);
            if (folder) {
                const originalWord = folder.words.find(w => w.id === item.id || w.word.german === item.word.german);
                if (originalWord) {
                    updateWordInFolder(folderId, {
                        ...originalWord,
                        sm2State: {
                            repetitions: 10, // Simulate mastery
                            interval: nextInterval,
                            easeFactor: 2.5,
                            nextReviewDate: nextDate
                        }
                    });
                }
            }
        }
    }, [localQueue, folders, updateWordInFolder]);

    const stats = useMemo(() => {
        const now = Date.now();
        const dueCount = localQueue.filter((i: StudyQueueItem) => i.nextReviewNum <= now && i.status !== 'new').length;
        const overdueCount = localQueue.filter((i: StudyQueueItem) => i.nextReviewNum < now && i.status !== 'new').length;
        const newCount = localQueue.filter((i: StudyQueueItem) => i.status === 'new').length;
        const learningCount = localQueue.filter((i: StudyQueueItem) => i.status === 'learning' || i.status === 'leech').length;
        const reviewCount = localQueue.filter((i: StudyQueueItem) => i.status === 'review').length;

        // Global limit: 70 words per session (sustainable goal for 3000 words deadline)
        const dailyLimit = 100; // Show max potential
        const availableTotal = Math.min(localQueue.length, dailyLimit);

        return {
            totalDue: dueCount,
            overdueCount,
            totalNew: newCount,
            totalLearning: learningCount,
            totalReview: reviewCount,
            totalLeeches: localQueue.filter((i: StudyQueueItem) => i.status === 'leech').length,
            totalAvailable: availableTotal,
            learnedTodayCount: storage.getDailySessionData().learnedTodayIds.length,
            dailyLimit
        };
    }, [localQueue]);

    return useMemo(() => ({
        queue: localQueue,
        isLoading: !isInitialLoadDone,
        getDailySession,
        updateItemStatus,
        updateMnemonic,
        setAsKnown,
        syncWithFolders,
        dailyStats,
        ...stats
    }), [localQueue, isInitialLoadDone, getDailySession, updateItemStatus, updateMnemonic, setAsKnown, syncWithFolders, stats]);
}
