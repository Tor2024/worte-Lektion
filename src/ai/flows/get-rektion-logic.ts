'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const RektionLogicInputSchema = z.object({
    german: z.string().describe('The German verb or adjective with preposition.'),
    preposition: z.string().describe('The preposition used.'),
    case: z.string().describe('The case required (Akkusativ, Dativ, etc.).'),
    russian: z.string().describe('Russian translation of the main word.'),
});

const RektionLogicOutputSchema = z.object({
    logic: z.string().describe('Short logical explanation of why this preposition/case is used.'),
    comparison: z.string().describe('Comparative hint: "In Russian we say X, in German Y".'),
    visualMnemonic: z.string().optional().describe('A short visual mnemonic or metaphor.'),
});

export type RektionLogicInput = z.infer<typeof RektionLogicInputSchema>;
export type RektionLogicOutput = z.infer<typeof RektionLogicOutputSchema>;

const renderPrompt = (input: RektionLogicInput) => {
    return `Вы — эксперт по немецкой грамматике и лингвокультурологии.
    Ваша задача — объяснить логику использования немецкого предлога и падежа (Rektion) для русскоязычного ученика.
    
    Слово: "${input.german}" (${input.russian})
    Управление: ${input.preposition} + ${input.case}
    
    Инструкции:
    1. **logic**: Дайте краткое (1-2 предложения) логическое объяснение. Почему именно этот предлог? (например, "auf" часто означает "направленность внимания на объект", "an" — "контакт с темой").
    2. **comparison**: Сравните с русской логикой. Например: "В русском мы ждем КОГО-ТО (без предлога), а в немецком — ЖДЕМ НА (warten auf)".
    3. **visualMnemonic**: (опционально) Предложите краткий визуальный образ.
    
    Будьте лаконичны. Избегайте сухой теории. Пишите для живого человека.
    Верните ТОЛЬКО JSON, соответствующий схеме.`;
};

const getRektionLogicFlow = ai.defineFlow(
    {
        name: 'getRektionLogicFlow',
        inputSchema: RektionLogicInputSchema,
        outputSchema: RektionLogicOutputSchema,
    },
    async (input: z.infer<typeof RektionLogicInputSchema>) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: RektionLogicOutputSchema },
            });
            return output!;
        });
    }
);

export async function getRektionLogic(input: RektionLogicInput): Promise<RektionLogicOutput> {
    return getRektionLogicFlow(input);
}
