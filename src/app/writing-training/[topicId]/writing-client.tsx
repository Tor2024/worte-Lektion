'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Copy, CheckCircle2, AlertCircle, Sparkles, Send } from "lucide-react";
import { WritingTopic, UniversalPhrase, WritingTopicCategory } from "@/lib/writing-data";
import { submitLetterAction } from "@/app/actions/writing";
import { useToast } from "@/hooks/use-toast"; // Changed from sonner
import { cn } from "@/lib/utils";

interface WritingClientProps {
    topic: WritingTopic;
    phrases: UniversalPhrase[];
}

export default function WritingClient({ topic, phrases }: WritingClientProps) {
    const [text, setText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const { toast } = useToast(); // Hook usage

    const handleInsertPhrase = (phraseText: string) => {
        setText((prev) => prev + (prev.endsWith(' ') || prev.length === 0 ? '' : ' ') + phraseText);
    };

    const handleSubmit = async () => {
        if (text.trim().length < 50) {
            toast({
                title: "Текст слишком короткий",
                description: "Напишите хотя бы 50 символов.",
                variant: "destructive"
            });
            return;
        }

        setIsSubmitting(true);
        try {
            const response = await submitLetterAction(text, topic.id);
            if (response.success) {
                setResult(response.data);
                toast({
                    title: "Отлично!",
                    description: "Письмо проверено.",
                });
            } else {
                toast({
                    title: "Ошибка",
                    description: "Не удалось проверить письмо. Попробуйте позже.",
                    variant: "destructive"
                });
            }
        } catch (e) {
            toast({
                title: "Ошибка сети",
                description: "Что-то пошло не так.",
                variant: "destructive"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-100px)]">
            {/* LEFT COLUMN: Task & Phrases */}
            <div className="space-y-6 lg:h-full lg:overflow-hidden flex flex-col">
                <Card className="flex-shrink-0">
                    <CardHeader>
                        <CardTitle className="text-xl">Задание</CardTitle>
                        <CardDescription>{topic.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-4 space-y-1 text-sm text-foreground/80">
                            {topic.taskPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>

                <Card className="flex-grow flex flex-col overflow-hidden">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg flex items-center gap-2">
                            <Sparkles className="w-4 h-4 text-primary" />
                            Redemittel (Фразы)
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow overflow-hidden p-0">
                        <ScrollArea className="h-full px-6 pb-4">
                            <div className="space-y-4 pt-2">
                                {['intro', 'body', 'action', 'closing'].map((cat) => {
                                    const catPhrases = phrases.filter(p => p.category === cat);
                                    if (catPhrases.length === 0) return null;
                                    return (
                                        <div key={cat}>
                                            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 opacity-70">
                                                {cat === 'intro' ? 'Вступление' : cat === 'body' ? 'Основная часть' : cat === 'action' ? 'Запрос/Действие' : 'Заключение'}
                                            </h4>
                                            <div className="space-y-2">
                                                {catPhrases.map(p => (
                                                    <div
                                                        key={p.id}
                                                        className="group p-3 rounded-lg border bg-muted/30 hover:bg-muted hover:border-primary/50 transition-all cursor-pointer relative"
                                                        onClick={() => handleInsertPhrase(p.text)}
                                                    >
                                                        <div className="flex justify-between items-start">
                                                            <p className="font-medium text-sm pr-6 leading-tight">{p.text}</p>
                                                            {p.isUniversal && (
                                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200 text-[10px] h-4 px-1 shrink-0">
                                                                    ⭐ Экзамен
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        <p className="text-xs text-muted-foreground mt-1">{p.translation}</p>
                                                        <Copy className="w-3 h-3 absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-primary" />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </ScrollArea>
                    </CardContent>
                </Card>
            </div>

            {/* MIDDLE/RIGHT COLUMN: Editor & Results */}
            <div className="lg:col-span-2 flex flex-col h-full space-y-6">
                {!result ? (
                    <Card className="flex-grow flex flex-col">
                        <CardHeader>
                            <CardTitle>Ваш ответ</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <Textarea
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                placeholder="Пишите письмо здесь..."
                                className="flex-grow text-lg p-6 resize-none font-medium leading-relaxed"
                                spellCheck={false}
                            />
                            <div className="flex justify-between items-center mt-4">
                                <span className="text-sm text-muted-foreground">
                                    {text.length} символов
                                </span>
                                <Button onClick={handleSubmit} disabled={isSubmitting || text.length === 0} size="lg">
                                    {isSubmitting ? 'Проверка...' : (
                                        <>
                                            <Send className="w-4 h-4 mr-2" />
                                            Отправить на проверку
                                        </>
                                    )}
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="flex-grow flex flex-col overflow-hidden space-y-6">
                        {/* Score Cards */}
                        <div className="grid grid-cols-4 gap-4">
                            <Card className="bg-primary/5 border-primary/20">
                                <CardHeader className="p-4 text-center">
                                    <span className="text-3xl font-bold text-primary">{result.rating.total}</span>
                                    <span className="text-xs uppercase text-muted-foreground">Общий балл</span>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="p-4 text-center">
                                    <span className="text-xl font-bold">{result.rating.content}</span>
                                    <span className="text-xs uppercase text-muted-foreground">Содержание</span>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="p-4 text-center">
                                    <span className="text-xl font-bold">{result.rating.grammar}</span>
                                    <span className="text-xs uppercase text-muted-foreground">Грамматика</span>
                                </CardHeader>
                            </Card>
                            <Card>
                                <CardHeader className="p-4 text-center">
                                    <span className="text-xl font-bold">{result.rating.vocabulary}</span>
                                    <span className="text-xs uppercase text-muted-foreground">Словарь</span>
                                </CardHeader>
                            </Card>
                        </div>

                        {/* Main Result Area */}
                        <Tabs defaultValue="correction" className="flex-grow flex flex-col overflow-hidden">
                            <TabsList className="w-full justify-start">
                                <TabsTrigger value="correction">Исправление</TabsTrigger>
                                <TabsTrigger value="feedback">Анализ ошибок</TabsTrigger>
                                <TabsTrigger value="redemittel">Фразы ({result.redemittelFeedback.usedCount})</TabsTrigger>
                            </TabsList>

                            <TabsContent value="correction" className="flex-grow mt-4 overflow-hidden">
                                <Card className="h-full flex flex-col">
                                    <CardContent className="p-0 flex flex-col md:flex-row h-full">
                                        <div className="flex-1 p-6 border-r overflow-y-auto">
                                            <h4 className="font-bold mb-4 text-red-600 flex items-center gap-2">
                                                <AlertCircle className="w-4 h-4" /> Ваш текст
                                            </h4>
                                            <p className="whitespace-pre-wrap text-foreground/80 leading-relaxed text-sm">
                                                {text}
                                            </p>
                                        </div>
                                        <div className="flex-1 p-6 overflow-y-auto bg-green-50/30 dark:bg-green-900/10">
                                            <h4 className="font-bold mb-4 text-green-600 flex items-center gap-2">
                                                <CheckCircle2 className="w-4 h-4" /> Исправленный вариант
                                            </h4>
                                            <p className="whitespace-pre-wrap text-foreground leading-relaxed text-sm">
                                                {result.correctedText}
                                            </p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="feedback" className="flex-grow mt-4 overflow-y-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Работа над ошибками</CardTitle>
                                        <CardDescription>{result.generalFeedback}</CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        {result.mistakes.map((m: any, i: number) => (
                                            <div key={i} className="p-4 rounded-lg border bg-muted/20">
                                                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                                                    <span className="line-through text-red-500 font-medium">{m.original}</span>
                                                    <span className="text-muted-foreground">➔</span>
                                                    <span className="text-green-600 font-bold">{m.correction}</span>
                                                    <Badge variant="outline" className="ml-auto text-xs">{m.type}</Badge>
                                                </div>
                                                <p className="text-sm text-muted-foreground">{m.explanation}</p>
                                            </div>
                                        ))}
                                    </CardContent>
                                </Card>
                            </TabsContent>

                            <TabsContent value="redemittel" className="flex-grow mt-4 overflow-y-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Использование фраз (Redemittel)</CardTitle>
                                        <CardDescription>{result.redemittelFeedback.suggestion}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <h4 className="font-bold text-sm mb-3">Рекомендуемые фразы, которые вы пропустили:</h4>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {result.redemittelFeedback.missingImportant.map((phrase: string, i: number) => (
                                                <div key={i} className="p-3 border rounded bg-blue-50 dark:bg-blue-900/20 text-sm">
                                                    {phrase}
                                                </div>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            </TabsContent>
                        </Tabs>

                        <div className="flex justify-end">
                            <Button variant="outline" onClick={() => setResult(null)}>Попробовать еще раз</Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
