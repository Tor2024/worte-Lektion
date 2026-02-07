
'use client';

import type { VocabularyWord } from '@/lib/types';
import { useState, useMemo, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { WordCard } from '@/components/word-card';
import { ArrowLeft, ArrowRight, BrainCircuit, Check, CheckCircle, Loader2, RefreshCw, XCircle } from 'lucide-react';
import { Input } from './ui/input';
import { verifyAnswer } from '@/ai/flows/verify-answer';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Progress } from './ui/progress';
import { useToast } from '@/hooks/use-toast';
import { useKnownWords } from '@/hooks/use-known-words';
import { SpeakButton } from '@/components/speak-button';
import { formatGermanWord } from '@/lib/german-utils';


type VocabStep = 'learning' | 'practicing' | 'finished';

type VocabFeedback = {
  type: 'correct' | 'incorrect';
  message: string;
} | null;

export function GlobalVocabularyTrainer({ words }: { words: VocabularyWord[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<VocabStep>('learning');
  const [shuffledVocabulary, setShuffledVocabulary] = useState<VocabularyWord[]>([]);
  const [vocabIndex, setVocabIndex] = useState(0);
  const [incorrectVocab, setIncorrectVocab] = useState<VocabularyWord[]>([]);
  const [userAnswer, setUserAnswer] = useState('');
  const [vocabFeedback, setVocabFeedback] = useState<VocabFeedback>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const { toast } = useToast();
  const { knownWords, addKnownWord, isKnown } = useKnownWords();

  const wordsForTraining = useMemo(() => {
    return words.filter(word => !isKnown(word.german));
  }, [words, isKnown]);

  useEffect(() => {
    if (isOpen) {
      // Shuffle client-side to prevent hydration mismatch
      const shuffled = [...wordsForTraining].sort(() => Math.random() - 0.5);
      setShuffledVocabulary(shuffled);
      setStep(shuffled.length > 0 ? 'learning' : 'finished');
      setVocabIndex(0);
      setIncorrectVocab([]);
      setUserAnswer('');
      setVocabFeedback(null);
      setApiError(null);
    }
  }, [isOpen, wordsForTraining]);


  const currentVocabWord = useMemo(() => shuffledVocabulary[vocabIndex], [shuffledVocabulary, vocabIndex]);

  const handleNextWord = (removeCurrent: boolean = false) => {
    if (removeCurrent) {
      setShuffledVocabulary(prev => prev.filter(w => w.german !== currentVocabWord.german));
      // After removing, the index might be out of bounds if it was the last element
      if (vocabIndex >= shuffledVocabulary.length - 1) {
        if (shuffledVocabulary.length - 1 > 0) {
          // This was the last word, but there are others. Go to the start.
          setVocabIndex(0);
        } else {
          // No words left.
          setStep('practicing');
        }
      }
      // Otherwise, the index is now pointing to the next element, so we don't need to change it.

    } else {
      if (vocabIndex < shuffledVocabulary.length - 1) {
        setVocabIndex(prev => prev + 1);
      } else {
        setVocabIndex(0);
        setIncorrectVocab([]);
        setStep('practicing');
      }
    }
  }

  const handleKnowWord = () => {
    if (!currentVocabWord) return;
    addKnownWord(currentVocabWord.german);
    toast({ title: 'Слово отмечено как известное', description: `"${currentVocabWord.russian}" больше не будет появляться в тренировках.` });
    handleNextWord(true);
  };

  const handleNext = () => {
    handleNextWord(false);
  };

  const handlePrev = () => {
    if (vocabIndex > 0) {
      setVocabIndex(prev => prev + 1);
    }
  };

  const proceedToNextPracticeWord = () => {
    setVocabFeedback(null);
    setUserAnswer('');
    if (vocabIndex < shuffledVocabulary.length - 1) {
      setVocabIndex(prev => prev + 1);
    } else {
      if (incorrectVocab.length > 0) {
        setShuffledVocabulary(incorrectVocab.sort(() => Math.random() - 0.5));
        setIncorrectVocab([]);
        setVocabIndex(0);
        toast({ title: 'Повторение', description: 'Давайте повторим слова, в которых вы ошиблись.' });
      } else {
        setStep('finished');
      }
    }
  };

  const handleVocabCheck = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!userAnswer.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setVocabFeedback(null);
    setApiError(null);

    let correctAnswer = formatGermanWord(currentVocabWord);

    try {
      const verification = await verifyAnswer({
        question: `Как перевести "${currentVocabWord.russian}"? Если это существительное, укажите артикль.`,
        userAnswer: userAnswer,
        correctAnswer: correctAnswer,
      });

      setVocabFeedback({
        type: verification.isCorrect ? 'correct' : 'incorrect',
        message: verification.explanation,
      });

      if (!verification.isCorrect) {
        if (!incorrectVocab.some(v => v.german === currentVocabWord.german)) {
          setIncorrectVocab(prev => [...prev, currentVocabWord]);
        }
      }
    } catch (error) {
      console.error('Error verifying vocab:', error);
      setApiError('Не удалось проверить ответ. Попробуйте снова.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderContent = () => {
    if (wordsForTraining.length === 0 || step === 'finished') {
      return (
        <div className="text-center p-8">
          <BrainCircuit className="mx-auto h-16 w-16 text-primary bg-primary/10 rounded-full p-3 mb-4" />
          <h3 className="text-2xl font-bold text-foreground font-headline">Тренажер слов</h3>
          <p className="mt-2 text-muted-foreground mb-6">
            {words.length === 0
              ? "Вы еще не начали ни одного урока. Начните обучение, чтобы добавить слова для повторения."
              : "Отличная работа! Все слова повторены или отмечены как известные. Возвращайтесь позже, чтобы закрепить знания."}
          </p>
          <Button onClick={() => setIsOpen(false)}>Закрыть</Button>
        </div>
      )
    }

    if (!currentVocabWord) {
      return (
        <div className="flex justify-center items-center p-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      )
    }

    if (step === 'learning') {
      return (
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Изучение слов</DialogTitle>
            <DialogDescription>
              Пролистайте карточки, чтобы освежить слова в памяти.
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            {currentVocabWord ? <WordCard word={currentVocabWord} /> : <p>Слова для изучения закончились.</p>}
          </div>
          {currentVocabWord && (
            <>
              <div className="px-6 pb-2">
                <Button variant="ghost" className="w-full text-green-600 hover:bg-green-100 hover:text-green-700" onClick={handleKnowWord}>
                  <Check className="mr-2 h-4 w-4" /> Я знаю это слово
                </Button>
              </div>
              <DialogFooter className="justify-between sm:justify-between">
                <Button variant="outline" onClick={handlePrev} disabled={vocabIndex === 0}>
                  <ArrowLeft className="mr-2 h-4 w-4" /> Назад
                </Button>
                <p className="text-sm text-muted-foreground">{vocabIndex + 1} / {shuffledVocabulary.length}</p>
                <Button onClick={handleNext}>
                  {vocabIndex === shuffledVocabulary.length - 1 ? 'К практике' : 'Далее'} <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      );
    }

    if (step === 'practicing') {
      if (!currentVocabWord) {
        return (
          <div className="text-center p-8">
            <h3 className="text-2xl font-bold">Практика завершена</h3>
            <p className="mt-2 text-muted-foreground mb-6">Вы прошли все слова в этом цикле.</p>
            <Button onClick={() => setStep('finished')}>Завершить</Button>
          </div>
        )
      }
      return (
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Напишите перевод (с артиклем):</DialogTitle>
            <DialogDescription className="text-center text-4xl font-bold text-primary">{currentVocabWord.russian}</DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <form onSubmit={handleVocabCheck} className="flex flex-col gap-4">
              <div className="flex gap-2 items-center">
                <Input
                  type="text"
                  placeholder="Ответ на немецком..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={!!vocabFeedback || isSubmitting}
                  className="text-lg h-12"
                  autoCapitalize="none"
                  autoCorrect="off"
                />
                <Button type="submit" size="lg" disabled={!!vocabFeedback || !userAnswer.trim() || isSubmitting}>
                  {isSubmitting ? <Loader2 className="animate-spin" /> : 'Проверить'}
                </Button>
              </div>
            </form>
            {apiError &&
              <Alert variant="destructive" className="mt-4">
                <XCircle className="h-4 w-4" />
                <AlertTitle>Ошибка</AlertTitle>
                <AlertDescription>
                  {apiError}
                  <Button onClick={() => handleVocabCheck()} variant="link" className="p-0 h-auto ml-2">
                    <RefreshCw className="mr-2 h-4 w-4" /> Повторить
                  </Button>
                </AlertDescription>
              </Alert>
            }
            {vocabFeedback && (
              <>
                <Alert variant={vocabFeedback.type === 'correct' ? 'default' : 'destructive'} className="mt-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      {vocabFeedback.type === 'correct' ? <CheckCircle className="h-6 w-6" /> : <XCircle className="h-6 w-6" />}
                    </div>
                    <div className="flex-grow">
                      <AlertTitle>{vocabFeedback.type === 'correct' ? 'Верно!' : 'Обратите внимание'}</AlertTitle>
                      <AlertDescription className="prose prose-sm max-w-none dark:prose-invert" dangerouslySetInnerHTML={{ __html: vocabFeedback.message }} />
                    </div>
                    <SpeakButton text={formatGermanWord(currentVocabWord)} size="sm" variant="ghost" />
                  </div>
                </Alert>
                <Button onClick={proceedToNextPracticeWord} className="mt-4 w-full">Продолжить</Button>
              </>
            )}
          </div>
          <DialogFooter>
            <Progress value={((vocabIndex + 1) / shuffledVocabulary.length) * 100} className="w-full" />
          </DialogFooter>
        </DialogContent>
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <Card className="flex flex-col bg-gradient-to-br from-primary/5 via-transparent to-transparent border-primary/20 shadow-xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-8 opacity-5">
          <BrainCircuit className="h-32 w-32" />
        </div>
        <CardHeader className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <BrainCircuit className="h-6 w-6 text-primary" />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-primary">Словарный тренажер</span>
          </div>
          <CardTitle className="text-3xl font-headline font-bold">Тренажер слов</CardTitle>
          <CardDescription className="text-base text-muted-foreground">
            Повторяйте все изученные слова в одном месте.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col justify-center relative z-10 py-6">
          <p className="text-muted-foreground">
            Слов для изучения: <span className="font-bold text-primary">{wordsForTraining.length}</span> из <span className="font-bold">{words.length}</span>.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Регулярное повторение — ключ к успеху!
          </p>
        </CardContent>
        <CardFooter className="relative z-10 pb-8">
          <DialogTrigger asChild>
            <Button size="lg" className="w-full h-14 text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform" disabled={words.length === 0}>
              {words.length > 0 ? "Начать тренировку" : "Сначала пройдите урок"}
            </Button>
          </DialogTrigger>
        </CardFooter>
      </Card>
      {isOpen && renderContent()}
    </Dialog>
  );
}

