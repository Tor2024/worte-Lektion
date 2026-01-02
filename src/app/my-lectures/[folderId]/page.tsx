'use client';

import { use, useState, useMemo } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Play, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { enrichWord } from '@/ai/flows/enrich-word';
import { UserVocabularyWord, SM2State, INITIAL_SM2_STATE } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SpeakButton } from '@/components/speak-button';
import { formatGermanWord } from '@/lib/german-utils';


export default function FolderDetailsPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder, addWordToFolder, removeWordFromFolder } = useCustomFolders();
    const folder = getFolder(folderId);
    const router = useRouter();

    const [newWordInput, setNewWordInput] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddWord = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWordInput.trim() || isAdding) return;

        setIsAdding(true);
        setError(null);

        try {
            const enriched = await enrichWord({ word: newWordInput });

            const newWord: UserVocabularyWord = {
                id: uuidv4(),
                word: enriched as unknown as UserVocabularyWord['word'],
                sm2State: { ...INITIAL_SM2_STATE }, // Default state
                addedAt: Date.now(),
                context: enriched.example
            };

            addWordToFolder(folderId, newWord);
            setNewWordInput('');
        } catch (err: any) {
            console.error("Failed to add word:", err);
            setError("Не удалось добавить слово. Проверьте соединение или лимиты AI.");
        } finally {
            setIsAdding(false);
        }
    };

    if (!folder) {
        return (
            <div className="container mx-auto py-8 text-center">
                <h1 className="text-2xl font-bold mb-4">Папка не найдена</h1>
                <Button asChild variant="secondary">
                    <Link href="/my-lectures"><ArrowLeft className="mr-2 h-4 w-4" /> Вернуться к списку</Link>
                </Button>
            </div>
        )
    }

    const dueWords = folder.words.filter(w => !w.sm2State.nextReviewDate || w.sm2State.nextReviewDate <= Date.now());

    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <Link href="/my-lectures" className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папкам
                </Link>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold font-headline">{folder.name}</h1>
                        <p className="text-muted-foreground mt-1">{folder.words.length} слов всего • {dueWords.length} требуют повторения</p>
                    </div>
                    <div className="flex gap-3">
                        <Button asChild disabled={dueWords.length === 0} variant="default" size="lg" className="shadow-lg">
                            <Link href={`/my-lectures/${folderId}/practice`}>
                                <Play className="mr-2 h-5 w-5" />
                                Учить ({dueWords.length})
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            {/* Add Word Section */}
            <Card className="mb-8 border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                    <form onSubmit={handleAddWord} className="flex gap-2 items-center">
                        <div className="relative flex-grow">
                            <Sparkles className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary" />
                            <Input
                                placeholder="Введите немецкое слово (например, 'laufen')..."
                                className="pl-9"
                                value={newWordInput}
                                onChange={(e) => setNewWordInput(e.target.value)}
                                disabled={isAdding}
                            />
                        </div>
                        <Button type="submit" disabled={isAdding || !newWordInput.trim()}>
                            {isAdding ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                            Добавить
                        </Button>
                    </form>
                    {error && (
                        <Alert variant="destructive" className="mt-4">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Ошибка</AlertTitle>
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                </CardContent>
            </Card>

            {/* Word List */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {folder.words.map((userWord) => {
                    const word = userWord.word;
                    const isDue = !userWord.sm2State.nextReviewDate || userWord.sm2State.nextReviewDate <= Date.now();

                    // Determine Card Style based on Type/Gender
                    let cardStyle = "border-l-4 transition-all hover:shadow-md";
                    let badgeStyle = "text-muted-foreground";

                    if (word.type === 'noun') {
                        const article = (word as any).article;
                        if (article === 'der') {
                            cardStyle += " border-l-blue-500 bg-blue-50/50 dark:bg-blue-900/10";
                            badgeStyle = "text-blue-600 dark:text-blue-400 font-bold";
                        } else if (article === 'die') {
                            cardStyle += " border-l-pink-500 bg-pink-50/50 dark:bg-pink-900/10";
                            badgeStyle = "text-pink-600 dark:text-pink-400 font-bold";
                        } else if (article === 'das') {
                            cardStyle += " border-l-green-500 bg-green-50/50 dark:bg-green-900/10";
                            badgeStyle = "text-green-600 dark:text-green-400 font-bold";
                        } else {
                            cardStyle += " border-l-gray-400";
                        }
                    } else if (word.type === 'verb') {
                        cardStyle += " border-l-amber-500 bg-amber-50/30 dark:bg-amber-900/10";
                    } else if (word.type === 'conjunction') {
                        // Lavender style for Conjunctions
                        cardStyle += " border-l-purple-500 bg-purple-50/50 dark:bg-purple-900/10";
                        badgeStyle = "text-purple-700 dark:text-purple-300 font-bold";
                    } else if (word.type === 'preposition') {
                        // Yellow style for Prepositions (Base)
                        cardStyle += " border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-900/10";

                        // Case-based text coloring for the Badge
                        const prepCase = (word as any).case;
                        if (prepCase === 'Akkusativ') {
                            badgeStyle = "text-green-700 dark:text-green-300 font-bold border-green-500/50 bg-green-50";
                        } else if (prepCase === 'Dativ') {
                            badgeStyle = "text-red-700 dark:text-red-300 font-bold border-red-500/50 bg-red-50";
                        } else if (prepCase === 'Genitiv') {
                            badgeStyle = "text-blue-700 dark:text-blue-300 font-bold border-blue-500/50 bg-blue-50";
                        } else {
                            badgeStyle = "text-muted-foreground border-border";
                        }
                    } else {
                        cardStyle += " border-l-primary/50";
                    }

                    // Override if Due (Maybe just a shadow or icon? Or keep the color but make it stronger?)
                    // The user wants gender colors paramount. Let's use an icon for "Due".

                    return (
                        <Card key={userWord.id} className={`group relative ${cardStyle}`}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-bold text-lg">{word.german}</h3>
                                            <SpeakButton text={formatGermanWord(word)} size="icon" className="h-6 w-6" />
                                            {isDue && (
                                                <span className="relative flex h-2 w-2">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                                </span>
                                            )}
                                        </div>

                                        {/* Noun Article & Plural */}
                                        {word.type === 'noun' && (
                                            <div className="flex gap-1 text-sm mt-1 items-baseline">
                                                <span className={badgeStyle}>
                                                    {(word as any).article}
                                                </span>
                                                {(word as any).plural && (
                                                    <span className="text-muted-foreground text-xs ml-1">
                                                        / die {(word as any).plural}
                                                    </span>
                                                )}
                                            </div>
                                        )}

                                        {/* Conjunction Details */}
                                        {word.type === 'conjunction' && (
                                            <div className="flex flex-col gap-1 mt-1">
                                                <div className="text-sm font-medium text-purple-700 dark:text-purple-300">
                                                    {(word as any).structure ? `Где глагол? ${(word as any).structure}` : ''}
                                                </div>
                                            </div>
                                        )}

                                        {/* Preposition Details */}
                                        {word.type === 'preposition' && (
                                            <div className="flex gap-1 flex-wrap mt-1">
                                                <Badge variant="outline" className={`text-xs ${badgeStyle} border-current opacity-80`}>
                                                    + {(word as any).case}
                                                </Badge>
                                            </div>
                                        )}

                                        {/* Verb Forms & Cases */}
                                        {word.type === 'verb' && (
                                            <div className="flex flex-col gap-1 mt-1">
                                                <span className="text-sm text-muted-foreground italic">{(word as any).perfektForm}</span>
                                                {((word as any).preposition || (word as any).case) && (
                                                    <div className="flex gap-1 flex-wrap mt-1">
                                                        <Badge variant="outline" className="text-xs border-amber-500/50 text-amber-600 bg-amber-50 dark:bg-amber-950/30">
                                                            {(word as any).preposition ? `+ ${(word as any).preposition}` : ''}
                                                            {(word as any).preposition && (word as any).case ? ' ' : ''}
                                                            {(word as any).case ? `(${(word as any).case})` : ''}
                                                        </Badge>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 text-muted-foreground hover:text-destructive"
                                        onClick={() => {
                                            if (confirm('Удалить слово?')) removeWordFromFolder(folderId, userWord.id);
                                        }}
                                    >
                                        <Plus className="h-4 w-4 rotate-45" />
                                    </Button>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-foreground/80 mb-2 font-medium">{word.russian}</p>
                                {userWord.context && <p className="text-xs text-muted-foreground italic">"{userWord.context}"</p>}

                                <div className="mt-4 flex gap-2 text-xs">
                                    <Badge variant="secondary" className="font-normal opacity-70">
                                        Интервал: {userWord.sm2State.interval}дн
                                    </Badge>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
                {folder.words.length === 0 && (
                    <div className="col-span-full text-center py-12 text-muted-foreground">
                        <p>В этой папке пока нет слов.</p>
                        <p>Добавьте первое слово сверху!</p>
                    </div>
                )}
            </div>
        </div >
    );
}
