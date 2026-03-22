import React from 'react';
import { VocabularyWord } from '@/lib/types';
import { formatGermanWord } from '@/lib/german-utils';

interface FormattedGermanWordProps {
    word: VocabularyWord;
    className?: string;
}

const SEPARABLE_PREFIXES = [
    'ab', 'an', 'auf', 'aus', 'bei', 'bereit', 'bevor', 'da', 'dabei', 'daran', 'darauf',
    'daraus', 'darin', 'darüber', 'darum', 'dar', 'davon', 'dazu', 'dazwischen',
    'ein', 'empor', 'entgegen', 'entlang', 'entzwei', 'fehl', 'fern', 'fest', 'fort',
    'gegen', 'gegenüber', 'gleich', 'heim', 'her', 'herab', 'heran', 'heraus',
    'herbei', 'herein', 'herüber', 'herum', 'herunter', 'hervor', 'hin', 'hinab',
    'hinan', 'hinaus', 'hinein', 'hintan', 'hinten', 'hinterher', 'hinüber',
    'hinunter', 'hinweg', 'hinzu', 'inne', 'kaputt', 'kennen', 'krank', 'leer',
    'liegen', 'los', 'mit', 'nach', 'nieder', 'statt', 'teil', 'voraus',
    'vorbei', 'vorher', 'vorüber', 'vorweg', 'vor', 'weg', 'weiter', 'wieder',
    'zurecht', 'zurück', 'zusammen', 'zwischen', 'zu'
];

// Helper to determine if a verb is separable and where to split it.
function getSeparableParts(verbStr: string): { prefix: string, base: string } | null {
    // 1. MUST be lowercase. German verbs in infinitive are lowercase.
    // This immediately avoids splitting Nouns like "Teilnehmerliste".
    if (verbStr !== verbStr.toLowerCase()) return null;

    const sortedPrefixes = [...SEPARABLE_PREFIXES].sort((a, b) => b.length - a.length);

    for (const prefix of sortedPrefixes) {
        if (verbStr.startsWith(prefix) && verbStr.length > prefix.length + 2) {
            const base = verbStr.substring(prefix.length);

            // 2. The base part must look like a verb root.
            // It should end in 'en', 'el', 'er' (like 'sammeln', 'wandern', 'sehen')
            // or be a special short verb like 'tun' or 'sein'.
            const isVerbLike =
                base.endsWith('en') ||
                base.endsWith('el') ||
                base.endsWith('er') ||
                base === 'tun' ||
                base === 'un' || // for ab|tun -> tun
                base === 'sein';

            // 3. Avoid some common false positives like "gegen", "zwischen" (da-compounds)
            const isFalsePositive = ['gegen', 'für', 'mit', 'bei', 'vor', 'zu', 'über', 'unter', 'nach'].includes(base);

            if (isVerbLike && !isFalsePositive) {
                return {
                    prefix: verbStr.substring(0, prefix.length),
                    base: base
                };
            }
        }
    }

    return null;
}

/**
 * A component that visually formats a German word.
 * For nouns, it displays exactly like formatGermanWord (with article).
 * For separable verbs, it inserts a subtle red pipe `|` between the prefix and the root.
 */
export function FormattedGermanWord({ word, className }: FormattedGermanWordProps) {
    const formattedString = formatGermanWord(word);

    if (word.type === 'verb') {
        const parts = formattedString.split(' ');

        return (
            <span className={className}>
                {parts.map((part, i) => {
                    // Skip parts in parentheses or "sich"
                    if (part.startsWith('(') || part.endsWith(')') || part.toLowerCase() === 'sich') {
                        return (
                            <React.Fragment key={i}>
                                {part}
                                {i < parts.length - 1 && ' '}
                            </React.Fragment>
                        );
                    }

                    const split = getSeparableParts(part);
                    if (split) {
                        return (
                            <React.Fragment key={i}>
                                {split.prefix}
                                <span className="text-red-500 font-black mx-[0.5px] select-none opacity-90">|</span>
                                {split.base}
                                {i < parts.length - 1 && ' '}
                            </React.Fragment>
                        );
                    }

                    return (
                        <React.Fragment key={i}>
                            {part}
                            {i < parts.length - 1 && ' '}
                        </React.Fragment>
                    );
                })}
            </span>
        );
    }

    // Default string rendering
    return <span className={className}>{formattedString}</span>;
}
