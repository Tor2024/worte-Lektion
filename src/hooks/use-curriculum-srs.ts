
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SM2State, INITIAL_SM2_STATE } from '@/lib/types';
import { updateSM2State } from '@/lib/sm2';
import { storage } from '@/lib/storage';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function useCurriculumSRS() {
    const [localSrsMap, setLocalSrsMap] = useState<Record<string, SM2State>>(storage.getSRS());
    const userId = "anonymous";

    // 1. Convex Hooks
    const cloudSrsRecords = useQuery(api.srs.get, { userId });
    const updateSrsMutation = useMutation(api.srs.update);

    // 2. Map Cloud data to Record<string, SM2State>
    const cloudSrsMap = useMemo(() => {
        if (!cloudSrsRecords) return null;
        const map: Record<string, SM2State> = {};
        cloudSrsRecords.forEach(r => {
            map[r.wordId] = {
                interval: r.interval,
                repetitions: r.repetitions,
                easeFactor: r.easeFactor,
                nextReviewDate: r.nextReviewDate ?? null,
                step: r.step
            };
        });
        return map;
    }, [cloudSrsRecords]);

    // 3. Sync Cloud -> Local
    useEffect(() => {
        if (cloudSrsMap) {
            const hasChanges = Object.keys(cloudSrsMap).some(
                wordId => JSON.stringify(cloudSrsMap[wordId]) !== JSON.stringify(localSrsMap[wordId])
            );
            if (hasChanges) {
                const mergedMap = { ...localSrsMap, ...cloudSrsMap };
                setLocalSrsMap(mergedMap);
                storage.setSRS(mergedMap);
            }
        }
    }, [cloudSrsMap]);

    const saveWordState = useCallback(async (germanWord: string, state: SM2State) => {
        // Update local state IMMEDIATELY
        const newMap = { ...localSrsMap, [germanWord]: state };
        setLocalSrsMap(newMap);
        storage.setSRS(newMap);

        // Sync to cloud
        try {
            await updateSrsMutation({
                userId,
                wordId: germanWord,
                ...state,
                nextReviewDate: state.nextReviewDate ?? undefined,
            });
        } catch (error) {
            console.error("Failed to sync SRS to cloud:", error);
        }
    }, [localSrsMap, updateSrsMutation]);

    const getWordState = useCallback((germanWord: string): SM2State => {
        return localSrsMap[germanWord] || INITIAL_SM2_STATE;
    }, [localSrsMap]);

    const updateWordSRS = useCallback((germanWord: string, quality: number) => {
        const currentState = getWordState(germanWord);
        const nextState = updateSM2State(quality, currentState);
        saveWordState(germanWord, nextState);
        return nextState;
    }, [getWordState, saveWordState]);

    return {
        srsMap: localSrsMap,
        isLoading: cloudSrsRecords === undefined,
        getWordState,
        updateWordSRS,
        saveWordState
    };
}
