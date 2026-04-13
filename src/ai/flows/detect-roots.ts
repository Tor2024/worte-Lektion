
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
export const detectRoots = async (words: string[]): Promise<Record<string, any>> => {
    if (words.length === 0) return {};

    try {
        return await executeWithRetry(async (aiInstance) => {
            const { output, error } = await aiInstance.generate({
                prompt: `Analyze these German words and find their common core root (morpheme). 
                Words: ${words.join(', ')}.
                Requirements: lowercase root, no prefixes, no suffixes. 
                Example: "ausrichten" -> "richt".`,
                output: { schema: RootDetectionSchema }
            });

            if (error) {
                return { error: error.message } as any;
            }

            if (!output || !output.results) {
                return { error: "AI returned no results" } as any;
            }

            // Convert array back to record map for easy consumption
            const map: Record<string, string> = {};
            (output.results as any[]).forEach((item: {word: string, root: string}) => {
                map[item.word] = item.root;
            });
            return map;
        });
    } catch (err: any) {
        console.error("[AI Root Detection Error]:", err);
        return { error: `Server error: ${err.message || "Unknown error"}` } as any;
    }
};
