'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const WordEnrichmentInputSchema = z.object({
    word: z.string().describe('The German word to enrich.'),
    context: z.string().optional().describe('Optional context or folder name to help disambiguate meaning.'),
});

export type WordEnrichmentInput = z.infer<typeof WordEnrichmentInputSchema>;

const WordTypeSchema = z.enum(['noun', 'verb', 'adjective', 'conjunction', 'preposition', 'other']);

const GovernanceSchema = z.object({
    preposition: z.string().describe('The preposition (e.g. "auf", "an") or "без предлога" if none.'),
    case: z.enum(['Akkusativ', 'Dativ', 'Genitiv', 'Nominativ', 'no-case']).describe('The required case.'),
    meaning: z.string().describe('Russian explanation of the meaning for this specific governance.'),
    example: z.string().describe('German example sentence using this specific governance.'),
});

const EnrichedWordSchema = z.object({
    german: z.string().describe('The canonical German form. For nouns, the noun itself. For verbs, the infinitive OR the fixed phrase if provided (e.g. "es geht um...").'),
    russian: z.string().describe('The single most common B2 Beruf translation.'),
    allTranslations: z.string().optional().describe('All valid Russian translations for context, separated by semicolons.'),
    type: WordTypeSchema,
    // Verb specifics
    conjugation: z.string().optional().describe('For verbs: 3rd person singular Present (e.g. "er läuft" or "es geht").'),
    conjugations: z.object({
        ich: z.string(),
        du: z.string(),
        er_sie_es: z.string(),
        wir: z.string(),
        ihr: z.string(),
        sie_Sie: z.string(),
    }).optional().describe('Full conjugation table for Present tense.'),
    perfektForm: z.string().optional().describe('For verbs: 3rd person singular Perfekt.'),
    preposition: z.string().optional().describe('For verbs: associated preposition if any (e.g. "auf" for "warten auf").'),
    case: z.enum(['Akkusativ', 'Dativ', 'Genitiv', 'Nominativ']).optional().describe('For verbs/prepositions: required case (e.g. "Akkusativ" for "warten auf").'),
    verbTenses: z.object({
        praeteritum: z.string(),
        futur1: z.string(),
        futur2: z.string(),
    }).optional().describe('For Verbs: 3rd person singular forms for other tenses.'),
    // Noun specifics
    article: z.enum(['der', 'die', 'das']).optional().describe('For nouns: definite article.'),
    plural: z.string().optional().describe('For nouns: plural form.'),
    pluralArticle: z.string().optional().describe('For nouns: "die" or "-".'),
    // Adjective specifics
    comparative: z.string().optional().describe('For adjectives: comparative form (e.g. "stärker").'),
    superlative: z.string().optional().describe('For adjectives: superlative form (e.g. "am stärksten").'),
    // Conjunction & Structure specifics
    structure: z.string().optional().describe('Verb position/sentence structure (e.g. "Verb am Ende", "Verb an Position 2", "Inversion"). Important for words like während, bevor, deshalb.'),
    // Common
    example: z.string().describe('A simple example sentence using the word in context.'),
    exampleMeaning: z.string().describe('Russian translation of the example sentence.'),
    synonyms: z.array(z.object({
        word: z.string(),
        translation: z.string().describe('Russian translation of the synonym')
    })).optional().describe('List of 2-3 synonyms with translations.'),
    antonyms: z.array(z.object({
        word: z.string(),
        translation: z.string().describe('Russian translation of the synonym')
    })).optional().describe('List of 1-2 antonyms with translations (if applicable).'),
    collocations: z.array(z.object({
        phrase: z.string().describe('A common fixed phrase or Nomen-Verb-Verbindung (e.g. "eine Rolle spielen").'),
        translation: z.string().describe('Russian translation of the phrase.')
    })).optional().describe('List of 2-3 common collocations or fixed phrases.'),
    governance: z.array(GovernanceSchema).optional().describe('List of normative prepositions and cases for verbs and adjectives.'),
});

export type EnrichedWordOutput = z.infer<typeof EnrichedWordSchema>;

const renderPrompt = (input: WordEnrichmentInput) => {
    return `You are a German language expert.
  Analyze the following German word and provide full grammatical details.
  
  Word: "${input.word}"
  ${input.context ? `Context: "${input.context}"` : ''}

  Instructions:
  1. Identify the word type.
  2. Provide translations:
     - **russian**: Provide THE SINGLE MOST COMMON technical or business meaning used in **B2 Beruf** (Professional German) in Russia/Ukraine.
     - **DO NOT** provide a list. If "sterben" is the word, use "умирать". If "bleiben" is the word, use "оставаться".
     - **allTranslations**: Provide all other valid meanings separated by semicolons (e.g. "оставаться; пребывать; задерживаться").
     - **CRITICAL**: DO NOT put lists in the 'russian' field. Put only the one best B2 Beruf meaning there.
  3. If it is a **Verb** or **Adjective**:
     - **CRITICAL: GOVERNANCE (Reksion)**:
       - Determine the normative German prepositions and cases required by this word.
       - **Strictly follow German norms**. Do not use "logical" or direct translations of Russian prepositions.
       - If there is only one governance, provide it in the 'governance' list.
       - If there are multiple governances (different prepositions or different cases with different meanings, e.g., "bestehen auf/aus/in"), provide EACH one separately.
       - For each governance item:
         - 'preposition': The German preposition OR "без предлога" if it takes a direct object or has no preposition.
         - 'case': The required case (Akkusativ, Dativ, Genitiv, Nominativ). Use 'no-case' only if truly applicable (rare).
         - 'meaning': A brief Russian explanation of the meaning for this specific case/preposition combo.
         - 'example': A clear German example sentence using this specific governance.
  4. If it is a **Verb** or **Fixed Expression**:
     - **CRITICAL**: Keep providing all previous details: 3rd person singular Present, FULL conjugation table ('conjugations'), Perfekt form, and 'verbTenses'.
     - Keep 'preposition' and 'case' at the top level for backward compatibility (fill them from the primary governance item), but prioritize the 'governance' array in the UI.
  5. If it is a **Noun**:
     - Provide article, plural form.
  6. If it is a **Conjunction** or a word affecting word order (like deshalb, während, trotzdem):
     - Indicate the verb position/structure in the 'structure' field. Use clear terms like "Verb am Ende (Nebensatz)" or "Inversion (Verb an Pos. 2)".
  7. If it is an **Adjective**:
     - Provide **comparative** and **superlative** forms.
  8. Provide 2-3 **Synonyms** and 1-2 **Antonyms** with Russian translations. Ensure translations for synonyms are concise.
  9. Generate a default example sentence (main example) and its translation.

  Return ONLY valid JSON matching the schema.`;
};

const wordEnrichmentFlow = ai.defineFlow(
    {
        name: 'wordEnrichmentFlow',
        inputSchema: WordEnrichmentInputSchema,
        outputSchema: EnrichedWordSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: EnrichedWordSchema },
            });
            return output!;
        });
    }
);

export async function enrichWord(input: WordEnrichmentInput): Promise<EnrichedWordOutput> {
    return wordEnrichmentFlow(input);
}
