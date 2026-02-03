import { useState, useEffect, useCallback, useMemo } from 'react';
import { CustomFolder, UserVocabularyWord } from '@/lib/types';
import { storage } from '@/lib/storage';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';
import { isWordStandardized } from '@/lib/german-utils';

export function useCustomFolders() {
    const [localFolders, setLocalFolders] = useState<CustomFolder[]>([]);
    const [syncEnabled, setSyncEnabled] = useState(false);

    useEffect(() => {
        setLocalFolders(storage.getCustomFolders());
        setSyncEnabled(storage.isCloudSyncEnabled());
    }, []);

    const userId = "anonymous";

    // 1. Convex Hooks (only if enabled)
    const cloudFoldersRaw = useQuery(
        api.folders.getFolders,
        syncEnabled ? { userId } : "skip"
    );
    const createFolderMutation = useMutation(api.folders.createFolder);
    const deleteFolderMutation = useMutation(api.folders.deleteFolder);
    const addWordMutation = useMutation(api.folders.addWord);
    const updateWordMutation = useMutation(api.folders.updateWord);
    const deleteWordMutation = useMutation(api.folders.deleteWord);

    // 2. Map Cloud data to internal types
    const cloudFolders = useMemo(() => {
        if (!cloudFoldersRaw) return null;
        return cloudFoldersRaw.map((f: any) => ({
            id: f._id, // Use Convex ID as primary ID
            name: f.name,
            createdAt: f.createdAt,
            updatedAt: f.createdAt, // folders table doesn't have updatedAt yet, using createdAt
            words: (f.words || []).map((w: any) => {
                const details = w.details || { german: '?', russian: '?', type: 'other' };

                const fullWordObject = {
                    id: w._id,
                    word: details,
                    sm2State: w.sm2State || {},
                    addedAt: w.addedAt || Date.now(),
                    synonyms: (w as any).synonyms,
                    antonyms: (w as any).antonyms,
                    context: (w as any).context,
                    contextTranslation: (w as any).contextTranslation
                } as UserVocabularyWord;

                return {
                    ...fullWordObject,
                    needsUpdate: !isWordStandardized(fullWordObject) // Use centralized logic
                };
            })
                // Explicitly sort Newest First (descending addedAt)
                .sort((a: any, b: any) => Math.floor(b.addedAt || 0) - Math.floor(a.addedAt || 0)) as (UserVocabularyWord & { needsUpdate?: boolean })[]
        }));
    }, [cloudFoldersRaw]);

    // 3. Sync Cloud -> Local
    useEffect(() => {
        if (cloudFolders && syncEnabled) {
            // Very basic check for differences to avoid infinite loops or unnecessary writes
            const isDifferent = JSON.stringify(cloudFolders) !== JSON.stringify(localFolders);
            if (isDifferent) {
                setLocalFolders(cloudFolders);
                storage.setCustomFolders(cloudFolders);
            }
        }
    }, [cloudFolders, syncEnabled]);

    const createFolder = useCallback(async (name: string) => {
        if (syncEnabled) {
            try {
                const newFolderId = await createFolderMutation({ userId, name });
                return newFolderId;
            } catch (error) {
                console.error("Failed to create folder in cloud:", error);
                throw error;
            }
        } else {
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
        }
    }, [createFolderMutation, syncEnabled, localFolders]);

    const deleteFolder = useCallback(async (id: string) => {
        if (syncEnabled) {
            try {
                await deleteFolderMutation({ folderId: id as Id<"folders"> });
            } catch (error) {
                console.error("Failed to delete folder from cloud:", error);
            }
        } else {
            const nextFolders = localFolders.filter(f => f.id !== id);
            setLocalFolders(nextFolders);
            storage.setCustomFolders(nextFolders);
        }
    }, [deleteFolderMutation, syncEnabled, localFolders]);

    const getFolder = useCallback((id: string) => {
        return localFolders.find(f => f.id === id);
    }, [localFolders]);

    const addWordToFolder = useCallback(async (folderId: string, userWord: UserVocabularyWord) => {
        if (syncEnabled) {
            try {
                await addWordMutation({
                    folderId: folderId as Id<"folders">,
                    userId,
                    german: userWord.word.german,
                    russian: userWord.word.russian,
                    type: userWord.word.type,
                    details: userWord.word,
                    sm2State: userWord.sm2State,
                });
            } catch (error) {
                console.error("Failed to add word to cloud:", error);
                throw error;
            }
        } else {
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
        }
    }, [addWordMutation, syncEnabled, localFolders]);

    const updateWordInFolder = useCallback(async (folderId: string, updatedWord: UserVocabularyWord) => {
        if (syncEnabled) {
            try {
                await updateWordMutation({
                    wordId: updatedWord.id as Id<"words">,
                    german: updatedWord.word.german,
                    russian: updatedWord.word.russian,
                    sm2State: updatedWord.sm2State,
                    details: updatedWord.word
                });
            } catch (error) {
                console.error("Failed to update word in cloud:", error);
            }
        } else {
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
        }
    }, [updateWordMutation, syncEnabled, localFolders]);

    const removeWordFromFolder = useCallback(async (folderId: string, wordId: string) => {
        if (syncEnabled) {
            try {
                await deleteWordMutation({ wordId: wordId as Id<"words"> });
            } catch (error) {
                console.error("Failed to delete word from cloud:", error);
            }
        } else {
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
        }
    }, [deleteWordMutation, syncEnabled, localFolders]);

    return {
        folders: localFolders,
        isLoading: cloudFoldersRaw === undefined,
        createFolder,
        deleteFolder,
        getFolder,
        addWordToFolder,
        updateWordInFolder,
        removeWordFromFolder
    };
}
