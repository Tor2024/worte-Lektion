
import { CustomFolder, SM2State, StudyQueueItem } from './types';

const KEYS = {
    PROGRESS: 'userProgress',
    SRS: 'deutsch-curriculum-srs-v1',
    CUSTOM_FOLDERS: 'deutsch-learning-custom-folders',
    STUDY_QUEUE: 'deutsch-learning-study-queue-v1',
    KNOWN_WORDS: 'knownWords',
    EXAM_TEXTS: 'custom_exam_texts',
    DAILY_SESSION: 'deutsch-daily-session-v1',
    SETTINGS: 'deutsch-app-settings-v1',
} as const;

export type ProgressData = { [key: string]: number };

export interface AppSettings {
    productionMode: 'full' | 'cloze' | 'skip';
}

const defaultSettings: AppSettings = {
    productionMode: 'full'
};


export const storage = {
    isCloudSyncEnabled: (): boolean => false,
    setCloudSyncEnabled: (enabled: boolean) => {
        // No-op in local-only mode
    },
    getProgress: (): ProgressData => {
        if (typeof window === 'undefined') return {};
        try {
            const item = window.localStorage.getItem(KEYS.PROGRESS);
            return item ? JSON.parse(item) : {};
        } catch (e) {
            return {};
        }
    },
    setProgress: (data: ProgressData) => {
        if (typeof window === 'undefined') return;
        try {
            const json = JSON.stringify(data);
            window.localStorage.setItem(KEYS.PROGRESS, json);
            window.dispatchEvent(new StorageEvent('storage', { key: KEYS.PROGRESS, newValue: json }));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },
    getSRS: (): Record<string, SM2State> => {
        if (typeof window === 'undefined') return {};
        try {
            const item = window.localStorage.getItem(KEYS.SRS);
            return item ? JSON.parse(item) : {};
        } catch (e) {
            return {};
        }
    },
    setSRS: (data: Record<string, SM2State>) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.SRS, JSON.stringify(data));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },
    getCustomFolders: (): CustomFolder[] => {
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem(KEYS.CUSTOM_FOLDERS);
            return item ? JSON.parse(item) : [];
        } catch (e) {
            return [];
        }
    },
    setCustomFolders: (data: CustomFolder[]) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.CUSTOM_FOLDERS, JSON.stringify(data));
            // Trigger storage event for cross-hook sync
            window.dispatchEvent(new StorageEvent('storage', { key: KEYS.CUSTOM_FOLDERS, newValue: JSON.stringify(data) }));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },
    getStudyQueue: (): StudyQueueItem[] => {
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem(KEYS.STUDY_QUEUE);
            return item ? JSON.parse(item) : [];
        } catch (e) {
            return [];
        }
    },
    setStudyQueue: (data: StudyQueueItem[]) => {
        if (typeof window === 'undefined') return;
        try {
            const json = JSON.stringify(data);
            window.localStorage.setItem(KEYS.STUDY_QUEUE, json);
            window.dispatchEvent(new StorageEvent('storage', { key: KEYS.STUDY_QUEUE, newValue: json }));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },
    getKnownWords: (): string[] => {
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem(KEYS.KNOWN_WORDS);
            return item ? JSON.parse(item) : [];
        } catch (e) {
            return [];
        }
    },
    setKnownWords: (words: string[]) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.KNOWN_WORDS, JSON.stringify(words));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },
    getExamTexts: (): any[] => {
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem(KEYS.EXAM_TEXTS);
            return item ? JSON.parse(item) : [];
        } catch (e) {
            return [];
        }
    },
    setExamTexts: (texts: any[]) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.EXAM_TEXTS, JSON.stringify(texts));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },
    getSettings: (): AppSettings => {
        if (typeof window === 'undefined') return defaultSettings;
        try {
            const item = window.localStorage.getItem(KEYS.SETTINGS);
            if (item) {
                const parsed = JSON.parse(item);
                // Migration from old setting
                if (parsed.skipProductionPhase === true) {
                    parsed.productionMode = 'skip';
                } else if (parsed.skipProductionPhase === false && !parsed.productionMode) {
                    parsed.productionMode = 'full';
                }
                return { ...defaultSettings, ...parsed };
            }
            return defaultSettings;
        } catch (e) {
            return defaultSettings;
        }
    },
    setSettings: (settings: AppSettings) => {
        if (typeof window === 'undefined') return;
        try {
            const json = JSON.stringify(settings);
            window.localStorage.setItem(KEYS.SETTINGS, json);
            window.dispatchEvent(new StorageEvent('storage', { key: KEYS.SETTINGS, newValue: json }));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },

    // Daily session tracking (reset at 4:00 AM)
    getDailySessionData: (): DailySessionData => {
        if (typeof window === 'undefined') return getDefaultDailySession();
        try {
            const item = window.localStorage.getItem(KEYS.DAILY_SESSION);
            if (!item) return getDefaultDailySession();

            const data = JSON.parse(item) as DailySessionData;

            // Check if we need to reset (new day after 4:00 AM)
            if (shouldResetDailySession(data.lastSessionDate)) {
                return getDefaultDailySession();
            }

            return data;
        } catch (e) {
            return getDefaultDailySession();
        }
    },

    setDailySessionData: (data: DailySessionData) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.DAILY_SESSION, JSON.stringify(data));
        } catch (e) {
            console.warn('LS Write Error', e);
        }
    },

    // Increment session count and save learned words
    incrementSession: (learnedWordIds: string[]): DailySessionData => {
        const current = storage.getDailySessionData();
        const updated: DailySessionData = {
            lastSessionDate: Date.now(),
            sessionCount: current.sessionCount + 1,
            learnedTodayIds: [...new Set([...current.learnedTodayIds, ...learnedWordIds])]
        };
        storage.setDailySessionData(updated);
        return updated;
    },

    // Reset everything but folders/words themselves
    resetAllProgress: () => {
        if (typeof window === 'undefined') return;

        // 1. Clear Simple Keys
        window.localStorage.removeItem(KEYS.PROGRESS);
        window.localStorage.removeItem(KEYS.SRS);
        window.localStorage.removeItem(KEYS.STUDY_QUEUE);
        window.localStorage.removeItem(KEYS.KNOWN_WORDS);
        window.localStorage.removeItem(KEYS.DAILY_SESSION);

        // 2. Reset Multi-Folder Data (preserves folders but resets word state)
        const folders = storage.getCustomFolders();
        const resetFolders = folders.map(folder => ({
            ...folder,
            updatedAt: Date.now(),
            words: (folder.words || []).map(word => ({
                ...word,
                sm2State: {
                    interval: 0,
                    repetitions: 0,
                    easeFactor: 2.5,
                    nextReviewDate: null,
                },
                deepDiveStage: 0
            }))
        }));
        storage.setCustomFolders(resetFolders);

        // 3. Trigger reload for hooks to pick up changes
        window.location.reload();
    },

    // Data Management
    exportData: () => {
        if (typeof window === 'undefined') return;
        const data: Record<string, any> = {};
        for (const [keyName, keyValue] of Object.entries(KEYS)) {
            const item = window.localStorage.getItem(keyValue);
            if (item) {
                try {
                    data[keyValue] = JSON.parse(item);
                } catch {
                    // Ignore parsing errors for individual keys
                }
            }
        }

        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const date = new Date().toISOString().split('T')[0];
        a.download = `deutsch-backup-${date}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    },

    importData: async (file: File): Promise<boolean> => {
        if (typeof window === 'undefined') return false;
        try {
            const text = await file.text();
            const data = JSON.parse(text);

            // Validate that we have at least one recognized key before importing
            const validKeys = Object.values(KEYS);
            const importedKeys = Object.keys(data);
            const hasValidKeys = importedKeys.some(key => validKeys.includes(key as any));

            if (!hasValidKeys) {
                return false;
            }

            // Restore data
            for (const [key, value] of Object.entries(data)) {
                if (validKeys.includes(key as any)) {
                    window.localStorage.setItem(key, JSON.stringify(value));
                }
            }

            // Reload to apply
            window.location.reload();
            return true;
        } catch (error) {
            console.error("Failed to import data", error);
            return false;
        }
    }
};

// Types and helpers for daily session
export interface DailySessionData {
    lastSessionDate: number;      // Timestamp of last session
    sessionCount: number;         // Sessions completed today (max meaningful: 2)
    learnedTodayIds: string[];    // Word IDs learned today (for review-only mode)
}

function getDefaultDailySession(): DailySessionData {
    return {
        lastSessionDate: 0,
        sessionCount: 0,
        learnedTodayIds: []
    };
}

// Check if we should reset daily session (after 4:00 AM)
function shouldResetDailySession(lastSessionDate: number): boolean {
    if (lastSessionDate === 0) return false;

    const now = new Date();
    const last = new Date(lastSessionDate);

    // Get today's 4:00 AM
    const todayReset = new Date(now);
    todayReset.setHours(4, 0, 0, 0);

    // If current time is before 4:00 AM, use yesterday's 4:00 AM as reset point
    if (now < todayReset) {
        todayReset.setDate(todayReset.getDate() - 1);
    }

    // Reset if last session was before the reset point
    return last < todayReset;
}
