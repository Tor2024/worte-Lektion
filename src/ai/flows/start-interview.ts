
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const StartInterviewInputSchema = z.object({
    jobTitle: z.string().optional().describe('Target job title (e.g. "Software Engineer", "Krankenschwester"). Defaults to generic if empty.'),
    folderName: z.string().describe('Name of the vocabulary folder to pull context from.'),
    vocabulary: z.array(z.string()).describe('List of vocabulary words to test during the interview.'),
});

export type StartInterviewInput = z.infer<typeof StartInterviewInputSchema>;

const StartInterviewOutputSchema = z.object({
    scenario: z.string().describe('Context description in Russian (e.g. "Вы на собеседовании в крупной клинике...").'),
    aiRole: z.string().describe('The AI interviewer persona (e.g. "Herr Müller, Senior HR").'),
    userRole: z.string().describe('The user persona (e.g. "Bewerber").'),
    initialMessage: z.string().describe('The first question from the HR manager in German.'),
    objectives: z.array(z.string()).describe('3 goals for the user (e.g. "Рассказать о себе", "Использовать 3 слова из списка").'),
});

export type StartInterviewOutput = z.infer<typeof StartInterviewOutputSchema>;

export async function startInterview(input: StartInterviewInput): Promise<StartInterviewOutput> {
    return startInterviewFlow(input);
}

const renderPrompt = (input: StartInterviewInput) => {
    return `You are a strict but professional German HR Manager performing a job interview.
  
  **Context:**
  - Job Title: ${input.jobTitle || 'Fachkraft (General Professional)'}
  - Source Vocabulary Topic: ${input.folderName}
  - Target Vocabulary: ${input.vocabulary.join(', ')}
  
  **Task:**
  Initiate a **B2/C1 Level** Job Interview simulation.
  
  **Instructions:**
  1. **Persona:** You are formal, use "Sie", and ask probing questions.
  2. **Scenario:** Setting is a formal office or video call. Describe in Russian.
  3. **Initial Question:** Start with a classic opener (e.g., "Erzählen Sie etwas über sich" or "Warum wollen Sie bei uns arbeiten?") but adapted to the context of the vocabulary folder if possible.
  4. **Objectives:** Define 3 goals for the user in Russian. One MUST be "Answer the question using professional vocabulary".
  
  **Output Format:** JSON matching the schema.`;
};

const startInterviewFlow = ai.defineFlow(
    {
        name: 'startInterviewFlow',
        inputSchema: StartInterviewInputSchema,
        outputSchema: StartInterviewOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: StartInterviewOutputSchema },
            });
            return output!;
        });
    }
);
