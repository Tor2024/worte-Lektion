'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { WRITING_TOPICS, WritingTopicCategory } from "@/lib/writing-data";

const CATEGORY_LABELS: Record<WritingTopicCategory, string> = {
    'complaint': 'Жалоба (Beschwerde)',
    'request': 'Запрос (Anfrage)',
    'apology': 'Извинение (Entschuldigung)',
    'application': 'Заявление (Bewerbung)',
    'invitation': 'Приглашение (Einladung)',
    'advice': 'Совет (Ratschlag)'
};

const CATEGORY_COLORS: Record<WritingTopicCategory, string> = {
    'complaint': 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
    'request': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300',
    'apology': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
    'application': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
    'invitation': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300',
    'advice': 'bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300'
};

export default function WritingDashboard() {
    return (
        <div className="container mx-auto py-8">
            <header className="mb-8">
                <h1 className="text-3xl font-bold font-headline mb-2 text-primary">Schreibwerkstatt B2</h1>
                <p className="text-muted-foreground text-lg">
                    Мастерская письма: тренируйте официальные и личные письма для экзамена B2.
                    Изучайте универсальные фразы и получайте мгновенную проверку от ИИ.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {WRITING_TOPICS.map((topic) => (
                    <Card key={topic.id} className="flex flex-col h-full hover:shadow-lg transition-shadow">
                        <CardHeader>
                            <div className="flex justify-between items-start mb-2">
                                <Badge variant="outline" className={CATEGORY_COLORS[topic.category]}>
                                    {CATEGORY_LABELS[topic.category]}
                                </Badge>
                                <span className="text-xs text-muted-foreground uppercase font-bold">
                                    {topic.type === 'official' ? 'Официально' : 'Лично'}
                                </span>
                            </div>
                            <CardTitle className="line-clamp-2">{topic.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col justify-between">
                            <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                                {topic.description}
                            </p>
                            <Button asChild className="w-full mt-auto">
                                <Link href={`/writing-training/${topic.id}`}>
                                    Начать тренировку
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
