'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowRight, Lightbulb, Info, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type VerbFamilyOutput } from '@/ai/flows/get-verb-family';
import { cn } from '@/lib/utils';
import { useSpeech } from '@/hooks/use-speech';

interface VerbFamilyTreeProps {
    data: VerbFamilyOutput;
    currentVerb: string;
}

export function VerbFamilyTree({ data, currentVerb }: VerbFamilyTreeProps) {
    const { speak } = useSpeech();

    return (
        <div className="w-full space-y-8 py-6 animate-in fade-in slide-in-from-bottom-6">
            {/* CENTRAL ROOT SECTION */}
            <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-primary/40">
                    <Network className="h-4 w-4 animate-pulse" /> 
                    Семантическое Поле Корня
                </div>
                <div className="relative group">
                    <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-full scale-150 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative text-5xl font-black text-primary px-12 py-6 bg-white dark:bg-slate-900 rounded-[2.5rem] border-4 border-primary/10 shadow-2xl tracking-tighter italic">
                        -{data.root}-
                    </div>
                    <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg border-2 border-white dark:border-slate-900 whitespace-nowrap">
                        Суть: {data.rootMeaning}
                    </div>
                </div>
            </div>

            {/* FAMILY GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
                {data.family.map((v, i) => {
                    const isCurrent = v.verb.toLowerCase() === currentVerb.toLowerCase();

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ y: -5 }}
                            onClick={() => speak(v.verb, 'de-DE')}
                            className="cursor-pointer"
                        >
                            <Card className={cn(
                                "group transition-all duration-300 overflow-hidden border-2 rounded-[2rem] min-h-[140px] flex flex-col justify-between",
                                isCurrent
                                    ? "bg-white dark:bg-slate-900 border-primary shadow-xl shadow-primary/10 scale-[1.02]"
                                    : "bg-white/40 dark:bg-slate-900/40 border-transparent hover:border-primary/30 hover:bg-white dark:hover:bg-slate-900"
                            )}>
                                <CardContent className="p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex flex-col gap-2">
                                            <div className="flex items-center gap-2">
                                                <Badge className={cn(
                                                    "font-black uppercase tracking-widest px-3 py-1 rounded-lg",
                                                    isCurrent ? "bg-primary text-white" : "bg-primary/10 text-primary-foreground border-none"
                                                )}>
                                                    {v.prefix}-
                                                </Badge>
                                                <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white leading-none">
                                                    {v.verb}
                                                </div>
                                            </div>
                                            <div className="text-sm font-bold text-muted-foreground italic pl-1">
                                                {v.translation}
                                            </div>
                                        </div>
                                        <div className="p-2 bg-primary/5 rounded-full opacity-20 group-hover:opacity-100 transition-opacity">
                                            <Activity className="h-4 w-4 text-primary" />
                                        </div>
                                    </div>

                                    {/* Mnemonic Bridge */}
                                    <div className="p-4 bg-muted/30 dark:bg-slate-800/50 rounded-2xl border border-dashed border-primary/20 text-[11px] leading-relaxed relative transition-colors group-hover:bg-white dark:group-hover:bg-slate-800">
                                        <div className="flex items-center gap-2 mb-2">
                                            <Lightbulb className="h-3.5 w-3.5 text-primary animate-pulse" />
                                            <span className="font-black text-[9px] uppercase tracking-widest text-primary/60">Логический мостик</span>
                                        </div>
                                        <p className="text-slate-600 dark:text-slate-400 font-medium">
                                            {v.logicalBridge}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <div className="flex flex-col items-center gap-2 py-4">
                <div className="h-px w-20 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                <p className="text-[10px] text-center text-muted-foreground font-bold uppercase tracking-widest italic opacity-50 px-8">
                    Корневая логика — ключ к свободному владению языком
                </p>
            </div>
        </div>
    );
}

import { Activity as ActivityIcon } from 'lucide-react';
