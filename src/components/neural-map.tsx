
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { StudyQueueItem, UserVocabularyWord } from '@/lib/types';
import { useMemo, useState } from 'react';
import { BrainCircuit, Info, Zap } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface NeuralMapProps {
    words?: UserVocabularyWord[];
    items?: StudyQueueItem[];
    limit?: number;
    title?: string;
}

export function NeuralMap({ words, items, limit = 50, title = "Neural Activity" }: NeuralMapProps) {
    // Select relevant words (e.g., most learned or most recent)
    const displayWords = useMemo(() => {
        const sourceWords = words || items?.map((item: StudyQueueItem) => ({
            id: item.id,
            word: item.word,
            sm2State: {
                interval: item.interval || 0,
                repetitions: 0,
                easeFactor: item.easeFactor || 2.5,
                nextReviewDate: item.nextReviewNum
            },
            addedAt: Date.now()
        })) || [];

        return [...sourceWords]
            .sort((a, b) => (b.sm2State?.interval || 0) - (a.sm2State?.interval || 0))
            .slice(0, limit);
    }, [words, items, limit]);

    const [hoveredWord, setHoveredWord] = useState<string | null>(null);

    return (
        <div className="relative w-full h-[500px] bg-[#020617] rounded-[2.5rem] overflow-hidden border border-primary/20 shadow-[0_0_50px_-12px_rgba(59,130,246,0.3)] group">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Background Neural Grid */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="neural-grid" width="60" height="60" patternUnits="userSpaceOnUse">
                            <circle cx="1" cy="1" r="1" fill="currentColor" className="text-primary/40" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-grid)" />
                </svg>
            </div>

            {/* Neural Map Title */}
            <div className="absolute top-8 left-8 z-10">
                <h3 className="text-white text-xl font-black tracking-tight flex items-center gap-3">
                    <div className="p-2 bg-primary/20 rounded-xl border border-primary/30">
                        <BrainCircuit className="h-5 w-5 text-primary" />
                    </div>
                    {title}
                </h3>
            </div>

            {/* Neural Connections (Metaphorical Nodes) */}
            <div className="absolute inset-0 flex items-center justify-center pt-24 p-8">
                <div className="relative w-full h-full flex flex-wrap justify-center content-center gap-3">
                    {displayWords.map((w, idx) => {
                        const strength = Math.min((w.sm2State?.interval || 0) / 30, 1); // 1 = 30 days interval
                        const myelinated = strength > 0.8;
                        const isDue = w.sm2State?.nextReviewDate && w.sm2State.nextReviewDate < Date.now();

                        return (
                            <TooltipProvider key={w.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: 1,
                                                opacity: 1,
                                            }}
                                            whileHover={{
                                                scale: 1.15,
                                                zIndex: 50,
                                                transition: { type: 'spring', stiffness: 400, damping: 10 }
                                            }}
                                            onMouseEnter={() => setHoveredWord(w.id)}
                                            onMouseLeave={() => setHoveredWord(null)}
                                            className={cn(
                                                "relative flex items-center justify-center px-4 py-2 rounded-2xl border cursor-help transition-all duration-300",
                                                strength > 0.8
                                                    ? 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500 shadow-[0_0_15px_-5px_orange]'
                                                    : strength > 0.3
                                                        ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_-5px_blue]'
                                                        : 'bg-slate-900/50 border-slate-800 text-slate-500'
                                            )}
                                        >
                                            <span className="text-xs font-black tracking-tight whitespace-nowrap">
                                                {w.word.german}
                                            </span>

                                            {/* Pulse ring for due words */}
                                            {isDue && (
                                                <motion.div
                                                    className="absolute -inset-[3px] rounded-2xl border border-red-500/50"
                                                    animate={{ opacity: [0, 0.5, 0], scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                />
                                            )}

                                            {/* Glow for myelinated nodes */}
                                            {myelinated && (
                                                <div className="absolute -inset-1 bg-yellow-400/10 blur-sm rounded-2xl -z-10" />
                                            )}
                                        </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-slate-950 border-white/10 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-xl">
                                        <div className="space-y-3">
                                            <div className="font-black text-lg flex items-center gap-2">
                                                <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
                                                {w.word.german}
                                            </div>
                                            <div className="text-slate-400 text-sm font-medium border-l-2 border-primary/30 pl-3">
                                                {w.word.russian}
                                            </div>
                                            <div className="grid grid-cols-2 gap-4 pt-2">
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Интервал</span>
                                                    <span className="text-primary font-bold">{w.sm2State?.interval} дн.</span>
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-[10px] text-slate-500 uppercase font-black tracking-widest">Сила</span>
                                                    <span className={cn("font-bold", strength > 0.8 ? "text-yellow-400" : "text-blue-400")}>
                                                        {Math.round(strength * 100)}%
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        );
                    })}
                </div>
            </div>

            {/* Neuro-Stats Overlay */}
            <div className="absolute bottom-10 left-10 flex items-center gap-6 bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 shadow-2xl">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black">Слов в базе</span>
                    <span className="text-3xl font-black text-white">{words?.length || items?.length}</span>
                </div>
                <div className="h-10 w-[1px] bg-white/10" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-black flex items-center gap-1">
                        <Zap className="h-2 w-2 text-yellow-400 fill-yellow-400" /> Нейро-ядер
                    </span>
                    <span className="text-3xl font-black text-primary">
                        {displayWords.length}
                    </span>
                </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute bottom-10 right-10">
                <div className="flex items-center gap-3 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20 backdrop-blur-md shadow-lg">
                    <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <div className="absolute inset-0 h-2 w-2 rounded-full bg-primary animate-ping" />
                    </div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                        Synaptic Map v2.0
                    </span>
                </div>
            </div>
        </div>
    );
}

