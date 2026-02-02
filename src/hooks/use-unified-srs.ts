'use client';

import { useMemo } from 'react';
// import { curriculum } from '@/lib/data'; // NO LONGER USED
import { useUserProgress } from '@/hooks/use-user-progress';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { useCurriculumSRS } from '@/hooks/use-curriculum-srs';
import { UserVocabularyWord, SM2State, INITIAL_SM2_STATE, VocabularyWord } from '@/lib/types';
import { useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';

export function useUnifiedSRS() {
    const { progress } = useUserProgress();
    const { folders, updateWordInFolder } = useCustomFolders();
    const { srsMap, updateWordSRS, saveWordState, isLoading: isCurriculumLoading } = useCurriculumSRS();

    // Fetch all topics to gather words
    const allTopics = useQuery(api.curriculum.getAllTopics);

    const allWords = useMemo(() => {
        if (!allTopics) return []; // Wait for data

        const words: UserVocabularyWord[] = [];
        const seenCurriculum = new Set<string>();

        // 1. Gather words from Curriculum topics that have been started
        allTopics.forEach(topic => {
            if (progress[topic.id] > 0) {
                // topic.vocabulary is typed as 'any' in schema, cast to array of themes
                (topic.vocabulary as any[]).forEach(theme => {
                    theme.words.forEach((vocabWord: any) => {
                        if (vocabWord && vocabWord.german && !seenCurriculum.has(vocabWord.german)) {
                            const state = srsMap[vocabWord.german] || INITIAL_SM2_STATE;
                            words.push({
                                id: `curr-${vocabWord.german}`,
                                word: vocabWord,
                                sm2State: state,
                                addedAt: Date.now() // placeholder
                            });
                            seenCurriculum.add(vocabWord.german);
                        }
                    });
                });
            }
        });

        // 2. Gather words from Custom Folders
        folders.forEach(folder => {
            folder.words.forEach(userWord => {
                // To avoid duplicates if same word is in curriculum and folder, 
                // we keep both for now as they might have different learning context/folders.
                // But for a unified SRS hub, maybe we should merge? 
                // The user specifically asked for "words from all levels".
                words.push(userWord);
            });
        });

        return words.filter(w => w.word && w.word.german);
    }, [progress, folders, srsMap, allTopics]);

    const dueWords = useMemo(() => {
        const now = Date.now();
        return allWords.filter(w => {
            if (!w.sm2State.nextReviewDate) return true; // Never reviewed
            return w.sm2State.nextReviewDate <= now;
        });
    }, [allWords]);

    const updateGlobalSRS = (wordId: string, nextState: SM2State) => {
        if (wordId.startsWith('curr-')) {
            const german = wordId.replace('curr-', '');
            saveWordState(german, nextState);
        } else {
            const folder = folders.find(f => f.words.some(w => w.id === wordId));
            if (folder) {
                const word = folder.words.find(w => w.id === wordId);
                if (word) {
                    updateWordInFolder(folder.id, { ...word, sm2State: nextState });
                }
            }
        }
    };

    return {
        allWords,
        dueWords,
        isLoading: isCurriculumLoading || allTopics === undefined,
        updateGlobalSRS
    };
}
