
'use client';

import { use, useMemo } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { RektionTrainer } from '@/components/rektion-trainer';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Shuffle } from 'lucide-react';
import Link from 'next/link';

export default function RektionPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { folders, isLoading } = useCustomFolders();
    const router = useRouter();

    // Collect ALL words from ALL folders for a global experience
    const allWords = useMemo(() => {
        return folders.flatMap(f => f.words);
    }, [folders]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="mb-8">
                <Link href={`/my-lectures/${folderId}`} className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папке
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                        <Shuffle className="h-8 w-8 text-red-500" />
                        Rektion Blitz
                    </h1>
                </div>
                <p className="text-muted-foreground mt-2">
                    Тренировка управления глаголов и прилагательных на основе всей вашей библиотеки ({allWords.length} слов).
                </p>
            </div>

            <RektionTrainer
                words={allWords}
                onBack={() => router.push(`/my-lectures/${folderId}`)}
            />
        </div>
    );
}

