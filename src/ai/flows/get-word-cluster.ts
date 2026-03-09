'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const WordClusterInputSchema = z.object({
    word: z.string().describe('The German word to find relatives for (e.g., "Arbeit").'),
    type: z.string().describe('The part of speech of the input word.'),
});

const ClusterItemSchema = z.object({
    german: z.string().describe('The related German word.'),
    russian: z.string().describe('Russian translation.'),
    type: z.enum(['noun', 'verb', 'adjective', 'adverb', 'other']).describe('Part of speech.'),
    article: z.string().optional().describe('Article if it is a noun.'),
});

const WordClusterOutputSchema = z.object({
    root: z.string().describe('The common root of the cluster.'),
    items: z.array(ClusterItemSchema).describe('List of related words of different parts of speech.'),
});

export type WordClusterOutput = z.infer<typeof WordClusterOutputSchema>;

const renderPrompt = (input: { word: string; type: string }) => {
    return `Вы — эксперт по немецкой филологии.
    Ваша задача — создать "Кластер Однокоренных Слов" (Word Family Cluster) для заданного слова.
    
    Цель: Помочь ученику выучить сразу несколько частей речи, объединенных одним корнем.
    
    Входное слово: "${input.word}" (Тип: ${input.type})
    
    Инструкции:
    1. Найдите общий корень.
    2. Найдите 3-5 наиболее употребимых однокоренных слов других частей речи.
    3. Обязательно постарайтесь включить тройку: Существительное (Nomen), Глагол (Verb), Прилагательное (Adjektiv).
    4. Для существительных ОБЯЗАТЕЛЬНО укажите артикль (der/die/das).
    
    Пример для "Arbeit":
    - arbeiten (verb): работать
    - arbeitsam (adj): трудолюбивый
    - рабочий (adj): рабочая (Arbeits-)
    
    Верните ТОЛЬКО JSON, соответствующий схеме.`;
};

const getWordClusterFlow = ai.defineFlow(
    {
        name: 'getWordClusterFlow',
        inputSchema: WordClusterInputSchema,
        outputSchema: WordClusterOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: WordClusterOutputSchema },
            });
            return output!;
        });
    }
);

export async function getWordCluster(word: string, type: string): Promise<WordClusterOutput> {
    return getWordClusterFlow({ word, type });
}
