'use client';

import { useState, useEffect, useCallback } from 'react';
import { CustomFolder, UserVocabularyWord } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '@/lib/storage';

export function useCustomFolders() {
    const [folders, setFolders] = useState<CustomFolder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initial load from localStorage
    useEffect(() => {
        setFolders(storage.getCustomFolders());
        setIsLoading(false);
    }, []);

    const saveFolders = useCallback((newFolders: CustomFolder[]) => {
        setFolders(newFolders);
        storage.setCustomFolders(newFolders);
    }, []);

    const createFolder = useCallback(async (name: string) => {
        const id = uuidv4();
        const newFolder: CustomFolder = {
            id,
            name,
            words: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        // Optimistic update
        const currentFolders = storage.getCustomFolders();
        const newFolders = [...currentFolders, newFolder];
        saveFolders(newFolders);
        return id;
    }, [saveFolders]);

    const deleteFolder = useCallback(async (id: string) => {
        const currentFolders = storage.getCustomFolders();
        const newFolders = currentFolders.filter(f => f.id !== id);
        saveFolders(newFolders);
    }, [saveFolders]);

    const getFolder = useCallback((id: string) => {
        return folders.find(f => f.id === id);
    }, [folders]);

    const addWordToFolder = useCallback(async (folderId: string, userWord: UserVocabularyWord) => {
        const currentFolders = storage.getCustomFolders();
        const newFolders = currentFolders.map(f => {
            if (f.id === folderId) {
                return {
                    ...f,
                    words: [userWord, ...f.words],
                    updatedAt: Date.now()
                };
            }
            return f;
        });
        saveFolders(newFolders);
    }, [saveFolders]);

    const updateWordInFolder = useCallback(async (folderId: string, updatedWord: UserVocabularyWord) => {
        const currentFolders = storage.getCustomFolders();
        const newFolders = currentFolders.map(f => {
            if (f.id === folderId) {
                return {
                    ...f,
                    words: f.words.map(w => w.id === updatedWord.id ? updatedWord : w),
                    updatedAt: Date.now()
                };
            }
            return f;
        });
        saveFolders(newFolders);
    }, [saveFolders]);

    const removeWordFromFolder = useCallback(async (folderId: string, wordId: string) => {
        const currentFolders = storage.getCustomFolders();
        const newFolders = currentFolders.map(f => {
            if (f.id === folderId) {
                return {
                    ...f,
                    words: f.words.filter(w => w.id !== wordId),
                    updatedAt: Date.now()
                };
            }
            return f;
        });
        saveFolders(newFolders);
    }, [saveFolders]);

    return {
        folders,
        isLoading,
        createFolder,
        deleteFolder,
        getFolder,
        addWordToFolder,
        updateWordInFolder,
        removeWordFromFolder
    };
}
