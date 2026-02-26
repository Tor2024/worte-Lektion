'use client';

import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface InteractiveTextProps {
    text: string;
    wordMap: Record<string, string>;
}

export function InteractiveText({ text, wordMap }: InteractiveTextProps) {
    if (!text) return null;

    // Split text by words and spaces, preserving both
    // Matches words (including those with umlauts/special chars) or everything else
    const fragments = text.split(/(\s+|\*\*.*?\*\*|[.,!?;:]+)/);

    return (
        <TooltipProvider>
            <div className="leading-relaxed opacity-90">
                {fragments.map((fragment, i) => {
                    // If it's a bolded word from AI (**word**)
                    if (fragment.startsWith('**') && fragment.endsWith('**')) {
                        const cleanWord = fragment.slice(2, -2);
                        return <InteractiveWord key={i} word={cleanWord} wordMap={wordMap} isBold />;
                    }

                    // If it's whitespace or punctuation
                    if (fragment.match(/^\s+$/) || fragment.match(/^[.,!?;:]+$/)) {
                        return <span key={i}>{fragment}</span>;
                    }

                    // For regular words, split them further if they contain hidden fragments
                    // (e.g. if the regex above didn't catch everything)
                    const subFragments = fragment.split(/([a-zA-ZäöüÄÖÜß]+)/);

                    return subFragments.map((sub, j) => {
                        if (sub.match(/^[a-zA-ZäöüÄÖÜß]+$/)) {
                            return <InteractiveWord key={`${i}-${j}`} word={sub} wordMap={wordMap} />;
                        }
                        return <span key={`${i}-${j}`}>{sub}</span>;
                    });
                })}
            </div>
        </TooltipProvider>
    );
}

function InteractiveWord({ word, wordMap, isBold }: { word: string; wordMap: Record<string, string>; isBold?: boolean }) {
    const cleanWord = word.toLowerCase();
    const translation = wordMap[cleanWord] || wordMap[word];

    if (!translation) {
        return <span className={isBold ? "font-black text-primary underline decoration-primary/30" : ""}>{word}</span>;
    }

    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <span className={isBold ?
                    "font-black text-primary underline decoration-primary/30 cursor-help" :
                    "cursor-help border-b border-dotted border-slate-500/30 hover:border-primary/50 transition-colors"
                }>
                    {word}
                </span>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 text-white border-slate-800 text-xs py-1 px-2 shadow-xl">
                {translation}
            </TooltipContent>
        </Tooltip>
    );
}
