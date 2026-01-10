'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const VerifySynonymAnswerInputSchema = z.object({
    originalSentence: z.string(),
    weakWord: z.string(),
    userAnswer: z.string(),
    targetSynonym: z.string(),
});

export type VerifySynonymAnswerInput = z.infer<typeof VerifySynonymAnswerInputSchema>;

const VerifySynonymAnswerOutputSchema = z.object({
    isCorrect: z.boolean().describe('True if the user answer is a valid B2/C1 synonym in this context, even if different from target.'),
    feedback: z.string().describe('Explanation in Russian. If correct, praise and explain nuance. If incorrect, explain why the user word is not suitable and why the target is better.'),
});

export type VerifySynonymAnswerOutput = z.infer<typeof VerifySynonymAnswerOutputSchema>;

export async function verifySynonymAnswer(input: VerifySynonymAnswerInput): Promise<VerifySynonymAnswerOutput> {
    return verifySynonymAnswerFlow(input);
}

const renderPrompt = (input: VerifySynonymAnswerInput) => {
    return `
    Context Sentence: "${input.originalSentence}"
    Weak Word: "${input.weakWord}"
    Target B2 Synonym: "${input.targetSynonym}"
    
    User Answer: "${input.userAnswer}"
    
    Task:
    Evaluate if the User Answer is a valid B2/C1 replacement for the Weak Word in this specific context.
    
    Rules:
    1. If the user word is a valid synonym (grammar fits or is adaptable, meaning is correct, register is B2+), mark isCorrect: true.
    2. If the user word is wrong (wrong meaning, A1 level, wrong grammar type), mark isCorrect: false.
    3. Provide "feedback" in Russian.
       - If correct: Confirm it fits. Mention if it's better/worse/different nuance than the Target Synonym.
       - If incorrect: Explain WHY the user's word doesn't work (e.g. "Too informal", "Wrong grammatical case", "Doesn't exist"). ALWAYS compare it to the Target Synonym.
    
    Output JSON.
    `;
};

const verifySynonymAnswerFlow = ai.defineFlow(
    {
        name: 'verifySynonymAnswerFlow',
        inputSchema: VerifySynonymAnswerInputSchema,
        outputSchema: VerifySynonymAnswerOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: VerifySynonymAnswerOutputSchema },
            });
            return output!;
        });
    }
);
