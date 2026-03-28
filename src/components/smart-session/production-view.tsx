
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Loader2, Sparkles, Send, ArrowRight, Lightbulb, Check, PenTool, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { generateClozeWithAI, type GenerateClozeOutput } from '@/ai/flows/generate-cloze';
import { evaluateProductionWithAI, type EvaluateProductionOutput } from '@/ai/flows/evaluate-production';
import { cn } from '@/lib/utils';
import { SentenceScaffold } from './sentence-scaffold';
import { useSpeech } from '@/hooks/use-speech';
import { FormattedGermanWord } from '@/components/formatted-german-word';
import { UnifiedWordHeader } from './unified-word-header';
import { InfoModule } from './info-module';

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
                className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl px-4 mx-auto"
            >
                <div className="flex flex-col items-center gap-3">
                    <div className="w-20 h-20 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.4)] animate-bounce border-4 border-white dark:border-slate-900 transition-all duration-500">
                        <Check className="h-12 w-12 text-white stroke-[4]" />
                    </div>
                    <h2 className="text-3xl font-black text-emerald-500 uppercase tracking-[0.2em] mt-2">Закреплено!</h2>
                </div>

                <Card className="w-full bg-white dark:bg-slate-950 border-none shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden rounded-[3rem] relative">
                    <div className="h-1.5 w-full bg-emerald-500" />
                    <CardContent className="p-8 sm:p-12 flex flex-col items-center space-y-10">
                        
                        <UnifiedWordHeader word={word} showRussian={true} />

                        {/* Sentence Reinforcement */}
                        <div className="w-full bg-slate-50 dark:bg-slate-900 border-2 border-emerald-500/20 p-8 rounded-[2.5rem] relative group">
                            <div className="absolute top-4 left-6 px-3 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-full">
                                Синтез в контексте
                            </div>
                            <div className="space-y-4 pt-4">
                                <p 
                                    className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white leading-tight tracking-tight border-l-4 border-emerald-500 pl-6 text-left"
                                    dangerouslySetInnerHTML={{ __html: clozeData.sentenceWithBlank.replace('___', `<span class="text-emerald-500 underline decoration-4">${clozeData.missingWord}</span>`) }}
                                />
                                <p className="text-lg text-slate-400 italic text-left pl-10">— {clozeData.translation}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4 text-emerald-500/50 text-[10px] uppercase font-black tracking-[0.2em] animate-pulse">
                            <BrainCircuit className="h-4 w-4" /> Следующее задание...
                        </div>

                        <Button size="lg" className="w-full h-16 bg-emerald-600 hover:bg-emerald-700 font-black uppercase tracking-widest text-lg rounded-3xl shadow-xl transition-all active:scale-95" onClick={handleContinue}>
                            Идем дальше <ArrowRight className="ml-2 h-6 w-6" />
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-8 w-full max-w-4xl mx-auto"
        >
            <div className="flex items-center gap-3 text-primary/60 uppercase text-[10px] tracking-[0.2em] font-black animate-pulse">
                <BrainCircuit className="h-4 w-4" />
                <span>Фаза 3: Активный Контекст (Синтез)</span>
            </div>

            <Card className="w-full bg-slate-950 border-2 border-primary/20 shadow-2xl relative overflow-hidden rounded-[3rem] group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <CardContent className="p-8 sm:p-14 flex flex-col items-center text-center space-y-10 relative z-10">
                    
                    {/* Header showing the target word */}
                    <UnifiedWordHeader word={word} isDark={true} className="opacity-80 scale-90" />

                    <div className="w-full space-y-8">
                        <SentenceScaffold
                            sentenceWithBlank={clozeData.sentenceWithBlank}
                            wordByWord={clozeData.wordByWord || []}
                            missingWord={clozeData.missingWord}
                            userAnswer={userAnswer}
                            feedback={feedback}
                        />

                        <div className="flex flex-col gap-6 items-center w-full">
                            <div className="text-slate-400 italic text-2xl font-medium">&ldquo;{clozeData.translation}&rdquo;</div>

                            {clozeData.hint && (
                                <InfoModule title="Подсказка" icon={Lightbulb} variant="primary" className="bg-white/5 border-white/10 max-w-sm">
                                    <p className="text-xs text-slate-300 italic">{clozeData.hint}</p>
                                </InfoModule>
                            )}

                            {!feedback && (
                                <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-4 mt-6">
                                    <Input
                                        autoFocus
                                        placeholder="Впишите пропущенное слово..."
                                        className="h-16 text-2xl bg-white/5 border-2 border-white/10 text-white focus:border-primary transition-all font-black rounded-3xl px-6"
                                        value={userAnswer}
                                        onChange={(e) => setUserAnswer(e.target.value)}
                                        autoComplete="off"
                                    />
                                    <Button size="icon" className="h-16 w-16 shadow-xl active:scale-95 transition-transform bg-primary hover:bg-primary/90 rounded-2xl" type="submit" disabled={!userAnswer}>
                                        <Send className="h-8 w-8" />
                                    </Button>
                                </form>
                            )}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Error Feedback Section (Enhanced) */}
            <AnimatePresence>
                {feedback === 'incorrect' && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="w-full max-w-2xl space-y-6"
                    >
                        <div className="bg-red-500/10 border-2 border-red-500/20 rounded-[2.5rem] p-8 space-y-8 shadow-2xl">
                            <div className="flex items-center gap-4 text-xl justify-center bg-black/20 p-6 rounded-3xl border border-white/5">
                                <span className="text-red-400 line-through decoration-4 opacity-50 font-black text-2xl">{userAnswer}</span>
                                <ArrowRight className="h-6 w-6 text-slate-500" />
                                <span className="text-white font-black text-3xl px-4 py-2 bg-red-600 shadow-2xl rounded-xl ring-4 ring-red-600/20 animate-in zoom-in-110">
                                    {clozeData.missingWord}
                                </span>
                            </div>

                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-red-400 uppercase tracking-[0.3em] flex items-center gap-2 pl-2">
                                    <Activity className="h-4 w-4" /> Анализ и грамматика
                                </div>
                                <div className="bg-slate-900/80 p-6 rounded-3xl border-2 border-white/5 shadow-inner">
                                    {isEvaluating ? (
                                        <div className="flex items-center gap-4 text-primary animate-pulse py-4 justify-center">
                                            <Loader2 className="h-8 w-8 animate-spin" />
                                            <span className="text-sm font-black uppercase tracking-widest">Нейросеть проверяет нюансы...</span>
                                        </div>
                                    ) : dynamicEvaluation ? (
                                        <div className="space-y-4 text-lg leading-relaxed text-slate-200 font-medium">
                                            <div
                                                className="prose prose-invert prose-lg max-w-none border-l-4 border-primary pl-6 py-2"
                                                dangerouslySetInnerHTML={{ __html: dynamicEvaluation.comparisonFeedback }}
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-lg text-slate-200 border-l-4 border-primary pl-6 font-medium italic">
                                            {clozeData.grammarExplanation}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-emerald-400 uppercase tracking-[0.3em] flex items-center gap-2 pl-2">
                                    <PenTool className="h-4 w-4" /> Закрепление (Напишите правильно)
                                </div>
                                <div className="flex gap-4">
                                    <Input
                                        placeholder={clozeData.missingWord}
                                        className={cn(
                                            "h-16 text-2xl font-black bg-slate-900 border-4 transition-all rounded-[2rem] px-6 shadow-inner",
                                            isCorrected ? "border-emerald-500 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "border-red-500/50 text-white focus:border-red-500"
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
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            className="bg-emerald-500 text-white w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl"
                                        >
                                            <Check className="h-10 w-10 stroke-[4]" />
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            <Button
                                size="lg"
                                className={cn(
                                    "w-full h-16 text-lg font-black uppercase tracking-widest shadow-2xl rounded-3xl transition-all",
                                    isCorrected ? "bg-emerald-600 hover:bg-emerald-700" : "bg-slate-800 opacity-50"
                                )}
                                onClick={handleContinue}
                                disabled={!isCorrected}
                            >
                                {isCorrected ? 'Продолжить обучение' : 'Сначала исправьте ошибку выше'}
                            </Button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
