
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, Send, CheckCircle2, AlertTriangle, MessageSquareQuote } from 'lucide-react';
import Link from 'next/link';
import { evaluateSentence } from '@/ai/flows/evaluate-sentence';
import { Badge } from '@/components/ui/badge';
import { formatGermanWord } from '@/lib/german-utils';

export default function CoachPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [userSentence, setUserSentence] = useState('');
    const [feedback, setFeedback] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    if (!folder || folder.words.length === 0) return <div className="p-8">Папка пуста</div>;

    const currentWord = folder.words[currentWordIndex];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userSentence.trim()) return;

        setIsLoading(true);
        try {
            const result = await evaluateSentence({
                word: currentWord.word.german,
                sentence: userSentence
            });
            setFeedback(result);
        } catch (error) {
            console.error(error);
            alert("Ошибка проверки. Попробуйте еще раз.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNext = () => {
        setFeedback(null);
        setUserSentence('');
        setCurrentWordIndex((prev) => (prev + 1) % folder.words.length);
    };

    return (
        <div className="container mx-auto py-8 max-w-2xl">
            <div className="mb-6">
                <Link href={`/my-lectures/${folderId}`} className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папке
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        <MessageSquareQuote className="h-8 w-8 text-green-500" />
                        Usage Coach
                    </h1>
                </div>
            </div>

            <Card className="mb-6 from-green-50 to-transparent bg-gradient-to-b dark:from-green-900/10">
                <CardHeader className="text-center pb-2">
                    <CardDescription>Составьте предложение со словом:</CardDescription>
                    <CardTitle className="text-4xl font-bold mt-2">{formatGermanWord(currentWord.word)}</CardTitle>
                    <p className="text-muted-foreground italic mt-2">{currentWord.word.russian}</p>
                </CardHeader>
                <CardContent>
                    {!feedback ? (
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <Input
                                placeholder="Напишите предложение на немецком..."
                                value={userSentence}
                                onChange={(e) => setUserSentence(e.target.value)}
                                className="text-lg p-6 bg-background/80 backdrop-blur"
                                disabled={isLoading}
                                autoFocus
                            />
                            <Button type="submit" className="w-full" size="lg" disabled={isLoading || !userSentence.trim()}>
                                {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5 mr-2" />}
                                Проверить
                            </Button>
                        </form>
                    ) : (
                        <div className="mt-4 space-y-6">
                            {/* Feedback Result */}
                            <div className={`p-4 rounded-lg border ${feedback.isCorrect ? 'bg-green-100 border-green-200 text-green-800' : 'bg-red-50 border-red-200 text-red-800'}`}>
                                <div className="flex items-center gap-3 mb-2">
                                    {feedback.isCorrect ? <CheckCircle2 className="h-6 w-6" /> : <AlertTriangle className="h-6 w-6" />}
                                    <span className="font-bold text-lg">{feedback.isCorrect ? 'Отлично!' : 'Нужна коррекция'}</span>
                                </div>
                                <p className="text-sm">{feedback.explanation}</p>
                            </div>

                            {/* Style Score */}
                            <div className="flex items-center justify-between p-4 bg-background border rounded-lg">
                                <div>
                                    <div className="text-sm text-muted-foreground uppercase font-bold tracking-wider">Оценка стиля</div>
                                    <div className="flex gap-1 mt-1">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span key={star} className={`text-xl ${star <= feedback.styleScore ? 'text-yellow-500' : 'text-gray-300'}`}>★</span>
                                        ))}
                                    </div>
                                </div>
                                {feedback.styleTip && (
                                    <div className="text-right max-w-xs text-sm italic text-muted-foreground">
                                        "{feedback.styleTip}"
                                    </div>
                                )}
                            </div>

                            {/* Correction Display */}
                            {!feedback.isCorrect && (
                                <div className="p-4 bg-background border rounded-lg">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Исправленный вариант:</div>
                                    <div className="text-lg font-medium text-primary">{feedback.correctedSentence}</div>
                                </div>
                            )}

                            {feedback.isCorrect && feedback.correctedSentence && feedback.correctedSentence !== userSentence && (
                                <div className="p-4 bg-background border rounded-lg">
                                    <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Улучшенный (B2) вариант:</div>
                                    <div className="text-lg font-medium text-primary">{feedback.correctedSentence}</div>
                                </div>
                            )}

                            <Button onClick={handleNext} variant="outline" className="w-full">
                                Следующее слово
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="text-center text-sm text-muted-foreground">
                Слово {currentWordIndex + 1} из {folder.words.length}
            </div>
        </div>
    );
}
