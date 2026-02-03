'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { SM2State, INITIAL_SM2_STATE } from '@/lib/types';
import { updateSM2State } from '@/lib/sm2';
import { storage } from '@/lib/storage';

export function useCurriculumSRS() {
    const [localSrsMap, setLocalSrsMap] = useState<Record<string, SM2State>>({});
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setLocalSrsMap(storage.getSRS());
        setIsInitialLoadDone(true);
    }, []);

    const saveWordState = useCallback(async (germanWord: string, state: SM2State) => {
        setLocalSrsMap(prev => {
            const next = { ...prev, [germanWord]: state };
            storage.setSRS(next);
            return next;
        });
    }, []);

    const getWordState = useCallback((germanWord: string): SM2State => {
        return localSrsMap[germanWord] || INITIAL_SM2_STATE;
    }, [localSrsMap]);

    const updateWordSRS = useCallback((germanWord: string, quality: number) => {
        const currentState = getWordState(germanWord);
        const nextState = updateSM2State(quality, currentState);
        saveWordState(germanWord, nextState);
        return nextState;
    }, [getWordState, saveWordState]);

    return useMemo(() => ({
        srsMap: localSrsMap,
        isLoading: !isInitialLoadDone,
        getWordState,
        updateWordSRS,
        saveWordState
    }), [localSrsMap, isInitialLoadDone, getWordState, updateWordSRS, saveWordState]);
}
