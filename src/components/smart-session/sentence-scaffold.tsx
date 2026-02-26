'use client';

import React from 'react';
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from '@/components/ui/tooltip';

interface WordMapping {
    german: string;
    russian: string;
}

interface SentenceScaffoldProps {
    sentenceWithBlank: string;
    wordByWord: WordMapping[];
    missingWord: string;
    userAnswer?: string | null;
    feedback?: 'correct' | 'incorrect' | null;
}

export function SentenceScaffold({
    sentenceWithBlank,
    wordByWord,
    missingWord,
    userAnswer,
    feedback
}: SentenceScaffoldProps) {
    const parts = sentenceWithBlank.split('___');

    return (
        <TooltipProvider>
            <div className="text-2xl sm:text-3xl font-medium leading-relaxed max-w-xl text-center">
                <SentencePart text={parts[0]} wordByWord={wordByWord} />
                <span className="inline-block border-b-2 border-primary mx-1 min-w-[100px] font-bold text-primary align-baseline relative top-[-2px]">
                    {feedback ? (
                        <span className={feedback === 'correct' ? 'text-green-600' : 'text-red-600'}>
                            {feedback === 'correct' ? missingWord : userAnswer}
                        </span>
                    ) : (
                        <span className="opacity-0">placeholder</span>
                    )}
                </span>
                <SentencePart text={parts[1]} wordByWord={wordByWord} />
            </div>
        </TooltipProvider>
    );
}

function SentencePart({ text, wordByWord }: { text: string; wordByWord: WordMapping[] }) {
    if (!text) return null;
    const wordsAndSpaces = text.split(/(\s+)/);
    return (
        <>
            {wordsAndSpaces.map((item, i) => {
                if (item.match(/\s+/)) return <span key={i}>{item}</span>;
                return <WordWithTooltip key={i} word={item} wordByWord={wordByWord} />;
            })}
        </>
    );
}

function WordWithTooltip({ word, wordByWord }: { word: string; wordByWord: WordMapping[] }) {
    const cleanWord = word.replace(/[.,!?;:]/g, '');
    const entry = wordByWord.find(m => m.german.toLowerCase() === cleanWord.toLowerCase());
    const translation = entry ? entry.russian : null;

    if (!translation) return <span>{word}</span>;

    return (
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <span className="cursor-help border-b border-dotted border-muted-foreground/30 hover:border-primary transition-colors">
                    {word}
                </span>
            </TooltipTrigger>
            <TooltipContent className="bg-slate-900 text-white border-slate-800 text-xs py-1 px-2">
                {translation}
            </TooltipContent>
        </Tooltip>
    );
}
