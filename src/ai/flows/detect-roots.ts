
import { ai, executeWithRetry } from '../genkit';
import { z } from 'genkit';

const RootDetectionSchema = z.object({
    results: z.array(z.object({
        word: z.string(),
        root: z.string()
    }))
});

/**
 * Optimized flow for detecting the root (core morpheme) for multiple German words at once.
 * This is used for bulk reindexing of existing vocabulary.
 * Modeled after the reliable enrichWord flow.
 */
export const detectRoots = async (words: string[]): Promise<Record<string, string>> => {
    if (words.length === 0) return {};

    try {
        return await executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: `
                    Act as a German linguistics expert.
                    Task: For the following German words, extract their common core morpheme (the root).
                    Rules:
                    1. No prefixes (aus-, ein-, be-, ver-, etc.)
                    2. No endings (-en, -t, -er, -ung, etc.)
                    3. Pure stem only (e.g., "ausrichten" -> "richt", "Ergebnis" -> "geb").
                    4. Keep everything lowercase in the 'root' field.
                    5. Return a list of objects with 'word' (EXACTLY as provided, case-sensitive) and 'root'.

                    Words to process:
                    ${words.join(', ')}
                `,
                output: { schema: RootDetectionSchema }
            });

            if (!output || !output.results) {
                return {};
            }

            // Convert array back to record map for easy consumption
            const map: Record<string, string> = {};
            output.results.forEach(item => {
                map[item.word] = item.root;
            });
            return map;
        });
    } catch (err: any) {
        console.error("[AI Root Detection Error]:", err);
        // Return empty so the loop can skip this batch instead of crashing
        return {};
    }
};
