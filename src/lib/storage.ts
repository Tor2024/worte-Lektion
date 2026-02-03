
import { CustomFolder, SM2State, StudyQueueItem } from './types';

const KEYS = {
    PROGRESS: 'userProgress',
    SRS: 'deutsch-curriculum-srs-v1',
    CUSTOM_FOLDERS: 'deutsch-learning-custom-folders',
    STUDY_QUEUE: 'deutsch-learning-study-queue-v1',
} as const;

export type ProgressData = { [key: string]: number };

export const storage = {
    isCloudSyncEnabled: (): boolean => {
        if (typeof window === 'undefined') return false;
        const hasConvex = !!process.env.NEXT_PUBLIC_CONVEX_URL;
        return hasConvex && window.localStorage.getItem('isCloudSyncEnabled') === 'true';
    },
    setCloudSyncEnabled: (enabled: boolean) => {
        if (typeof window === 'undefined') return;
        window.localStorage.setItem('isCloudSyncEnabled', String(enabled));
        window.location.reload(); // Refresh to apply changes globally
    },
    getProgress: (): ProgressData => {
        if (typeof window === 'undefined') return {};
        try {
            const item = window.localStorage.getItem(KEYS.PROGRESS);
            return item ? JSON.parse(item) : {};
        } catch (e) {
            console.warn('LS Read Error (Progress)', e);
            return {};
        }
    },
    setProgress: (data: ProgressData) => {
        if (typeof window === 'undefined') return;
        try {
            const json = JSON.stringify(data);
            window.localStorage.setItem(KEYS.PROGRESS, json);
            // Explicit event for same-tab updates if needed, mostly for cross-tab though
            window.dispatchEvent(new StorageEvent('storage', { key: KEYS.PROGRESS, newValue: json }));
        } catch (e) {
            console.warn('LS Write Error (Progress)', e);
        }
    },

    getSRS: (): Record<string, SM2State> => {
        if (typeof window === 'undefined') return {};
        try {
            const item = window.localStorage.getItem(KEYS.SRS);
            return item ? JSON.parse(item) : {};
        } catch (e) {
            console.warn('LS Read Error (SRS)', e);
            return {};
        }
    },
    setSRS: (data: Record<string, SM2State>) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.SRS, JSON.stringify(data));
        } catch (e) {
            console.warn('LS Write Error (SRS)', e);
        }
    },

    getCustomFolders: (): CustomFolder[] => {
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem(KEYS.CUSTOM_FOLDERS);
            return item ? JSON.parse(item) : [];
        } catch (e) {
            console.warn('LS Read Error (Folders)', e);
            return [];
        }
    },
    setCustomFolders: (data: CustomFolder[]) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.CUSTOM_FOLDERS, JSON.stringify(data));
        } catch (e) {
            console.warn('LS Write Error (Folders)', e);
        }
    },

    getStudyQueue: (): StudyQueueItem[] => {
        if (typeof window === 'undefined') return [];
        try {
            const item = window.localStorage.getItem(KEYS.STUDY_QUEUE);
            return item ? JSON.parse(item) : [];
        } catch (e) {
            console.warn('LS Read Error (Queue)', e);
            return [];
        }
    },
    setStudyQueue: (data: StudyQueueItem[]) => {
        if (typeof window === 'undefined') return;
        try {
            window.localStorage.setItem(KEYS.STUDY_QUEUE, JSON.stringify(data));
        } catch (e) {
            console.warn('LS Write Error (Queue)', e);
        }
    }
};
