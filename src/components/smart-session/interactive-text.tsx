'use client';

import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface InteractiveTextProps {
    text: string;
    wordMap: Record<string, string>;
}

export function InteractiveText({ text, wordMap }: InteractiveTextProps) {
    if (!text) return null;

    // First, handle markdown bolding **word**
    const parts = text.split(/(\*\*.*?\*\*)/);

    return (
        <TooltipProvider>
            <div className="leading-relaxed">
                {parts.map((part, i) => {
                    if (part.startsWith('**') && part.endsWith('**')) {
                        const word = part.slice(2, -2);
                        return <InteractiveWord key={i} word={word} wordMap={wordMap} isBold />;
                    }

                    // For non-bolded text, split by whitespace, but keep whitespace
                    const fragments = part.split(/(\s+)/);
                    return fragments.map((fragment, j) => {
                        if (fragment.match(/^\s+$/)) return <span key={`${i}-${j}`}>{fragment}</span>;

                        // Split by non-alphabetic characters to isolate words from punctuation
                        // Allow hyphens within words if they are surrounded by letters
                        const tokens = fragment.split(/([^a-zA-ZäöüÄÖÜß-]+)/);
                        return tokens.map((token, k) => {
                            // Only treat as a word if it contains at least one letter
                            if (token.match(/[a-zA-ZäöüÄÖÜß]/) && token.match(/^[a-zA-ZäöüÄÖÜß-]+$/)) {
                                return <InteractiveWord key={`${i}-${j}-${k}`} word={token} wordMap={wordMap} />;
                            }
                            return <span key={`${i}-${j}-${k}`}>{token}</span>;
                        });
                    });
                })}
            </div>
        </TooltipProvider>
    );
}

function InteractiveWord({ word, wordMap, isBold }: { word: string; wordMap: Record<string, string>; isBold?: boolean }) {
    // Try both absolute match and lowercase match
    const translation = wordMap[word] || wordMap[word.toLowerCase()];

    if (!translation) {
        return (
            <span className={cn(
                "transition-colors",
                isBold ? "font-black text-primary underline decoration-primary/30" : "text-inherit"
            )}>
                {word}
            </span>
        );
    }

    return (
        <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
                <span className={cn(
                    "cursor-help transition-all duration-200 border-b border-transparent hover:border-[#2c1810]/30 hover:bg-[#2c1810]/5",
                    isBold ? "font-black text-primary underline decoration-primary/50 underline-offset-4" : "text-inherit"
                )}>
                    {word}
                </span>
            </TooltipTrigger>
            <TooltipContent
                side="top"
                className="bg-[#2c1810] text-[#f4ecd8] border-[#d6c7a1]/20 shadow-2xl px-3 py-1.5 text-xs font-medium animate-in zoom-in-95 duration-200"
            >
                <div className="flex flex-col gap-0.5">
                    <span className="opacity-50 text-[9px] uppercase tracking-widest font-bold">Перевод</span>
                    {translation}
                </div>
            </TooltipContent>
        </Tooltip>
    );
}
