
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Loader2, ArrowLeft, CheckCircle2, XCircle, Dumbbell } from 'lucide-react';
import Link from 'next/link';
import { generateGrammarDrill } from '@/ai/flows/generate-grammar-drill';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export default function DrillPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [questions, setQuestions] = useState<any[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isFinished, setIsFinished] = useState(false);

    // Quiz State
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [textInput, setTextInput] = useState('');
    const [isAnswered, setIsAnswered] = useState(false);
    const [score, setScore] = useState(0);

    const handleStart = async () => {
        if (!folder) return;
        setIsLoading(true);
        try {
            // Pick random words
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, 15).map(w => w.word.german);

            const result = await generateGrammarDrill({
                words: selectedWords,
                topic: folder.name
            });
            setQuestions(result.questions);
            setCurrentIndex(0);
            setScore(0);
            setIsFinished(false);
        } catch (error) {
            console.error(error);
            alert("Ошибка генерации упражнений. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleAnswer = () => {
        if (!currentQuestion) return;

        const userAnswer = currentQuestion.type === 'multiple-choice' ? selectedOption : textInput;
        if (!userAnswer) return;

        const isCorrect = userAnswer.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim();

        if (isCorrect) setScore(s => s + 1);
        setIsAnswered(true);
    };

    const handleNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setIsAnswered(false);
            setSelectedOption(null);
            setTextInput('');
        } else {
            setIsFinished(true);
        }
    };

    if (!folder) return <div className="p-8">Папка не найдена</div>;

    const currentQuestion = questions[currentIndex];

    return (
        <div className="container mx-auto py-8 max-w-2xl px-4">
            <div className="mb-6">
                <Link href={`/my-lectures/${folderId}`} className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папке
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        <Dumbbell className="h-8 w-8 text-amber-500" />
                        Grammar Precision
                    </h1>
                </div>
            </div>

            {/* INTRO */}
            {questions.length === 0 && !isLoading && (
                <Card className="text-center py-12">
                    <CardContent className="flex flex-col items-center">
                        <div className="bg-amber-100 p-4 rounded-full mb-4">
                            <Dumbbell className="h-12 w-12 text-amber-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Грамматический Дриллинг</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            AI сгенерирует жесткие вопросы на управление глаголов, падежи и окончания, используя ваши слова.
                        </p>
                        <Button size="lg" onClick={handleStart} className="bg-amber-600 hover:bg-amber-700 text-white">
                            Начать тренировку
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* LOADING */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-amber-500" />
                    <p className="text-muted-foreground animate-pulse">Готовим вопросы...</p>
                </div>
            )}

            {/* QUIZ */}
            {questions.length > 0 && !isFinished && currentQuestion && (
                <div className="space-y-6">
                    <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Вопрос {currentIndex + 1} из {questions.length}</span>
                        <span>Счет: {score}</span>
                    </div>
                    <Progress value={(currentIndex / questions.length) * 100} className="h-2 mb-6" />

                    <Card className="border-t-4 border-t-amber-500">
                        <CardHeader>
                            <CardTitle className="text-xl">{currentQuestion.question}</CardTitle>
                            <CardDescription>
                                Слово в фокусе: <span className="font-bold text-primary">{currentQuestion.focusWord}</span>
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {currentQuestion.type === 'multiple-choice' && currentQuestion.options ? (
                                <div className="grid grid-cols-1 gap-3">
                                    {currentQuestion.options.map((opt: string) => (
                                        <Button
                                            key={opt}
                                            variant={isAnswered
                                                ? (opt === currentQuestion.correctAnswer ? 'default' : (opt === selectedOption ? 'destructive' : 'outline'))
                                                : (selectedOption === opt ? 'default' : 'outline')
                                            }
                                            className={cn("justify-start h-12 text-lg",
                                                isAnswered && opt === currentQuestion.correctAnswer && "bg-green-600 hover:bg-green-700 text-white"
                                            )}
                                            onClick={() => !isAnswered && setSelectedOption(opt)}
                                            disabled={isAnswered}
                                        >
                                            {opt}
                                        </Button>
                                    ))}
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <input
                                        className="flex h-12 w-full rounded-md border border-input bg-background px-3 py-2 text-lg ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        placeholder="Введите ответ..."
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                        disabled={isAnswered}
                                        onKeyDown={(e) => e.key === 'Enter' && !isAnswered && handleAnswer()}
                                    />
                                </div>
                            )}

                            {isAnswered && (
                                <div className={cn("mt-6 p-4 rounded-lg flex items-start gap-3",
                                    (selectedOption === currentQuestion.correctAnswer || textInput.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim())
                                        ? "bg-green-50 text-green-900"
                                        : "bg-red-50 text-red-900"
                                )}>
                                    {(selectedOption === currentQuestion.correctAnswer || textInput.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim())
                                        ? <CheckCircle2 className="h-6 w-6 shrink-0" />
                                        : <XCircle className="h-6 w-6 shrink-0" />
                                    }
                                    <div>
                                        <p className="font-bold mb-1">
                                            {(selectedOption === currentQuestion.correctAnswer || textInput.toLowerCase().trim() === currentQuestion.correctAnswer.toLowerCase().trim())
                                                ? "Правильно!"
                                                : `Ошибка. Правильный ответ: ${currentQuestion.correctAnswer}`
                                            }
                                        </p>
                                        <p className="text-sm">{currentQuestion.explanation}</p>
                                    </div>
                                </div>
                            )}
                        </CardContent>
                        <CardFooter>
                            {!isAnswered ? (
                                <Button className="w-full" size="lg" onClick={handleAnswer} disabled={(currentQuestion.type === 'multiple-choice' && !selectedOption) || (currentQuestion.type !== 'multiple-choice' && !textInput)}>
                                    Проверить
                                </Button>
                            ) : (
                                <Button className="w-full" size="lg" onClick={handleNext}>
                                    {currentIndex < questions.length - 1 ? "Следующий вопрос" : "Завершить"}
                                </Button>
                            )}
                        </CardFooter>
                    </Card>
                </div>
            )}

            {/* RESULTS */}
            {isFinished && (
                <Card className="text-center py-12 border-green-500 border-2">
                    <CardContent>
                        <h2 className="text-3xl font-bold mb-4 text-green-600">Результат: {score} из {questions.length}</h2>
                        <p className="text-lg text-muted-foreground mb-8">
                            {score === questions.length ? "Идеально! Грамматика уровня Бог." : score > questions.length / 2 ? "Неплохо, но есть над чем работать." : "Нужно повторить грамматику."}
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link href={`/my-lectures/${folderId}`}>
                                <Button variant="outline">В папку</Button>
                            </Link>
                            <Button onClick={handleStart}>Повторить</Button>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
}
