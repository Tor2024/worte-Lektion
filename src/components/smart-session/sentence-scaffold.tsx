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
    // Split the sentence into parts around the blank
    const parts = sentenceWithBlank.split('___');

    // A helper to find translation for a German word
    const getTranslation = (germanWord: string) => {
        // Clean word from punctuation for matching
        const cleanWord = germanWord.replace(/[.,!?;:]/g, '');
        const entry = wordByWord.find(m =>
            m.german.toLowerCase() === cleanWord.toLowerCase()
        );
        return entry ? entry.russian : null;
    };

    const renderWord = (word: string, index: number) => {
        const translation = getTranslation(word);

        if (!translation) return <span key={index}>{word}</span>;

        return (
            <TooltipProvider key={index}>
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
            </TooltipProvider>
        );
    };

    const renderPart = (text: string) => {
        // Split by spaces but preserve them
        const wordsAndSpaces = text.split(/(\s+)/);
        return wordsAndSpaces.map((item, i) => {
            if (item.match(/\s+/)) return <span key={`s-${i}`}>{item}</span>;
            return renderWord(item, i);
        });
    };

    return (
        <div className="text-2xl sm:text-3xl font-medium leading-relaxed max-w-xl text-center">
            {renderPart(parts[0])}
            <span className="inline-block border-b-2 border-primary mx-1 min-w-[100px] font-bold text-primary align-baseline relative top-[-2px]">
                {feedback ? (
                    <span className={feedback === 'correct' ? 'text-green-600' : 'text-red-600'}>
                        {feedback === 'correct' ? missingWord : userAnswer}
                    </span>
                ) : (
                    <span className="opacity-0">placeholder</span>
                )}
            </span>
            {renderPart(parts[1])}
        </div>
    );
}
