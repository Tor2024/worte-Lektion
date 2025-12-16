'use client';

import { useState, useEffect, useCallback } from 'react';
import { CustomFolder, UserVocabularyWord } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'deutsch-learning-custom-folders';

export function useCustomFolders() {
    const [folders, setFolders] = useState<CustomFolder[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadFolders = () => {
            try {
                const stored = window.localStorage.getItem(STORAGE_KEY);
                if (stored) {
                    setFolders(JSON.parse(stored));
                }
            } catch (error) {
                console.error('Failed to load custom folders:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadFolders();
    }, []);

    const saveFolders = useCallback((newFolders: CustomFolder[]) => {
        setFolders(newFolders);
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newFolders));
    }, []);

    const createFolder = useCallback((name: string) => {
        const newFolder: CustomFolder = {
            id: uuidv4(),
            name,
            words: [],
            createdAt: Date.now(),
            updatedAt: Date.now(),
        };
        saveFolders([...folders, newFolder]);
        return newFolder.id;
    }, [folders, saveFolders]);

    const deleteFolder = useCallback((id: string) => {
        saveFolders(folders.filter(f => f.id !== id));
    }, [folders, saveFolders]);

    const getFolder = useCallback((id: string) => {
        return folders.find(f => f.id === id);
    }, [folders]);

    const addWordToFolder = useCallback((folderId: string, word: UserVocabularyWord) => {
        const newFolders = folders.map(f => {
            if (f.id === folderId) {
                return {
                    ...f,
                    words: [...f.words, word],
                    updatedAt: Date.now()
                };
            }
            return f;
        });
        saveFolders(newFolders);
    }, [folders, saveFolders]);

    const updateWordInFolder = useCallback((folderId: string, updatedWord: UserVocabularyWord) => {
        const newFolders = folders.map(f => {
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
    }, [folders, saveFolders]);


    const removeWordFromFolder = useCallback((folderId: string, wordId: string) => {
        const newFolders = folders.map(f => {
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
    }, [folders, saveFolders]);

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
