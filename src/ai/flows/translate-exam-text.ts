'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const TranslateExamTextInputSchema = z.object({
    text: z.string(),
});

const TranslateExamTextOutputSchema = z.object({
    translation: z.string(),
});

const translateExamTextFlow = ai.defineFlow(
    {
        name: 'translateExamTextFlow',
        inputSchema: TranslateExamTextInputSchema,
        outputSchema: TranslateExamTextOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { text } = await aiInstance.generate({
                prompt: `Переведи следующий текст с немецкого на русский язык. Это текст для подготовки к экзамену B2/B2 Beruf. Перевод должен быть точным, но при этом литературным и понятным.
        
        Текст для перевода:
        ---
        ${input.text}
        ---
        
        Выдай только сам перевод, без лишних комментариев.`,
            });

            return {
                translation: text,
            };
        });
    }
);

export async function translateExamText(input: { text: string }) {
    return translateExamTextFlow(input);
}
