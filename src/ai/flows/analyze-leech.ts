
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';
import { VocabularyWord } from '@/lib/types';

const AnalyzeLeechInputSchema = z.object({
    word: z.string(),
    translation: z.string(),
    type: z.string(),
});

type AnalyzeLeechInput = z.infer<typeof AnalyzeLeechInputSchema>;

const AnalyzeLeechOutputSchema = z.object({
    mnemonic: z.string().describe('A memorable, creative mnemonic to help remember the word (in Russian).'),
    confusionAnalysis: z.string().describe('Why this word is likely difficult (e.g. false friend, irregular plural, looks like another word).'),
    etymologyOrStructure: z.string().describe('Brief interesting fact about word origin or compound parts.'),
    usageTip: z.string().describe('One "Golden Rule" for using this word correctly.'),
});

type AnalyzeLeechOutput = z.infer<typeof AnalyzeLeechOutputSchema>;

export async function analyzeLeechWithAI(word: VocabularyWord): Promise<AnalyzeLeechOutput> {
    return analyzeLeechFlow({
        word: word.german,
        translation: word.russian,
        type: word.type
    });
}

const renderPrompt = (input: AnalyzeLeechInput) => {
    return `
    You are an expert German language coach specializing in "difficult" words.
    
    The student has failed the word "${input.word}" (${input.translation}) more than 3 times. It is a "Leech".
    
    Task: Create a "Remedial Memory Pack" to fix this word in their memory forever.
    
    1. **Mnemonic:** Create a vivid, funny, or weird association linking the German sound to the Russian meaning.
    2. **Confusion Analysis:** Identify the "Trap". Is it a False Friend? Weird Plural? Irregular Verb? Why do students usually fail this?
    3. **Structure/Etymology:** Break it down (if compound) or give a micro-history (if interesting).
    4. **Usage Tip:** One short, punchy rule.
    
    Output JSON. Language: Russian.
    `;
};

const analyzeLeechFlow = ai.defineFlow(
    {
        name: 'analyzeLeechFlow',
        inputSchema: AnalyzeLeechInputSchema,
        outputSchema: AnalyzeLeechOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: AnalyzeLeechOutputSchema },
            });
            return output!;
        });
    }
);
