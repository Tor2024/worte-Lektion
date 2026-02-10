
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
    Continue this story logically using the new word "${input.german}". Ensure the transition is smooth and the narrative remains professional or interesting (suitable for B2 level).
    ` : 'Create a simple, daily usage sentence for this word.'}

    **CRITICAL RULES**:
    1. **LANGUAGE**: 'sentenceWithBlank' must be **100% GERMAN**. Do NOT include any Russian words in the German sentence.
    2. **COMPLETENESS**: The sentence must be grammatically complete (Subject + Verb + Object/Preposition). No fragments.
    3. **TARGET WORD**: Replace the target word (or its conjugated form) with "___".

    **GRAMMAR RULES**:
    1. **TENSE**: Prefer **Präsens** (Present) or **Präteritum** (Past) depending on story context.
    2. **SEPARABLE VERBS (trennbare Verben)** (e.g., ankommen, aufstehen, mitbringen):
       - **OPTION A (Modal Verb)**: Use a modal verb (können, müssen, wollen) so the target word stays at the end in INFINITIVE form.
         - *Example*: "Wir wollen morgen pünktlich ___." (missing: "ankommen")
       - **OPTION B (Separated)**: If you conjugate the verb, you **MUST** place the prefix at the very end of 'sentenceWithBlank'.
         - *CORRECT*: "Der Zug ___ um 12 Uhr **an**." (missing: "kommt")
         - *WRONG*: "Der Zug ___ um 12 Uhr." (Prefix is missing!)
       - **Input Rule**: The 'missingWord' should be ONLY the part that goes in the blank (e.g., "kommt" or "ankommen").

    3. **NOUNS**:
       - Ensure the article or adjective ending proves the case.
       - *Example*: "Ich habe einen neuen ___." (accusative hint).

    **OUTPUT FORMAT**:
    - **sentenceWithBlank**: "Der Zug ___ um 12 Uhr an." (Full German sentence)
    - **missingWord**: "kommt" (The exact string to be typed)
    - **translation**: Russian translation.
    - **grammarExplanation**: Explain in RUSSIAN why this form is used. Use HTML tags (<b>, <u>) for highlighting.
    - **examples**: 2-3 extra German sentences.
    - **acceptedAnswers**: List other valid forms (e.g. "fahre" if "fahre" and "fahren" are both plausible, though context should clarify).

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
