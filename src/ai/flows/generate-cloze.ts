
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';
import { VocabularyWord } from '@/lib/types';

// Define Input Schema
const GenerateClozeInputSchema = z.object({
    german: z.string(),
    russian: z.string(),
    type: z.string(),
    storyContext: z.string().optional().describe('The previous sentences of the story in the current batch.'),
});

type GenerateClozeInput = z.infer<typeof GenerateClozeInputSchema>;

// Define Output Schema
const GenerateClozeOutputSchema = z.object({
    sentenceWithBlank: z.string().describe('The German sentence with a placeholder underscore for the missing word.'),
    translation: z.string().describe('Russian translation of the full sentence.'),
    missingWord: z.string().describe('The actual word form that fits in the blank.'),
    hint: z.string().optional().describe('A grammatical hint, e.g. "Akkusativ" or "Präteritum"'),
    grammarExplanation: z.string().describe('Detailed explanation of why this specific form is used here (case, gender, conjugation rule) in Russian.'),
    targetWordDefinition: z.string().describe('Short Russian definition of the correct word/form in this context.'),
    examples: z.array(z.string()).describe('2-3 additional simple German sentences using this word in different contexts. DO NOT use HTML tags here.'),
    acceptedAnswers: z.array(z.string()).describe('List of ALL grammatically correct answers for this specific blank (e.g. ["einen", "den"]). Start with the most common one.'),
    wordByWord: z.array(z.object({
        german: z.string(),
        russian: z.string()
    })).describe('A mapping of EVERY word in the generated sentence (including the missingWord) to its Russian translation for interactive help.'),
});

export type GenerateClozeOutput = z.infer<typeof GenerateClozeOutputSchema>;

// Wrapper function to match the previous API signature
export async function generateClozeWithAI(word: VocabularyWord, storyContext?: string): Promise<GenerateClozeOutput> {
    const input: GenerateClozeInput = {
        german: word.german,
        russian: word.russian,
        type: word.type,
        storyContext,
    };
    return generateClozeFlow(input);
}

const renderPrompt = (input: GenerateClozeInput) => {
    return `
    You are a German language tutor. Create a "Cloze Test" (Fill-in-the-blank) sentence for the following word:
    
    Word: "${input.german}" (${input.russian})
    Type: ${input.type}

    ${input.storyContext ? `
    **STORY CONTEXT**: 
    The current learning session is building a coherent story. Here are the previous sentences:
    "${input.storyContext}"
    
    **YOUR TASK**: 
    Continue this story logically using the new word "${input.german}". 
    ` : 'Create a simple, daily usage sentence for this word.'}

    **CRITICAL RULES**:
    1. **SIMPLICITY**: Use very **simple vocabulary** (A1-A2 level) for all words EXCEPT the target word. The user is overwhelmed by complex surrounding words. Avoid rare idioms, complex passive constructions, or advanced academic terms.
    2. **LANGUAGE**: 'sentenceWithBlank' must be **100% GERMAN**.
    3. **TARGET WORD**: Replace the target word (or its conjugated form) with "___".
    4. **WORD-BY-WORD**: Provide a full mapping of every word in the sentence to its Russian translation.
       - Include the missingWord in this mapping.
       - Clean words from punctuation (e.g., "Zug." -> "Zug").

    **GRAMMAR RULES**:
    1. **TENSE**: Prefer **Präsens** (Present) or **Perfekt** for simple narrative.
    2. **SEPARABLE VERBS**: 
       - If separated, missingWord is the conjugated part. Put the prefix at the end.
       - Example: "Der Zug ___ um 12 Uhr **an**." (missing: "kommt")

    **OUTPUT FORMAT**:
    - **sentenceWithBlank**: "Der Zug ___ um 12 Uhr an."
    - **missingWord**: "kommt"
    - **translation**: Russian translation.
    - **grammarExplanation**: Explain in RUSSIAN why this form is used.
    - **wordByWord**: [{german: "Der", russian: "Этот"}, {german: "Zug", russian: "поезд"}, {german: "kommt", russian: "приходит"}, {german: "an", russian: "прибывает"}]

    Generate JSON now.
  `;
};

const generateClozeFlow = ai.defineFlow(
    {
        name: 'generateClozeFlow',
        inputSchema: GenerateClozeInputSchema,
        outputSchema: GenerateClozeOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: GenerateClozeOutputSchema },
            });
            return output!;
        });
    }
);
