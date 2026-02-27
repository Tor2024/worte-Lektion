
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateStoryInputSchema = z.object({
    words: z.array(z.string()).describe('List of German words to include in the story.'),
    topic: z.string().optional().describe('General topic for the story.'),
});

export type GenerateStoryInput = z.infer<typeof GenerateStoryInputSchema>;

const GenerateStoryOutputSchema = z.object({
    title: z.string().describe('German title.'),
    russianTitle: z.string().describe('Russian title.'),
    story: z.string().describe('German story (max 100 words).'),
    russianTranslation: z.string().describe('Full Russian translation.'),
    usedWords: z.array(z.string()).describe('Keywords from input used in story.'),
    vocabulary: z.array(z.object({
        g: z.string().describe('German word'),
        r: z.string().describe('Russian translation')
    })).describe('List of EVERY single word in the story with its translation.'),
});

export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

const renderPrompt = (input: GenerateStoryInput) => {
    return `You are a German teacher.
  
  **TASK:**
  1. Write a short German story (approx 80-100 words) using these keywords: [${input.words.join(', ')}].
  2. BOLD the keywords (e.g., **Wort**).
  3. Translate the story into Russian.
  4. **CRITICAL:** Fill the 'vocabulary' array with EVERY single word used in the story.
  
  **VOCABULARY RULES:**
  - One German word per item.
  - No phrases.
  - Include ALL words: articles, prepositions, nouns, verbs, etc.
  
  **STRUCTURE EXAMPLE:**
  If story is "Der Hund spielt.", vocabulary MUST be:
  [
    {"g": "Der", "r": "Этот"},
    {"g": "Hund", "r": "собака"},
    {"g": "spielt", "r": "играет"}
  ]
  
  Return a valid JSON object. Do not skip any words.`;
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
