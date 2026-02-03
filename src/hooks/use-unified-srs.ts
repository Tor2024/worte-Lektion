'use client';

import { useMemo, useState, useEffect } from 'react';
import { useUserProgress } from '@/hooks/use-user-progress';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { useCurriculumSRS } from '@/hooks/use-curriculum-srs';
import { UserVocabularyWord, SM2State, INITIAL_SM2_STATE } from '@/lib/types';
import { useCurriculumData } from '@/hooks/use-curriculum-data';

export function useUnifiedSRS() {
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);
    useEffect(() => { setIsInitialLoadDone(true) }, []);

    const { progress } = useUserProgress();
    const { folders, updateWordInFolder } = useCustomFolders();
    const { srsMap, saveWordState, isLoading: isCurriculumLoading } = useCurriculumSRS();
    const { allTopics, isLoading: isTopicsLoading } = useCurriculumData();

    const allWords = useMemo(() => {
        if (!allTopics) return [];

        const words: UserVocabularyWord[] = [];
        const seenCurriculum = new Set<string>();

        allTopics.forEach((topic: any) => {
            if (progress[topic.id] > 0) {
                (topic.vocabulary as any[]).forEach((theme: any) => {
                    theme.words.forEach((vocabWord: any) => {
                        if (vocabWord && vocabWord.german && !seenCurriculum.has(vocabWord.german)) {
                            const state = srsMap[vocabWord.german] || INITIAL_SM2_STATE;
                            words.push({
                                id: `curr-${vocabWord.german}`,
                                word: vocabWord,
                                sm2State: state,
                                addedAt: Date.now()
                            });
                            seenCurriculum.add(vocabWord.german);
                        }
                    });
                });
            }
        });

        folders.forEach(folder => {
            folder.words.forEach(userWord => {
                words.push(userWord);
            });
        });

        return words.filter(w => w.word && w.word.german);
    }, [progress, folders, srsMap, allTopics]);

    const dueWords = useMemo(() => {
        const now = Date.now();
        return allWords.filter(w => {
            if (!w.sm2State.nextReviewDate) return true;
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
        isLoading: !isInitialLoadDone || isCurriculumLoading || isTopicsLoading,
        updateGlobalSRS
    };
}
