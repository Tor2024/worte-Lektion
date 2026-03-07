
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sparkles, BookOpen, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { expandTheoryWithAI } from '@/ai/flows/expand-theory';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AiTheoryExpanderProps {
    title: string;
    initialHtml: string;
}

export function AiTheoryExpander({ title, initialHtml }: AiTheoryExpanderProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [content, setContent] = useState(initialHtml);

    const handleExpand = async () => {
        if (isExpanded) return; // Already done

        setIsLoading(true);
        try {
            const newContent = await expandTheoryWithAI(title, initialHtml);
            setContent(newContent);
            setIsExpanded(true);
        } catch (error) {
            console.error("Failed to expand theory:", error);
            // Ideally show toast
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center mb-4">
                {!isExpanded ? (
                    <Button
                        onClick={handleExpand}
                        disabled={isLoading}
                        className="w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md transition-all hover:scale-[1.02]"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                AI анализирует и дополняет...
                            </>
                        ) : (
                            <>
                                <Sparkles className="mr-2 h-4 w-4" />
                                Объяснить подробнее с AI
                            </>
                        )}
                    </Button>
                ) : (
                    <div className="flex items-center text-sm text-purple-600 font-medium bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                        <Sparkles className="mr-2 h-3 w-3" />
                        Материал расширен и дополнен AI
                    </div>
                )}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={isExpanded ? 'active' : 'static'}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="overflow-x-auto overflow-hidden rounded-xl border-border/10">
                        <div
                            className={cn(
                                "prose prose-lg max-w-none dark:prose-invert",
                                "prose-table:w-full prose-table:min-w-[600px] prose-th:px-4 prose-th:py-3 prose-td:px-4 prose-td:py-3",
                                "prose-table:border-collapse prose-table:border prose-table:border-border",
                                "prose-th:bg-muted/50 prose-th:font-black prose-th:uppercase prose-th:text-[10px] prose-th:tracking-widest",
                                "prose-td:border prose-td:border-border prose-td:align-top",
                                isExpanded ? 'prose-headings:text-purple-700 dark:prose-headings:text-purple-400' : ''
                            )}
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </motion.div>
            </AnimatePresence>

            {isExpanded && (
                <div className="bg-muted/30 p-4 rounded-lg text-xs text-muted-foreground text-center border border-border/50">
                    Контент сгенерирован ИИ-помощником на основе базовой теории.
                </div>
            )}
        </div>
    );
}
