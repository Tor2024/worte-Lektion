
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GeneratePodcastScriptInputSchema = z.object({
    topic: z.string().describe('Topic of the podcast episode.'),
    words: z.array(z.string()).describe('List of German words to include in the discussion.'),
});

export type GeneratePodcastScriptInput = z.infer<typeof GeneratePodcastScriptInputSchema>;

const PodcastLineSchema = z.object({
    speaker: z.enum(['Host', 'Expert']),
    text: z.string().describe('German text to be spoken.'),
    translation: z.string().describe('Russian translation of the line (for display).'),
});

const GeneratePodcastScriptOutputSchema = z.object({
    title: z.string().describe('Catchy title for the episode in German.'),
    intro: z.string().describe('Short intro music cue or welcome message.'),
    script: z.array(PodcastLineSchema).describe('The dialogue lines.'),
});

export type GeneratePodcastScriptOutput = z.infer<typeof GeneratePodcastScriptOutputSchema>;

export async function generatePodcastScript(input: GeneratePodcastScriptInput): Promise<GeneratePodcastScriptOutput> {
    return generatePodcastScriptFlow(input);
}

const renderPrompt = (input: GeneratePodcastScriptInput) => {
    return `You are a scriptwriter for a German learning podcast called "Deutsch Profi".
  
  **Hosts:**
  1. **Host (Max):** Energetic, curious, asks questions.
  2. **Expert (Anna):** Calm, knowledgeable, explains concepts.
  
  **Topic:** ${input.topic}
  **Target Words:** ${input.words.join(', ')}
  
  **Goal:**
  Write a short, engaging dialogue (approx 10-15 exchanges) where Max and Anna discuss the topic and NATURALLY use the target words.
  
  **Guidelines:**
  - The conversation must be in **German (B2 Level)**.
  - They should explain the meaning or usage of 2-3 complex target words during the chat.
  - Keep it sounding natural, like a real radio show.
  - Add Russian translations for every line so the user can follow along if reading.
  
  **Output:** JSON matching the schema.`;
};

const generatePodcastScriptFlow = ai.defineFlow(
    {
        name: 'generatePodcastScriptFlow',
        inputSchema: GeneratePodcastScriptInputSchema,
        outputSchema: GeneratePodcastScriptOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: GeneratePodcastScriptOutputSchema },
            });
            return output!;
        });
    }
);
