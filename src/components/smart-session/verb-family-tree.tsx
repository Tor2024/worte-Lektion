'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Network, ArrowRight, Info } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type VerbFamilyOutput } from '@/ai/flows/get-verb-family';
import { cn } from '@/lib/utils';

interface VerbFamilyTreeProps {
    data: VerbFamilyOutput;
    currentVerb: string;
}

export function VerbFamilyTree({ data, currentVerb }: VerbFamilyTreeProps) {
    return (
        <div className="w-full space-y-6 py-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary/60">
                    <Network className="h-4 w-4" /> Семантическое Облако Корня
                </div>
                <div className="relative">
                    <div className="text-4xl font-black text-primary px-8 py-4 bg-primary/5 rounded-3xl border-2 border-primary/20 shadow-inner">
                        -{data.root}-
                    </div>
                    <div className="text-[10px] absolute -bottom-2 left-1/2 -translate-x-1/2 bg-white px-2 font-bold text-muted-foreground border rounded-full whitespace-nowrap">
                        суть: {data.rootMeaning}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
                {data.family.map((v, i) => {
                    const isCurrent = v.verb.toLowerCase() === currentVerb.toLowerCase();

                    return (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                        >
                            <Card className={cn(
                                "group transition-all duration-300 overflow-hidden border-2",
                                isCurrent
                                    ? "bg-primary/5 border-primary shadow-lg scale-[1.02]"
                                    : "bg-card hover:bg-muted/50 border-transparent hover:border-muted-foreground/20"
                            )}>
                                <CardContent className="p-4 space-y-3">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Badge variant={isCurrent ? "default" : "outline"} className="font-black uppercase tracking-tighter">
                                                {v.prefix}-
                                            </Badge>
                                            <div className="text-lg font-bold">
                                                {v.verb}
                                            </div>
                                        </div>
                                        <div className="text-sm font-medium text-muted-foreground italic">
                                            {v.translation}
                                        </div>
                                    </div>

                                    <div className="p-3 bg-muted/30 rounded-xl border border-dashed text-[11px] leading-relaxed relative group-hover:bg-white transition-colors">
                                        <div className="absolute top-1 right-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                            <Info className="h-3 w-3" />
                                        </div>
                                        <div className="font-bold text-primary/70 mb-1 flex items-center gap-1">
                                            Мостик:
                                        </div>
                                        <p className="text-slate-600">
                                            {v.logicalBridge}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    );
                })}
            </div>

            <p className="text-[10px] text-center text-muted-foreground italic opacity-70">
                Запоминая корень и логику приставки, вы начинаете «чувствовать» язык, а не просто зубрить.
            </p>
        </div>
    );
}
