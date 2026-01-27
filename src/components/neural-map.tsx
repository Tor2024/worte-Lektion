
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { UserVocabularyWord } from '@/lib/types';
import { useMemo, useState } from 'react';
import { BrainCircuit, Info } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface NeuralMapProps {
    words: UserVocabularyWord[];
    limit?: number;
}

export function NeuralMap({ words, limit = 50 }: NeuralMapProps) {
    // Select relevant words (e.g., most learned or most recent)
    const displayWords = useMemo(() => {
        return [...words]
            .sort((a, b) => (b.sm2State?.interval || 0) - (a.sm2State?.interval || 0))
            .slice(0, limit);
    }, [words, limit]);

    const [hoveredWord, setHoveredWord] = useState<string | null>(null);

    return (
        <div className="relative w-full h-[400px] bg-slate-950 rounded-3xl overflow-hidden border border-primary/20 shadow-2xl group">
            {/* Background Neural Grid */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="neural-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-primary/30" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#neural-grid)" />
                </svg>
            </div>

            {/* Neural Connections (Metaphorical) */}
            <div className="absolute inset-0 flex items-center justify-center p-8">
                <div className="relative w-full h-full flex flex-wrap justify-center content-center gap-2">
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
                                                scale: strength * 0.5 + 0.5,
                                                opacity: 1,
                                                boxShadow: strength > 0.5 ? `0 0 ${strength * 20}px ${strength > 0.8 ? 'rgba(234, 179, 8, 0.4)' : 'rgba(59, 130, 246, 0.4)'}` : 'none'
                                            }}
                                            whileHover={{ scale: 1.2, zIndex: 50 }}
                                            onMouseEnter={() => setHoveredWord(w.id)}
                                            onMouseLeave={() => setHoveredWord(null)}
                                            className={`
                                                relative flex items-center justify-center
                                                px-3 py-1.5 rounded-full border cursor-help transition-colors
                                                ${strength > 0.8
                                                    ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-500'
                                                    : strength > 0.3
                                                        ? 'bg-blue-500/20 border-blue-500/50 text-blue-400'
                                                        : 'bg-slate-800 border-slate-700 text-slate-500'}
                                                ${isDue ? 'animate-pulse ring-1 ring-red-500/50' : ''}
                                            `}
                                        >
                                            <span className="text-[10px] sm:text-xs font-bold font-mono tracking-tighter">
                                                {w.word.german}
                                            </span>

                                            {/* Myelin Sheath Detail (only for strong words) */}
                                            {myelinated && (
                                                <motion.div
                                                    layoutId={`myelin-${w.id}`}
                                                    className="absolute -inset-1 rounded-full border-2 border-yellow-400/30 blur-[2px]"
                                                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                                                    transition={{ repeat: Infinity, duration: 2 }}
                                                />
                                            )}
                                        </motion.div>
                                    </TooltipTrigger>
                                    <TooltipContent className="bg-slate-900 border-primary/20 text-white p-3 space-y-2">
                                        <div className="font-bold flex items-center gap-2">
                                            <BrainCircuit className="h-4 w-4 text-primary" />
                                            {w.word.german} — {w.word.russian}
                                        </div>
                                        <div className="text-[10px] space-y-1">
                                            <div className="flex justify-between gap-4">
                                                <span className="text-slate-400">Сила связи (Интервал):</span>
                                                <span className="text-primary">{w.sm2State?.interval} дн.</span>
                                            </div>
                                            <div className="flex justify-between gap-4">
                                                <span className="text-slate-400">Миелинизация:</span>
                                                <span className={strength > 0.8 ? 'text-yellow-400' : 'text-blue-400'}>
                                                    {Math.round(strength * 100)}%
                                                </span>
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
            <div className="absolute bottom-6 left-6 flex items-center gap-4 bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-white/10">
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Активные нейроны</span>
                    <span className="text-2xl font-black">{words.length}</span>
                </div>
                <div className="h-8 w-[1px] bg-white/10" />
                <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">B2 Покрытие</span>
                    <span className="text-2xl font-black text-primary">
                        {Math.min(100, Math.round((words.length / 800) * 100))}%
                    </span>
                </div>
            </div>

            {/* Pulse of Consciousness */}
            <div className="absolute top-6 right-6">
                <div className="flex items-center gap-2 text-[10px] font-bold text-primary animate-pulse uppercase tracking-wider bg-primary/10 px-3 py-1.5 rounded-full border border-primary/20">
                    <span className="h-2 w-2 rounded-full bg-primary" />
                    Neuro-Core Active
                </div>
            </div>

            {/* Dynamic Label */}
            <AnimatePresence>
                {hoveredWord && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                    >
                        <div className="text-4xl font-black text-white/5 uppercase tracking-tighter select-none">
                            NEURO-DEUTSCH
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

