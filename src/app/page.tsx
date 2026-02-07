
'use client';

//  // NO LONGER USED
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, ArrowRight, BrainCircuit, Siren, GraduationCap, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import {
  getLevelImage,
} from '@/lib/placeholder-images';
import { useUserProgress } from '@/hooks/use-user-progress';
import { useEffect, useState } from 'react';
import { ProgressCircle } from '@/components/progress-circle';
import { GlobalVocabularyTrainer } from '@/components/global-vocabulary-trainer';
import type { VocabularyWord } from '@/lib/types';
import { commonWords } from '@/lib/common-words';
import { useStudyQueue } from '@/hooks/use-study-queue';
import { useUnifiedSRS } from '@/hooks/use-unified-srs';
import { NeuralMap } from '@/components/neural-map';
import { storage } from '@/lib/storage';
import { useCurriculumData } from '@/hooks/use-curriculum-data';

function DailySessionWidget() {
  const { totalDue, totalNew, totalLearning, totalReview, totalLeeches, totalAvailable, isLoading } = useStudyQueue();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => { setIsClient(true) }, []);

  if (!isClient) return null;

  return (
    <Card className="flex flex-col bg-gradient-to-br from-indigo-500/10 via-transparent to-transparent border-indigo-500/20 shadow-xl relative overflow-hidden group h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <BrainCircuit className="h-32 w-32" />
      </div>
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-500/10 rounded-lg">
            <BrainCircuit className="h-6 w-6 text-indigo-500" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-500">План на сегодня</span>
        </div>
        <CardTitle className="text-3xl font-headline font-bold">15 Минут</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Ежедневная тренировка: новые слова + повторение + контекст.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center relative z-10 py-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-yellow-500/10 p-4 rounded-xl border border-yellow-500/20 shadow-[0_0_10px_-5px_rgba(234,179,8,0.3)]">
            <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400">{isLoading ? '...' : totalReview}</div>
            <div className="text-[10px] font-bold text-yellow-700/70 dark:text-yellow-400/70 uppercase tracking-tighter">Выучено</div>
          </div>
          <div className="bg-blue-500/10 p-4 rounded-xl border border-blue-500/20 shadow-[0_0_10px_-5px_rgba(59,130,246,0.3)]">
            <div className="text-3xl font-black text-blue-600 dark:text-blue-400">{isLoading ? '...' : totalLearning}</div>
            <div className="text-[10px] font-bold text-blue-700/70 dark:text-blue-400/70 uppercase tracking-tighter">В процессе</div>
          </div>
          <div className="bg-background/50 p-4 rounded-xl border">
            <div className="text-3xl font-black text-foreground">{isLoading ? '...' : totalNew}</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-tighter">Новые</div>
          </div>
          <div className="bg-red-500/5 p-4 rounded-xl border border-red-500/10">
            <div className="text-3xl font-black text-red-500">{isLoading ? '...' : totalDue}</div>
            <div className="text-[10px] font-bold text-red-500/70 uppercase tracking-tighter">Повторить</div>
          </div>
        </div>

        {/* Session Readiness Badge */}
        {!isLoading && (
          <div className="mt-4 bg-primary/10 border border-primary/20 p-4 rounded-xl flex items-center justify-between shadow-sm">
            <div className="flex flex-col">
              <div className="text-xl font-black text-primary animate-pulse flex items-center gap-2">
                {totalAvailable} слов <span className="text-xs font-normal text-muted-foreground uppercase tracking-wider">готово</span>
              </div>
              <div className="text-xs text-muted-foreground">Ежедневная квота заполнена</div>
            </div>
            <div className="h-2 w-2 rounded-full bg-primary animate-ping" />
          </div>
        )}
        {totalLeeches > 0 && (
          <div className="mt-4 bg-red-500/10 border border-red-500/50 p-3 rounded-xl flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-red-500" />
              <span className="text-sm font-bold text-red-600">Сложные слова: {totalLeeches}</span>
            </div>
          </div>
        )}
        <p className="text-sm text-muted-foreground mt-4">
          Слова из ваших папок автоматически добавляются сюда.
        </p>
      </CardContent>
      <CardFooter className="relative z-10 pb-8">
        <Button asChild size="lg" className="w-full h-14 text-lg bg-indigo-600 hover:bg-indigo-700 shadow-xl shadow-indigo-500/20 hover:scale-[1.02] transition-transform">
          <Link href="/daily-session">
            Начать тренировку <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function MyDictionariesWidget() {
  return (
    <Card className="flex flex-col bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent border-emerald-500/20 shadow-xl relative overflow-hidden group h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <BookOpen className="h-32 w-32" />
      </div>
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg">
            <BookOpen className="h-6 w-6 text-emerald-500" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-500">Библиотека</span>
        </div>
        <CardTitle className="text-3xl font-headline font-bold">Словари</CardTitle>
        <CardDescription className="text-base text-muted-foreground">
          Управляйте своими папками и изучайте добавленные слова.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center relative z-10 py-6 text-center">
        <p className="text-base">
          Создавайте тематические списки и следите за прогрессом каждой папки индивидуально.
        </p>
      </CardContent>
      <CardFooter className="relative z-10 pb-8">
        <Button asChild size="lg" variant="secondary" className="w-full h-14 text-lg border-emerald-500/20 hover:bg-emerald-500/10 hover:scale-[1.02] transition-transform outline-emerald-500">
          <Link href="/my-lectures">
            Открыть словари <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

function ExamTextsWidget() {
  return (
    <Card className="flex flex-col bg-gradient-to-br from-amber-500/10 via-transparent to-transparent border-amber-500/20 shadow-xl relative overflow-hidden group h-full">
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <GraduationCap className="h-32 w-32" />
      </div>
      <CardHeader className="relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-amber-500/10 rounded-lg">
            <GraduationCap className="h-6 w-6 text-amber-500" />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500">Экзамен B2 / B2 Beruf</span>
        </div>
        <CardTitle className="text-3xl font-headline font-bold">Тексты B2</CardTitle>
        <CardDescription className="text-base text-muted-foreground text-left">
          Тексты для заучивания с озвучкой и выделением предложений.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col justify-center relative z-10 py-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-amber-500" />
            <span>Подготовка к устной части (Sprechen)</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-amber-500" />
            <span>Синхронная озвучка и подсветка текста</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="h-4 w-4 text-amber-500" />
            <span>Добавление собственных текстов</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="relative z-10 pb-8">
        <Button asChild size="lg" className="w-full h-14 text-lg bg-amber-600 hover:bg-amber-700 shadow-xl shadow-amber-500/20 hover:scale-[1.02] transition-transform">
          <Link href="/exam-texts">
            Перейти к текстам <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

// Helper component to separate data fetching logic
// Helper component to separate data fetching logic
export default function DashboardPage() {
  const { progress, getTopicProficiency, isLoading: progressLoading } = useUserProgress();
  const { levels, allTopics, isLoading: curriculumLoading } = useCurriculumData();
  const [isClient, setIsClient] = useState(false);
  const [allLearnedWords, setAllLearnedWords] = useState<VocabularyWord[]>([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && allTopics) {
      const wordsFromTopics: VocabularyWord[] = [];
      const seenWords = new Set<string>();

      // Add words from topics with progress
      allTopics.forEach((topic: any) => {
        if (progress[topic.id] > 0) {
          // Note: topic.vocabulary is typed as 'any' in schema but we know it matches VocabularyTheme[]
          (topic.vocabulary as any[]).forEach((theme: any) => {
            theme.words.forEach((word: any) => {
              if (word && word.german && !seenWords.has(word.german)) {
                wordsFromTopics.push(word);
                seenWords.add(word.german);
              }
            });
          });
        }
      });

      // Add common words if they are not already in the list
      commonWords.forEach(commonWord => {
        if (!seenWords.has(commonWord.german)) {
          wordsFromTopics.push(commonWord);
          seenWords.add(commonWord.german);
        }
      });

      setAllLearnedWords(wordsFromTopics);
    }
  }, [progress, isClient, allTopics]);

  const calculateLevelProgress = (levelId: string) => {
    if (!allTopics) return 0;

    // Filter topics for this level
    const levelTopics = allTopics.filter((t: any) => t.levelId === levelId);

    if (levelTopics.length === 0) {
      return 0;
    }
    const totalProficiency = levelTopics.reduce((sum: number, topic: any) => {
      return sum + (getTopicProficiency(topic.id) || 0);
    }, 0);
    return Math.round(totalProficiency / levelTopics.length);
  };

  if (curriculumLoading || progressLoading || !isClient) {
    return (
      <div className="container mx-auto py-8">
        <div className="space-y-8 animate-pulse">
          <div className="h-12 bg-muted rounded w-1/2 mx-auto"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-64 bg-muted rounded-xl"></div>
            <div className="h-64 bg-muted rounded-xl"></div>
            <div className="h-64 bg-muted rounded-xl"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl font-headline">
          Lernen Deutsch mit Oleh
        </h1>
        <p className="mt-3 text-lg text-muted-foreground sm:text-xl">
          Ваш персональный путь к овладению немецким языком
        </p>
      </header>

      {/* NEURAL MAP VISUALIZATION */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-4">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold font-headline uppercase tracking-tight">Карта нейронных связей</h2>
        </div>
        {isClient && <NeuralMapWrapper />}
      </section>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-stretch">
        <GlobalVocabularyTrainer words={allLearnedWords} />
        <DailySessionWidget />
        <ExamTextsWidget />
        <MyDictionariesWidget />
      </div>

      <h2 className="text-3xl font-bold font-headline mb-6 text-center">Уровни обучения</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {levels.map((level: any) => {
          const levelImage = getLevelImage(level.id);
          const levelProgress = isClient ? calculateLevelProgress(level.id) : 0;
          return (
            <Card
              key={level.id}
              className="flex flex-col overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl"
            >
              <CardHeader className="relative h-48 w-full">
                {levelImage && (
                  <Image
                    src={levelImage.imageUrl}
                    alt={levelImage.description}
                    data-ai-hint={levelImage.imageHint}
                    fill
                    className="object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-0 p-6">
                  <CardTitle className="text-2xl font-bold text-primary-foreground font-headline">
                    {level.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex flex-grow flex-col p-6">
                <CardDescription className="flex-grow">{level.description}</CardDescription>
                <div className="mt-6 flex items-center justify-center">
                  <ProgressCircle value={levelProgress} />
                </div>
              </CardContent>
              <CardFooter className="p-6 pt-0">
                <Button asChild className="w-full" variant="default">
                  <Link href={`/${level.id}`}>
                    <BookOpen className="mr-2 h-4 w-4" />
                    Начать обучение
                    <ArrowRight className="ml-auto h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function NeuralMapWrapper() {
  const { allWords, isLoading } = useUnifiedSRS();

  if (isLoading) return <div className="h-[400px] w-full bg-slate-900 animate-pulse rounded-3xl" />;

  return <NeuralMap words={allWords} limit={60} />;
}

