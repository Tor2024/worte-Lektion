'use client';

import { useState, useEffect, useMemo } from 'react';
import { curriculum as staticCurriculum } from '@/lib/data';

export function useCurriculumData() {
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setIsInitialLoadDone(true);
    }, []);

    const levels = staticCurriculum.levels;
    const allTopics = useMemo(() => {
        return staticCurriculum.levels.flatMap(l => l.topics.map(t => ({ ...t, levelId: l.id })));
    }, []);

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

    const staticLevel = useMemo(() => staticCurriculum.levels.find(l => l.id === levelId), [levelId]);
    const staticTopics = useMemo(() => {
        const topics = staticLevel?.topics || [];
        return topics.map(t => ({ ...t, levelId }));
    }, [staticLevel, levelId]);

    return {
        level: staticLevel,
        topics: staticTopics,
        isLoading: !isInitialLoadDone,
        syncEnabled: false
    };
}

export function useTopicData(levelId: string, topicId: string) {
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setIsInitialLoadDone(true);
    }, []);

    const staticLevel = useMemo(() => staticCurriculum.levels.find(l => l.id === levelId), [levelId]);
    const staticTopic = useMemo(() => {
        const topic = staticLevel?.topics.find(t => t.id === topicId);
        return topic ? { ...topic, levelId } : undefined;
    }, [staticLevel, topicId, levelId]);

    return {
        level: staticLevel,
        topic: staticTopic,
        isLoading: !isInitialLoadDone,
        syncEnabled: false
    };
}
