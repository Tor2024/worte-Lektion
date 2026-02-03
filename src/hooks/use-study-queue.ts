'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '@/lib/storage';
import { StudyQueueItem } from '@/lib/types';
import { useCustomFolders } from './use-custom-folders';

export function useStudyQueue() {
    const [localQueue, setLocalQueue] = useState<StudyQueueItem[]>([]);
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
    const { folders } = useCustomFolders();

    // 1. Load initial queue from localStorage
    useEffect(() => {
        setLocalQueue(storage.getStudyQueue());
        setIsInitialLoadDone(true);
    }, []);

    // Sync with folders: Add new words to queue if not present
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

    // Auto-sync
    useEffect(() => {
        if (isInitialLoadDone && folders.length > 0) {
            syncWithFolders();
        }
    }, [folders, isInitialLoadDone, syncWithFolders]);

    const getDailySession = useCallback((limit: number = 20) => {
        if (localQueue.length === 0) return [];

        const LEVEL_PRIORITY: Record<string, number> = {
            'Beruf': 100,
            'B2': 90,
            'B1': 80,
            'A2': 70,
            'A1': 60,
            'A0': 50
        };

        const now = Date.now();

        // 1. Filter actionable items (due for review or entirely new)
        const actionableItems = localQueue.filter((item: StudyQueueItem) =>
            item.status === 'new' ||
            ((item.status === 'review' || item.status === 'leech') && item.nextReviewNum <= now)
        );

        // 2. Group items by level to preserve hierarchy
        const levelGroups: Record<number, StudyQueueItem[]> = {};
        actionableItems.forEach((item: any) => {
            const level = item.word?.level ? LEVEL_PRIORITY[item.word.level as keyof typeof LEVEL_PRIORITY] : 0;
            if (!levelGroups[level]) levelGroups[level] = [];
            levelGroups[level].push(item);
        });

        const sortedLevels = Object.keys(levelGroups).map(Number).sort((a, b) => b - a);
        const finalSelection: StudyQueueItem[] = [];

        // 3. Within each level, interleave types to ensure variety
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
        let nextDate = item.nextReviewNum;

        if (result === 'fail') {
            newMistakes++;
            if (newMistakes >= 3) newStatus = 'leech';
            else newStatus = 'learning';
            nextDate = Date.now() + (1000 * 60 * 60 * 24);
        } else {
            newMistakes = 0;
            if (item.status === 'new') newStatus = 'learning';
            else if (item.status === 'learning') newStatus = 'review';

            if (newStatus === 'review') {
                nextDate = Date.now() + (1000 * 60 * 60 * 24 * 3);
            } else {
                nextDate = Date.now() + (1000 * 60 * 60 * 24);
            }
        }

        const updatedItem = {
            ...item,
            status: newStatus,
            consecutiveMistakes: newMistakes,
            nextReviewNum: nextDate
        };

        const nextQueue = localQueue.map((i: StudyQueueItem) => i.id === wordId ? updatedItem : i);
        setLocalQueue(nextQueue);
        storage.setStudyQueue(nextQueue);
    }, [localQueue]);

    return {
        queue: localQueue,
        isLoading: !isInitialLoadDone,
        getDailySession,
        updateItemStatus,
        syncWithFolders,
        totalDue: localQueue.filter((i: StudyQueueItem) => i.nextReviewNum <= Date.now() && i.status !== 'new').length,
        totalNew: localQueue.filter((i: StudyQueueItem) => i.status === 'new').length,
        totalLeeches: localQueue.filter((i: StudyQueueItem) => i.status === 'leech').length
    };
}
