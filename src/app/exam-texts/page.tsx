
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, GraduationCap, ArrowRight, Briefcase, Plus, Trash2, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useExamTexts } from '@/hooks/use-exam-texts';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

export default function ExamTextsPage() {
    const { allTexts, isLoading, addCustomText, removeCustomText } = useExamTexts();
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newContent, setNewContent] = useState('');

    const handleAddText = () => {
        if (!newTitle.trim() || !newContent.trim()) return;
        addCustomText({
            title: newTitle,
            description: 'Ваш собственный текст для изучения',
            content: newContent,
            level: 'B2'
        });
        setNewTitle('');
        setNewContent('');
        setIsDialogOpen(false);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <div className="flex justify-center mb-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                        <GraduationCap className="h-10 w-10 text-primary" />
                    </div>
                </div>
                <h1 className="text-4xl font-black font-headline mb-4">Подготовка к экзаменам</h1>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8">
                    Специальные тексты для заучивания наизусть и подготовки к устной и письменной части экзаменов B2 и B2 Beruf.
                </p>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button size="lg" className="rounded-full h-14 px-8 text-lg font-bold shadow-xl">
                            <Plus className="mr-2 h-6 w-6" /> Добавить свой текст
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                        <DialogHeader>
                            <DialogTitle>Новый текст для изучения</DialogTitle>
                            <DialogDescription>
                                Вставьте немецкий текст, который вы хотите заучить. Мы автоматически разделим его на предложения для озвучки.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-6 py-4">
                            <div className="grid gap-2">
                                <Label htmlFor="title">Название темы</Label>
                                <Input
                                    id="title"
                                    placeholder="Например: Мое хобби или Работа мечты"
                                    value={newTitle}
                                    onChange={(e) => setNewTitle(e.target.value)}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="content">Текст на немецком</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Вставьте текст здесь..."
                                    className="min-h-[200px]"
                                    value={newContent}
                                    onChange={(e) => setNewContent(e.target.value)}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Отмена</Button>
                            <Button onClick={handleAddText} disabled={!newTitle.trim() || !newContent.trim()}>Сохранить текст</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="space-y-12">
                <div className="space-y-6">
                    <div className="flex items-center gap-3 border-b pb-4">
                        <h2 className="text-2xl font-bold font-headline">Уровень B2</h2>
                        <span className="text-xs font-mono bg-primary text-primary-foreground px-2 py-0.5 rounded-full uppercase">Active</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allTexts.map((topic) => (
                            <Card key={topic.id} className="group hover:border-primary/50 transition-all hover:shadow-lg flex flex-col">
                                <CardHeader>
                                    <div className="flex justify-between items-start mb-2">
                                        <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                                            <Briefcase className="h-5 w-5 text-blue-500" />
                                        </div>
                                        {topic.isCustom && (
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                                onClick={(e: React.MouseEvent) => {
                                                    e.preventDefault();
                                                    removeCustomText(topic.id);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                    <CardTitle className="text-xl">{topic.title}</CardTitle>
                                    <CardDescription>{topic.description}</CardDescription>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <p className="text-xs text-muted-foreground line-clamp-3">
                                        {topic.content}
                                    </p>
                                </CardContent>
                                <CardFooter>
                                    <Button asChild className="w-full">
                                        <Link href={`/exam-texts/${topic.id}`}>
                                            Открыть текст <ArrowRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
