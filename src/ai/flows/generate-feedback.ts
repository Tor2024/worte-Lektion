
'use server';

/**
 * @fileOverview Generates personalized feedback based on user's performance.
 *
 * - generateFeedback - A function that analyzes exercise history and provides targeted feedback.
 * - GenerateFeedbackInput - The input type for the generateFeedback function.
 * - GenerateFeedbackOutput - The return type for the generateFeedback function.
 */

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateFeedbackInputSchema = z.object({
  topicTitle: z.string().describe('The title of the topic the user just practiced.'),
  exerciseHistory: z
    .array(
      z.object({
        exercise: z.string().describe('The question or task.'),
        correct: z.boolean().describe('Whether the user answered correctly.'),
      })
    )
    .describe('The history of exercises and their outcomes for the session.'),
});

export type GenerateFeedbackInput = z.infer<typeof GenerateFeedbackInputSchema>;

const GenerateFeedbackOutputSchema = z.object({
  feedback: z
    .string()
    .describe(
      'Personalized feedback in Russian, 2-3 sentences long. It should be encouraging and highlight 1-2 specific areas for improvement based on the errors made. Use HTML tags like <p> and <strong> for formatting.'
    ),
});

export type GenerateFeedbackOutput = z.infer<typeof GenerateFeedbackOutputSchema>;

export async function generateFeedback(input: GenerateFeedbackInput): Promise<GenerateFeedbackOutput> {
  return generateFeedbackFlow(input);
}

const renderPrompt = (input: GenerateFeedbackInput) => {
  const history = input.exerciseHistory.map(h => `- Question: "${h.exercise}" | Correct: ${h.correct}`).join('\n');
  return `You are a helpful and encouraging German language tutor. Your task is to provide personalized feedback in Russian to a student after a practice session.

  The user just finished the topic: "${input.topicTitle}".

  Here is their performance history for this session:
  ${history}

  Analyze the errors. If there are no errors, provide positive reinforcement.
  If there are errors, identify a common pattern (e.g., verb endings, word order, article cases).
  
  Generate a short (2-3 sentences), encouraging, and helpful feedback summary in Russian.
  - Start with a positive, encouraging phrase.
  - If there are errors, point out ONE main area for improvement. Don't overwhelm the user.
  - Frame the advice constructively.
  - Wrap your response in HTML tags like <p> and <strong>.

  Example (with errors): "<p>Отличная работа! Вы хорошо справляетесь с порядком слов. <strong>Обратите особое внимание на окончания прилагательных в Akkusativ</strong>, там была пара ошибок. Продолжайте в том же духе!</p>"
  Example (no errors): "<p>Превосходно! Вы показали отличное знание темы. Все ответы верны. Так держать!</p>"

  Your entire response must be a single, valid JSON object.`;
};

const generateFeedbackFlow = ai.defineFlow(
  {
    name: 'generateFeedbackFlow',
    inputSchema: GenerateFeedbackInputSchema,
    outputSchema: GenerateFeedbackOutputSchema,
  },
  async (input: z.infer<typeof GenerateFeedbackInputSchema>) => {
    return executeWithRetry(async (aiInstance) => {
      const { output } = await aiInstance.generate({
        prompt: renderPrompt(input),
        output: { schema: GenerateFeedbackOutputSchema },
      });
      return output!;
    });
  }
);
