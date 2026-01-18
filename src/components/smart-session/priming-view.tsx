
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpeakButton } from '@/components/speak-button';
import { formatGermanWord } from '@/lib/german-utils';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';

interface PrimingViewProps {
    item: StudyQueueItem;
    onNext: () => void;
}

export function PrimingView({ item, onNext }: PrimingViewProps) {
    const { word } = item;

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center space-y-8"
        >
            <div className="flex items-center gap-3 text-muted-foreground uppercase text-xs tracking-widest font-bold">
                <BrainCircuit className="h-4 w-4" />
                <span>Фаза 1: Загрузка Образа</span>
                {word.level && (
                    <Badge variant="secondary" className="ml-2 bg-primary/10 text-primary border-primary/20">
                        {word.level}
                    </Badge>
                )}
            </div>

            <Card className="w-full bg-card border-none shadow-2xl overflow-hidden relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 to-purple-500" />
                <CardContent className="p-10 flex flex-col items-center text-center space-y-6">

                    <div className="space-y-2">
                        <div className="text-6xl font-black text-primary tracking-tight">
                            {formatGermanWord(word)}
                        </div>
                        <div className="text-2xl text-muted-foreground font-serif italic">
                            {word.russian}
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <SpeakButton text={formatGermanWord(word)} size="lg" />
                    </div>

                    {/* Context Example */}
                    {'example' in word && (
                        <div className="bg-muted/50 p-6 rounded-xl text-lg relative mt-4">
                            <span className="text-4xl absolute -top-4 -left-2 opacity-10">❝</span>
                            <p
                                className="italic text-foreground/80 leading-relaxed max-w-sm"
                                dangerouslySetInnerHTML={{ __html: word.example }}
                            />
                        </div>
                    )}

                    {/* Verb Conjugations */}
                    {word.type === 'verb' && (word as any).conjugations && (
                        <div className="w-full max-w-sm mt-4 p-4 bg-primary/5 rounded-xl border border-primary/10">
                            <h4 className="text-xs font-bold uppercase tracking-widest text-primary/60 mb-3">Спряжение (Präsens)</h4>
                            <div className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">ich</span>
                                    <span className="font-bold">{(word as any).conjugations.ich}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">wir</span>
                                    <span className="font-bold">{(word as any).conjugations.wir}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">du</span>
                                    <span className="font-bold">{(word as any).conjugations.du}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">ihr</span>
                                    <span className="font-bold">{(word as any).conjugations.ihr}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">er/sie/es</span>
                                    <span className="font-bold">{(word as any).conjugations.er_sie_es}</span>
                                </div>
                                <div className="flex justify-between border-b border-primary/10 pb-1">
                                    <span className="text-muted-foreground">sie/Sie</span>
                                    <span className="font-bold">{(word as any).conjugations.sie_Sie}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </CardContent>
            </Card>

            <div className="w-full max-w-sm space-y-4">
                <Button size="lg" className="w-full h-16 text-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg" onClick={onNext}>
                    Запомнил
                </Button>
                <p className="text-xs text-center text-muted-foreground opacity-70">
                    Нажмите, когда четко представите образ слова.
                </p>
            </div>
        </motion.div>
    );
}
