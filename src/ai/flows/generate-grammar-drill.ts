
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateGrammarDrillInputSchema = z.object({
    words: z.array(z.string()).describe('List of German words (verbs, nouns, mostly) to test.'),
    topic: z.string().optional().describe('Context topic.'),
});

export type GenerateGrammarDrillInput = z.infer<typeof GenerateGrammarDrillInputSchema>;

const DrillQuestionSchema = z.object({
    id: z.string(),
    type: z.enum(['fill-in-the-blank', 'multiple-choice']),
    question: z.string().describe('The sentence with a gap, e.g., "Ich warte ___ den Bus."'),
    correctAnswer: z.string().describe('The correct filling, e.g., "auf"'),
    options: z.array(z.string()).optional().describe('For multiple choice, 4 options.'),
    explanation: z.string().describe('Grammar rule explanation in Russian.'),
    focusWord: z.string().describe('The user vocabulary word being tested.'),
});

const GenerateGrammarDrillOutputSchema = z.object({
    questions: z.array(DrillQuestionSchema).describe('List of 5-10 generated drill questions.'),
});

export type GenerateGrammarDrillOutput = z.infer<typeof GenerateGrammarDrillOutputSchema>;

const renderPrompt = (input: GenerateGrammarDrillInput) => {
    return `You are a strict German Grammar Tutor (B2 Level).
  
  **Task:** Create a "Grammar Precision Drill" for the provided words.
  
  **Words to Drill:**
  ${input.words.map(w => `- ${w}`).join('\n')}
  
  **Focus:**
  1. **Verbs:** Test "Rektion" (Prepositions + Cases). Example: "warten ___" -> "auf".
  2. **Nouns:** Test Plural forms or Articles/Cases if tricky.
  3. **Adjectives:** Test Endings (Adjektivdeklination) if context allows.
  
  Generate 5-10 distinct questions associated with these words.
  - Prioritize fill-in-the-blank for prepositions.
  - Ensure B2 complexity of sentences.
  - Explanations must be in Russian.
  
  Return JSON matching the schema.`;
};

const generateGrammarDrillFlow = ai.defineFlow(
    {
        name: 'generateGrammarDrillFlow',
        inputSchema: GenerateGrammarDrillInputSchema,
        outputSchema: GenerateGrammarDrillOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: GenerateGrammarDrillOutputSchema },
            });
            return output!;
        });
    }
);

export async function generateGrammarDrill(input: GenerateGrammarDrillInput): Promise<GenerateGrammarDrillOutput> {
    return generateGrammarDrillFlow(input);
}
