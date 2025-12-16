
'use server';

/**
 * @fileOverview An AI agent to verify user answers and provide explanations.
 *
 * - verifyAnswer - A function that checks if a user's answer is correct and explains why.
 * - VerifyAnswerInput - The input type for the verifyAnswer function.
 * - VerifyAnswerOutput - The return type for the verifyAnswer function.
 */

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const VerifyAnswerInputSchema = z.object({
  question: z.string().describe('The question that was asked to the user.'),
  userAnswer: z.string().describe('The answer provided by the user.'),
  correctAnswer: z
    .string()
    .describe('The canonical correct answer for the question.'),
});

export type VerifyAnswerInput = z.infer<typeof VerifyAnswerInputSchema>;

const VerifyAnswerOutputSchema = z.object({
  isCorrect: z
    .boolean()
    .describe('Whether the user answer is considered correct.'),
  explanation: z
    .string()
    .describe(
      'A detailed explanation in Russian about why the answer is correct or incorrect, formatted with HTML. If correct, provide positive reinforcement. If incorrect, explain the mistake clearly, state the correct answer, and provide 1-2 more examples of correct usage. Use <p>, <strong> and <strong class="text-primary"> for emphasis.'
    ),
});

export type VerifyAnswerOutput = z.infer<typeof VerifyAnswerOutputSchema>;

export async function verifyAnswer(
  input: VerifyAnswerInput
): Promise<VerifyAnswerOutput> {
  return verifyAnswerFlow(input);
}

const renderPrompt = (input: VerifyAnswerInput) => {
  return `You are an expert German language tutor. Your task is to evaluate a user's answer and provide detailed, helpful feedback in Russian.

  Question: "${input.question}"
  Correct Answer: "${input.correctAnswer}"
  User's Answer: "${input.userAnswer}"

  1.  **Analyze the answer:** Determine if the user's answer is correct. Be flexible with minor typos (one wrong/missing/extra letter) or capitalization if the meaning is clear and it's not a noun, but be strict on grammatical correctness (wrong articles, endings).
        - If the user answer is very close (e.g., "der Tish" instead of "der Tisch"), consider it incorrect but acknowledge the closeness.
        - If the question involves a noun, and the user provided the word but the wrong article (e.g. user says "die Tisch" but correct is "der Tisch"), the answer is incorrect. Your explanation must focus specifically on the article gender.
        - If the question involves a verb with a separable prefix, and the user forgets to move the prefix to the end, the answer is incorrect. Explain the rule of separable prefixes.
        - If the user's answer is just a different but also valid sentence, consider it correct if it answers the question properly.

  2.  **Set 'isCorrect' flag:** Set the boolean flag to 'true' or 'false'.
  3.  **Generate Explanation in Russian (HTML format):**
      *   **If correct:** Provide positive and encouraging feedback. For example: "<p>Отлично! Всё верно!</p><p>Вы правильно использовали грамматическую конструкцию.</p>"
      *   **If incorrect:**
          a. Start with a gentle correction, like "<p>Почти, но есть небольшая ошибка.</p>" or "<p>Не совсем так.</p>"
          b. Clearly state what the mistake was. Example: "Вы использовали не тот артикль." or "Неправильное окончание у глагола." or "Вы пропустили букву 'c'." or "Помните, что у глагола 'einkaufen' отделяемая приставка 'ein' уходит в конец предложения."
          c. Explicitly state the correct answer. Use a strong tag for emphasis: "Правильный ответ: <strong class="text-primary">${input.correctAnswer}</strong>."
          d. Explain *why* it's correct. Example: "Мы используем винительный падеж (Akkusativ) после глагола 'sehen', поэтому 'der' меняется на 'den'." or "Слово 'Tisch' мужского рода, поэтому с ним используется артикль 'der'."
          e. Provide one or two additional, different examples of the correct grammar rule or word usage to reinforce the concept.

  5.  **Special Case: Open-ended Sentence Construction**
      - If the question asks to 'write a sentence' or 'make a sentence' using a specific word, user's answer does NOT need to match 'Correct Answer'.
      - Instead, check if the user's answer is:
         a) A grammatically correct German sentence.
         b) Contains the required word (from the question or correct answer).
         c) Makes semantic sense.
      - If these conditions are met, mark it as CORRECT, even if it's completely different from any example.

  Your entire response must be a single, valid JSON object.`;
};

const verifyAnswerFlow = ai.defineFlow(
  {
    name: 'verifyAnswerFlow',
    inputSchema: VerifyAnswerInputSchema,
    outputSchema: VerifyAnswerOutputSchema,
  },
  async input => {
    return executeWithRetry(async (aiInstance) => {
      const { output } = await aiInstance.generate({
        prompt: renderPrompt(input),
        output: { schema: VerifyAnswerOutputSchema },
      });
      return output!;
    });
  }
);
