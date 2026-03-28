'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { SpeakButton } from '@/components/speak-button';
import { InteractiveText } from './interactive-text';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, BrainCircuit } from 'lucide-react';
import { GenerateStoryOutput } from '@/ai/flows/generate-story';

interface NarrativeViewProps {
    storyData: GenerateStoryOutput & { wordMap: Record<string, string> };
    onNext: () => void;
    isGenerating?: boolean;
}

export function NarrativeView({ storyData, onNext, isGenerating }: NarrativeViewProps) {
    if (isGenerating) {
        return (
            <div className="flex flex-col items-center justify-center p-12 space-y-6 min-h-[400px]">
                <div className="relative">
                    <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                    <BookOpen className="absolute inset-0 m-auto h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-black uppercase tracking-widest text-primary/60">Печатный станок ИИ...</h3>
                    <p className="text-sm text-muted-foreground italic">Создаем уникальную историю с вашими словами</p>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto space-y-8"
        >
            <div className="flex items-center gap-3 text-primary/40 uppercase text-[10px] tracking-[0.2em] font-black">
                <BookOpen className="h-4 w-4" />
                <span>Контекстная прелюдия: Чтение</span>
            </div>

            <Card className="rounded-[3rem] border-none shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden bg-[#fdfaf1] relative group">
                {/* Vintage Paper Texture Overlay */}
                <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-8 opacity-10">
                    <BookOpen className="h-32 w-32 rotate-12" />
                </div>

                <CardContent className="p-10 sm:p-16 space-y-10 relative z-10 text-[#2c1810]">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#2c1810]/10 pb-8">
                        <div className="space-y-2">
                            <h2 className="text-4xl sm:text-5xl font-black tracking-tighter italic leading-none">
                                {storyData.title}
                            </h2>
                            <p className="text-lg font-bold opacity-40 italic">
                                {storyData.russianTitle}
                            </p>
                        </div>
                        <SpeakButton 
                            text={storyData.story} 
                            size="lg" 
                            variant="secondary" 
                            className="bg-[#2c1810] text-[#fdfaf1] hover:bg-[#2c1810]/90 rounded-2xl px-6 h-12 shadow-xl shrink-0 transition-transform active:scale-95"
                            showText
                        />
                    </div>

                    {/* Story Content */}
                    <div className="text-xl sm:text-2xl font-medium leading-[1.6] italic space-y-6">
                        <InteractiveText 
                            text={storyData.story} 
                            wordMap={storyData.wordMap} 
                        />
                    </div>

                    {/* Translation Toggle / Hint */}
                    <div className="pt-8 border-t border-[#2c1810]/5">
                        <div className="flex items-center gap-2 text-[#2c1810]/30 text-[10px] uppercase font-black tracking-widest">
                            <BrainCircuit className="h-4 w-4" />
                            Нажимайте на слова для перевода
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-center">
                <Button 
                    onClick={onNext}
                    size="lg"
                    className="h-16 px-12 rounded-2xl text-xl font-black uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all group"
                >
                    Продолжить
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
                </Button>
            </div>
        </motion.div>
    );
}
