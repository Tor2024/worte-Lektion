'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const DecomposeInputSchema = z.object({
    german: z.string().describe('The complex German word or phrase.'),
});

const ComponentSchema = z.object({
    word: z.string().describe('Individual component word.'),
    translation: z.string().describe('Short translation of the component.'),
    pronunciation: z.string().optional().describe('Approximate transcription in Russian Cyrillic.'),
});

const DecomposeOutputSchema = z.object({
    components: z.array(ComponentSchema).describe('List of components making up the word.'),
    explanation: z.string().optional().describe('Short explanation of how they combine.'),
});

export type DecomposeInput = z.infer<typeof DecomposeInputSchema>;
export type DecomposeOutput = z.infer<typeof DecomposeOutputSchema>;

const renderPrompt = (input: DecomposeInput) => {
    return `Вы — эксперт по немецкому языку.
    Ваша задача — разбить сложное немецкое слово (Komposita) или устойчивое выражение на логические составляющие и перевести каждую из них.
    
    Немецкое выражение: "${input.german}"
    
    Инструкции:
    1. Выделите корни или слова, из которых состоит выражение.
    2. Для каждого компонента дайте краткий перевод на русский.
    3. Добавьте примерную русскую транскрипцию для произношения каждого компонента.
    4. Если это имеет смысл, дайте очень краткое пояснение, как эти части соединяются по смыслу.
    
    Пример для "vor Ort Beratung":
    - vor: перед/у [фор]
    - Ort: место [орт]
    - Beratung: консультация [бе-ра-тунг]
    
    Верните ТОЛЬКО JSON, соответствующий схеме.`;
};

const decomposeGermanWordFlow = ai.defineFlow(
    {
        name: 'decomposeGermanWordFlow',
        inputSchema: DecomposeInputSchema,
        outputSchema: DecomposeOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: DecomposeOutputSchema },
            });
            return output!;
        });
    }
);

export async function decomposeGermanWord(input: DecomposeInput): Promise<DecomposeOutput> {
    return decomposeGermanWordFlow(input);
}
