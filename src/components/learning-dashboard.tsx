
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Play, Sparkles, MessageSquareQuote, Dumbbell, BookOpen, Headphones, Mic, Users, Shuffle, Briefcase, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface LearningDashboardProps {
    totalWords: number;
    sessionSize?: number;
    onStartSession: () => void;
    onGenerateStory: () => void;
    onStartDrill: () => void;
    onUsageCoach: () => void;
    onRoleplay: () => void;
    // New Features
    onPodcast?: () => void;
    onCollocation?: () => void;
    onSynonymSwap?: () => void;
    onInterivew?: () => void;
    onRektionDrill?: () => void;
}

export function LearningDashboard({
    totalWords,
    onStartSession,
    onGenerateStory,
    onStartDrill,
    onUsageCoach,
    onRoleplay,
    onPodcast,
    onCollocation,
    onSynonymSwap,
    onInterivew,
    onRektionDrill
}: LearningDashboardProps) {

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const item = {
        hidden: { opacity: 0, y: 20 },
        show: { opacity: 1, y: 0 }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
            {/* 1. Main Session */}
            <motion.div variants={item} className="md:col-span-2">
                <Card className="bg-primary text-primary-foreground h-full overflow-hidden relative cursor-pointer hover:shadow-lg transition-shadow border-none" onClick={onStartSession}>
                    <div className="absolute right-0 top-0 h-full w-1/3 bg-white/10 skew-x-12 transform translate-x-8" />
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-2xl">
                            <Play className="fill-current h-6 w-6" />
                            Начать Смарт-Сессию
                        </CardTitle>
                        <CardDescription className="text-primary-foreground/80">
                            Фокус на 40 словах: до 7 новых, 33 на повторение.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full font-bold">
                            Начать ({Math.min(40, totalWords)} слов)
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 2. Story Mode */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onGenerateStory}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                            AI Генератор Историй
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            История уровня B2 на основе вашего словаря.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">Создать историю</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 3. Grammar Drill */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onStartDrill}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Dumbbell className="h-5 w-5 text-amber-500" />
                            Грамматический Дрилл
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Тренировка предлогов, падежей и спряжений.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20">Начать Тренировку</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* LOWER ROW */}

            {/* 4. Usage Coach */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onUsageCoach}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <MessageSquareQuote className="h-5 w-5 text-green-500" />
                            Тренер Использования
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Пишите предложения и получайте разбор стиля и ошибок.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20">Писать</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 5. Roleplay */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onRoleplay}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Mic className="h-5 w-5 text-purple-500" />
                            Ролевая Игра
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Используйте слова в реалистичном диалоге.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20">Начать Диалог</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 6. Audio Podcast */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onPodcast}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Headphones className="h-5 w-5 text-pink-500" />
                            AI Подкаст
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Слушайте радио-шоу о ваших словах.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20">Слушать</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 6. Job Interview */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onInterivew}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Briefcase className="h-5 w-5 text-blue-800" />
                            Собеседование
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Симуляция интервью с HR для проверки лексики.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">Начать Интервью</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 7. Collocation Trainer */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onCollocation}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <RefreshCw className="h-5 w-5 text-indigo-500" />
                            Коллокации
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Учите устойчивые фразы (Nomen-Verb-Verbindungen).
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20">Искать Пары</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 8. Synonym Swap */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onSynonymSwap}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Sparkles className="h-5 w-5 text-orange-500" />
                            Апгрейд Стиля
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Замените простые слова (A2) на профессиональные (B2).
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20">Улучшить Стиль</Button>
                    </CardContent>
                </Card>
            </motion.div>            {/* 9. Rektion Trainer */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group border-2 border-primary/20 bg-primary/5" onClick={onRektionDrill}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Shuffle className="h-5 w-5 text-red-500" />
                            Глобальное Управление
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Блиц-тест на предлоги и падежи изо всех ваших папок.
                        </p>
                        <Button variant="default" className="w-full group-hover:bg-primary/90">Тренировать Блиц</Button>
                    </CardContent>
                </Card>
            </motion.div>


        </motion.div>
    );
}
