
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const EvaluateSentenceInputSchema = z.object({
    word: z.string().describe('The target word the user had to use.'),
    sentence: z.string().describe('The sentence written by the user.'),
});

export type EvaluateSentenceInput = z.infer<typeof EvaluateSentenceInputSchema>;

const EvaluateSentenceOutputSchema = z.object({
    isCorrect: z.boolean().describe('True if the sentence is grammatically correct.'),
    correctedSentence: z.string().describe('The corrected version of the sentence (if needed) or an improved version.'),
    explanation: z.string().describe('Detailed explanation of errors or style improvements (in Russian).'),
    styleScore: z.number().min(1).max(5).describe('Rating of the style/naturalness (1-5).'),
    styleTip: z.string().optional().describe('Tip for making it sound more native/B2 (e.g. "Use X instead of Y").'),
});

export type EvaluateSentenceOutput = z.infer<typeof EvaluateSentenceOutputSchema>;

const renderPrompt = (input: EvaluateSentenceInput) => {
    return `You are a strict but helpful German language coach (B2 level focus).
  
  **Task:** Evaluate the student's sentence where they attempted to use the word "${input.word}".
  
  **Student Sentence:** "${input.sentence}"
  
  **Analysis Criteria:**
  1. **Grammar:** Is the case, gender, conjugation correct?
  2. **Usage/Collocation:** Is this the correct way to use "${input.word}"? (e.g. "Entscheidung machen" instead of "treffen" is an error).
  3. **Style:** Does it sound natural?
  
  **Output Instructions:**
  - If there are errors, provide the corrected sentence and explain WHY in Russian.
  - If it is grammatically correct but sounds "A1", provide a "B2" version and explain the style improvement.
  - Rate the style from 1 to 5.
  
  Return JSON matching the schema.`;
};

const evaluateSentenceFlow = ai.defineFlow(
    {
        name: 'evaluateSentenceFlow',
        inputSchema: EvaluateSentenceInputSchema,
        outputSchema: EvaluateSentenceOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: EvaluateSentenceOutputSchema },
            });
            return output!;
        });
    }
);

export async function evaluateSentence(input: EvaluateSentenceInput): Promise<EvaluateSentenceOutput> {
    return evaluateSentenceFlow(input);
}
