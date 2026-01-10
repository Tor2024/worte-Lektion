
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateSynonymSwapInputSchema = z.object({
    words: z.array(z.string()).describe('List of German words (potentially abstract nouns/verbs).'),
});

export type GenerateSynonymSwapInput = z.infer<typeof GenerateSynonymSwapInputSchema>;

const SynonymSwapItemSchema = z.object({
    id: z.string(),
    originalSentence: z.string().describe('A sentence using a simple/A2 word (e.g. "Das ist sehr wichtig").'),
    weakWord: z.string().describe('The specific A2 word in the sentence that needs to be replaced (e.g. "wichtig").'),
    targetSynonym: z.string().describe('The B2/C1 synonym from the user\'s list or related (e.g. "entscheidend", "wesentlich").'),
    betterSentence: z.string().describe('The same sentence but upgraded with the target synonym.'),
    explanation: z.string().describe('Why the synonym is better in this context (Russian).'),
});

const GenerateSynonymSwapOutputSchema = z.object({
    items: z.array(SynonymSwapItemSchema).describe('List of 5-10 synonym swap challenges.'),
});

export type GenerateSynonymSwapOutput = z.infer<typeof GenerateSynonymSwapOutputSchema>;

export async function generateSynonymSwap(input: GenerateSynonymSwapInput): Promise<GenerateSynonymSwapOutput> {
    return generateSynonymSwapFlow(input);
}

const renderPrompt = (input: GenerateSynonymSwapInput) => {
    return `You are a Style Coach for German B2 Beruf.
  
  **Task:** Create "Synonym Swap" exercises.
  **Source Vocabulary:** ${input.words.join(', ')}
  
  **Instructions:**
  1. Pick words from the source list that are high-level (B2/C1).
  2. For each, create a "Weak" sentence (A2 level) that uses a simpler synonym.
     - *Example User Word:* "erforderlich"
     - *Weak Sentence:* "Es ist nötig, dass wir das machen."
     - *Weak Word:* "nötig"
     - *Target:* "erforderlich"
  3. The goal is for the user to guess which of THEIR vocabulary words replaces the weak word.
  
  **Output:** JSON matching the schema.`;
};

const generateSynonymSwapFlow = ai.defineFlow(
    {
        name: 'generateSynonymSwapFlow',
        inputSchema: GenerateSynonymSwapInputSchema,
        outputSchema: GenerateSynonymSwapOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: GenerateSynonymSwapOutputSchema },
            });
            return output!;
        });
    }
);
