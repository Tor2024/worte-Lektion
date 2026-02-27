
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStoryInputSchema = z.object({
    words: z.array(z.string()).describe('List of German words to include in the story.'),
    topic: z.string().optional().describe('General topic for the story.'),
});

export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const GenerateStoryOutputSchema = z.object({
    title: z.string().describe('Title of the story in German.'),
    russianTitle: z.string().describe('Russian title translation.'),
    story: z.string().describe('The generated German story (B2 level).'),
    russianTranslation: z.string().describe('Full Russian translation of the story.'),
    usedWords: z.array(z.string()).describe('List of keywords from the input that were successfully used.'),
    wordMap: z.record(z.string(), z.string()).describe('A mapping of individual German words to Russian translations.'),
});

export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

const renderPrompt = (input: GenerateStoryInput) => {
    return `You are a high-level German linguist and tutor.
  
  **TASK:**
  1. Write a short German story (120-150 words) at B2 level using these keywords: [${input.words.join(', ')}].
  2. BOLD the keywords in the text like this: **Wort**.
  3. Provide a Russian translation for the entire story.
  4. **CRITICAL:** Create a JSON object "wordMap" containing EVERY unique word found in your German title and story.

  **WORDMAP RULES:**
  - KEYS: Single German words only (no phrases). Case-sensitive as they appear in the text.
  - VALUES: Accurate Russian translations for that specific word in its context.
  - COVERAGE: 100%. Every single word (articles, prepositions, nouns, verbs) MUST be in the map.
  
  **EXAMPLE STRUCTURE:**
  If text is "Der Hund schläft.", wordMap MUST be:
  {
    "Der": "Этот (артикль)",
    "Hund": "собака",
    "schläft": "спит"
  }

  **OUTPUT SCHEMA:**
  Return a JSON object with:
  - title (German)
  - russianTitle (Russian)
  - story (German text with **bold**)
  - russianTranslation (Russian)
  - usedWords (array)
  - wordMap (The vocabulary map)

  DO NOT SKIP WORDS. The user relies on this for hover translations. If wordMap is incomplete, the student cannot learn.`;
};

const generateStoryFlow = ai.defineFlow(
    {
        name: 'generateStoryFlow',
        inputSchema: GenerateStoryInputSchema,
        outputSchema: GenerateStoryOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: GenerateStoryOutputSchema },
            });
            return output!;
        });
    }
);

export async function generateStory(input: GenerateStoryInput): Promise<GenerateStoryOutput> {
    return generateStoryFlow(input);
}
