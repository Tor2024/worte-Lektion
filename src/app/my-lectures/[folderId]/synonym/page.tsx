
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Loader2, ArrowLeft, ArrowRightLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { generateSynonymSwap, GenerateSynonymSwapOutput } from '@/ai/flows/generate-synonym-swap';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { SynonymGame } from '@/components/synonym-game';

export default function SynonymPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState<GenerateSynonymSwapOutput | null>(null);
    const [answers, setAnswers] = useState<{ [key: string]: string }>({});
    const [results, setResults] = useState<{ [key: string]: boolean }>({});

    const handleGenerate = async () => {
        if (!folder) return;
        setIsLoading(true);
        try {
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, 15).map(w => w.word.german);

            const result = await generateSynonymSwap({
                words: selectedWords
            });
            setData(result);
            setAnswers({});
            setResults({});
        } catch (error) {
            console.error(error);
            alert("Ошибка генерации синонимов.");
        } finally {
            setIsLoading(false);
        }
    };

    const checkAnswer = (id: string, target: string) => {
        const userAns = answers[id] || '';
        if (userAns.toLowerCase().trim() === target.toLowerCase().trim()) {
            setResults(prev => ({ ...prev, [id]: true }));
        } else {
            alert(`Почти! Правильное слово: ${target}`);
            setResults(prev => ({ ...prev, [id]: false })); // Just show correct for now
        }
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
                        <ArrowRightLeft className="h-8 w-8 text-orange-500" />
                        Synonym Swap
                    </h1>
                </div>
            </div>

            {/* INTRO */}
            {!data && !isLoading && (
                <Card className="text-center py-12">
                    <CardContent className="flex flex-col items-center">
                        <div className="bg-orange-100 p-4 rounded-full mb-4 dark:bg-orange-900">
                            <Star className="h-12 w-12 text-orange-600 dark:text-orange-300" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Upgrade to B2 (Прокачка стиля)</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            AI покажет скучные предложения (A2). Ваша задача — заменить простые слова на профессиональные термины из вашего словаря.
                        </p>
                        <Button size="lg" onClick={handleGenerate} className="bg-orange-600 hover:bg-orange-700 text-white">
                            Начать прокачку
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* LOADING */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-orange-500" />
                    <p className="text-muted-foreground animate-pulse">Ищем слабые места в стиле...</p>
                </div>
            )}

            {/* LIST */}
            {data && (
                <div className="space-y-6">
                    <SynonymGame
                        items={data.items}
                        onComplete={() => {
                            // Optional: Celebration or scroll to top
                        }}
                    />

                    <div className="flex justify-center pt-8">
                        <Button variant="outline" onClick={handleGenerate}>Попробовать другие слова</Button>
                    </div>
                </div>
            )}
        </div>
    );
}
