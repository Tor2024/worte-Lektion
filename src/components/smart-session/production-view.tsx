
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BrainCircuit, Loader2, Sparkles, Send, ArrowRight, Eye, EyeOff, PenTool, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { generateClozeWithAI, type GenerateClozeOutput } from '@/ai/flows/generate-cloze';
import { evaluateProductionWithAI, type EvaluateProductionOutput } from '@/ai/flows/evaluate-production';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

interface ProductionViewProps {
    item: StudyQueueItem;
    storyContext?: string;
    onStoryUpdate?: (sentence: string) => void;
    onResult: (result: 'success' | 'fail') => void;
}

export function ProductionView({ item, storyContext, onStoryUpdate, onResult }: ProductionViewProps) {
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

        let isCorrect = normalizedUser === normalizedCorrect;

        // Multi-answer check
        if (!isCorrect && clozeData.acceptedAnswers && clozeData.acceptedAnswers.length > 0) {
            isCorrect = clozeData.acceptedAnswers.some(ans => ans.toLowerCase() === normalizedUser);
        }

        if (isCorrect) {
            setFeedback('correct');
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
            <div className="flex flex-col items-center justify-center p-12 space-y-4 text-center animate-pulse">
                <Sparkles className="h-12 w-12 text-primary animate-spin" />
                <p className="text-muted-foreground">ИИ готовит новое задание...</p>
            </div>
        );
    }

    if (!clozeData) return <div>Ошибка загрузки контекста.</div>;

    // Split sentence by ___ to inject input
    const parts = clozeData.sentenceWithBlank.split('___');

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-8"
        >
            <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs tracking-widest">
                <BrainCircuit className="h-4 w-4" /> Фаза 3: Активный Контекст
            </div>

            <Card className="w-full bg-card border-2 border-primary/10 shadow-xl overflow-hidden">
                <CardContent className="p-8 flex flex-col items-center text-center space-y-8">

                    <div className="text-2xl sm:text-3xl font-medium leading-relaxed max-w-xl text-center">
                        {parts[0]}
                        <span className="inline-block border-b-2 border-primary mx-1 min-w-[100px] font-bold text-primary align-baseline relative top-[-2px]">
                            {feedback ? (
                                <span className={feedback === 'correct' ? 'text-green-600' : 'text-red-600'}>
                                    {feedback === 'correct' ? clozeData.missingWord : userAnswer}
                                </span>
                            ) : (
                                <span className="opacity-0">placeholder</span>
                            )}
                        </span>
                        {parts[1]}
                    </div>

                    <div className="text-muted-foreground italic flex flex-col gap-1 items-center">
                        <div>{clozeData.translation}</div>
                        {clozeData.hint && <div className="text-xs bg-muted px-2 py-1 rounded text-primary">{clozeData.hint}</div>}
                        {item.mnemonic && (
                            <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-amber-800 text-[10px] italic max-w-xs">
                                <b>💡 МНЕМОНИКА:</b> &ldquo;{item.mnemonic}&rdquo;
                            </div>
                        )}
                    </div>

                    {!feedback && (
                        <form onSubmit={handleSubmit} className="w-full max-w-sm flex gap-2 mt-8">
                            <Input
                                autoFocus
                                placeholder="Впишите слово..."
                                className="h-12 text-lg"
                                value={userAnswer}
                                onChange={(e) => setUserAnswer(e.target.value)}
                            />
                            <Button size="icon" className="h-12 w-12" type="submit" disabled={!userAnswer}>
                                <Send className="h-5 w-5" />
                            </Button>
                        </form>
                    )}

                    {/* Story Context Visualization */}
                    {storyContext && (
                        <div className="w-full flex flex-col items-end gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2 text-[10px] uppercase font-bold tracking-widest text-muted-foreground hover:text-primary gap-1"
                                onClick={() => setShowStoryContext(!showStoryContext)}
                            >
                                {showStoryContext ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                {showStoryContext ? 'Скрыть контекст' : 'Показать контекст истории'}
                            </Button>

                            <AnimatePresence>
                                {showStoryContext && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 bg-muted/30 rounded-lg text-xs text-muted-foreground italic text-left w-full border border-dashed overflow-hidden"
                                    >
                                        <span className="font-bold uppercase tracking-widest text-[10px] block mb-1 opacity-50">Контекст истории ({word.german}):</span>
                                        &ldquo;...{storyContext}&rdquo;
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                </CardContent>
            </Card>

            {feedback && (
                <div className="w-full max-w-lg space-y-4 animate-in slide-in-from-bottom-4 shadow-2xl rounded-2xl overflow-hidden border">
                    {feedback === 'correct' ? (
                        <div className="p-6 bg-green-50 text-green-800 flex items-start gap-4">
                            <div className="bg-green-100 p-2 rounded-full"><Sparkles className="h-6 w-6 text-green-600" /></div>
                            <div>
                                <div className="text-xl font-black">Правда!</div>
                                {userAnswer.trim().toLowerCase() !== clozeData.missingWord.toLowerCase() && (
                                    <div className="text-sm opacity-80 mt-1">Обычно говорят: <b>{clozeData.missingWord}</b></div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            {/* Correction Header */}
                            <div className="p-6 bg-slate-50 border-b flex flex-col items-center text-center gap-3">
                                <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Коррекция</div>
                                <div className="flex items-center gap-4 text-xl">
                                    <span className="text-red-400 line-through decoration-2 opacity-50">{userAnswer}</span>
                                    <ArrowRight className="h-5 w-5 text-slate-300" />
                                    <span className="text-green-600 font-black text-2xl underline decoration-3">{clozeData.missingWord}</span>
                                </div>
                            </div>

                            {/* Analysis Section */}
                            <div className="p-6 bg-white space-y-6">
                                {isEvaluating ? (
                                    <div className="flex items-center gap-2 text-primary animate-pulse py-4">
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                        <span className="text-sm font-bold">ИИ анализирует вашу ошибку...</span>
                                    </div>
                                ) : dynamicEvaluation ? (
                                    <div className="space-y-6">
                                        {/* Word Definitions */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div className="bg-slate-50 p-3 rounded-lg border">
                                                <div className="text-[10px] font-bold uppercase text-slate-400 mb-1">Вариант: {userAnswer}</div>
                                                <div className="text-sm text-slate-700">{dynamicEvaluation.userWordDefinition || "Слово не распознано"}</div>
                                            </div>
                                            <div className="bg-primary/5 p-3 rounded-lg border border-primary/10">
                                                <div className="text-[10px] font-bold uppercase text-primary/60 mb-1">Ожидалось: {clozeData.missingWord}</div>
                                                <div className="text-sm text-slate-700">{dynamicEvaluation.correctWordDefinition}</div>
                                            </div>
                                        </div>

                                        {/* Comparison */}
                                        <div className="space-y-2">
                                            <div className="text-xs font-bold uppercase tracking-widest text-primary/60 flex items-center gap-2">
                                                <BrainCircuit className="h-4 w-4" /> Почему так?
                                            </div>
                                            <div
                                                className="text-slate-700 leading-relaxed prose prose-slate max-w-none text-sm"
                                                dangerouslySetInnerHTML={{ __html: dynamicEvaluation.comparisonFeedback }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold uppercase tracking-widest text-primary/60 flex items-center gap-2">
                                            <BrainCircuit className="h-4 w-4" /> Почему так?
                                        </div>
                                        <div
                                            className="text-slate-700 leading-relaxed prose prose-slate max-w-none text-sm"
                                            dangerouslySetInnerHTML={{ __html: clozeData.grammarExplanation }}
                                        />
                                    </div>
                                )}

                                {clozeData.examples && clozeData.examples.length > 0 && (
                                    <div className="space-y-2">
                                        <div className="text-xs font-bold uppercase tracking-widest text-slate-400">Еще примеры</div>
                                        <div className="grid gap-2">
                                            {clozeData.examples.map((ex, i) => (
                                                <div
                                                    key={i}
                                                    className="text-xs italic bg-slate-50 p-2 rounded border-l-2 border-slate-200 text-slate-600"
                                                    dangerouslySetInnerHTML={{ __html: ex }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Error Correction Input */}
                                <div className="mt-8 p-4 bg-red-50 rounded-xl border-2 border-red-200 space-y-4">
                                    <div className="text-sm font-bold text-red-800 uppercase tracking-tight flex items-center gap-2">
                                        <PenTool className="h-4 w-4" /> Напишите правильный ответ для закрепления:
                                    </div>
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder={clozeData.missingWord}
                                            className={cn(
                                                "h-12 text-lg border-2",
                                                isCorrected ? "border-green-500 bg-green-50" : "border-red-300 focus:border-red-500"
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
                                            autoComplete="off"
                                            autoCorrect="off"
                                        />
                                        {isCorrected && (
                                            <div className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center">
                                                <Check className="h-6 w-6" />
                                            </div>
                                        )}
                                    </div>
                                    {!isCorrected && (
                                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">Нужно вписать слово без ошибок</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    <div className="p-4 bg-white border-t">
                        <Button
                            size="lg"
                            className="w-full h-14 text-lg shadow-lg font-bold"
                            onClick={handleContinue}
                            disabled={feedback === 'incorrect' && !isCorrected}
                        >
                            {feedback === 'correct' ? 'Идем дальше' : (isCorrected ? 'Теперь можно продолжать' : 'Сначала исправьте ошибку')}
                        </Button>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
