
'use client';

import { useState, useEffect, useRef, use } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, Square, Volume2, Headphones, Sparkles, Languages, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useExamTexts } from '@/hooks/use-exam-texts';
import { translateExamText } from '@/ai/flows/translate-exam-text';
import { translateSentenceWords } from '@/ai/flows/translate-sentence-words';
import { useToast } from '@/hooks/use-toast';

import { useSpeech } from '@/hooks/use-speech';

export default function ExamTextReaderPage({ params }: { params: Promise<{ topicId: string }> }) {
    const { topicId } = use(params);
    const { getExamText, isLoading: isHookLoading } = useExamTexts();
    const examText = getExamText(topicId);
    const { toast } = useToast();

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
    const [translation, setTranslation] = useState<string | null>(null);
    const [isTranslating, setIsTranslating] = useState(false);

    // New state for word-by-word translation
    const [sentenceTranslations, setSentenceTranslations] = useState<Record<number, { original: string, translation: string }[]>>({});
    const [isLoadingWords, setIsLoadingWords] = useState<number | null>(null);

    const { speak, stop, isSpeaking } = useSpeech();

    const sentences = examText?.content
        ? examText.content.split(/[.!?]+\s/).filter(s => s.trim().length > 0).map((s, i, arr) => {
            return i < arr.length - 1 ? s + (examText.content.match(/[.!?]/g)?.[i] || '.') : s;
        })
        : [];

    const playText = () => {
        setIsPlaying(true);
        playSentence(0);
    };

    const playSentence = (index: number) => {
        if (!sentences[index]) {
            setIsPlaying(false);
            setCurrentSentenceIndex(null);
            return;
        }

        setCurrentSentenceIndex(index);
        speak(sentences[index], 'de-DE');

        // Fetch word translations if not already cached
        if (!sentenceTranslations[index] && isLoadingWords !== index) {
            fetchWordTranslations(index, sentences[index]);
        }
    };

    useEffect(() => {
        if (isPlaying && !isSpeaking && currentSentenceIndex !== null) {
            if (currentSentenceIndex < sentences.length - 1) {
                const nextIndex = currentSentenceIndex + 1;
                playSentence(nextIndex);
            } else {
                setIsPlaying(false);
                setCurrentSentenceIndex(null);
            }
        }
    }, [isSpeaking, isPlaying]);

    const fetchWordTranslations = async (index: number, sentence: string) => {
        setIsLoadingWords(index);
        try {
            const result = await translateSentenceWords({ sentence });
            setSentenceTranslations(prev => ({
                ...prev,
                [index]: result.words
            }));
        } catch (error) {
            console.error('Word translation error:', error);
        } finally {
            setIsLoadingWords(null);
        }
    };

    const stopText = () => {
        stop();
        setIsPlaying(false);
        setCurrentSentenceIndex(null);
    };

    const togglePause = () => {
        if (isPlaying) {
            stop();
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            if (currentSentenceIndex !== null) {
                playSentence(currentSentenceIndex);
            } else {
                playText();
            }
        }
    }

    const handleTranslate = async () => {
        if (!examText) return;
        if (translation) {
            setTranslation(null);
            return;
        }

        setIsTranslating(true);
        try {
            const result = await translateExamText({ text: examText.content });
            setTranslation(result.translation);
        } catch (error) {
            console.error('Translation error:', error);
            toast({
                title: 'Ошибка перевода',
                description: 'Не удалось получить перевод от ИИ. Попробуйте еще раз.',
                variant: 'destructive',
            });
        } finally {
            setIsTranslating(false);
        }
    };

    if (isHookLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    if (!examText) {
        return (
            <div className="container mx-auto py-12 text-center">
                <h1 className="text-2xl font-bold mb-4">Текст не найден</h1>
                <Button asChild>
                    <Link href="/exam-texts">Вернуться к списку</Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="mb-8">
                <div className="flex justify-between items-start mb-4">
                    <Button asChild variant="ghost" size="sm">
                        <Link href="/exam-texts">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn("gap-2", translation && "bg-primary/10 text-primary border-primary/20")}
                        onClick={handleTranslate}
                        disabled={isTranslating}
                    >
                        {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
                        {translation ? 'Скрыть перевод' : 'Перевод ИИ'}
                    </Button>
                </div>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <Headphones className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black font-headline uppercase leading-tight">{examText.title}</h1>
                        <p className="text-muted-foreground">{examText.level} • {examText.isCustom ? 'Ваш текст' : 'Официальная тема'}</p>
                    </div>
                </div>
            </div>

            <div className="grid gap-8">
                <Card className="border-2 shadow-2xl relative overflow-hidden">
                    {/* Progress Bar */}
                    <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
                        style={{ width: currentSentenceIndex !== null ? `${((currentSentenceIndex + 1) / sentences.length) * 100}%` : '0%' }}
                    />

                    <CardContent className="p-8 md:p-12">
                        <div className="prose prose-lg dark:prose-invert max-w-none leading-relaxed">
                            {sentences.map((sentence, idx) => (
                                <motion.span
                                    key={idx}
                                    animate={{
                                        backgroundColor: currentSentenceIndex === idx ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                        color: currentSentenceIndex === idx ? 'var(--primary)' : 'inherit',
                                        scale: currentSentenceIndex === idx ? 1.01 : 1
                                    }}
                                    className={cn(
                                        "inline-block rounded px-1 transition-all duration-300 cursor-pointer",
                                        currentSentenceIndex === idx && "font-bold shadow-sm"
                                    )}
                                    onClick={() => {
                                        stop();
                                        setIsPlaying(true);
                                        playSentence(idx);
                                    }}
                                >
                                    {sentence}{' '}
                                </motion.span>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {translation && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-primary/5 rounded-2xl p-8 border border-primary/10 relative"
                    >
                        <div className="absolute -top-3 left-6 px-3 bg-primary text-primary-foreground text-[10px] font-bold uppercase rounded-full">
                            Перевод ИИ
                        </div>
                        <div className="prose prose-sm dark:prose-invert italic text-muted-foreground">
                            {translation}
                        </div>
                    </motion.div>
                )}
                {/* Word-by-Word Analysis Section */}
                {currentSentenceIndex !== null && (
                    <div className="mt-6 w-full">
                        <div className="p-6 bg-card rounded-xl border shadow-sm">
                            <h3 className="text-lg font-bold mb-4 font-headline flex items-center gap-2">
                                <Sparkles className="h-5 w-5 text-amber-500" />
                                Разбор слов (в контексте)
                            </h3>

                            {isLoadingWords === currentSentenceIndex ? (
                                <div className="flex items-center gap-2 text-muted-foreground p-4 bg-muted/30 rounded-lg animate-pulse">
                                    <Loader2 className="h-4 w-4 animate-spin" /> Анализируем структуру предложения...
                                </div>
                            ) : sentenceTranslations[currentSentenceIndex] ? (
                                <div className="flex flex-wrap gap-2">
                                    {sentenceTranslations[currentSentenceIndex].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex flex-col bg-muted/30 border rounded-md overflow-hidden hover:border-primary/50 transition-colors"
                                        >
                                            <div className="px-2 py-1 text-base font-medium text-foreground border-b border-border/50">
                                                {item.original}
                                            </div>
                                            <div className="px-2 py-1 text-xs text-muted-foreground bg-background">
                                                {item.translation}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-muted-foreground text-sm italic">
                                    Нажмите на предложение, чтобы увидеть перевод слов.
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-center gap-4">
                {!isPlaying ? (
                    <Button size="lg" className="h-16 px-8 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700" onClick={playText}>
                        <Play className="mr-3 h-6 w-6 fill-current" /> Слушать всё
                    </Button>
                ) : (
                    <>
                        <Button size="lg" variant="outline" className="h-16 w-16 rounded-full shadow-lg border-2" onClick={togglePause}>
                            {isPlaying && isSpeaking ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                        <Button size="lg" variant="destructive" className="h-16 w-16 rounded-full shadow-lg" onClick={stopText}>
                            <Square className="h-6 w-6" />
                        </Button>
                    </>
                )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 p-6 rounded-2xl border">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-primary" />
                        Советы по заучиванию
                    </h3>
                    <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                        <li>Слушайте текст несколько раз с закрытыми глазами.</li>
                        <li>Повторяйте вслух за диктором, соблюдая интонацию.</li>
                        <li>Нажимайте на конкретные предложения, чтобы отработать их отдельно.</li>
                        <li>При необходимости используйте перевод для уточнения смысла.</li>
                    </ul>
                </div>

                <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500" />
                        Инструментарий ИИ
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                        Мы используем Gemini 2.0 для мгновенного перевода. Это помогает лучше понять структуру предложений в текстах уровня B2.
                    </p>
                </div>
            </div>
        </div>
    );
}
