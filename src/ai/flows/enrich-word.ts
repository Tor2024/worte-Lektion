'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const WordEnrichmentInputSchema = z.object({
    word: z.string().describe('The German word to enrich.'),
    context: z.string().optional().describe('Optional context or folder name to help disambiguate meaning.'),
});

export type WordEnrichmentInput = z.infer<typeof WordEnrichmentInputSchema>;

const WordTypeSchema = z.enum(['noun', 'verb', 'adjective', 'conjunction', 'preposition', 'other']);

const EnrichedWordSchema = z.object({
    german: z.string().describe('The canonical German form. For nouns, the noun itself. For verbs, the infinitive OR the fixed phrase if provided (e.g. "es geht um...").'),
    russian: z.string().describe('Russian translation.'),
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
    // Noun specifics
    article: z.enum(['der', 'die', 'das']).optional().describe('For nouns: definite article.'),
    plural: z.string().optional().describe('For nouns: plural form.'),
    pluralArticle: z.string().optional().describe('For nouns: "die" or "-".'),
    // Adjective specifics
    comparative: z.string().optional(),
    // Conjunction specifics
    structure: z.string().optional().describe('For conjunctions: Position of the verb (e.g. "Verb am Ende", "Verb an Position 2", "Inversion").'),
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
});

export type EnrichedWordOutput = z.infer<typeof EnrichedWordSchema>;

const renderPrompt = (input: WordEnrichmentInput) => {
    return `You are a German language expert.
  Analyze the following German word and provide full grammatical details.
  
  Word: "${input.word}"
  ${input.context ? `Context: "${input.context}"` : ''}

  Instructions:
  1. Identify the word type.
  2. Provide the Russian translation.
  3. If it is a **Verb** or **Fixed Expression** (e.g. "es geht um", "Angst haben"):
     - **CRITICAL**: If the user input is a specific phrase (e.g. "es geht um"), KEEP IT as the 'german' field. Do not reduce it to just "gehen".
     - Provide the 3rd person singular Present (e.g. "er läuft", "es geht", "er hat Angst").
     - **CRITICAL**: Provide the FULL conjugation table for Present tense in the 'conjugations' object with keys: ich, du, er_sie_es, wir, ihr, sie_Sie.
     - **CRITICAL**: Provide the Perfekt form (3rd person sing.) including "hat" or "ist" (e.g. "hat gemacht", "ist gegangen").
     - **CRITICAL**: If the verb is separable (trennbar), indicate this clearly in the usage or example.
     - **CRITICAL**: If the verb requires a specific **Preposition** (e.g. "warten auf"), fill 'preposition' AND 'case'.
     - **CRITICAL**: If the verb takes a direct object in **Dativ** (e.g. "helfen", "danken", "gefallen"), FILL 'case'="Dativ" (leave 'preposition' empty if none).
     - **CRITICAL**: If the verb requires a specific preposition or case (e.g. "warten auf + Akk", "helfen + Dat"), YOU MUST PROVIDE IT in the 'preposition' and 'case' fields. If it's a direct transitive verb, you can leave case as 'Akkusativ' (or appropriate) if relevant, but prioritize prepositional objects.
    4. If it is a **Noun**:
       - Provide article, plural form.
       - **CRITICAL**: The 'german' field MUST NOT include the article (e.g., return "Reinigung", not "die Reinigung").
  5. If it is a **Conjunction**:
     - **CRITICAL**: Indicate the verb position/structure: "Verb am Ende" (Nebensatz), "Verb an Position 2" (Hauptsatz ADUSO), or "Verg an Position 1" (Inversion etc).
  6. Provide 2-3 **Synonyms** with Russian translations (e.g. "beginnen" -> "anfangen (начинать)").
  7. Provide 1-2 **Antonyms** with Russian translations if applicable (e.g. "gut" -> "schlecht (плохой)").
  8. Generate a simple, clear example sentence AND its Russian translation.

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
