'use client';

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { storage } from '@/lib/storage';
import { curriculum as staticCurriculum } from '@/lib/data';

export function useCurriculumData() {
    const [syncEnabled, setSyncEnabled] = useState(false);

    useEffect(() => {
        setSyncEnabled(storage.isCloudSyncEnabled());
    }, []);

    const cloudLevels = useQuery(api.curriculum.getLevels, syncEnabled ? undefined : "skip");
    const cloudAllTopics = useQuery(api.curriculum.getAllTopics, syncEnabled ? undefined : "skip");

    const levels = syncEnabled && cloudLevels !== undefined ? cloudLevels : staticCurriculum.levels;
    const allTopics = syncEnabled && cloudAllTopics !== undefined
        ? cloudAllTopics
        : staticCurriculum.levels.flatMap(l => l.topics);

    return {
        levels,
        allTopics,
        isLoading: syncEnabled && (cloudLevels === undefined || cloudAllTopics === undefined),
        syncEnabled
    };
}

export function useLevelData(levelId: string) {
    const [syncEnabled, setSyncEnabled] = useState(false);

    useEffect(() => {
        setSyncEnabled(storage.isCloudSyncEnabled());
    }, []);

    const cloudLevelResult = useQuery(api.curriculum.getLevel, syncEnabled ? { levelId } : "skip");
    const cloudTopicsResult = useQuery(api.curriculum.getTopics, syncEnabled ? { levelId } : "skip");

    const staticLevel = staticCurriculum.levels.find(l => l.id === levelId);
    const staticTopics = staticLevel?.topics || [];

    const level = syncEnabled && cloudLevelResult !== undefined ? cloudLevelResult : staticLevel;
    const topics = syncEnabled && cloudTopicsResult !== undefined ? cloudTopicsResult : staticTopics;

    return {
        level,
        topics,
        isLoading: syncEnabled && (cloudLevelResult === undefined || cloudTopicsResult === undefined),
        syncEnabled
    };
}

export function useTopicData(levelId: string, topicId: string) {
    const [syncEnabled, setSyncEnabled] = useState(false);

    useEffect(() => {
        setSyncEnabled(storage.isCloudSyncEnabled());
    }, []);

    const cloudLevelResult = useQuery(api.curriculum.getLevel, syncEnabled ? { levelId } : "skip");
    const cloudTopicResult = useQuery(api.curriculum.getTopic, syncEnabled ? { levelId, topicId } : "skip");

    const staticLevel = staticCurriculum.levels.find(l => l.id === levelId);
    const staticTopic = staticLevel?.topics.find(t => t.id === topicId);

    const level = syncEnabled && cloudLevelResult !== undefined ? cloudLevelResult : staticLevel;
    const topic = syncEnabled && cloudTopicResult !== undefined ? cloudTopicResult : staticTopic;

    return {
        level,
        topic,
        isLoading: syncEnabled && (cloudLevelResult === undefined || cloudTopicResult === undefined),
        syncEnabled
    };
}
