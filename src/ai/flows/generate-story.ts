
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
    japaneseTitle: z.string().optional().describe('Russian title translation.'),
    story: z.string().describe('The generated German story (B2 level).'),
    russianTranslation: z.string().describe('Full Russian translation of the story.'),
    usedWords: z.array(z.string()).describe('List of words from the input that were successfully used.'),
});

export type GenerateStoryOutput = z.infer<typeof GenerateStoryOutputSchema>;

const renderPrompt = (input: GenerateStoryInput) => {
    return `You are a creative German language tutor.
  
  **Task:** Write a short, engaging story (approx. 150-200 words) at **B2 level**.
  
  **Constraints:**
  1. You MUST use as many of the following words as possible naturally in the text:
     ${input.words.map(w => `- ${w}`).join('\n')}
  
  2. **Topic:** ${input.topic || 'General / Everyday Life / Professional Context'}
  3. The story should be coherent and interesting (Beruf/Professional focus if possible).
  4. Highlight the used words in the German text by wrapping them in **markdown bold** (e.g., **Entscheidung**).
  
  **Output:**
  - German Title
  - Russian Title
  - German Text (with bolded keywords)
  - Russian Translation
  - List of keywords actually used.
  
  Return JSON matching the schema.`;
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
