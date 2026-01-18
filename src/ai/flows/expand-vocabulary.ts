
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';
import { VocabularyWord } from '@/lib/types';

const ExpandVocabularyInputSchema = z.object({
    topicTitle: z.string(),
    existingWords: z.array(z.string()).describe('List of German words already in the topic to avoid duplicates.'),
    level: z.string().describe('Target CEFR level (A1, A2, B1, etc.)'),
});

type ExpandVocabularyInput = z.infer<typeof ExpandVocabularyInputSchema>;

// We need a schema that matches the VocabularyWord structure but handled by Zod
const NewWordSchema = z.object({
    german: z.string(),
    russian: z.string(),
    type: z.enum(['noun', 'verb', 'adjective', 'other']),
    // Optional fields for Noun
    article: z.string().optional(),
    plural: z.string().optional(),
    pluralArticle: z.string().optional(),
    // Optional for Verb
    conjugation: z.string().optional(),
    // Common
    example: z.string(),
    exampleSingular: z.string().optional(),
    examplePlural: z.string().optional(),
});

const ExpandVocabularyOutputSchema = z.object({
    newWords: z.array(NewWordSchema).describe('List of 10-15 new relevant words for the topic.'),
});

type ExpandVocabularyOutput = z.infer<typeof ExpandVocabularyOutputSchema>;

export async function expandVocabularyWithAI(topic: string, currentWords: string[], levelId: string): Promise<VocabularyWord[]> {
    const result = await expandVocabularyFlow({ topicTitle: topic, existingWords: currentWords, level: levelId });
    // Cast the Zod output back to our Type (it matches structually)
    return result.newWords as any as VocabularyWord[];
}

const renderPrompt = (input: ExpandVocabularyInput) => {
    return `
    You are an expert German curriculum designer.
    
    Task: The student feels the current vocabulary list for the topic "${input.topicTitle}" is too sparse.
    Generate 10-15 NEW, high-frequency, relevant words for this topic.
    
    Target Level: ${input.level.toUpperCase()}
    
    Constraints:
    1. DO NOT include any of these existing words: ${input.existingWords.join(', ')}.
    2. Words must be practical and commonly used in daily life (A1-B2 range).
    3. Include a mix of Nouns, Verbs, and Adjectives.
    
    Formatting Requirements:
    - For **Nouns**: MUST provide 'article' (der/die/das), 'plural' form, and 'pluralArticle'.
    - For **Verbs**: MUST provide 'conjugation' (1st person singular present, e.g. "ich laufe").
    - **Examples**: Provide a simple German sentence usage for every word.

    Output JSON matching the schema.
    `;
};

const expandVocabularyFlow = ai.defineFlow(
    {
        name: 'expandVocabularyFlow',
        inputSchema: ExpandVocabularyInputSchema,
        outputSchema: ExpandVocabularyOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: ExpandVocabularyOutputSchema },
            });
            return output!;
        });
    }
);
