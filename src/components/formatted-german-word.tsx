import React from 'react';
import { VocabularyWord } from '@/lib/types';
import { formatGermanWord } from '@/lib/german-utils';

interface FormattedGermanWordProps {
    word: VocabularyWord;
    className?: string;
}

const SEPARABLE_PREFIXES = [
    'ab', 'an', 'auf', 'aus', 'bei', 'ein', 'los', 'mit', 'nach', 'her', 'hin',
    'vor', 'weg', 'zu', 'zurück', 'zusammen', 'da', 'dabei', 'daran', 'darauf',
    'daraus', 'darin', 'darüber', 'darum', 'davon', 'dazu', 'dazwischen',
    'empor', 'entgegen', 'entlang', 'entzwei', 'fehl', 'fest', 'fort',
    'gegenüber', 'gleich', 'heim', 'herab', 'heran', 'heraus', 'herbei',
    'herein', 'herüber', 'herum', 'herunter', 'hervor', 'hinab', 'hinan',
    'hinaus', 'hinein', 'hintan', 'hinten', 'hinterher', 'hinüber', 'hinunter',
    'hinweg', 'hinzu', 'inne', 'kaputt', 'kennen', 'krank', 'leer', 'liegen',
    'mit', 'nieder', 'statt', 'teil', 'wieder', 'zurecht', 'zurück', 'zusammen',
    'zwischen'
];

// Helper to determine if a verb is separable and where to split it.
function getSeparableParts(verbStr: string): { prefix: string, base: string } | null {
    // Basic check - we don't want to split things like 'arbeiten' just because of 'an'
    // But this regex looks for separable prefixes at the start of the word.

    // Some prefixes are also inseparable in certain verbs (um, durch, über, unter),
    // but without a dictionary, a broad heuristic is best for common B1/B2 vocab.
    // We sort prefixes by length descending to match longest first (e.g. 'heraus' before 'her')
    const sortedPrefixes = [...SEPARABLE_PREFIXES].sort((a, b) => b.length - a.length);

    for (const prefix of sortedPrefixes) {
        if (verbStr.toLowerCase().startsWith(prefix) && verbStr.length > prefix.length + 3) { // +3 ensures there's a base verb left (e.g. 'tun')

            // Exclude inseparable if prefix is 'unter', etc., unless we are sure. For now, rely on list.

            return {
                prefix: verbStr.substring(0, prefix.length),
                base: verbStr.substring(prefix.length)
            };
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
        // Some words might have 'sich ' in front. We need to handle that.
        const parts = formattedString.split(' ');
        const mainVerbIndex = parts.findIndex(p => p.toLowerCase() !== 'sich');

        if (mainVerbIndex !== -1) {
            const mainVerb = parts[mainVerbIndex];
            const split = getSeparableParts(mainVerb);

            if (split) {
                // Reconstruct with the pipe
                parts[mainVerbIndex] = (
                    <span key="split-verb">
                        {split.prefix}
                        <span className="text-red-500 font-black mx-[1px] select-none opacity-80">|</span>
                        {split.base}
                    </span>
                ) as any; // Type override for array mingling

                return (
                    <span className={className}>
                        {parts.map((part, i) => (
                            <React.Fragment key={i}>
                                {part}
                                {i < parts.length - 1 && ' '}
                            </React.Fragment>
                        ))}
                    </span>
                );
            }
        }
    }

    // Default string rendering
    return <span className={className}>{formattedString}</span>;
}
