import { useState, useEffect, useCallback, useMemo } from 'react';
import { CustomFolder, UserVocabularyWord } from '@/lib/types';
import { storage } from '@/lib/storage';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { Id } from '../../convex/_generated/dataModel';

export function useCustomFolders() {
    const [localFolders, setLocalFolders] = useState<CustomFolder[]>(storage.getCustomFolders());
    const userId = "anonymous";

    // 1. Convex Hooks
    const cloudFoldersRaw = useQuery(api.folders.getFolders, { userId });
    const createFolderMutation = useMutation(api.folders.createFolder);
    const deleteFolderMutation = useMutation(api.folders.deleteFolder);
    const addWordMutation = useMutation(api.folders.addWord);
    const updateWordMutation = useMutation(api.folders.updateWord);
    const deleteWordMutation = useMutation(api.folders.deleteWord);

    // 2. Map Cloud data to internal types
    const cloudFolders = useMemo(() => {
        if (!cloudFoldersRaw) return null;
        return cloudFoldersRaw.map(f => ({
            id: f._id, // Use Convex ID as primary ID
            name: f.name,
            createdAt: f.createdAt,
            updatedAt: f.createdAt, // folders table doesn't have updatedAt yet, using createdAt
            words: f.words.map(w => ({
                ...w.details,
                id: w._id,
                sm2State: w.sm2State,
                addedAt: w.addedAt
            })) as UserVocabularyWord[]
        }));
    }, [cloudFoldersRaw]);

    // 3. Sync Cloud -> Local
    useEffect(() => {
        if (cloudFolders) {
            // Very basic check for differences to avoid infinite loops or unnecessary writes
            const isDifferent = JSON.stringify(cloudFolders) !== JSON.stringify(localFolders);
            if (isDifferent) {
                setLocalFolders(cloudFolders);
                storage.setCustomFolders(cloudFolders);
            }
        }
    }, [cloudFolders]);

    const createFolder = useCallback(async (name: string) => {
        try {
            const newFolderId = await createFolderMutation({ userId, name });
            // The query will eventually update the state, but we could optimistic-update here if needed.
            return newFolderId;
        } catch (error) {
            console.error("Failed to create folder in cloud:", error);
            throw error;
        }
    }, [createFolderMutation]);

    const deleteFolder = useCallback(async (id: string) => {
        try {
            await deleteFolderMutation({ folderId: id as Id<"folders"> });
        } catch (error) {
            console.error("Failed to delete folder from cloud:", error);
        }
    }, [deleteFolderMutation]);

    const getFolder = useCallback((id: string) => {
        return localFolders.find(f => f.id === id);
    }, [localFolders]);

    const addWordToFolder = useCallback(async (folderId: string, userWord: UserVocabularyWord) => {
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
        }
    }, [addWordMutation]);

    const updateWordInFolder = useCallback(async (folderId: string, updatedWord: UserVocabularyWord) => {
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
    }, [updateWordMutation]);

    const removeWordFromFolder = useCallback(async (folderId: string, wordId: string) => {
        try {
            await deleteWordMutation({ wordId: wordId as Id<"words"> });
        } catch (error) {
            console.error("Failed to delete word from cloud:", error);
        }
    }, [deleteWordMutation]);

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
