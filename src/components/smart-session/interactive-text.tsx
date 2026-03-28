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
    );
}

function InteractiveWord({ word, wordMap, isBold }: { word: string; wordMap: Record<string, string>; isBold?: boolean }) {
    // 1. Normalize the search word: strip punctuation and whitespace
    const cleanWord = word.replace(/[.,!?;:()\"\'-]$|^[.,!?;:()\"\' -]/g, '').trim();
    const lowerClean = cleanWord.toLowerCase();

    // 2. Multi-stage lookup in the wordMap
    const translation =
        wordMap[word] ||
        wordMap[word.toLowerCase()] ||
        wordMap[cleanWord] ||
        wordMap[lowerClean] ||
        // Check if the word is PART of a phrase key (e.g. key is "der Aufzug", word is "Aufzug")
        Object.entries(wordMap).find(([k]) => {
            const kNorm = k.toLowerCase().trim();
            return kNorm === lowerClean || kNorm.split(/\s+/).includes(lowerClean);
        })?.[1];

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
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <span
                    title={translation}
                    className={cn(
                        "cursor-help transition-all duration-200 tabular-nums border-b border-dotted border-[#2c1810]/20",
                        "hover:border-[#2c1810]/60 hover:bg-[#2c1810]/5 active:bg-[#2c1810]/10",
                        isBold ? "font-black text-primary underline decoration-primary/50 underline-offset-4" : "text-inherit"
                    )}
                >
                    {word}
                </span>
            </TooltipTrigger>
            <TooltipContent
                side="top"
                sideOffset={5}
                className="z-[100] bg-[#2c1810] text-[#f4ecd8] border-[#d6c7a1]/20 shadow-2xl px-3 py-1.5 text-xs font-medium animate-in zoom-in-95 duration-200"
            >
                <div className="flex flex-col gap-0.5 items-center text-center max-w-[200px]">
                    <span className="opacity-50 text-[9px] uppercase tracking-widest font-bold">Перевод</span>
                    <span className="font-sans leading-tight">{translation}</span>
                </div>
            </TooltipContent>
        </Tooltip>
    );
}
