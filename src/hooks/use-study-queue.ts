
import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '@/lib/storage';
import { StudyQueueItem, VocabularyWord } from '@/lib/types';
import { useCustomFolders } from './use-custom-folders';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function useStudyQueue() {
    const userId = "anonymous";
    const [localQueue, setLocalQueue] = useState<StudyQueueItem[]>([]);
    const { folders } = useCustomFolders();

    // 1. Convex Hooks
    const cloudQueueRaw = useQuery(api.studyQueue.getStudyQueue, { userId });
    const setQueueMutation = useMutation(api.studyQueue.setStudyQueue);
    const updateStatusMutation = useMutation(api.studyQueue.updateItemStatus);

    // 2. Load initial queue from localStorage
    useEffect(() => {
        const savedQueue = storage.getStudyQueue();
        setLocalQueue(savedQueue);
    }, []);

    // 3. Map Cloud Data
    const queue = useMemo(() => {
        if (!cloudQueueRaw) return localQueue;
        return cloudQueueRaw.map((item: any) => item.details as StudyQueueItem);
    }, [cloudQueueRaw, localQueue]);

    // 4. Sync Cloud -> Local
    useEffect(() => {
        if (cloudQueueRaw) {
            const mapped = cloudQueueRaw.map((item: any) => item.details as StudyQueueItem);
            storage.setStudyQueue(mapped);
        }
    }, [cloudQueueRaw]);

    // Sync with folders: Add new words to queue if not present
    const syncWithFolders = useCallback(async () => {
        if (folders.length === 0) return;

        const newItems: StudyQueueItem[] = [];
        const existingIds = new Set(queue.map((item: StudyQueueItem) => item.id));
        let hasChanges = false;

        folders.forEach(folder => {
            const folderWords = folder.words || [];
            folderWords.forEach(userWord => {
                const german = userWord?.word?.german;
                const wordId = german || userWord.id || `unknown-${Math.random()}`;

                if (!existingIds.has(wordId)) {
                    newItems.push({
                        id: wordId,
                        word: userWord.word || { german: '?', russian: '?', type: 'other' },
                        status: 'new',
                        currentStage: 'priming',
                        nextReviewNum: Date.now(),
                        tags: [folder.id],
                        consecutiveMistakes: 0
                    });
                    hasChanges = true;
                }
            });
        });

        if (hasChanges) {
            const updatedQueue = [...queue, ...newItems];
            setLocalQueue(updatedQueue);
            storage.setStudyQueue(updatedQueue);
            // Upload to cloud
            try {
                await setQueueMutation({ userId, items: updatedQueue });
            } catch (e) {
                console.error("Cloud queue sync failed", e);
            }
        }
    }, [folders, queue, setQueueMutation]);

    // Auto-sync
    useEffect(() => {
        if (cloudQueueRaw !== undefined && folders.length > 0) {
            syncWithFolders();
        }
    }, [folders, cloudQueueRaw, syncWithFolders]);


    const getDailySession = useCallback((limit: number = 20) => {
        if (queue.length === 0) return [];

        const LEVEL_PRIORITY: Record<string, number> = {
            'Beruf': 100,
            'B2': 90,
            'B1': 80,
            'A2': 70,
            'A1': 60,
            'A0': 50
        };

        const now = Date.now();

        const actionableItems = queue.filter((item: StudyQueueItem) =>
            item.status === 'new' ||
            ((item.status === 'review' || item.status === 'leech') && item.nextReviewNum <= now)
        );

        const sortedItems = [...actionableItems].sort((a, b) => {
            const wordA = a.word || {};
            const wordB = b.word || {};
            const priorityA = (wordA.level ? LEVEL_PRIORITY[wordA.level as keyof typeof LEVEL_PRIORITY] : 0) + (wordA.type === 'verb' ? 5 : 0);
            const priorityB = (wordB.level ? LEVEL_PRIORITY[wordB.level as keyof typeof LEVEL_PRIORITY] : 0) + (wordB.type === 'verb' ? 5 : 0);

            if (priorityA !== priorityB) return priorityB - priorityA;
            return 0.5 - Math.random();
        });

        return sortedItems.slice(0, limit);
    }, [queue]);

    const updateItemStatus = useCallback(async (wordId: string, result: 'success' | 'fail') => {
        const item = queue.find(i => i.id === wordId);
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

        // UI Optimistic update
        setLocalQueue(prev => prev.map((i: StudyQueueItem) => i.id === wordId ? updatedItem : i));

        try {
            await updateStatusMutation({
                userId,
                itemId: wordId,
                status: newStatus,
                nextReviewNum: nextDate,
                details: updatedItem
            });
        } catch (e) {
            console.error("Failed to update item status in cloud", e);
        }
    }, [queue, updateStatusMutation]);

    return {
        queue,
        isLoading: cloudQueueRaw === undefined,
        getDailySession,
        updateItemStatus,
        syncWithFolders,
        totalDue: queue.filter((i: StudyQueueItem) => i.nextReviewNum <= Date.now() && i.status !== 'new').length,
        totalNew: queue.filter((i: StudyQueueItem) => i.status === 'new').length,
        totalLeeches: queue.filter((i: StudyQueueItem) => i.status === 'leech').length
    };
}
