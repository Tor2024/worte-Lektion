'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatGermanWord, getGenderColorClass } from '@/lib/german-utils';
import { BrainCircuit, Check, X, ArrowRight, MapPin, Link, Activity, Lightbulb, BookOpen, Repeat, Languages } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';
import { useSpeech } from '@/hooks/use-speech';
import { commonWords } from '@/lib/common-words';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { FormattedGermanWord } from '../formatted-german-word';
import { UnifiedWordHeader } from './unified-word-header';
import { InfoModule } from './info-module';

interface RecognitionViewProps {
    item: StudyQueueItem;
    onResult: (result: 'success' | 'fail', confusedWithId?: string) => void;
    onMarkAsKnown: () => void;
    direction?: 0 | 1; // 0 = DE->RU, 1 = RU->DE
}

export function RecognitionView({ item, onResult, onMarkAsKnown, direction: forcedDirection }: RecognitionViewProps) {
    const { word } = item;
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const { speak, speakSequence, stop, isLoaded } = useSpeech();

    // Reset state when item changes
    useEffect(() => {
        setSelectedOption(null);
        setIsCorrect(null);
        setShowSuccess(false);
    }, [item.id]);

    // Direction logic (forced or random)
    const direction = useMemo(() =>
        forcedDirection !== undefined ? forcedDirection : (Math.random() > 0.5 ? 1 : 0),
        [item.id, forcedDirection]);

    // 1. AUTO-SPEAK THE QUESTION (Stage 2 & 3 Logic)
    useEffect(() => {
        if (!isLoaded || selectedOption || showSuccess) return;

        const questionText = direction === 0 ? formatGermanWord(word) : word.russian;
        const lang = direction === 0 ? 'de-DE' : 'ru-RU';

        const timer = setTimeout(() => {
            speak(questionText, lang);
        }, 400);

        return () => {
            clearTimeout(timer);
            stop();
        };
    }, [item.id, direction, isLoaded]);

    const options = useMemo(() => {
        const confusedWordIds = Object.keys(item.confusedWith || {})
            .sort((a, b) => (item.confusedWith![b] || 0) - (item.confusedWith![a] || 0))
            .slice(0, 2);

        const confusedWords = commonWords.filter(w => confusedWordIds.includes(w.german));
        const confusionDistractors = confusedWords.map(w => direction === 0 ? w.russian : formatGermanWord(w));

        const needed = 3 - confusionDistractors.length;
        const randomDistractors = commonWords
            .filter(w => w.german !== word.german && !confusedWordIds.includes(w.german))
            .sort(() => Math.random() - 0.5)
            .slice(0, Math.max(0, needed))
            .map(w => direction === 0 ? w.russian : formatGermanWord(w));

        const correct = direction === 0 ? word.russian : formatGermanWord(word);
        return [...confusionDistractors, ...randomDistractors, correct].sort(() => Math.random() - 0.5);
    }, [word.german, direction, item.confusedWith]);

    const handleSelect = async (option: string) => {
        if (selectedOption || showSuccess) return;

        setSelectedOption(option);

        // 2. SPEAK THE SELECTION (Stage 2 & 3 Logic)
        const answerLang = direction === 0 ? 'ru-RU' : 'de-DE';
        speak(option, answerLang);

        const correctValue = direction === 0 ? word.russian : formatGermanWord(word);
        const correct = option === correctValue;
        setIsCorrect(correct);

        if (correct) {
            setShowSuccess(true);

            // Sequence for reinforcement on success
            const sequence: { text: string, lang: string }[] = [];
            if (direction === 0) {
                sequence.push({ text: word.russian, lang: 'ru-RU' });
                sequence.push({ text: formatGermanWord(word), lang: 'de-DE' });
            } else {
                sequence.push({ text: formatGermanWord(word), lang: 'de-DE' });
                sequence.push({ text: word.russian, lang: 'ru-RU' });
            }

            const firstCollocation = (word as any).collocations?.[0];
            if (firstCollocation) {
                sequence.push({ text: firstCollocation.phrase, lang: 'de-DE' });
                sequence.push({ text: firstCollocation.translation, lang: 'ru-RU' });
            }

            setTimeout(async () => {
                await speakSequence(sequence);
                await new Promise(r => setTimeout(r, 400));
                onResult('success');
            }, 600);
        } else {
            const confusedWord = commonWords.find(w =>
                (direction === 0 ? w.russian : formatGermanWord(w)) === option
            );
            setTimeout(() => {
                onResult('fail', confusedWord?.german);
            }, 1200);
        }
    };

    if (showSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl px-4 mx-auto"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-bounce border-4 border-white dark:border-slate-900 transition-all duration-500">
                        <Check className="h-12 w-12 text-white stroke-[4]" />
                    </div>
                    <h2 className="text-3xl font-black text-emerald-500 uppercase tracking-[0.2em] mt-2">Верно!</h2>
                </div>

                <Card className="w-full bg-white dark:bg-slate-950 border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden rounded-[3rem] relative">
                    <div className="h-1.5 w-full bg-emerald-500" />
                    <CardContent className="p-8 sm:p-12 flex flex-col items-center space-y-10">
                        <UnifiedWordHeader word={word} showRussian={true} />

                        <div className="w-full flex flex-wrap gap-4 justify-center">
                            {(word.type === 'verb' || word.type === 'adjective') && (word as any).governance?.[0] && (
                                <InfoModule title="Управление" icon={MapPin} variant="success">
                                    <div className="flex items-center gap-3 text-2xl font-black">
                                        <span>+ {(word as any).governance[0].preposition === "без предлога" ? "∅" : (word as any).governance[0].preposition}</span>
                                        <Badge className="bg-emerald-600 font-extrabold">{(word as any).governance[0].case}</Badge>
                                    </div>
                                </InfoModule>
                            )}

                            {(word as any).collocations?.[0] && (
                                <InfoModule title="Лексический якорь" icon={BookOpen} variant="amber">
                                    <p className="font-bold text-slate-800 dark:text-slate-200">{(word as any).collocations[0].phrase}</p>
                                    <p className="text-xs text-muted-foreground italic mt-1">{(word as any).collocations[0].translation}</p>
                                </InfoModule>
                            )}
                        </div>

                        <div className="flex items-center gap-4 text-emerald-500/50 text-[10px] uppercase font-black tracking-[0.2em] animate-pulse">
                            <BrainCircuit className="h-4 w-4" /> Следующее слово через секунду...
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto"
        >
            <div className="flex items-center gap-3 text-primary/60 uppercase text-[10px] tracking-[0.2em] font-black">
                <BrainCircuit className="h-4 w-4 animate-pulse" />
                <span>Фаза 2: Укрепление нейронной связи</span>
            </div>

            <Card className="w-full bg-slate-950 border-2 border-primary/20 shadow-2xl relative overflow-hidden rounded-[3rem] group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/20 blur-[100px] rounded-full group-hover:bg-primary/30 transition-all duration-700" />

                <CardContent className="p-8 sm:p-14 flex flex-col items-center text-center relative z-10 space-y-8">
                    <div className="flex flex-col items-center space-y-2">
                        <div className="text-[10px] font-black text-primary/40 uppercase tracking-[0.3em] bg-primary/5 px-4 py-1.5 rounded-full border border-primary/10">
                            {direction === 0 ? "Понимаете ли вы это слово?" : "Как это будет по-немецки?"}
                        </div>

                        <div className="pt-4">
                            {direction === 0 ? (
                                <UnifiedWordHeader word={word} isDark={true} className="scale-110" />
                            ) : (
                                <div className="text-5xl sm:text-6xl font-black tracking-tighter text-white italic drop-shadow-lg">
                                    {word.russian}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-6 w-full max-w-md">
                        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-primary/30" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-primary/40">Выберите вариант</span>
                        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-primary/30" />
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {options.map((option, idx) => {
                    const isTarget = option === (direction === 0 ? word.russian : formatGermanWord(word));
                    const isSelected = selectedOption === option;

                    return (
                        <Button
                            key={idx}
                            variant="outline"
                            className={cn(
                                "h-24 text-xl font-black rounded-3xl border-2 transition-all duration-300 relative overflow-hidden",
                                !selectedOption && "bg-white/5 border-white/10 hover:border-primary hover:bg-primary/5 hover:scale-[1.02] active:scale-95 text-slate-300 hover:text-white shadow-lg",
                                isTarget && selectedOption && "bg-emerald-600 border-emerald-500 text-white shadow-[0_0_30px_rgba(16,185,129,0.4)] z-20",
                                isSelected && !isTarget && "bg-red-600 border-red-500 text-white shadow-[0_0_30px_rgba(239,68,68,0.4)] z-20"
                            )}
                            onClick={() => handleSelect(option)}
                            disabled={!!selectedOption || showSuccess}
                        >
                            <span className="relative z-10">{option}</span>
                            {isSelected && (isTarget ? <Check className="absolute right-6 h-8 w-8 stroke-[4]" /> : <X className="absolute right-6 h-8 w-8 stroke-[4]" />)}
                        </Button>
                    );
                })}
            </div>

            {!selectedOption && (
                <Button
                    variant="ghost"
                    size="sm"
                    className="text-muted-foreground/40 hover:text-green-500 font-black uppercase text-[9px] tracking-[0.2em] transition-all hover:bg-transparent"
                    onClick={onMarkAsKnown}
                >
                    Знаю отлично (пропустить)
                </Button>
            )}
        </motion.div>
    );
}
