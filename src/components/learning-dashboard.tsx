
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
}

export function LearningDashboard({
    totalWords,
    onStartSession,
    onGenerateStory,
    onStartDrill,
    onUsageCoach,
    onRoleplay
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
                            Start Smart Session
                        </CardTitle>
                        <CardDescription className="text-primary-foreground/80">
                            Focus on 20 generated words: 5 new, 15 review.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="secondary" className="w-full font-bold">
                            Begin ({Math.min(20, totalWords)} words)
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
                            AI Story Helper
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Generate a B2-level story using your current word list.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">Create Story</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 3. Grammar Drill */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onStartDrill}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Dumbbell className="h-5 w-5 text-amber-500" />
                            Grammar Precision
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Drill prepositions, cases and verb conjugations.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-amber-50 dark:group-hover:bg-amber-900/20">Start Drill</Button>
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
                            Usage Coach
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Write sentences and get style & grammar feedback (B2).
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-green-50 dark:group-hover:bg-green-900/20">Write</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 5. Roleplay */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onRoleplay}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Mic className="h-5 w-5 text-purple-500" />
                            Roleplay
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Activate these words in a realistic scenario.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20">Start Talk</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 6. Audio Podcast */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onPodcast}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Headphones className="h-5 w-5 text-pink-500" />
                            AI Podcast
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Listen to a generated radio show about your words.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-pink-50 dark:group-hover:bg-pink-900/20">Listen</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 6. Job Interview */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onInterivew}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Briefcase className="h-5 w-5 text-blue-800" />
                            Job Interview
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Strict HR simulation to test professional vocabulary.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20">Start Interview</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 7. Collocation Trainer */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onCollocation}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <RefreshCw className="h-5 w-5 text-indigo-500" />
                            Collocations
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Learn fixed phrases (Nomen-Verb-Verbindungen).
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/20">Find Pairs</Button>
                    </CardContent>
                </Card>
            </motion.div>

            {/* 8. Synonym Swap */}
            <motion.div variants={item}>
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer group" onClick={onSynonymSwap}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                            <Sparkles className="h-5 w-5 text-orange-500" />
                            Style Upgrade
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                            Replace simple A2 words with your B2 vocabulary.
                        </p>
                        <Button variant="outline" className="w-full group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20">Upgrade Style</Button>
                    </CardContent>
                </Card>
            </motion.div>


        </motion.div>
    );
}
