
import { VocabularyWord } from '@/lib/types';
import { useState, useEffect } from 'react';
import { analyzeLeechWithAI } from '@/ai/flows/analyze-leech';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain, Siren, Lightbulb, GraduationCap, Sparkles, BrainCircuit } from 'lucide-react';
import { WordCard } from '@/components/word-card';
import { motion } from 'framer-motion';
import { FormattedGermanWord } from '@/components/formatted-german-word';

interface RemedialViewProps {
    word: VocabularyWord;
    onComplete: () => void;
}

export function RemedialView({ word, onComplete }: RemedialViewProps) {
    const [analysis, setAnalysis] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAnalysis = async () => {
            try {
                const result = await analyzeLeechWithAI(word);
                setAnalysis(result);
            } catch (e) {
                console.error(e);
            } finally {
                setIsLoading(false);
            }
        };
        loadAnalysis();
    }, [word]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-6">
                <div className="relative">
                    <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full scale-150 animate-pulse" />
                    <BrainCircuit className="w-16 h-16 animate-bounce text-primary relative z-10" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-black uppercase tracking-tighter">Глубокий анализ...</h2>
                    <p className="text-muted-foreground text-sm max-w-xs mx-auto">
                        ИИ исследует ваши нейронные связи, чтобы понять, почему <span className="text-primary font-bold">{word.german}</span> вызывает трудности.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 max-w-2xl mx-auto px-4"
        >
            <div className="bg-slate-950 border border-primary/20 rounded-3xl p-8 text-center relative overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="bg-primary/20 p-4 rounded-full border border-primary/30 shadow-inner">
                            <Sparkles className="w-10 h-10 text-primary" />
                        </div>
                    </div>
                    <h1 className="text-3xl font-black text-white mb-2 uppercase tracking-tight">Клиника Ошибок</h1>
                    <p className="text-slate-400 font-medium">Это слово — «пиявка» (Leech). Давайте деактивируем ложную ассоциацию.</p>
                </div>
            </div>

            {/* The Word Itself (Large & Beautiful) */}
            <div className="flex justify-center">
                <div className="p-10 bg-white/5 border border-white/10 rounded-3xl shadow-xl hover:bg-white/10 transition-colors group">
                    <div className="text-5xl font-black text-white tracking-widest group-hover:scale-105 transition-transform">
                        <FormattedGermanWord word={word} />
                    </div>
                    <div className="text-xl text-primary font-bold mt-2 opacity-80">{word.russian}</div>
                </div>
            </div>

            {/* Analysis Cards (Premium Layout) */}
            {analysis && (
                <div className="grid gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Mnemonic */}
                    <Card className="bg-slate-950 border-white/10 shadow-xl relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-1.5 h-full bg-purple-500" />
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-purple-400">
                                <Brain className="w-4 h-4 text-purple-500" />
                                Новая ассоциация
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-xl italic font-serif text-slate-200 leading-relaxed group-hover:text-white transition-colors">
                                &ldquo;{analysis.mnemonic}&rdquo;
                            </p>
                        </CardContent>
                    </Card>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Confusion Trap */}
                        <Card className="bg-slate-950 border-white/10 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-amber-500" />
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-amber-400">
                                    <Siren className="w-3 h-3 text-amber-500" />
                                    Ловушка
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-slate-400 leading-relaxed">{analysis.confusionAnalysis}</p>
                            </CardContent>
                        </Card>

                        {/* Usage Tip */}
                        <Card className="bg-slate-950 border-white/10 shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-emerald-500" />
                            <CardHeader className="pb-2">
                                <CardTitle className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-emerald-400">
                                    <Lightbulb className="w-3 h-3 text-emerald-500" />
                                    Принцип
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-xs text-slate-400 leading-relaxed">{analysis.usageTip}</p>
                            </CardContent>
                        </Card>
                    </div>

                </div>
            )}

            <Button
                onClick={onComplete}
                size="lg"
                className="w-full h-16 text-xl font-black uppercase tracking-widest shadow-2xl active:scale-[0.98] transition-all bg-primary hover:bg-primary/90"
            >
                <GraduationCap className="mr-3 h-7 w-7" />
                Я все осознал
            </Button>
        </motion.div>
    );
}
