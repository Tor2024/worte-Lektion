
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
    return `You are a creative German language tutor (Native German level).
  
  **Task:** Write a short, engaging story (approx. 120-150 words) at **B2 level** for a language student.
  
  **Constraints:**
  1. You MUST use as many of the following words as possible:
     ${input.words.map(w => `- ${w}`).join('\n')}
  
  2. **Topic:** ${input.topic || 'Professional / Office / Career context'}
  3. Wrap the words from the input list in **markdown bold** (e.g., **Entscheidung**).
  
  **Output Requirements:**
  - German Title
  - Russian Title
  - German Text (with bolded keywords)
  - Russian Translation
  - usedWords: list of input words used.
  - wordMap: A full vocabulary map for the story.
    
    CRITICAL RULES for wordMap:
    - Every key MUST be a **single word** (no phrases like "der Mann").
    - Every significant word in the story (Title + Story) MUST be included. 
    - Include: nouns, verbs (as used in the text), adjectives, prepositions, and articles.
    - Example: if story contains "Der schnelle Hund rennt", the wordMap must be:
      {"Der": "Этот (арт.)", "schnelle": "быстрый", "Hund": "собака", "rennt": "бежит"}
    - Do NOT skip small words like "und", "в", "на".
    - The goal is 100% coverage so that EVERY word can be hovered.

  Important: Return a valid JSON object.`;
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
