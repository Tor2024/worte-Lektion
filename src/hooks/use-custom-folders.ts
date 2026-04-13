import { useState, useEffect, useCallback, useMemo } from 'react';
import { CustomFolder, UserVocabularyWord } from '@/lib/types';
import { storage } from '@/lib/storage';

export function useCustomFolders() {
    const [localFolders, setLocalFolders] = useState<CustomFolder[]>([]);
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setLocalFolders(storage.getCustomFolders());
        setIsInitialLoadDone(true);
    }, []);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === 'deutsch-learning-custom-folders' && event.newValue) {
                try {
                    const next = JSON.parse(event.newValue);
                    // Avoid identity change if values are same
                    setLocalFolders(prev => {
                        if (JSON.stringify(prev) === JSON.stringify(next)) return prev;
                        return next;
                    });
                } catch (e) {
                    console.error("Failed to sync folders from storage", e);
                }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const createFolder = useCallback(async (name: string) => {
        const current = storage.getCustomFolders();
        const nextFolders = [...current, {
            id: Math.random().toString(36).substr(2, 9),
            name,
            words: [],
            createdAt: Date.now(),
            updatedAt: Date.now()
        }];
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
        return nextFolders[nextFolders.length - 1].id;
    }, []);

    const deleteFolder = useCallback(async (id: string) => {
        const nextFolders = storage.getCustomFolders().filter((f: any) => f.id !== id);
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, []);

    const getFolder = useCallback((id: string) => {
        return localFolders.find(f => f.id === id);
    }, [localFolders]);

    const addWordToFolder = useCallback(async (folderId: string, userWord: UserVocabularyWord) => {
        const nextFolders = storage.getCustomFolders().map((f: any) => {
            if (f.id === folderId) {
                return { ...f, words: [userWord, ...f.words] };
            }
            return f;
        });
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, []);

    const updateWordInFolder = useCallback(async (folderId: string, updatedWord: UserVocabularyWord, globalSync: boolean = true) => {
        const currentFolders = storage.getCustomFolders();
        let nextFolders;

        if (globalSync) {
            // Update ALL instances of this word across ALL folders
            nextFolders = currentFolders.map((f: any) => ({
                ...f,
                words: f.words.map((w: any) =>
                    w.word.german === updatedWord.word.german ? { ...updatedWord, id: w.id } : w
                )
            }));
        } else {
            // Update only in specific folder
            nextFolders = currentFolders.map((f: any) => {
                if (f.id === folderId) {
                    return { ...f, words: f.words.map((w: any) => w.id === updatedWord.id ? updatedWord : w) };
                }
                return f;
            });
        }

        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, []);

    const searchWords = useCallback((query: string) => {
        if (!query.trim()) return [];
        const normalizedQuery = query.toLowerCase().trim();
        const results: { word: UserVocabularyWord, folderName: string, folderId: string }[] = [];

        localFolders.forEach(folder => {
            folder.words.forEach(userWord => {
                if (
                    userWord.word.german.toLowerCase().includes(normalizedQuery) ||
                    userWord.word.russian.toLowerCase().includes(normalizedQuery)
                ) {
                    results.push({
                        word: userWord,
                        folderName: folder.name,
                        folderId: folder.id
                    });
                }
            });
        });

        return results;
    }, [localFolders]);

    const removeWordFromFolder = useCallback(async (folderId: string, wordId: string) => {
        const nextFolders = storage.getCustomFolders().map((f: any) => {
            if (f.id === folderId) {
                return { ...f, words: f.words.filter((w: any) => w.id !== wordId) };
            }
            return f;
        });
        setLocalFolders(nextFolders);
        storage.setCustomFolders(nextFolders);
    }, []);

    const reindexAllRoots = useCallback(async (onProgress?: (current: number, total: number) => void) => {
        const currentFolders = storage.getCustomFolders();
        const wordsToProcess: { folderId: string, word: UserVocabularyWord }[] = [];

        // ONLY pick words that actually need indexing
        currentFolders.forEach(f => {
            f.words.forEach(w => {
                if (!w.word.root) {
                    wordsToProcess.push({ folderId: f.id, word: w });
                }
            });
        });

        if (wordsToProcess.length === 0) return 0;

        const total = wordsToProcess.length;
        let processed = 0;
        const batchSize = 10; // Extra safe batch size for Vercel timeouts

        // Call progress immediately to show the total in the UI
        onProgress?.(0, total);

        let i = 0;
        while (i < wordsToProcess.length) {
            const batch = wordsToProcess.slice(i, i + batchSize);
            const batchGermanWords = batch.map(b => b.word.word.german);

            try {
                const res = await fetch('/api/batch-roots', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ words: batchGermanWords })
                });

                if (!res.ok) throw new Error(`Batch failed with status ${res.status}`);
                const { rootMap } = await res.json();

                if (rootMap) {
                    const foldersToSave = storage.getCustomFolders();
                    batch.forEach(item => {
                        const detectedRoot = rootMap[item.word.word.german];
                        if (detectedRoot) {
                            foldersToSave.forEach(f => {
                                f.words.forEach(w => {
                                    if (w.word.german === item.word.word.german) {
                                        w.word.root = detectedRoot;
                                    }
                                });
                            });
                        }
                    });

                    storage.setCustomFolders(foldersToSave);
                    setLocalFolders(foldersToSave);

                    processed += batch.length;
                    i += batch.length; // Move to next batch ONLY if success
                    onProgress?.(processed, total);
                }

                // Throttle: Increased to 5s to stay well within Gemini Free Tier limits (15 RPM)
                await new Promise(r => setTimeout(r, 5000));
            } catch (e) {
                console.error("Batch reindex failed, retrying same batch in 10s...", e);
                // On failure, wait much longer then RETRY THE SAME BATCH
                await new Promise(r => setTimeout(r, 10000));
            }
        }

        return total;
    }, []);

    return useMemo(() => ({
        folders: localFolders,
        isLoading: !isInitialLoadDone,
        createFolder,
        deleteFolder,
        getFolder,
        addWordToFolder,
        updateWordInFolder,
        removeWordFromFolder,
        searchWords,
        reindexAllRoots
    }), [localFolders, isInitialLoadDone, createFolder, deleteFolder, getFolder, addWordToFolder, updateWordInFolder, removeWordFromFolder, searchWords, reindexAllRoots]);
}
