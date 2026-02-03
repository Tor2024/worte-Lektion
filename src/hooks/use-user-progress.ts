
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage, ProgressData } from '@/lib/storage';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

// In-memory cache to sync across hook instances
let progressState: ProgressData = storage.getProgress();
const listeners = new Set<(progress: ProgressData) => void>();

const emitChange = (newProgress: ProgressData) => {
    progressState = newProgress;
    storage.setProgress(newProgress);
    listeners.forEach(listener => listener(progressState));
};

export function useUserProgress(initialTopicId?: string) {
    const [localProgress, setLocalProgress] = useState<ProgressData>(progressState);
    const syncEnabled = storage.isCloudSyncEnabled();
    const userId = "anonymous"; // Future-proof for auth

    // 1. Fetch from Convex (only if sync is enabled)
    const cloudProgressRecords = useQuery(
        syncEnabled ? api.progress.get : (null as any),
        { userId }
    );
    const updateProgressMutation = useMutation(api.progress.update);

    // 2. Map cloud records to ProgressData object
    const cloudProgress = useMemo(() => {
        if (!cloudProgressRecords) return null;
        const data: ProgressData = {};
        cloudProgressRecords.forEach((r: any) => {
            data[r.topicId] = r.proficiency;
        });
        return data;
    }, [cloudProgressRecords]);

    // 3. Sync Cloud -> Local if cloud is newer/more complete
    useEffect(() => {
        if (cloudProgress) {
            const hasChanges = Object.keys(cloudProgress).some(
                key => cloudProgress[key] !== progressState[key]
            );
            if (hasChanges) {
                const mergedProgress = { ...progressState, ...cloudProgress };
                emitChange(mergedProgress);
            }
        }
    }, [cloudProgress]);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'userProgress' && event.newValue) {
                try {
                    const newProgress = JSON.parse(event.newValue);
                    progressState = newProgress;
                    setLocalProgress(newProgress);
                } catch (e) {
                    console.error("Failed to parse progress from storage", e);
                }
            }
        };

        const handleInternalChange = (newProgress: ProgressData) => {
            setLocalProgress(newProgress);
        }

        listeners.add(handleInternalChange);
        window.addEventListener('storage', handleStorageChange);

        return () => {
            listeners.delete(handleInternalChange);
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const setTopicProficiency = useCallback(async (proficiency: number, topicIdToUpdate?: string) => {
        const id = topicIdToUpdate || initialTopicId;
        if (!id) return;

        const newProficiency = Math.max(0, Math.min(100, proficiency));

        // Update local state IMMEDIATELY for UI feedback
        if (progressState[id] !== newProficiency) {
            const newProgress = { ...progressState, [id]: newProficiency };
            emitChange(newProgress);

            // Sync to cloud (only if enabled)
            if (syncEnabled) {
                try {
                    await updateProgressMutation({
                        userId,
                        topicId: id,
                        proficiency: newProficiency
                    });
                } catch (error) {
                    console.error("Cloud progress sync failed:", error);
                }
            }
        }
    }, [initialTopicId, updateProgressMutation]);

    const getTopicProficiency = useCallback((id: string) => {
        return localProgress[id] || 0;
    }, [localProgress]);

    const proficiency = initialTopicId ? getTopicProficiency(initialTopicId) : 0;

    return { progress: localProgress, proficiency, setTopicProficiency, getTopicProficiency };
}

