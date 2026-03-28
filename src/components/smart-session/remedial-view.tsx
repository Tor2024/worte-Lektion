
import { VocabularyWord } from '@/lib/types';
import { useState, useEffect } from 'react';
import { analyzeLeechWithAI } from '@/ai/flows/analyze-leech';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain, Siren, Lightbulb, GraduationCap, Sparkles, BrainCircuit } from 'lucide-react';
import { WordCard } from '@/components/word-card';
import { motion } from 'framer-motion';
import { FormattedGermanWord } from '@/components/formatted-german-word';
import { UnifiedWordHeader } from './unified-word-header';
import { InfoModule } from './info-module';
import { useSpeech } from '@/hooks/use-speech';

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
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center space-y-10 w-full max-w-4xl mx-auto px-4"
        >
            {/* Header: Error Clinic Context */}
            <div className="w-full bg-slate-950 border-2 border-red-500/20 rounded-[3rem] p-10 text-center relative overflow-hidden shadow-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-transparent pointer-events-none" />
                <div className="absolute -right-20 -top-20 w-80 h-80 bg-red-500/10 blur-[100px] rounded-full group-hover:bg-red-500/20 transition-all duration-700" />
                
                <div className="relative z-10 flex flex-col items-center">
                    <div className="bg-red-500/20 p-5 rounded-full border border-red-500/30 shadow-inner mb-6 group-hover:scale-110 transition-transform">
                        <Siren className="w-12 h-12 text-red-500 animate-pulse" />
                    </div>
                    <h1 className="text-4xl font-black text-white mb-3 uppercase tracking-tighter">Клиника Ошибок</h1>
                    <p className="text-slate-400 font-medium max-w-md italic">Это слово — «пиявка» (Leech). Нам нужно разрушить ложную нейронную связь.</p>
                </div>
            </div>

            {/* The Word: Unified Header */}
            <Card className="w-full bg-white dark:bg-slate-950 border-none shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.4)] overflow-hidden rounded-[3rem] relative">
                <div className="h-2 w-full bg-red-500" />
                <CardContent className="p-12 flex flex-col items-center">
                    <UnifiedWordHeader word={word} showRussian={true} autoSpeak={true} />
                </CardContent>
            </Card>

            {/* AI Analysis: Modular Tiles */}
            {analysis && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full animate-in fade-in slide-in-from-bottom-6 duration-1000">
                    
                    {/* New Association (Mnemonic) - Full Width */}
                    <div className="col-span-1 md:col-span-2">
                        <InfoModule title="Новая ассоциация (Мгновенное решение)" icon={Brain} variant="primary" className="bg-slate-950 border-2 border-primary/20 p-8">
                            <p className="text-2xl italic font-serif text-white leading-relaxed text-center py-4">
                                &ldquo;{analysis.mnemonic}&rdquo;
                            </p>
                        </InfoModule>
                    </div>

                    {/* Confusion Trap */}
                    <InfoModule title="Ловушка: Почему вы ошиблись?" icon={Siren} variant="amber" className="bg-slate-950 border-white/5 h-full">
                        <p className="text-sm text-slate-300 leading-relaxed italic">{analysis.confusionAnalysis}</p>
                    </InfoModule>

                    {/* Usage Tip */}
                    <InfoModule title="Железный принцип использования" icon={Lightbulb} variant="success" className="bg-slate-950 border-white/5 h-full">
                        <p className="text-sm text-slate-300 leading-relaxed italic">{analysis.usageTip}</p>
                    </InfoModule>
                </div>
            )}

            <Button
                onClick={onComplete}
                size="lg"
                className="w-full h-20 text-2xl font-black uppercase tracking-[0.2em] shadow-2xl active:scale-[0.98] transition-all bg-emerald-600 hover:bg-emerald-700 text-white rounded-[2rem]"
            >
                <GraduationCap className="mr-4 h-10 w-10 shrink-0" />
                Я все осознал
            </Button>
            
            <div className="flex items-center gap-4 text-red-500/30 text-[10px] uppercase font-black tracking-[0.3em] animate-pulse">
                <BrainCircuit className="h-4 w-4" />
                <span>Коррекция Нейронного Пути</span>
            </div>
        </motion.div>
    );
}
