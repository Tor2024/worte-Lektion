
import { ai, executeWithRetry } from '../genkit';
import { z } from 'genkit';

/**
 * Optimized flow for detecting the root (core morpheme) for multiple German words at once.
 * This is used for bulk reindexing of existing vocabulary.
 */
export const detectRoots = async (words: string[]) => {
    if (words.length === 0) return {};

    return await executeWithRetry(async (aiInstance) => {
        const response = await aiInstance.generate({
            prompt: `
                Act as a German linguistics expert.
                Task: For the following German words, extract their common core morpheme (the root).
                Rules:
                1. No prefixes (aus-, ein-, be-, ver-, etc.)
                2. No endings (-en, -t, -er, -ung, etc.)
                3. Pure stem only (e.g., "ausrichten" -> "richt", "Ergebnis" -> "geb").
                4. Keep everything lowercase.
                5. Return a JSON object where keys are words and values are roots.

                Words to process:
                ${words.join(', ')}
            `,
            output: {
                format: 'json',
                schema: z.record(z.string(), z.string())
            }
        });

        return response.output || {};
    });
};
