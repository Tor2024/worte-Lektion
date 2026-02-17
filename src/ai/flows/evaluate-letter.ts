'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

export const LetterEvaluationSchema = z.object({
    correctedText: z.string().describe('The fully corrected version of the user\'s letter (German B2 standard).'),
    mistakes: z.array(z.object({
        original: z.string(),
        correction: z.string(),
        explanation: z.string().describe('Short grammar or vocabulary explanation in Russian.'),
        type: z.enum(['grammar', 'spelling', 'vocabulary', 'style', 'punctuation'])
    })).describe('List of specific errors found in the text.'),
    rating: z.object({
        content: z.number().min(0).max(10),
        vocabulary: z.number().min(0).max(10),
        grammar: z.number().min(0).max(10),
        total: z.number().min(0).max(100)
    }),
    generalFeedback: z.string().describe('Overall feedback in Russian, encouraging but specific.'),
    redemittelFeedback: z.object({
        usedCount: z.number(),
        missingImportant: z.array(z.string()).describe('List of universal phrases they SHOULD have used but didn\'t.'),
        suggestion: z.string().describe('Tip on how to use better phrases next time.')
    })
});

export type LetterEvaluation = z.infer<typeof LetterEvaluationSchema>;

const GenerateLetterEvaluationInputSchema = z.object({
    userText: z.string(),
    taskDescription: z.string(),
    requiredPoints: z.array(z.string())
});

export type GenerateLetterEvaluationInput = z.infer<typeof GenerateLetterEvaluationInputSchema>;

const renderPrompt = (input: GenerateLetterEvaluationInput) => {
    return `
    You are a strict but helpful German B2 Exam Tutor.
    Analyze the student's letter based on the following task:
    
    TASK DESCRIPTION:
    ${input.taskDescription}

    REQUIRED POINTS TO COVER:
    ${input.requiredPoints.join('\n- ')}

    STUDENT TEXT:
    "${input.userText}"

    Your Goal:
    1. Correct the text for grammar, spelling, and style (B2 level standard).
    2. Check if all required points are covered.
    3. Check if "Redemittel" (standard phrases) are used effectively.
    4. Provide constructive feedback in Russian.
    
    Return JSON matching the schema.
  `;
};

const evaluateLetterFlow = ai.defineFlow(
    {
        name: 'evaluateLetterFlow',
        inputSchema: GenerateLetterEvaluationInputSchema,
        outputSchema: LetterEvaluationSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: LetterEvaluationSchema },
            });
            return output!;
        });
    }
);

export async function evaluateLetter(userText: string, taskDescription: string, requiredPoints: string[]): Promise<LetterEvaluation> {
    return evaluateLetterFlow({ userText, taskDescription, requiredPoints });
}
