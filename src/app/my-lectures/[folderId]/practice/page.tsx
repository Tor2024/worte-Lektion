'use client';

import { use, useState, useEffect } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { ExerciseEngine } from '@/components/exercise-engine';

import { SM2State, UserVocabularyWord } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function PracticePage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder, updateWordInFolder, isLoading: isFoldersLoading } = useCustomFolders();
    const folder = getFolder(folderId);
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);
    const [reviewSessionWords, setReviewSessionWords] = useState<UserVocabularyWord[] | null>(null);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        if (folder && isClient && !isFoldersLoading && reviewSessionWords === null) {
            const due = folder.words.filter(w => !w.sm2State.nextReviewDate || w.sm2State.nextReviewDate <= Date.now());
            setReviewSessionWords(due);
        }
    }, [folder, isClient, isFoldersLoading, reviewSessionWords]);

    if (!isClient || isFoldersLoading || reviewSessionWords === null) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (!folder) {
        return <div className="p-8">Папка не найдена</div>;
    }

    // Use reviewSessionWords instead of dynamic filter
    const wordsToReview = reviewSessionWords;

    const handleMastered = () => {
        router.push(`/my-lectures/${folderId}`);
    };

    const handleWordUpdate = (wordId: string, newSm2State: SM2State) => {
        const word = folder.words.find(w => w.id === wordId);
        if (!word) return;

        updateWordInFolder(folderId, {
            ...word,
            sm2State: newSm2State
        });
    };

    const startForcePractice = () => {
        // Shuffle array to make it more interesting logic could be added here
        // For now just take all words
        setReviewSessionWords(folder.words);
    };

    if (wordsToReview.length === 0) {
        return (
            <div className="container mx-auto py-8 text-center max-w-md">
                <h1 className="text-2xl font-bold mb-4">Все слова выучены!</h1>
                <p className="text-muted-foreground mb-6">На данный момент нет слов для повторения в этой папке. Загляните позже или повторите всё стразу.</p>
                <div className="flex flex-col gap-3">
                    <Button onClick={startForcePractice} size="lg" className="w-full">
                        Повторить все слова ({folder.words.length})
                    </Button>
                    <Button asChild variant="outline" className="w-full">
                        <Link href={`/my-lectures/${folderId}`}>Вернуться в папку</Link>
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 max-w-2xl">
            <Link href={`/my-lectures/${folderId}`} className="text-sm text-muted-foreground hover:text-primary flex items-center mb-6">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Прервать тренировку
            </Link>

            <div className="mb-6">
                <h1 className="text-2xl font-bold">Тренировка: {folder.name}</h1>
                <p className="text-muted-foreground">{wordsToReview.length} слов(а) для повторения</p>
            </div>

            <ExerciseEngine
                customWords={wordsToReview}
                onMastered={handleMastered}
                onWordUpdate={handleWordUpdate}
            />
        </div>
    );
}
