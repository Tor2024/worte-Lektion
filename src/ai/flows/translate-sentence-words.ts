'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateSentenceWordsInputSchema = z.object({
    sentence: z.string(),
});

const WordTranslationSchema = z.object({
    original: z.string(),
    translation: z.string(),
});

const TranslateSentenceWordsOutputSchema = z.object({
    words: z.array(WordTranslationSchema),
});

const translateSentenceWordsFlow = ai.defineFlow(
    {
        name: 'translateSentenceWordsFlow',
        inputSchema: TranslateSentenceWordsInputSchema,
        outputSchema: TranslateSentenceWordsOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: `Analyze the following German sentence and break it down into words or short logical phrases. For each part, provide the Russian translation accurately fitting the context of the sentence.
                
                Sentence: "${input.sentence}"
                
                Return ONLY a JSON object with a "words" array containing "original" and "translation" fields for each part. Maintain the original order.`,
                output: { schema: TranslateSentenceWordsOutputSchema },
            });

            if (!output) {
                throw new Error('Failed to generate structured output');
            }

            return output;
        });
    }
);

export async function translateSentenceWords(input: { sentence: string }) {
    return translateSentenceWordsFlow(input);
}
