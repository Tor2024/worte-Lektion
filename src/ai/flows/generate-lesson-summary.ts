'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateLessonSummaryInputSchema = z.object({
    topicTitle: z.string().describe('The title of the topic practiced.'),
    exerciseHistory: z.array(
        z.object({
            exercise: z.string().describe('The question description.'),
            userAnswer: z.string().describe('What the user answered.'),
            isCorrect: z.boolean().describe('Whether it was correct.'),
        })
    ).describe('Session history.'),
});

export type GenerateLessonSummaryInput = z.infer<typeof GenerateLessonSummaryInputSchema>;

const GenerateLessonSummaryOutputSchema = z.object({
    analysis: z.string().describe('HTML formatted analysis of mistakes and progress in Russian.'),
    recommendations: z.string().describe('HTML formatted advice on what to do next in Russian.'),
    shouldRepeat: z.boolean().describe('Whether the AI suggests repeating this topic.'),
});

export type GenerateLessonSummaryOutput = z.infer<typeof GenerateLessonSummaryOutputSchema>;

export async function generateLessonSummary(input: GenerateLessonSummaryInput): Promise<GenerateLessonSummaryOutput> {
    return generateLessonSummaryFlow(input);
}

const generateLessonSummaryFlow = ai.defineFlow(
    {
        name: 'generateLessonSummaryFlow',
        inputSchema: GenerateLessonSummaryInputSchema,
        outputSchema: GenerateLessonSummaryOutputSchema,
    },
    async (input) => {
        const historyText = input.exerciseHistory
            .map(h => `- Q: ${h.exercise} | User: ${h.userAnswer} | Result: ${h.isCorrect ? 'Correct' : 'Incorrect'}`)
            .join('\n');

        const prompt = `
      You are an expert German language tutor. Analyze the student's lesson session for the topic "${input.topicTitle}".
      
      Session History:
      ${historyText}

      Tasks:
      1. Analysis: Summarize their performance. If they made mistakes, explain WHY (grammar rules, spelling, etc.) in a friendly way. If no mistakes, praise them.
      2. Recommendations: Suggest specific next steps. Mention if they should repeat this topic or move to the next one.
      3. shouldRepeat: Set to true if they made more than 30% mistakes or struggled with core concepts.

      Formatting:
      - Use HTML tags: <p>, <strong>, <ul>, <li>.
      - **CRITICAL:** Do NOT be brief. Be detailed.
      - If mistakes were made, look for a SYSTEMATIC pattern (e.g. "You consistently mistake Dativ for Akkusativ").
      - Explain the "WHY" and "HOW" for every major error.
      - Language: Russian.
    `;

        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: prompt,
                output: { schema: GenerateLessonSummaryOutputSchema },
            });
            return output!;
        });
    }
);
