'use client';

import { useState, useEffect } from 'react';
import { curriculum as staticCurriculum } from '@/lib/data';

export function useCurriculumData() {
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setIsInitialLoadDone(true);
    }, []);

    const levels = staticCurriculum.levels;
    const allTopics = staticCurriculum.levels.flatMap(l => l.topics.map(t => ({ ...t, levelId: l.id })));

    return {
        levels,
        allTopics,
        isLoading: !isInitialLoadDone,
        syncEnabled: false
    };
}

export function useLevelData(levelId: string) {
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setIsInitialLoadDone(true);
    }, []);

    const staticLevel = staticCurriculum.levels.find(l => l.id === levelId);
    const staticTopics = staticLevel?.topics || [];

    return {
        level: staticLevel,
        topics: staticTopics.map(t => ({ ...t, levelId })),
        isLoading: !isInitialLoadDone,
        syncEnabled: false
    };
}

export function useTopicData(levelId: string, topicId: string) {
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setIsInitialLoadDone(true);
    }, []);

    const staticLevel = staticCurriculum.levels.find(l => l.id === levelId);
    const staticTopic = staticLevel?.topics.find(t => t.id === topicId);

    return {
        level: staticLevel,
        topic: staticTopic ? { ...staticTopic, levelId } : undefined,
        isLoading: !isInitialLoadDone,
        syncEnabled: false
    };
}
