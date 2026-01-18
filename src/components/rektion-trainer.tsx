
'use client';

import { useState, useEffect, useMemo } from 'react';
import { UserVocabularyWord, Governance } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Star } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface RektionQuestion {
    word: string;
    type: 'verb' | 'adjective';
    correctGovernance: Governance;
    options: string[]; // e.g. ["auf + Akkusativ", "an + Dativ", ...]
}

interface RektionTrainerProps {
    words: UserVocabularyWord[];
    onBack?: () => void;
}

const COMMON_PREPOSITIONS = ['auf', 'an', 'in', 'über', 'nach', 'für', 'um', 'mit', 'von', 'vor', 'bei', 'zu', 'aus', 'gegen'];
const CASES = ['Akkusativ', 'Dativ', 'Genitiv'];

export function RektionTrainer({ words, onBack }: RektionTrainerProps) {
    const [questions, setQuestions] = useState<RektionQuestion[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // 1. Generate questions from words
    useEffect(() => {
        const actionableWords = words.filter(w =>
            (w.word.type === 'verb' || w.word.type === 'adjective') &&
            (w.word as any).governance &&
            (w.word as any).governance.length > 0 &&
            (w.word as any).governance.some((g: Governance) => g.preposition && g.preposition !== 'ohne' && g.preposition.trim() !== '')
        );

        if (actionableWords.length === 0) return;

        const LEVEL_PRIORITY: Record<string, number> = {
            'Beruf': 10,
            'B2': 9,
            'B1': 8,
            'A2': 7,
            'A1': 6,
            'A0': 5
        };

        // Sort by priority (Level) then shuffle slightly within tiers
        const prioritized = [...actionableWords].sort((a, b) => {
            const levelA = (a.word.level && LEVEL_PRIORITY[a.word.level]) || 0;
            const levelB = (b.word.level && LEVEL_PRIORITY[b.word.level]) || 0;

            // If levels differ significantly, prioritize higher level
            if (levelA !== levelB) return levelB - levelA;

            // Otherwise random shuffle
            return 0.5 - Math.random();
        });

        // Take top 20
        const selectedWords = prioritized.slice(0, 20);

        const generatedQuestions: RektionQuestion[] = selectedWords.flatMap(userWord => {
            const wordData = userWord.word as any;
            return wordData.governance
                .filter((gov: Governance) => gov.preposition && gov.preposition !== 'ohne' && gov.preposition.trim() !== '')
                .map((gov: Governance) => {
                    const correctAnswer = `${gov.preposition} + ${gov.case}`;

                    // Generate distractors
                    const distractors = new Set<string>();
                    while (distractors.size < 3) {
                        const randomPrep = COMMON_PREPOSITIONS[Math.floor(Math.random() * COMMON_PREPOSITIONS.length)];
                        const randomCase = CASES[Math.floor(Math.random() * CASES.length)];
                        const option = `${randomPrep} + ${randomCase}`;
                        // Strict check: No empty preps, no 'ohne', no duplicate of correct answer
                        if (option !== correctAnswer && randomPrep !== 'ohne' && randomPrep.trim() !== '') {
                            distractors.add(option);
                        }
                    }

                    return {
                        word: wordData.german,
                        type: wordData.type,
                        correctGovernance: gov,
                        options: [...Array.from(distractors), correctAnswer].sort(() => 0.5 - Math.random())
                    };
                });
        }).sort(() => 0.5 - Math.random()).slice(0, 15); // Limit session length

        setQuestions(generatedQuestions);
    }, [words]);

    const handleAnswer = (option: string) => {
        if (isAnswered) return;
        setSelectedOption(option);
        setIsAnswered(true);
        const currentQ = questions[currentIndex];
        const correct = `${currentQ.correctGovernance.preposition} + ${currentQ.correctGovernance.case}`;
        if (option === correct) {
            setScore(s => s + 1);
        }
    };

    const nextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedOption(null);
        } else {
            setIsFinished(true);
        }
    };

    if (questions.length === 0) {
        return (
            <Card className="text-center py-12">
                <CardContent>
                    <div className="bg-red-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <XCircle className="h-10 w-10 text-red-600" />
                    </div>
                    <CardTitle className="mb-2">Недостаточно данных</CardTitle>
                    <CardDescription className="mb-6">
                        В ваших папках пока нет глаголов или прилагательных с указанным управлением.
                        Сначала добавьте слова и убедитесь, что блок "Управление" заполнен ИИ.
                    </CardDescription>
                    <Button onClick={onBack}>Вернуться в папку</Button>
                </CardContent>
            </Card>
        );
    }

    if (isFinished) {
        return (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <Card className="text-center py-12 border-2 border-primary shadow-xl">
                    <CardHeader>
                        <div className="mx-auto bg-yellow-400 p-4 rounded-full mb-4">
                            <Star className="h-12 w-12 text-white fill-current" />
                        </div>
                        <CardTitle className="text-4xl font-black">Финиш!</CardTitle>
                        <CardDescription className="text-xl italic">
                            Ваш результат: <span className="text-primary font-bold">{score}</span> из {questions.length}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-center gap-4">
                            <Button size="lg" variant="outline" onClick={() => window.location.reload()}>
                                <RotateCcw className="h-4 w-4 mr-2" /> Повторить
                            </Button>
                            <Button size="lg" onClick={onBack}>
                                В папку <ArrowRight className="h-4 w-4 ml-2" />
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        );
    }

    const currentQuestion = questions[currentIndex];
    const correctStr = `${currentQuestion.correctGovernance.preposition} + ${currentQuestion.correctGovernance.case}`;

    return (
        <div className="max-w-xl mx-auto space-y-6">
            <div className="flex justify-between items-center text-sm font-medium text-muted-foreground">
                <Badge variant="secondary" className="px-3 py-1">Вопрос {currentIndex + 1} / {questions.length}</Badge>
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    <span>Счет: {score}</span>
                </div>
            </div>

            <Progress value={((currentIndex + 1) / questions.length) * 100} className="h-3 shadow-sm" />

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className="border-2 shadow-lg overflow-hidden">
                        <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                        <CardHeader className="text-center pb-8">
                            <div className="mb-2">
                                <Badge className="uppercase tracking-widest text-[10px]">{currentQuestion.type}</Badge>
                            </div>
                            <h2 className="text-5xl font-black font-headline tracking-tighter text-primary">
                                {currentQuestion.word}
                            </h2>
                            <p className="text-muted-foreground italic mt-2">
                                Какое управление у этого слова?
                            </p>
                        </CardHeader>
                        <CardContent className="grid gap-4">
                            {currentQuestion.options.map((option) => (
                                <Button
                                    key={option}
                                    variant={isAnswered
                                        ? (option === correctStr ? 'default' : (option === selectedOption ? 'destructive' : 'outline'))
                                        : (selectedOption === option ? 'default' : 'outline')
                                    }
                                    className={cn(
                                        "h-16 text-xl font-bold transition-all transform hover:scale-[1.02]",
                                        isAnswered && option === correctStr && "bg-green-600 hover:bg-green-700 text-white border-green-700 shadow-md",
                                        isAnswered && option === selectedOption && option !== correctStr && "bg-red-600 hover:bg-red-700 text-white border-red-700"
                                    )}
                                    onClick={() => handleAnswer(option)}
                                    disabled={isAnswered}
                                >
                                    {option}
                                </Button>
                            ))}
                        </CardContent>

                        {isAnswered && (
                            <CardFooter className="flex-col bg-muted/30 pt-6">
                                <div className="text-center mb-6">
                                    <div
                                        className="text-lg font-bold text-foreground prose prose-slate dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: currentQuestion.correctGovernance.meaning }}
                                    />
                                    <div
                                        className="text-sm italic text-muted-foreground mt-2 px-4 italic leading-relaxed prose prose-slate dark:prose-invert max-w-none"
                                        dangerouslySetInnerHTML={{ __html: `"${currentQuestion.correctGovernance.example}"` }}
                                    />
                                </div>
                                <Button size="lg" className="w-full h-12 text-lg font-bold group" onClick={nextQuestion}>
                                    Дальше <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </CardFooter>
                        )}
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

