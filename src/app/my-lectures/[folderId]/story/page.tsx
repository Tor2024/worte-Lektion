
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, RefreshCw, BookOpen, Mic, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { generateStory } from '@/ai/flows/generate-story';
import Markdown from 'react-markdown';
import { SpeakButton } from '@/components/speak-button';
import { cn } from '@/lib/utils';

export default function StoryPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [story, setStory] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showTranslation, setShowTranslation] = useState(false);

    const handleGenerate = async () => {
        if (!folder) return;
        setIsLoading(true);
        try {
            // Get random 20 words or all if less
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, 20).map(w => w.word.german);

            const result = await generateStory({
                words: selectedWords,
                topic: folder.name
            });
            setStory(result);
            setShowTranslation(false);
        } catch (error) {
            console.error(error);
            alert("Ошибка генерации истории. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!folder) return <div className="p-8 text-center">Папка не найдена</div>;

    return (
        <div className="container mx-auto py-8 max-w-4xl">
            <div className="mb-6">
                <Link href={`/my-lectures/${folderId}`} className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папке
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        <BookOpen className="h-8 w-8 text-blue-500" />
                        AI Story Helper
                    </h1>
                </div>
                <p className="text-muted-foreground mt-2">
                    Генерирует уникальную историю используя слова из папки <b>"{folder.name}"</b>.
                </p>
            </div>

            {!story && !isLoading && (
                <Card className="text-center py-12">
                    <CardContent className="flex flex-col items-center">
                        <BookOpen className="h-16 w-16 text-muted-foreground/20 mb-4" />
                        <h2 className="text-xl font-bold mb-2">Готовы к истории?</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            AI создаст связный текст уровня B2, используя до 20 случайных слов из этого словаря.
                        </p>
                        <Button size="lg" onClick={handleGenerate}>
                            <SparklesIcon className="mr-2 h-5 w-5" />
                            Сгенерировать Историю
                        </Button>
                    </CardContent>
                </Card>
            )}

            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse">Сочиняем историю...</p>
                </div>
            )}

            {story && (
                <div className="space-y-6">
                    <Card className="border-blue-500/20 bg-blue-50/10">
                        <CardContent className="p-8">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-primary">{story.title}</h2>
                                    <p className="text-sm text-muted-foreground">{story.russianTitle}</p>
                                </div>
                                <SpeakButton text={story.story} />
                            </div>

                            <div className="prose dark:prose-invert max-w-none text-lg leading-relaxed">
                                <Markdown>{story.story}</Markdown>
                            </div>

                            <div className="mt-8 pt-6 border-t border-border">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-sm font-bold uppercase text-muted-foreground">Перевод</h3>
                                    <Button variant="ghost" size="sm" onClick={() => setShowTranslation(!showTranslation)}>
                                        {showTranslation ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                                        {showTranslation ? 'Скрыть' : 'Показать'}
                                    </Button>
                                </div>
                                <div className={cn("transition-all duration-500", !showTranslation && "blur-md select-none opacity-50")}>
                                    <p className="text-muted-foreground leading-relaxed text-sm">
                                        {story.russianTranslation}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <div className="flex justify-center gap-4">
                        <Button variant="outline" onClick={handleGenerate}>
                            <RefreshCw className="mr-2 h-4 w-4" />
                            Новая история
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

function SparklesIcon(props: any) {
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
            <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .962 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.582a.5.5 0 0 1 0 .962L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.962 0z" />
        </svg>
    )
}
