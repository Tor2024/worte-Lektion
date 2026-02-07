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

    const getDailySession = useCallback((limit: number = 20) => {
        if (localQueue.length === 0) return [];

        const LEVEL_PRIORITY: Record<string, number> = {
            'Beruf': 100, 'B2': 90, 'B1': 80, 'A2': 70, 'A1': 60, 'A0': 50
        };

        const now = Date.now();

        // 1. Get Due Reviews (Review or Leech status)
        const dueReviews = localQueue.filter((item: StudyQueueItem) =>
            (item.status === 'review' || item.status === 'leech') && item.nextReviewNum <= now
        );

        // 2. Get Learning items (already started, but not yet graduated to review)
        const learningItems = localQueue.filter((item: StudyQueueItem) =>
            item.status === 'learning'
        );

        // 3. Get New words
        const newWords = localQueue.filter((item: StudyQueueItem) =>
            item.status === 'new'
        );

        // Combine for selection: Prioritize Reviews > Learning > New (limited)
        const NEW_WORD_LIMIT = 5;
        const selectedNew = newWords.slice(0, NEW_WORD_LIMIT);

        // Final pool of candidates for this session
        const actionableItems = [...dueReviews, ...learningItems, ...selectedNew];

        if (actionableItems.length === 0) return [];

        const levelGroups: Record<number, StudyQueueItem[]> = {};
        actionableItems.forEach((item: any) => {
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
                        if (finalSelection.length >= limit) break;
                    }
                }
                if (finalSelection.length >= limit) break;
            }
            if (finalSelection.length >= limit) break;
        }
        return finalSelection;
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
                // Success calculations (SM2 based)
                if (nextInterval === 0) nextInterval = 1;
                else if (nextInterval === 1) nextInterval = 3;
                else nextInterval = Math.ceil(nextInterval * nextEase);
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

    const stats = useMemo(() => ({
        totalDue: localQueue.filter((i: StudyQueueItem) => i.nextReviewNum <= Date.now() && i.status !== 'new').length,
        totalNew: localQueue.filter((i: StudyQueueItem) => i.status === 'new').length,
        totalLeeches: localQueue.filter((i: StudyQueueItem) => i.status === 'leech').length
    }), [localQueue]);

    return useMemo(() => ({
        queue: localQueue,
        isLoading: !isInitialLoadDone,
        getDailySession,
        updateItemStatus,
        syncWithFolders,
        ...stats
    }), [localQueue, isInitialLoadDone, getDailySession, updateItemStatus, syncWithFolders, stats]);
}
