
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';
import { VocabularyWord } from '@/lib/types';

// Define Input Schema
const GenerateClozeInputSchema = z.object({
    german: z.string(),
    russian: z.string(),
    type: z.string(),
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
export async function generateClozeWithAI(word: VocabularyWord): Promise<GenerateClozeOutput> {
    const input: GenerateClozeInput = {
        german: word.german,
        russian: word.russian,
        type: word.type,
    };
    return generateClozeFlow(input);
}

const renderPrompt = (input: GenerateClozeInput) => {
    return `
    You are a German language tutor. Create a "Cloze Test" (Fill-in-the-blank) sentence for the following word:
    
    Word: "${input.german}" (${input.russian})
    Type: ${input.type}

    Rules:
    1. The sentence should be A1-A2 level (simple, daily usage).
    2. **STRICT TENSE RULE**: All verbs MUST be in **Präsens** (Present Tense). DO NOT use Perfekt, Partizip II, Präteritum or any other tenses.
    3. The word MUST be used in a context that requires specific grammar:
       - If Noun: Ensure the article or adjective ending proves the case (e.g. "Ich sehe den ___").
       - If Verb: Use a conjugated form in **Präsens**. Focus on testing correct person/number conjugation (e.g., ich, du, wir).
    
    3. **Ambiguity Handling**:
       - If multiple answers are valid (e.g. "einen" OR "den"), list BOTH in 'acceptedAnswers'.
       - However, try to create context that favors one specific form if possible.
       - 'missingWord' should be the "best" answer.

    4. **Grammar Explanation**:
       - Explain specifically why this form is chosen.
       - If specific alternatives are valid or invalid, explain why.
    3. Replace the target word with "___".
    4. Provide the EXACT missing form in 'missingWord'.
    5. Provide a Russian translation.
    6. **CRITICAL**: Provide a 'grammarExplanation'. Explain clearly in Russian WHY this form is correct (e.g. "Here we use Akkusativ because the verb 'sehen' requires it...").
       - **USE HTML TAGS**: Highlight key terms, endings, or case names using <b>bold</b> or <u>underline</u>.
       - Example: "Здесь используется <b>Akkusativ</b>, так как глагол требует прямого дополнения."
    7. Provide 2-3 extra simple example sentences using this word (full sentences, no blanks) in 'examples'. **DO NOT** use HTML tags inside these examples.
    8. Provide a short Russian definition of the target word in 'targetWordDefinition'.
    
    Example for "Apfel" (Noun):
    Sentence: "Ich esse einen roten ___ ."
    Missing: "Apfel"
    Explanation: "Мы используем **einen roten**, так как глагол **essen** требует **Akkusativ** (Винительный падеж), а **Apfel** — мужского рода."
    
    Example for "fahren" (Verb):
    Sentence: "Wir ___ morgen nach Berlin."
    Missing: "fahren"
    Explanation: "Мы используем форму **fahren** для **Präsens** (Настоящее время), так как подлежащее — **Wir** (мы), окончание **-en**."
    
    Output JSON matching the schema.
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
