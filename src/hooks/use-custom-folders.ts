import { useState, useEffect, useCallback } from 'react';
import { CustomFolder, UserVocabularyWord } from '@/lib/types';
import { storage } from '@/lib/storage';

export function useCustomFolders() {
    const [localFolders, setLocalFolders] = useState<CustomFolder[]>([]);
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setLocalFolders(storage.getCustomFolders());
        setIsInitialLoadDone(true);
    }, []);

    const createFolder = useCallback(async (name: string) => {
        const newFolder: CustomFolder = {
            id: Math.random().toString(36).substr(2, 9),
            name,
            words: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
        };
        const nextFolders = [...localFolders, newFolder];
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
        return newFolder.id;
    }, [localFolders]);

    const deleteFolder = useCallback(async (id: string) => {
        const nextFolders = localFolders.filter(f => f.id !== id);
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, [localFolders]);

    const getFolder = useCallback((id: string) => {
        return localFolders.find(f => f.id === id);
    }, [localFolders]);

    const addWordToFolder = useCallback(async (folderId: string, userWord: UserVocabularyWord) => {
        const nextFolders = localFolders.map(f => {
            if (f.id === folderId) {
                return {
                    ...f,
                    words: [userWord, ...f.words]
                };
            }
            return f;
        });
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, [localFolders]);

    const updateWordInFolder = useCallback(async (folderId: string, updatedWord: UserVocabularyWord) => {
        const nextFolders = localFolders.map(f => {
            if (f.id === folderId) {
                return {
                    ...f,
                    words: f.words.map(w => w.id === updatedWord.id ? updatedWord : w)
                };
            }
            return f;
        });
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, [localFolders]);

    const removeWordFromFolder = useCallback(async (folderId: string, wordId: string) => {
        const nextFolders = localFolders.map(f => {
            if (f.id === folderId) {
                return {
                    ...f,
                    words: f.words.filter(w => w.id !== wordId)
                };
            }
            return f;
        });
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, [localFolders]);

    return {
        folders: localFolders,
        isLoading: !isInitialLoadDone,
        createFolder,
        deleteFolder,
        getFolder,
        addWordToFolder,
        updateWordInFolder,
        removeWordFromFolder
    };
}
