
'use client';

import { use, useState, useMemo } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Plus, Loader2, Sparkles, AlertCircle, X, RotateCcw } from 'lucide-react';
import Link from 'next/link';
import { enrichWord } from '@/ai/flows/enrich-word';
import { UserVocabularyWord, INITIAL_SM2_STATE } from '@/lib/types';
import { v4 as uuidv4 } from 'uuid';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FlippableWordCard } from '@/components/flippable-word-card';
import { LearningDashboard } from '@/components/learning-dashboard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SystemGuideModal } from '@/components/system-guide-modal';
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

export default function FolderDetailsPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder, addWordToFolder, removeWordFromFolder, updateWordInFolder } = useCustomFolders();
    const folder = getFolder(folderId);
    const router = useRouter();

    const [newWordInput, setNewWordInput] = useState('');
    const [isAdding, setIsAdding] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showAddWord, setShowAddWord] = useState(false);
    const [reverseMode, setReverseMode] = useState(false);

    // Session State
    const [sessionMode, setSessionMode] = useState(false);
    const [sessionWords, setSessionWords] = useState<UserVocabularyWord[]>([]);

    // Batch Refresh State
    const [isBatchRefreshing, setIsBatchRefreshing] = useState(false);
    const [refreshProgress, setRefreshProgress] = useState('');

    const handleAddWord = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newWordInput.trim() || isAdding) return;

        setIsAdding(true);
        setError(null);

        try {
            const enriched = await enrichWord({ word: newWordInput, context: folder?.name });

            const newWord: UserVocabularyWord = {
                id: uuidv4(),
                word: enriched as any,
                sm2State: { ...INITIAL_SM2_STATE },
                addedAt: Date.now(),
                context: enriched.example,
                contextTranslation: enriched.exampleMeaning,
                synonyms: enriched.synonyms,
                antonyms: enriched.antonyms
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

    const startSession = () => {
        if (!folder) return;
        // Logic: 5 newest + 15 due/random
        // Simplified: Just take last 20 added for now (User requested 20 words session)
        // Or if SRS implemented, take due first.

        // Let's implement a mix:
        const sortedByDate = [...folder.words].sort((a, b) => b.addedAt - a.addedAt);
        const newWords = sortedByDate.slice(0, 5);
        const rest = sortedByDate.slice(5).sort(() => 0.5 - Math.random());
        const reviewWords = rest.slice(0, 15);

        const session = [...newWords, ...reviewWords].sort(() => 0.5 - Math.random());
        setSessionWords(session);
        setSessionMode(true);
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

    const displayWords = sessionMode ? sessionWords : folder.words;

    const handleRefreshWord = async (userWord: UserVocabularyWord) => {
        try {
            const german = userWord.word.german;
            const enriched = await enrichWord({ word: german, context: folder?.name });

            const updatedWord: UserVocabularyWord = {
                ...userWord,
                word: enriched as any,
                synonyms: enriched.synonyms,
                antonyms: enriched.antonyms,
                context: enriched.example,
                contextTranslation: enriched.exampleMeaning
            };

            updateWordInFolder(folderId, updatedWord);
        } catch (e) {
            console.error("Refresh failed", e);
            throw e;
        }
    };

    const handleBatchRefresh = async () => {
        if (!confirm(`Обновить все слова (${folder.words.length}) с помощью AI? Это займет некоторое время.`)) return;

        setIsBatchRefreshing(true);
        const total = folder.words.length;
        let count = 0;

        try {
            for (const word of folder.words) {
                count++;
                setRefreshProgress(`${count} / ${total}`);

                try {
                    await handleRefreshWord(word);
                } catch (err) {
                    console.error(`Failed to refresh word ${word.word.german}`, err);
                }

                // Add delay to be gentle on rate limits (1.5s)
                await new Promise(resolve => setTimeout(resolve, 1500));
            }
        } finally {
            setIsBatchRefreshing(false);
            setRefreshProgress('');
        }
    };

    return (
        <div className="container mx-auto py-8">
            <div className="mb-6">
                <Link href="/my-lectures" className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папкам
                </Link>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                    <div>
                        <Link href="/my-lectures" className="text-sm text-primary hover:underline mb-2 inline-block">
                            &larr; Назад к папкам
                        </Link>
                        <h1 className="text-3xl font-bold font-headline">{folder.name}</h1>
                        <p className="text-muted-foreground">{folder.words.length} слов</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        {isBatchRefreshing ? (
                            <div className="flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-md">
                                <Loader2 className="h-4 w-4 animate-spin text-primary" />
                                <span className="text-sm font-medium">{refreshProgress}</span>
                            </div>
                        ) : (
                            <Button variant="outline" onClick={handleBatchRefresh} disabled={folder.words.length === 0}>
                                <RotateCcw className="h-4 w-4 mr-2" />
                                Обновить все
                            </Button>
                        )}

                        <Button variant="default" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white" onClick={() => router.push(`/my-lectures/${folderId}/deep-dive`)}>
                            Start Deep Dive
                        </Button>
                        <SystemGuideModal />
                        <Button onClick={() => setShowAddWord(!showAddWord)}>
                            {showAddWord ? 'Закрыть' : 'Добавить слово'}
                        </Button>
                    </div>
                </div>
            </div>

            {/* LEARNING DASHBOARD */}
            {!sessionMode && (
                <LearningDashboard
                    totalWords={folder.words.length}
                    onStartSession={startSession}
                    onGenerateStory={() => router.push(`/my-lectures/${folderId}/story`)}
                    onUsageCoach={() => router.push(`/my-lectures/${folderId}/coach`)}
                    onRoleplay={() => router.push(`/my-lectures/${folderId}/roleplay`)}
                    onPodcast={() => router.push(`/my-lectures/${folderId}/podcast`)}
                    onInterivew={() => router.push(`/my-lectures/${folderId}/interview`)}
                    onCollocation={() => router.push(`/my-lectures/${folderId}/collocation`)}
                    onSynonymSwap={() => router.push(`/my-lectures/${folderId}/synonym`)}
                    onStartDrill={() => router.push(`/my-lectures/${folderId}/drill`)}
                />
            )}

            {/* SESSION BANNER */}
            {sessionMode && (
                <div className="bg-primary/10 border border-primary/20 p-4 rounded-lg mb-6 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded">SESSION ACTIVE</span>
                        <p className="text-sm font-medium">Показываются только {sessionWords.length} выбранных слов.</p>
                    </div>
                    <Button size="sm" variant="ghost" onClick={() => setSessionMode(false)}>
                        <X className="h-4 w-4 mr-2" /> Завершить сессию
                    </Button>
                </div>
            )}

            {/* ADD WORD (Only in normal mode) */}
            {(!sessionMode && showAddWord) && (
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
            )}

            {/* VIEW OPTIONS & FILTERS */}
            <div className="flex justify-between items-center mb-4 px-1">
                <div className="flex items-center space-x-2">
                    <Switch id="reverse-mode" checked={reverseMode} onCheckedChange={setReverseMode} />
                    <Label htmlFor="reverse-mode" className="cursor-pointer">Режим перевода (RU &rarr; DE)</Label>
                </div>
            </div>

            {/* WORD GRID With Flip Cards */}
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
                {displayWords.map((userWord) => (
                    <div key={userWord.id} className="relative group/wrapper">
                        <FlippableWordCard
                            userWord={userWord}
                            reverse={reverseMode}
                            onRefresh={() => handleRefreshWord(userWord)}
                        />

                        {!sessionMode && (
                            <Button
                                variant="destructive"
                                size="icon"
                                className="absolute top-2 right-2 z-10 opacity-0 group-hover/wrapper:opacity-100 transition-opacity h-8 w-8 rounded-full shadow-md"
                                onClick={() => {
                                    if (confirm('Удалить слово?')) removeWordFromFolder(folderId, userWord.id);
                                }}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>
                ))}

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
