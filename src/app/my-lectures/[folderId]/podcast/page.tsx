
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, Headphones, Radio } from 'lucide-react';
import Link from 'next/link';
import { generatePodcastScript, GeneratePodcastScriptOutput } from '@/ai/flows/generate-podcast-script';
import { PodcastPlayer } from '@/components/podcast-player';

export default function PodcastPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [isLoading, setIsLoading] = useState(false);
    const [podcastData, setPodcastData] = useState<GeneratePodcastScriptOutput | null>(null);

    const handleGenerate = async () => {
        if (!folder) return;
        setIsLoading(true);
        try {
            // Pick words
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, 15).map(w => w.word.german);

            const result = await generatePodcastScript({
                topic: folder.name,
                words: selectedWords
            });
            setPodcastData(result);
        } catch (error) {
            console.error(error);
            alert("Ошибка генерации подкаста. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!folder) return <div className="p-8">Папка не найдена</div>;

    return (
        <div className="container mx-auto py-8 max-w-2xl px-4">
            <div className="mb-6">
                <Link href={`/my-lectures/${folderId}`} className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папке
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        <Radio className="h-8 w-8 text-blue-500 animate-pulse" />
                        AI Podcast Studio
                    </h1>
                </div>
            </div>

            {/* INTRO */}
            {!podcastData && !isLoading && (
                <Card className="text-center py-12 bg-gradient-to-b from-blue-50 to-white dark:from-blue-950/20 dark:to-background border-blue-100 dark:border-blue-900">
                    <CardContent className="flex flex-col items-center">
                        <div className="bg-blue-100 dark:bg-blue-900 p-6 rounded-full mb-6">
                            <Headphones className="h-16 w-16 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h2 className="text-2xl font-bold mb-3 font-headline">Ваш персональный подкаст</h2>
                        <p className="text-muted-foreground mb-8 max-w-md text-lg">
                            Наши ведущие Макс и Анна обсудят слова из вашей папки <strong>"{folder.name}"</strong> в формате живого радио-шоу.
                        </p>
                        <Button size="lg" onClick={handleGenerate} className="bg-blue-600 hover:bg-blue-700 text-white h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-blue-500/25 transition-all">
                            <PlayIcon className="mr-2 h-5 w-5 fill-current" /> Сгенерировать выпуск
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* LOADING */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-24 space-y-6">
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 animate-pulse rounded-full"></div>
                        <Loader2 className="h-16 w-16 animate-spin text-blue-500 relative z-10" />
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-xl font-bold">Пишем сценарий...</h3>
                        <p className="text-muted-foreground">Макс и Анна репетируют ваши слова</p>
                    </div>
                </div>
            )}

            {/* PLAYER */}
            {podcastData && (
                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                    <PodcastPlayer data={podcastData} />

                    <div className="mt-12 text-center">
                        <Button variant="outline" onClick={() => setPodcastData(null)} className="rounded-full">
                            Сделать новый выпуск
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function PlayIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="5 3 19 12 5 21 5 3" />
        </svg>
    )
}
