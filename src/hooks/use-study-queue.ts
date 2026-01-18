
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
                folder.words.forEach(userWord => {
                    // Use german word as unique ID
                    const wordId = userWord.word.german;

                    if (!existingIds.has(wordId)) {
                        // New word found! Add to queue
                        newQueue.push({
                            id: wordId,
                            word: userWord.word,
                            status: 'new',
                            currentStage: 'priming',
                            nextReviewNum: Date.now(), // Due immediately
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
    const getDailySession = useCallback((limit: number = 25) => {
        if (queue.length === 0) return [];

        const now = Date.now();

        // 1. Find Reviews (Review Due < Now)
        const dueReviews = queue.filter(item =>
            (item.status === 'review' || item.status === 'leech') &&
            item.nextReviewNum <= now
        );

        // 2. Find New Words (prioritizing Verbs)
        const newWords = queue
            .filter(item => item.status === 'new')
            .sort((a, b) => {
                // Verb priority logic
                const aScore = a.word.type === 'verb' ? 10 : 1;
                const bScore = b.word.type === 'verb' ? 10 : 1;
                return bScore - aScore; // Highest score first
            });

        // 3. Mix them
        // Ideally: All reviews + fill the rest with new words
        const sessionItems = [...dueReviews];
        const remainingSlots = limit - sessionItems.length;

        if (remainingSlots > 0) {
            sessionItems.push(...newWords.slice(0, remainingSlots));
        }

        return sessionItems;
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
