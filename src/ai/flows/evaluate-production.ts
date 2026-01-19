
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const EvaluateProductionInputSchema = z.object({
    germanSentence: z.string().describe('The full German sentence with the correction applied.'),
    userAnswer: z.string().describe('What the user typed.'),
    correctAnswer: z.string().describe('The expected correct word/form.'),
    targetWordRussian: z.string().describe('Russian translation of the target word.'),
});

const EvaluateProductionOutputSchema = z.object({
    isCorrect: z.boolean(),
    isNearlyCorrect: z.boolean().describe('True if it is just a small typo or capitalization issue.'),
    userWordDefinition: z.string().optional().describe('Russian definition of the word the user typed, if it is a real German word.'),
    correctWordDefinition: z.string().describe('Russian definition/explanation of the correct word in this context.'),
    comparisonFeedback: z.string().describe('Detailed explanation in Russian comparing the two words and explaining why the user variant is incorrect or differs from the target.'),
});

export type EvaluateProductionOutput = z.infer<typeof EvaluateProductionOutputSchema>;

export async function evaluateProductionWithAI(input: z.infer<typeof EvaluateProductionInputSchema>): Promise<EvaluateProductionOutput> {
    return evaluateProductionFlow(input);
}

const evaluateProductionFlow = ai.defineFlow(
    {
        name: 'evaluateProductionFlow',
        inputSchema: EvaluateProductionInputSchema,
        outputSchema: EvaluateProductionOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: `
        You are a German language tutor. A student is doing a fill-in-the-blank exercise.
        
        Sentence: "${input.germanSentence}"
        Correct word: "${input.correctAnswer}" (${input.targetWordRussian})
        Student typed: "${input.userAnswer}"

        Task:
        1. Determine if the answer is correct or nearly correct (typo).
        2. Provide short Russian definitions for BOTH words (if the user's word exists in German).
        3. Explain the difference or why the student's word doesn't fit the context.
        4. **CRITICAL**: Do NOT use technical symbols like raw HTML tags in the response text unless specifically requested. Use <b>bold</b> for highlighting important parts in 'comparisonFeedback'.

        Output JSON matching the schema.
      `,
                output: { schema: EvaluateProductionOutputSchema },
            });
            return output!;
        });
    }
);
