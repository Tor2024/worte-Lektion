
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateCollocationsInputSchema = z.object({
    words: z.array(z.string()).describe('List of German words (nouns/verbs).'),
});

export type GenerateCollocationsInput = z.infer<typeof GenerateCollocationsInputSchema>;

const CollocationItemSchema = z.object({
    id: z.string(),
    baseWord: z.string().describe('The user vocabulary word.'),
    collocation: z.string().describe('The fixed phrase/collocation (e.g. "eine Entscheidung treffen").'),
    translation: z.string().describe('Russian translation of the phrase.'),
    exampleSentence: z.string().describe('Full sentence usage (B2 level).'),
    gapSentence: z.string().describe('Sentence with the collocation hidden/gapped for testing.'),
    hiddenPart: z.string().describe('The part to hide in the gap sentence (usually the verb).'),
});

const GenerateCollocationsOutputSchema = z.object({
    items: z.array(CollocationItemSchema).describe('List of 5-10 collocation exercises.'),
});

export type GenerateCollocationsOutput = z.infer<typeof GenerateCollocationsOutputSchema>;

export async function generateCollocations(input: GenerateCollocationsInput): Promise<GenerateCollocationsOutput> {
    return generateCollocationsFlow(input);
}

const renderPrompt = (input: GenerateCollocationsInput) => {
    return `You are a German Language Expert specializing in "Nomen-Verb-Verbindungen" (B2/C1).
  
  **Task:** Find strictly fixed collocations for the provided words.
  **Words:** ${input.words.join(', ')}
  
  **Instructions:**
  1. Identify words that have strong "Nomen-Verb-Verbindungen" or fixed idioms suitable for Business German (Beruf).
  2. Examples:
     - Word: "Entscheidung" -> "eine Entscheidung treffen" (NOT just "entscheiden").
     - Word: "Rücksicht" -> "Rücksicht nehmen auf".
     - Word: "In Kauf" -> "In Kauf nehmen".
  3. Generate 5-10 high-quality exercises.
  4. Create a "Gap Sentence" where the key verb or preposition is missing.
  
  **Output:** JSON matching the schema.`;
};

const generateCollocationsFlow = ai.defineFlow(
    {
        name: 'generateCollocationsFlow',
        inputSchema: GenerateCollocationsInputSchema,
        outputSchema: GenerateCollocationsOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: GenerateCollocationsOutputSchema },
            });
            return output!;
        });
    }
);
