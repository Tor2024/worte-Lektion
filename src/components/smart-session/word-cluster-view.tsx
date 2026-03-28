'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, Sparkles, BookOpen, PenTool, BrainCircuit } from 'lucide-react';
import { WordClusterOutput } from '@/ai/flows/get-word-cluster';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useSpeech } from '@/hooks/use-speech';

interface WordClusterViewProps {
    data: WordClusterOutput;
    currentWord: string;
}

export function WordClusterView({ data, currentWord }: WordClusterViewProps) {
    const { speak } = useSpeech();

    const getIcon = (type: string) => {
        switch (type) {
            case 'noun': return <BookOpen className="h-4 w-4" />;
            case 'verb': return <Activity className="h-4 w-4" />;
            case 'adjective': return <Sparkles className="h-4 w-4" />;
            default: return <BrainCircuit className="h-4 w-4" />;
        }
    };

    const getTypeLabel = (type: string) => {
        switch (type) {
            case 'noun': return 'Существительное';
            case 'verb': return 'Глагол';
            case 'adjective': return 'Прилагательное';
            default: return type;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-indigo-500/5 dark:bg-indigo-500/10 border-2 border-indigo-500/10 rounded-[2.5rem] p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden"
        >
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Network className="h-24 w-24 text-indigo-500" />
            </div>

            <div className="flex items-center gap-3 mb-8 relative z-10">
                <div className="bg-indigo-500 p-2.5 rounded-2xl text-white shadow-lg shadow-indigo-500/20">
                    <Sparkles className="h-5 w-5" />
                </div>
                <div>
                    <h4 className="text-lg font-black uppercase tracking-widest text-indigo-600 dark:text-indigo-400">Словообразовательный кластер</h4>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter opacity-60">Triple-Threat Learning System</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                {data.items.map((item, idx) => {
                    const isCurrent = item.german.toLowerCase().includes(currentWord.toLowerCase()) || 
                                     currentWord.toLowerCase().includes(item.german.toLowerCase());
                    
                    const displayWord = item.type === 'noun' && item.article 
                        ? `${item.article} ${item.german}` 
                        : item.german;

                    return (
                        <motion.div
                            key={idx}
                            whileHover={{ y: -5 }}
                            onClick={() => speak(displayWord, 'de-DE')}
                            className={cn(
                                "cursor-pointer group p-6 rounded-[2rem] border-2 transition-all duration-300 relative flex flex-col justify-between min-h-[160px]",
                                isCurrent 
                                    ? "bg-white dark:bg-slate-900 border-indigo-500 shadow-xl shadow-indigo-500/10 scale-[1.02]" 
                                    : "bg-white/40 dark:bg-slate-900/40 border-transparent hover:border-indigo-500/30 hover:bg-white dark:hover:bg-slate-900"
                            )}
                        >
                            {isCurrent && (
                                <Badge className="absolute -top-2 -right-2 bg-indigo-500 text-white font-black text-[8px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                                    Текущее
                                </Badge>
                            )}
                            
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <div className={cn(
                                        "p-1.5 rounded-lg",
                                        isCurrent ? "bg-indigo-500/10 text-indigo-500" : "bg-slate-500/5 text-slate-500"
                                    )}>
                                        {getIcon(item.type)}
                                    </div>
                                    <span className="text-[9px] font-black uppercase tracking-[0.1em] opacity-50">
                                        {getTypeLabel(item.type)}
                                    </span>
                                </div>
                                
                                <div className="space-y-1">
                                    <p className="text-xl font-black text-slate-900 dark:text-white tracking-tight leading-none group-hover:text-indigo-500 transition-colors">
                                        {displayWord}
                                    </p>
                                    <p className="text-sm font-medium italic text-muted-foreground">
                                        {item.russian}
                                    </p>
                                </div>
                            </div>

                            {(item as any).example && (
                                <div className="mt-4 pt-4 border-t border-slate-500/5">
                                    <p className="text-[10px] leading-relaxed opacity-60 italic border-l-2 border-indigo-500/20 pl-3 py-1">
                                        {(item as any).example}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    );
                })}
            </div>
        </motion.div>
    );
}

import { Activity } from 'lucide-react';
