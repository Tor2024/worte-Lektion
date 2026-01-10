
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, ArrowLeft, RefreshCw, Eye, Check } from 'lucide-react';
import Link from 'next/link';
import { generateCollocations, GenerateCollocationsOutput } from '@/ai/flows/generate-collocations';
import { cn } from '@/lib/utils';

export default function CollocationPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<GenerateCollocationsOutput | null>(null);
    const [revealed, setRevealed] = useState<string[]>([]);

    const handleGenerate = async () => {
        if (!folder) return;
        setIsLoading(true);
        try {
            // Pick random words
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, 15).map(w => w.word.german);

            const result = await generateCollocations({
                words: selectedWords
            });
            setData(result);
            setRevealed([]);
        } catch (error) {
            console.error(error);
            alert("Ошибка генерации коллокаций.");
        } finally {
            setIsLoading(false);
        }
    };

    const toggleReveal = (id: string) => {
        setRevealed(prev => prev.includes(id) ? prev : [...prev, id]);
    };

    if (!folder) return <div className="p-8">Папка не найдена</div>;

    return (
        <div className="container mx-auto py-8 max-w-3xl px-4">
            <div className="mb-6">
                <Link href={`/my-lectures/${folderId}`} className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папке
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        <RefreshCw className="h-8 w-8 text-indigo-500" />
                        Collocation Trainer
                    </h1>
                </div>
            </div>

            {/* INTRO */}
            {!data && !isLoading && (
                <Card className="text-center py-12">
                    <CardContent className="flex flex-col items-center">
                        <div className="bg-indigo-100 p-4 rounded-full mb-4 dark:bg-indigo-900">
                            <RefreshCw className="h-12 w-12 text-indigo-600 dark:text-indigo-300" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Мастер Связок (B2+)</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            Учите не просто слова, а устойчивые выражения (Nomen-Verb-Verbindungen).
                            Например: вместо "kritisiert" &rarr; "Übt Kritik an".
                        </p>
                        <Button size="lg" onClick={handleGenerate} className="bg-indigo-600 hover:bg-indigo-700 text-white">
                            Найти связки
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* LOADING */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-indigo-500" />
                    <p className="text-muted-foreground animate-pulse">Ищем устойчивые выражения...</p>
                </div>
            )}

            {/* LIST */}
            {data && (
                <div className="space-y-4">
                    {data.items.map((item) => {
                        const isRevealed = revealed.includes(item.id);
                        return (
                            <Card key={item.id} className={cn("transition-all border-l-4", isRevealed ? "border-l-indigo-500 bg-indigo-50/50 dark:bg-indigo-900/10" : "border-l-muted")}>
                                <CardHeader className="pb-2">
                                    <div className="flex justify-between items-start">
                                        <CardTitle className="text-lg">
                                            {item.baseWord}
                                        </CardTitle>
                                        <Button variant="ghost" size="sm" onClick={() => toggleReveal(item.id)}>
                                            {isRevealed ? <Check className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                        </Button>
                                    </div>
                                    <CardDescription>
                                        {item.translation}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg font-medium mb-2 p-3 bg-background rounded-md border">
                                        {isRevealed ? (
                                            <span className="text-indigo-600 dark:text-indigo-400 font-bold">{item.collocation}</span>
                                        ) : (
                                            <span>
                                                {item.gapSentence}
                                            </span>
                                        )}
                                    </div>
                                    {isRevealed && (
                                        <p className="text-sm text-muted-foreground mt-2 italic">
                                            "{item.exampleSentence}"
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        );
                    })}
                    <div className="flex justify-center pt-8">
                        <Button variant="outline" onClick={handleGenerate}>Попробовать другие слова</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
