
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Loader2, Sparkles, Send, ArrowRight, Lightbulb, Check, PenTool } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { generateClozeWithAI, type GenerateClozeOutput } from '@/ai/flows/generate-cloze';
import { evaluateProductionWithAI, type EvaluateProductionOutput } from '@/ai/flows/evaluate-production';
import { cn } from '@/lib/utils';
import { SentenceScaffold } from './sentence-scaffold';
import { useSpeech } from '@/hooks/use-speech';
import { FormattedGermanWord } from '@/components/formatted-german-word';

interface ProductionViewProps {
    item: StudyQueueItem;
    storyContext?: string;
    onStoryUpdate?: (sentence: string) => void;
    onResult: (result: 'success' | 'fail') => void;
    mode?: 'full' | 'cloze' | 'skip';
}

export function ProductionView({ item, storyContext, onStoryUpdate, onResult, mode = 'full' }: ProductionViewProps) {
    const { word } = item;
    const [isLoading, setIsLoading] = useState(true);
    const [clozeData, setClozeData] = useState<GenerateClozeOutput | null>(null);
    const [userAnswer, setUserAnswer] = useState('');
    const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
    const [dynamicEvaluation, setDynamicEvaluation] = useState<EvaluateProductionOutput | null>(null);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [showStoryContext, setShowStoryContext] = useState(false);
    const [correctionUserAnswer, setCorrectionUserAnswer] = useState('');
    const [isCorrected, setIsCorrected] = useState(false);

    const [showSuccess, setShowSuccess] = useState(false);
    const { speakSequence, stop, isLoaded } = useSpeech();

    // Stop speech when word changes or component unmounts
    useEffect(() => {
        return () => stop();
    }, [item.id, stop]);

    // Fetch AI context on mount
    useEffect(() => {
        let mounted = true;
        const fetchContext = async () => {
            setIsLoading(true);
            const data = await generateClozeWithAI(word, storyContext);
            if (mounted) {
                setClozeData(data);
                setIsLoading(false);
                // Also update the global story context with the new sentence
                if (onStoryUpdate) {
                    onStoryUpdate(data.sentenceWithBlank.replace('___', data.missingWord));
                }
            }
        };
        fetchContext();
        return () => { mounted = false; };
    }, [word]);

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (!clozeData) return;

        const normalizedUser = userAnswer.trim().toLowerCase();
        const normalizedCorrect = clozeData.missingWord.trim().toLowerCase();

        let isCorrectRes = normalizedUser === normalizedCorrect;

        if (mode === 'cloze' && !isCorrectRes && normalizedUser.length > 0) {
            // Lenient matching logic ...
            const cleanStr = (s: string) => {
                let text = s.toLowerCase().trim();
                text = text.replace(/^(der|die|das|ein|eine|einen|einem|einer|eines)\s+/g, '').trim();
                text = text.replace(/(en|st|e|t)$/, '');
                return text;
            };
            if (cleanStr(normalizedUser) === cleanStr(normalizedCorrect)) isCorrectRes = true;
        }

        if (!isCorrectRes && clozeData.acceptedAnswers?.some(ans => ans.toLowerCase() === normalizedUser)) {
            isCorrectRes = true;
        }

        if (isCorrectRes) {
            setFeedback('correct');
            setShowSuccess(true);

            const sequence = [
                { text: clozeData.sentenceWithBlank.replace('___', clozeData.missingWord), lang: 'de-DE' },
                { text: clozeData.translation, lang: 'ru-RU' }
            ];
            await speakSequence(sequence);
        } else {
            setFeedback('incorrect');
            setIsEvaluating(true);
            try {
                const evalResult = await evaluateProductionWithAI({
                    germanSentence: clozeData.sentenceWithBlank.replace('___', clozeData.missingWord),
                    userAnswer: userAnswer,
                    correctAnswer: clozeData.missingWord,
                    targetWordRussian: word.russian,
                });
                setDynamicEvaluation(evalResult);
            } catch (err) {
                console.error("Evaluation failed", err);
            } finally {
                setIsEvaluating(false);
            }
        }
    };

    const handleContinue = () => {
        onResult(feedback === 'correct' ? 'success' : 'fail');
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-4 text-center animate-pulse min-h-[400px]">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full scale-150 animate-pulse" />
                    <Sparkles className="h-16 w-16 text-primary animate-spin relative z-10" />
                </div>
                <p className="text-primary/60 font-black uppercase tracking-[0.2em] text-[10px]">Нейросеть генерирует задание...</p>
            </div>
        );
    }

    if (!clozeData) return <div>Ошибка загрузки контекста.</div>;

    if (showSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center space-y-6 w-full max-w-2xl px-4"
            >
                <div className="flex flex-col items-center gap-2 mb-2">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(34,197,94,0.5)]">
                        <Check className="h-10 w-10 text-white stroke-[4]" />
                    </div>
                    <h2 className="text-2xl font-black text-green-500 uppercase tracking-widest mt-2">Закреплено!</h2>
                </div>

                <Card className="w-full bg-slate-950 border-green-500/30 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-transparent pointer-events-none" />
                    <CardContent className="p-8 flex flex-col items-center text-center space-y-6 relative z-10">
                        <div className="space-y-4">
                            <p
                                className="text-2xl md:text-3xl font-bold text-white leading-tight tracking-tight border-l-4 border-green-500/50 pl-6 text-left"
                                dangerouslySetInnerHTML={{ __html: clozeData.sentenceWithBlank.replace('___', `<span class="text-green-400 underline decoration-2">${clozeData.missingWord}</span>`) }}
                            />
                            <p className="text-lg text-slate-400 italic text-left pl-10">— {clozeData.translation}</p>
                        </div>

                        <div className="flex items-center gap-2 text-green-500/50 text-[10px] uppercase font-bold tracking-widest animate-pulse mt-4">
                            <BrainCircuit className="h-3 w-3" /> Синхронизация нейронных путей...
                        </div>

                        <Button size="lg" className="w-full h-14 bg-green-600 hover:bg-green-700 font-black uppercase tracking-widest" onClick={handleContinue}>
                            Продолжить <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-4 w-full"
        >
            <div className="flex items-center gap-2 text-primary uppercase text-[8px] font-black tracking-[0.2em] animate-pulse">
                <BrainCircuit className="h-3 w-3" /> Фаза 3: Активный Контекст (Синтез)
            </div>

            <Card className="w-full bg-slate-950 border-primary/20 shadow-2xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
                <CardContent className="p-8 flex flex-col items-center text-center space-y-8 relative z-10">

                    <SentenceScaffold
                        sentenceWithBlank={clozeData.sentenceWithBlank}
                        wordByWord={clozeData.wordByWord || []}
                        missingWord={clozeData.missingWord}
                        userAnswer={userAnswer}
                        feedback={feedback}
                    />

                    <div className="flex flex-col gap-4 items-center w-full">
                        <div className="text-slate-400 italic text-lg opacity-80">&ldquo;{clozeData.translation}&rdquo;</div>

                        {clozeData.hint && (
                            <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                <Lightbulb className="h-3 w-3" /> {clozeData.hint}
                            </div>
                        )}

                        {!feedback && (
                            <form onSubmit={handleSubmit} className="w-full max-w-sm flex gap-3 mt-4">
                                <Input
                                    autoFocus
                                    placeholder="Впишите пропущенное слово..."
                                    className="h-14 text-xl bg-white/5 border-white/10 text-white focus:border-primary/50 transition-all font-bold"
                                    value={userAnswer}
                                    onChange={(e) => setUserAnswer(e.target.value)}
                                    autoComplete="off"
                                />
                                <Button size="icon" className="h-14 w-14 shadow-lg active:scale-95 transition-transform" type="submit" disabled={!userAnswer}>
                                    <Send className="h-6 w-6" />
                                </Button>
                            </form>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Error Feedback Section (Enhanced) */}
            <AnimatePresence>
                {feedback === 'incorrect' && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        className="w-full max-w-lg space-y-4"
                    >
                        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 space-y-6">
                            <div className="flex items-center gap-4 text-xl justify-center">
                                <span className="text-red-400 line-through decoration-2 opacity-50 font-bold">{userAnswer}</span>
                                <ArrowRight className="h-5 w-5 text-slate-500" />
                                <span className="text-white font-black text-2xl px-3 py-1 bg-red-500 shadow-lg rounded-lg">{clozeData.missingWord}</span>
                            </div>

                            <div className="space-y-4 bg-slate-900/50 p-4 rounded-xl border border-white/5">
                                {isEvaluating ? (
                                    <div className="flex items-center gap-3 text-primary animate-pulse py-2">
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                        <span className="text-xs font-black uppercase tracking-widest">Анализ ошибки...</span>
                                    </div>
                                ) : dynamicEvaluation ? (
                                    <div className="space-y-4 text-sm leading-relaxed text-slate-300">
                                        <div
                                            className="prose prose-invert prose-sm max-w-none border-l-2 border-primary/30 pl-4"
                                            dangerouslySetInnerHTML={{ __html: dynamicEvaluation.comparisonFeedback }}
                                        />
                                    </div>
                                ) : (
                                    <div className="text-sm text-slate-300 border-l-2 border-primary/30 pl-4">
                                        {clozeData.grammarExplanation}
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3">
                                <div className="text-[10px] font-black text-red-400 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <PenTool className="h-3 w-3" /> Напишите правильно:
                                </div>
                                <div className="flex gap-2">
                                    <Input
                                        placeholder={clozeData.missingWord}
                                        className={cn(
                                            "h-12 text-lg font-bold bg-slate-900 border-2 transition-all",
                                            isCorrected ? "border-green-500 text-green-400" : "border-red-500/50 text-white focus:border-red-500"
                                        )}
                                        value={correctionUserAnswer}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            setCorrectionUserAnswer(val);
                                            if (val.trim().toLowerCase() === clozeData.missingWord.toLowerCase()) {
                                                setIsCorrected(true);
                                            }
                                        }}
                                        disabled={isCorrected}
                                        autoFocus
                                    />
                                    {isCorrected && (
                                        <div className="bg-green-500 text-white w-12 h-12 rounded-lg flex items-center justify-center shrink-0 shadow-lg">
                                            <Check className="h-6 w-6 stroke-[3]" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className="w-full h-14 text-md font-black uppercase tracking-widest shadow-xl"
                                onClick={handleContinue}
                                disabled={!isCorrected}
                            >
                                {isCorrected ? 'Идем дальше' : 'Сначала исправьте ошибку'}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
