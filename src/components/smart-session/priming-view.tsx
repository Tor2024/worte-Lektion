
'use client';

import { StudyQueueItem } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpeakButton } from '@/components/speak-button';
import { formatGermanWord } from '@/lib/german-utils';
import { BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

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
            <div className="flex items-center gap-2 text-muted-foreground uppercase text-xs tracking-widest">
                <BrainCircuit className="h-4 w-4" /> Фаза 1: Загрузка Образа
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
