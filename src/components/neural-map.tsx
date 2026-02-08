
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

    // Calculate random connections for the background
    const connections = useMemo(() => {
        const lines = [];
        for (let i = 0; i < Math.min(displayWords.length, 15); i++) {
            lines.push({
                start: { x: Math.random() * 1000, y: Math.random() * 500 },
                end: { x: Math.random() * 1000, y: Math.random() * 500 }
            });
        }
        return lines;
    }, [displayWords.length]);

    function isHoveredWordConnected(wordId: string) {
        if (!hoveredWord) return true;
        if (hoveredWord === wordId) return true;
        // Simple logic: Highlight nodes that have similar strength or are nearby in the list
        const idx = displayWords.findIndex(w => w.id === wordId);
        const hIdx = displayWords.findIndex(w => w.id === hoveredWord);
        return Math.abs(idx - hIdx) < 3;
    }

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
                        <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="transparent" />
                            <stop offset="50%" stopColor="var(--primary)" />
                            <stop offset="100%" stopColor="transparent" />
                        </linearGradient>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-grid)" />
                </svg>
            </div>

            {/* Moving Synaptic Filaments */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg width="100%" height="100%" viewBox="0 0 1000 500" preserveAspectRatio="none">
                    {connections.map((conn, i) => (
                        <motion.path
                            key={i}
                            d={`M ${conn.start.x} ${conn.start.y} Q 500 250 ${conn.end.x} ${conn.end.y}`}
                            stroke="url(#connection-gradient)"
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{
                                pathLength: [0, 1, 0],
                                opacity: [0, 0.4, 0],
                            }}
                            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: i * 0.8 }}
                        />
                    ))}
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

            {/* Legend */}
            <div className="absolute top-24 left-8 z-10 hidden md:flex flex-col gap-2 bg-slate-900/40 backdrop-blur-md p-4 rounded-2xl border border-white/5 shadow-xl">
                {[
                    { label: 'Мастер', color: 'bg-yellow-500' },
                    { label: 'Сила', color: 'bg-pink-500' },
                    { label: 'Стабильность', color: 'bg-purple-500' },
                    { label: 'Закрепление', color: 'bg-indigo-500' },
                    { label: 'Усвоение', color: 'bg-blue-500' },
                    { label: 'Начало', color: 'bg-cyan-500' },
                    { label: 'Новое', color: 'bg-slate-600' }
                ].map((tier, i) => (
                    <div key={i} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter text-white/70">
                        <div className={cn("w-2 h-2 rounded-full", tier.color)} />
                        {tier.label}
                    </div>
                ))}
            </div>

            {/* Neural Connections (Metaphorical Nodes) */}
            <div className="absolute inset-0 flex items-center justify-center pt-24 p-8 overflow-y-auto">
                <div className="relative w-full flex flex-wrap justify-center content-center gap-3">
                    {displayWords.map((w, idx) => {
                        const strength = Math.min((w.sm2State?.interval || 0) / 30, 1); // 1 = 30 days interval
                        const myelinated = strength > 0.8;
                        const isDue = w.sm2State?.nextReviewDate && w.sm2State.nextReviewDate < Date.now();
                        const isActive = hoveredWord === w.id;
                        const isPrimaryConnected = isHoveredWordConnected(w.id);

                        return (
                            <TooltipProvider key={w.id}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <motion.div
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{
                                                scale: isActive ? 1.1 : 1,
                                                opacity: isPrimaryConnected ? 1 : (hoveredWord ? 0.2 : 1),
                                                y: isActive ? -5 : 0,
                                            }}
                                            onMouseEnter={() => setHoveredWord(w.id)}
                                            onMouseLeave={() => setHoveredWord(null)}
                                            className={cn(
                                                "relative flex items-center justify-center px-4 py-2 rounded-2xl border cursor-help transition-all duration-300",
                                                (w.sm2State?.interval || 0) === 0
                                                    ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                                                    : w.sm2State?.interval! < 3
                                                        ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400 shadow-[0_0_15px_-5px_cyan]'
                                                        : w.sm2State?.interval! < 7
                                                            ? 'bg-blue-500/10 border-blue-500/50 text-blue-400 shadow-[0_0_15px_-5px_blue]'
                                                            : w.sm2State?.interval! < 15
                                                                ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400 shadow-[0_0_15px_-5px_indigo]'
                                                                : w.sm2State?.interval! < 30
                                                                    ? 'bg-purple-500/10 border-purple-500/50 text-purple-400 shadow-[0_0_15px_-5px_purple]'
                                                                    : w.sm2State?.interval! < 60
                                                                        ? 'bg-pink-500/10 border-pink-500/50 text-pink-400 shadow-[0_0_15px_-5px_pink]'
                                                                        : 'bg-yellow-500/10 border-yellow-500/50 text-yellow-500 shadow-[0_0_15px_-5px_orange]',
                                                isActive && "border-primary bg-primary/20 ring-4 ring-primary/20 scale-110 shadow-[0_0_25px_rgba(59,130,246,0.5)] z-50"
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

                                            {/* Activity Sparks when hovered */}
                                            {isActive && (
                                                <div className="absolute -inset-4 pointer-events-none overflow-hidden">
                                                    {[...Array(5)].map((_, i) => (
                                                        <motion.div
                                                            key={i}
                                                            className="absolute h-1 w-1 bg-primary rounded-full"
                                                            animate={{
                                                                x: [0, (Math.random() - 0.5) * 60],
                                                                y: [0, (Math.random() - 0.5) * 60],
                                                                opacity: [1, 0],
                                                                scale: [1, 0]
                                                            }}
                                                            transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
                                                        />
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-slate-950 border-white/10 text-white p-4 rounded-2xl shadow-2xl backdrop-blur-xl z-50">
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
                                                    <span className={cn("font-bold",
                                                        (w.sm2State?.interval || 0) === 0 ? "text-slate-500" :
                                                            w.sm2State!.interval < 3 ? "text-cyan-400" :
                                                                w.sm2State!.interval < 7 ? "text-blue-400" :
                                                                    w.sm2State!.interval < 15 ? "text-indigo-400" :
                                                                        w.sm2State!.interval < 30 ? "text-purple-400" :
                                                                            w.sm2State!.interval < 60 ? "text-pink-400" : "text-yellow-400"
                                                    )}>
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
            <div className="absolute bottom-10 left-10 flex items-center gap-6 bg-slate-900/40 backdrop-blur-xl p-6 rounded-[2rem] border border-white/5 shadow-2xl z-20">
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
            <div className="absolute bottom-10 right-10 z-20">
                <div className="flex items-center gap-3 bg-primary/10 px-5 py-2.5 rounded-full border border-primary/20 backdrop-blur-md shadow-lg">
                    <div className="relative">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <div className="absolute inset-0 h-2 w-2 rounded-full bg-primary animate-ping" />
                    </div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">
                        Synaptic Map v3.0
                    </span>
                </div>
            </div>
        </div>
    );
}


