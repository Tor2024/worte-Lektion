'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

// Define Input Schema
const VerbFamilyInputSchema = z.object({
    verb: z.string().describe('The German verb to analyze (e.g., "einstellen").'),
    russian: z.string().describe('The primary translation of the verb.'),
});

type VerbFamilyInput = z.infer<typeof VerbFamilyInputSchema>;

// Define Output Schema
const VerbFamilyOutputSchema = z.object({
    root: z.string().describe('The core root of the verb (e.g., "stell").'),
    rootMeaning: z.string().describe('The basic mechanical meaning of the root in Russian.'),
    family: z.array(z.object({
        verb: z.string().describe('The full verb with prefix.'),
        prefix: z.string().describe('The prefix added.'),
        prefixMeaning: z.string().describe('The core "vector" or meaning of this prefix in this context.'),
        translation: z.string().describe('Russian translation of this specific verb.'),
        logicalBridge: z.string().describe('A clear explanation in Russian of HOW the root + prefix creates this meaning (the "story" behind the word).'),
    })).describe('4-6 common variations of this root with different prefixes.'),
});

export type VerbFamilyOutput = z.infer<typeof VerbFamilyOutputSchema>;

export const getVerbFamily = ai.defineFlow(
    {
        name: 'getVerbFamily',
        inputSchema: VerbFamilyInputSchema,
        outputSchema: VerbFamilyOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: `
                You are a German Philology expert. Help a student understand the logic of German prefix verbs.
                
                Target Verb: "${input.verb}" (Russian: ${input.russian})
                
                1. Identify the core ROOT of this verb.
                2. Explain the basic "mechanical" or "physical" essence of this root.
                3. Find 4-6 other common verbs sharing the SAME root but with different prefixes.
                4. For each verb, create a "Logical Bridge" (Логический мостик). 
                   This is a short story/explanation in Russian that connects the mechanical meaning of the root with the specific meaning of the prefixed verb.
                
                Example for ROOT "STELL" (to place/put vertically):
                - einstellen (to hire): "EIN (внутрь) + STELL (ставить) = поставить человека ВНУТРЬ компании/штата."
                - vorstellen (to imagine/introduce): "VOR (перед) + STELL (ставить) = поставить что-то ПЕРЕД собой (в мыслях) или ПЕРЕД другими (знакомство)."
                - abstellen (to switch off): "AB (прочь/в сторону) + STELL (ставить) = убрать/поставить в сторону поток энергии/газа."
                
                Provide the output in JSON format according to the schema.
                `,
                output: { schema: VerbFamilyOutputSchema },
            });
            return output!;
        });
    }
);
