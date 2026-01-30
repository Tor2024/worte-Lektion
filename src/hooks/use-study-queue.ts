
'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';
import { StudyQueueItem, VocabularyWord } from '@/lib/types';
import { useCustomFolders } from './use-custom-folders';

export function useStudyQueue() {
    const [queue, setQueue] = useState<StudyQueueItem[]>([]);
    const { folders } = useCustomFolders();
    const [isLoading, setIsLoading] = useState(true);

    // Load initial queue
    useEffect(() => {
        const savedQueue = storage.getStudyQueue();
        setQueue(savedQueue);
        setIsLoading(false);
    }, []);

    // Save changes
    useEffect(() => {
        if (!isLoading) {
            storage.setStudyQueue(queue);
        }
    }, [queue, isLoading]);

    // Sync with folders: Add new words to queue if not present
    const syncWithFolders = useCallback(() => {
        if (folders.length === 0) return;

        setQueue(currentQueue => {
            const newQueue = [...currentQueue];
            let hasChanges = false;
            const existingIds = new Set(newQueue.map(item => item.id));

            folders.forEach(folder => {
                const folderWords = folder.words || [];
                folderWords.forEach(userWord => {
                    // Use german word as unique ID, or fallback to word ID if german is missing
                    const german = userWord?.word?.german;
                    const wordId = german || userWord.id || `unknown-${Math.random()}`;

                    if (!existingIds.has(wordId)) {
                        newQueue.push({
                            id: wordId,
                            word: userWord.word || { german: '?', russian: '?', type: 'other' },
                            status: 'new',
                            currentStage: 'priming',
                            nextReviewNum: Date.now(),
                            tags: [folder.id],
                            consecutiveMistakes: 0
                        });
                        existingIds.add(wordId);
                        hasChanges = true;
                    }
                });
            });

            return hasChanges ? newQueue : currentQueue;
        });
    }, [folders]);

    // Auto-sync periodically or on mount
    useEffect(() => {
        if (!isLoading && folders.length > 0) {
            syncWithFolders();
        }
    }, [folders, isLoading, syncWithFolders]);


    // THE CORE ALGORITHM: Generator for Daily Session
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

        // 1. All actionable items (Due or New)
        const actionableItems = queue.filter(item =>
            item.status === 'new' ||
            ((item.status === 'review' || item.status === 'leech') && item.nextReviewNum <= now)
        );

        // 2. Sort by Level Priority, then word type (verbs higher), then just mix
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

    const updateItemStatus = useCallback((wordId: string, result: 'success' | 'fail') => {
        setQueue(prev => prev.map(item => {
            if (item.id !== wordId) return item;

            // Logic for status transition
            let newStatus = item.status;
            let newMistakes = item.consecutiveMistakes;
            let nextDate = item.nextReviewNum;

            if (result === 'fail') {
                newMistakes++;
                // If failed > 3 times, mark as leech
                if (newMistakes >= 3) newStatus = 'leech';
                else newStatus = 'learning'; // Reset to learning

                nextDate = Date.now() + (1000 * 60 * 60 * 24); // Review tomorrow
            } else {
                newMistakes = 0;
                // Graduation logic
                if (item.status === 'new') newStatus = 'learning';
                else if (item.status === 'learning') newStatus = 'review';

                // Simple Interval increase (placeholder for full SM2)
                // If it's already review, push it out further
                if (newStatus === 'review') {
                    nextDate = Date.now() + (1000 * 60 * 60 * 24 * 3); // +3 days base
                } else {
                    nextDate = Date.now() + (1000 * 60 * 60 * 24); // +1 day
                }
            }

            return {
                ...item,
                status: newStatus,
                consecutiveMistakes: newMistakes,
                nextReviewNum: nextDate
            };
        }));
    }, []);

    return {
        queue,
        isLoading,
        getDailySession,
        updateItemStatus,
        syncWithFolders,
        totalDue: queue.filter(i => i.nextReviewNum <= Date.now() && i.status !== 'new').length,
        totalNew: queue.filter(i => i.status === 'new').length,
        totalLeeches: queue.filter(i => i.status === 'leech').length
    };
}
