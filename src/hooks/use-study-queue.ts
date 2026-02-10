'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '@/lib/storage';
import { StudyQueueItem } from '@/lib/types';
import { useCustomFolders } from './use-custom-folders';
import { generateMnemonic } from '@/ai/flows/generate-mnemonic';

export function useStudyQueue() {
    const [localQueue, setLocalQueue] = useState<StudyQueueItem[]>([]);
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
    const { folders, updateWordInFolder } = useCustomFolders();

    useEffect(() => {
        setLocalQueue(storage.getStudyQueue());
        setIsInitialLoadDone(true);
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
                const german = userWord?.word?.german;
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

    const getDailySession = useCallback((folderId?: string): { items: StudyQueueItem[], mode: SessionMode, sessionNumber: number } => {
        let queueToProcess = localQueue;

        // FILTER BY FOLDER ID IF PROVIDED
        if (folderId) {
            queueToProcess = localQueue.filter(item => item.tags && item.tags.includes(folderId));
        }

        if (queueToProcess.length === 0) return { items: [], mode: 'learning', sessionNumber: 1 };

        const dailyData = storage.getDailySessionData();
        const sessionNumber = dailyData.sessionCount + 1; // Next session number
        const now = Date.now();

        // Session 3+: Review-only mode (words learned today)
        if (sessionNumber > 2) {
            const todayWords = queueToProcess.filter((item: StudyQueueItem) =>
                dailyData.learnedTodayIds.includes(item.id)
            );
            return { items: todayWords, mode: 'review-only', sessionNumber };
        }

        // Session 1-2: Normal learning mode
        const MAIN_LIMIT = 40;      // Main words per session
        const OVERDUE_LIMIT = 40;   // Overdue words per session (added separately)

        const LEVEL_PRIORITY: Record<string, number> = {
            'Beruf': 100, 'B2': 90, 'B1': 80, 'A2': 70, 'A1': 60, 'A0': 50
        };

        // 1. Get overdue words (past due date) - these are EXTRA, not counted in main limit
        const overdueWords = queueToProcess
            .filter((item: StudyQueueItem) =>
                item.status !== 'new' && item.nextReviewNum < now
            )
            .sort((a, b) => (a.nextReviewNum || 0) - (b.nextReviewNum || 0))
            .slice(0, OVERDUE_LIMIT);

        // 2. Get words due TODAY (not overdue)
        const todayStart = new Date(now);
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date(now);
        todayEnd.setHours(23, 59, 59, 999);

        const dueTodayWords = queueToProcess
            .filter((item: StudyQueueItem) =>
                item.status !== 'new' &&
                item.nextReviewNum >= now &&
                item.nextReviewNum <= todayEnd.getTime()
            )
            .sort((a, b) => (a.nextReviewNum || 0) - (b.nextReviewNum || 0));

        // 3. Get new words
        const newWords = queueToProcess.filter((item: StudyQueueItem) => item.status === 'new');

        // Selection: Fill main limit with due-today + new, then add overdue at end
        const mainPool = [...dueTodayWords, ...newWords].slice(0, MAIN_LIMIT);

        // Final session: main pool + overdue (overdue at the END)
        const finalItems = [...mainPool, ...overdueWords];

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
        const MAX_ITEMS = MAIN_LIMIT + OVERDUE_LIMIT;

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
                        if (finalSelection.length >= MAX_ITEMS) break;
                    }
                }
                if (finalSelection.length >= MAX_ITEMS) break;
            }
            if (finalSelection.length >= MAX_ITEMS) break;
        }
        return { items: finalSelection, mode: 'learning' as SessionMode, sessionNumber };
    }, [localQueue]);

    const updateItemStatus = useCallback(async (wordId: string, result: 'success' | 'fail') => {
        const item = localQueue.find((i: any) => i.id === wordId);
        if (!item) return;

        let newStatus = item.status;
        let newMistakes = item.consecutiveMistakes;
        let nextInterval = item.interval || 0;
        let nextEase = item.easeFactor || 2.5;

        if (result === 'fail') {
            newMistakes++;
            newStatus = newMistakes >= 3 ? 'leech' : 'learning';
            nextInterval = 0; // Reset to 0 days for immediate re-learning
            nextEase = Math.max(1.3, nextEase - 0.2); // Decrease ease factor

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
                    mnemonic: item.mnemonic
                }
                : i
        );
        setLocalQueue(nextQueue);
        storage.setStudyQueue(nextQueue);
    }, [localQueue]);

    const stats = useMemo(() => {
        const now = Date.now();
        const dueCount = localQueue.filter((i: StudyQueueItem) => i.nextReviewNum <= now && i.status !== 'new').length;
        const overdueCount = localQueue.filter((i: StudyQueueItem) => i.nextReviewNum < now && i.status !== 'new').length;
        const newCount = localQueue.filter((i: StudyQueueItem) => i.status === 'new').length;
        const learningCount = localQueue.filter((i: StudyQueueItem) => i.status === 'learning' || i.status === 'leech').length;
        const reviewCount = localQueue.filter((i: StudyQueueItem) => i.status === 'review').length;

        // Dynamic limit: 40 on first day, 80 after
        const hasHistory = localQueue.some((i: StudyQueueItem) => i.status !== 'new');
        const dailyLimit = hasHistory ? 80 : 40;
        const availableTotal = Math.min(localQueue.length, dailyLimit);

        return {
            totalDue: dueCount,
            overdueCount,
            totalNew: newCount,
            totalLearning: learningCount,
            totalReview: reviewCount,
            totalLeeches: localQueue.filter((i: StudyQueueItem) => i.status === 'leech').length,
            totalAvailable: availableTotal,
            dailyLimit
        };
    }, [localQueue]);

    return useMemo(() => ({
        queue: localQueue,
        isLoading: !isInitialLoadDone,
        getDailySession,
        updateItemStatus,
        syncWithFolders,
        ...stats
    }), [localQueue, isInitialLoadDone, getDailySession, updateItemStatus, syncWithFolders, stats]);
}
