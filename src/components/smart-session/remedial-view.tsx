
'use client';

import { VocabularyWord } from '@/lib/types';
import { useState, useEffect } from 'react';
import { analyzeLeechWithAI } from '@/ai/flows/analyze-leech';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, Brain, Siren, Lightbulb, GraduationCap } from 'lucide-react';
import { WordCard } from '@/components/word-card';

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
            <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4">
                <Loader2 className="w-12 h-12 animate-spin text-red-500" />
                <h2 className="text-xl font-bold font-headline">Анализируем ваши ошибки...</h2>
                <p className="text-muted-foreground">Доктор AI готовит "лекарство" для слова {word.german}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-2xl mx-auto">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <div className="flex justify-center mb-4">
                    <div className="bg-red-100 p-3 rounded-full">
                        <Siren className="w-8 h-8 text-red-600" />
                    </div>
                </div>
                <h1 className="text-2xl font-bold text-red-800 mb-2">Работа над ошибками</h1>
                <p className="text-red-600">Вы часто ошибаетесь в этом слове. Давайте вылечим его раз и навсегда.</p>
            </div>

            {/* The Word Itself */}
            <div className="transform scale-90 opacity-75">
                <WordCard word={word} />
            </div>

            {/* Analysis Cards */}
            {analysis && (
                <div className="grid gap-4 animate-in fade-in slide-in-from-bottom-4 duration-700">

                    {/* Mnemonic */}
                    <Card className="border-l-4 border-l-purple-500 shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2 text-purple-700">
                                <Brain className="w-5 h-5" />
                                Мнемоника (Запоминалка)
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg italic font-medium text-gray-700">"{analysis.mnemonic}"</p>
                        </CardContent>
                    </Card>

                    {/* Confusion Trap */}
                    <Card className="border-l-4 border-l-amber-500 shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2 text-amber-700">
                                <Siren className="w-5 h-5" />
                                Почему это сложно?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{analysis.confusionAnalysis}</p>
                        </CardContent>
                    </Card>

                    {/* Usage Tip */}
                    <Card className="border-l-4 border-l-green-500 shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-lg flex items-center gap-2 text-green-700">
                                <Lightbulb className="w-5 h-5" />
                                Золотое правило
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>{analysis.usageTip}</p>
                        </CardContent>
                    </Card>

                </div>
            )}

            <Button
                onClick={onComplete}
                size="lg"
                className="w-full text-lg font-bold bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white shadow-xl mt-8"
            >
                <GraduationCap className="mr-2 h-6 w-6" />
                Я понял! Запомнить
            </Button>
        </div>
    );
}
