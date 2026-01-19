
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, ArrowRight, Briefcase } from 'lucide-react';
import Link from 'next/link';

const EXAM_LEVELS = [
    {
        id: 'b2',
        title: 'Подготовка к B2',
        description: 'Тексты и лексика для сдачи экзамена уровня B2 (Goethe, Telc, ÖSD).',
        topics: [
            {
                id: 'job-search',
                title: 'Поиск работы (Arbeitssuche)',
                description: 'Текст о современных платформах поиска работы в Украине и процедуре найма.',
                icon: <Briefcase className="h-5 w-5 text-blue-500" />,
                href: '/exam-texts/job-search'
            }
        ]
    }
];

export default function ExamTextsPage() {
    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <GraduationCap className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl font-black font-headline mb-4">Подготовка к экзаменам</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Специальные тексты для заучивания наизусть и подготовки к устной и письменной части экзаменов B2 и B2 Beruf.
                </p>
            </div>

            <div className="space-y-12">
                {EXAM_LEVELS.map((level) => (
                    <div key={level.id} className="space-y-6">
                        <div className="flex items-center gap-3 border-b pb-4">
                            <h2 className="text-2xl font-bold font-headline">{level.title}</h2>
                            <span className="text-xs font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase">Official</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {level.topics.map((topic) => (
                                <Card key={topic.id} className="group hover:border-primary/50 transition-all hover:shadow-lg">
                                    <CardHeader>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                                {topic.icon}
                                            </div>
                                            <BookOpen className="h-4 w-4 text-muted-foreground opacity-20" />
                                        </div>
                                        <CardTitle className="text-xl">{topic.title}</CardTitle>
                                        <CardDescription>{topic.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button asChild className="w-full">
                                            <Link href={topic.href}>
                                                Открыть текст <ArrowRight className="ml-2 h-4 w-4" />
                                            </Link>
                                        </Button>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
