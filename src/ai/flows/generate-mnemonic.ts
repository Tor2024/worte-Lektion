'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const MnemonicInputSchema = z.object({
    german: z.string().describe('The German word.'),
    russian: z.string().describe('The Russian translation.'),
});

const MnemonicOutputSchema = z.object({
    mnemonic: z.string().describe('A Russian mnemonic or association help remember the word. Should be short and catchy.'),
});

export type MnemonicInput = z.infer<typeof MnemonicInputSchema>;
export type MnemonicOutput = z.infer<typeof MnemonicOutputSchema>;

const renderPrompt = (input: MnemonicInput) => {
    return `Вы — эксперт по лингвистике и памяти (мнемотехнике).
  Ваша задача — создать яркую, короткую и запоминающуюся мнемонику (ассоциацию) для немецкого слова на русском языке.
  
  Немецкое слово: "${input.german}"
  Перевод: "${input.russian}"

  Инструкции:
  1. Создайте звуковую или смысловую ассоциацию, которая связывает звучание немецкого слова с его русским значением.
  2. Мнемоника должна быть на русском языке.
  3. Используйте юмор, яркие образы или созвучия.
  4. Формат: Очень короткая фраза или одно предложение.
  5. Пример: Для слова "fahren" (ехать) -> "ФАРАн едет вперед". Для "Hund" (собака) -> "ХУНТэ — злой пес".

  Верните ТОЛЬКО JSON с полем "mnemonic".`;
};

const generateMnemonicFlow = ai.defineFlow(
    {
        name: 'generateMnemonicFlow',
        inputSchema: MnemonicInputSchema,
        outputSchema: MnemonicOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: MnemonicOutputSchema },
            });
            return output!;
        });
    }
);

export async function generateMnemonic(input: MnemonicInput): Promise<MnemonicOutput> {
    return generateMnemonicFlow(input);
}
