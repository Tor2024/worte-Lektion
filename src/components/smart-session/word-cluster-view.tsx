'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Zap, Palette, Type } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type WordClusterOutput } from '@/ai/flows/get-word-cluster';
import { cn } from '@/lib/utils';
import { useSpeech } from '@/hooks/use-speech';

interface WordClusterViewProps {
    data: WordClusterOutput;
    currentWord: string;
}

export function WordClusterView({ data, currentWord }: WordClusterViewProps) {
    const { speak } = useSpeech();

    const getIcon = (type: string) => {
        switch (type) {
            case 'noun': return <Type className="h-4 w-4 text-blue-500" />;
            case 'verb': return <Zap className="h-4 w-4 text-amber-500" />;
            case 'adjective': return <Palette className="h-4 w-4 text-indigo-500" />;
            default: return <Layers className="h-4 w-4 text-slate-500" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'noun': return 'Nomen';
            case 'verb': return 'Verb';
            case 'adjective': return 'Adjektiv';
            default: return 'Andere';
        }
    };

    return (
        <div className="w-full space-y-4 py-4 animate-in fade-in zoom-in-95 duration-500">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60 px-2">
                <Layers className="h-4 w-4" /> Семейный Кластер (Тройная Угроза)
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
                {data.items.map((item, i) => {
                    const isCurrent = item.german.toLowerCase() === currentWord.toLowerCase();
                    const displayWord = item.type === 'noun' && item.article
                        ? `${item.article} ${item.german}`
                        : item.german;

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="cursor-pointer"
                            onClick={() => speak(displayWord, 'de-DE')}
                        >
                            <Card className={cn(
                                "min-w-[140px] transition-all duration-300 border-2 overflow-hidden",
                                isCurrent
                                    ? "bg-primary/10 border-primary shadow-lg ring-2 ring-primary/20"
                                    : "bg-card hover:bg-muted/50 border-transparent hover:border-primary/20"
                            )}>
                                <CardContent className="p-3 flex flex-col items-center gap-1">
                                    <div className="flex items-center gap-1.5 mb-1">
                                        {getIcon(item.type)}
                                        <span className="text-[8px] font-black uppercase tracking-tighter opacity-70">
                                            {getTypeLabel(item.type)}
                                        </span>
                                    </div>
                                    <div className={cn(
                                        "text-sm font-black tracking-tight",
                                        isCurrent ? "text-primary" : "text-foreground"
                                    )}>
                                        {displayWord}
                                    </div>
                                    <div className="text-[9px] text-muted-foreground font-medium text-center italic">
                                        {item.russian}
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <p className="text-[9px] text-center text-muted-foreground italic opacity-60">
                💡 Прослушайте родственные слова, чтобы закрепить корень «{data.root}»
            </p>
        </div>
    );
}
