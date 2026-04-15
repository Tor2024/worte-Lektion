
'use server';

/**
 * @fileOverview An AI agent to generate adaptive exercises based on user weaknesses.
 *
 * - generateAdaptiveExercise - A function that generates targeted exercises based on user weaknesses.
 * - AdaptiveExerciseInput - The input type for the generateAdaptiveExercise function.
 * - AdaptiveExerciseOutput - The return type for the generateAdaptiveExercise function.
 */

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const VocabularyWordSchema = z.object({
  german: z.string(),
  russian: z.string(),
  example: z.string(),
});

const ExerciseHistoryItemSchema = z.object({
  exercise: z.string().describe('The question or task presented to the user.'),
  userAnswer: z.string().describe('The answer the user provided.'),
  isCorrect: z.boolean().describe('Whether the user answer was correct.'),
});

const AdaptiveExerciseInputSchema = z.object({
  grammarConcept: z
    .string()
    .describe('The specific German grammar concept the user is struggling with.'),
  userLevel: z
    .enum(['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'])
    .describe('The current German language level of the user.'),
  pastErrors: z
    .string()
    .describe(
      'A summary of past errors made by the user in previous sessions related to this grammar concept.'
    ),
  exerciseHistory: z.array(ExerciseHistoryItemSchema).optional().describe('The history of exercises and user answers from the current session. Use this to identify patterns in recent mistakes.'),
  vocabulary: z.array(VocabularyWordSchema).describe('A list of vocabulary words to incorporate into the exercises.'),
});

export type AdaptiveExerciseInput = z.infer<typeof AdaptiveExerciseInputSchema>;

const ExerciseSchema = z.object({
  instruction: z.string().describe('DETAILED instructions for the user in Russian (e.g. "Поставьте глагол в форму Konjunktiv II" or "Выберите правильный предлог"). Do not leave this empty.').default('Вставьте пропущенное слово'),
  example: z.string().optional().describe('1-2 short, HTML-formatted examples showing how to apply the rule for this specific task. Highlight important parts with <strong class="text-primary">. e.g. "Пример: Er <strong class="text-primary">hätte</strong> das <strong class="text-primary">tun sollen</strong>".'),
  question: z.string().describe('The question or fill-in-the-blank sentence.'),
  answer: z.string().describe('The correct answer.')
});

const SentenceConstructionExerciseSchema = z.object({
  instruction: z.string().describe('DETAILED instructions in Russian (e.g. "Составьте предложение, обращая внимание на порядок слов в Perfekt").').default('Составьте предложение'),
  example: z.string().optional().describe('1 short, HTML-formatted example of similar word ordering to guide the user.'),
  words: z.array(z.string()).describe('An array of words to be arranged into a correct sentence.'),
  correctSentence: z.string().describe('The correctly formed sentence.'),
});

const AdaptiveExerciseOutputSchema = z.object({
  vocabularyExercises: z.array(ExerciseSchema).min(0).max(5)
    .describe(
      'An array of vocabulary translation exercises (0 to 5 items). The question should be the Russian word, and the answer should be the German translation. For nouns, the German answer MUST include the definite article (der/die/das).'
    ),
  readingText: z
    .string()
    .describe(
      'A short, engaging German text (3-5 sentences) for reading practice, relevant to the grammar concept and user level.'
    ),
  comprehensionExercises: z.array(ExerciseSchema).length(2)
    .describe(
      'An array of 2 questions in German based on the reading text to check understanding, each with a correct answer.'
    ),
  grammarExercises: z.array(ExerciseSchema).length(4)
    .describe(
      'An array of 4 fill-in-the-blank sentence exercises targeting the specific grammar concept. If the concept involves cases (Akkusativ, Dativ), at least 2 of these exercises must focus on choosing the correct article or ending. Use underscores for the blank (e.g., "Ich ___ nach Hause."). Each exercise should have a question and the correct answer.'
    ),
  sentenceConstructionExercises: z.array(SentenceConstructionExerciseSchema).length(2)
    .describe(
      'An array of 2 sentence construction exercises. Provide a set of words that the user must assemble into a grammatically correct sentence.'
    ),
  explanation: z
    .string()
    .describe(
      'A detailed explanation in Russian about the grammar rule being practiced, formatted with HTML tags (<h2>, <ul>, <li>, <strong>). Important terms should be wrapped in `<strong class="text-primary">...</strong>` for Dativ and `<strong class="text-accent">...</strong>` for Akkusativ.'
    ),
});

export type AdaptiveExerciseOutput = z.infer<typeof AdaptiveExerciseOutputSchema>;

export async function generateAdaptiveExercise(
  input: AdaptiveExerciseInput
): Promise<AdaptiveExerciseOutput> {
  return adaptiveExerciseGenerationFlow(input);
}

const renderPrompt = (input: AdaptiveExerciseInput) => {
  const { grammarConcept, userLevel, pastErrors, exerciseHistory, vocabulary } = input;

  let historySection = '';
  if (exerciseHistory && exerciseHistory.length > 0) {
    historySection = `Analyze the user's performance in this session to identify recurring mistakes. Pay close attention to the 'isCorrect' flag and the 'userAnswer'.\n`;
    historySection += exerciseHistory.map(h => `- **Question:** "${h.exercise}" | **User Answer:** "${h.userAnswer}" | **Correct:** ${h.isCorrect}`).join('\n');
    historySection += `\n**Based on the current session, identify the most common error type (e.g., wrong article in Akkusativ, incorrect verb ending, word order). The new exercises MUST specifically target this weakness.**`;
  } else {
    historySection = `This is the first set of exercises in the session.`;
  }

  const vocabularyList = vocabulary.map(v => `- ${v.german} (${v.russian}): ${v.example}`).join('\n');

  return `You are an expert German language tutor, fluent in Russian. Your primary goal is to create adaptive exercises that target the user's specific weaknesses, with a strong focus on German cases (Fälle).

  **User Profile:**
  - **Grammar Concept:** ${grammarConcept}
  - **Level:** ${userLevel}
  - **Summary of Past Errors (from previous sessions):** ${pastErrors}
  
  **Current Session Performance:**
  ${historySection}

  **Vocabulary to Use:**
  The exercises MUST incorporate words from the following vocabulary list:
  ${vocabularyList}

  **Your Task: Create a comprehensive, multi-part exercise set.**
  CRITICAL: Every single exercise MUST include a detailed 'instruction' field in Russian explaining exactly what grammar rule to apply, and an 'example' field providing 1-2 practical examples (formatted with HTML <strong class="text-primary"> for emphasis).

  1.  **Vocabulary Practice:** Check the provided vocabulary list.
      - If the list is NOT empty, select **up to 3 words** from it. Create an array of exercises where the 'instruction' explains to translate the word, the 'example' provides context, the 'question' is the Russian word and the 'answer' is the German translation. **For nouns, the German answer MUST include the definite article (der/die/das).**
      - If the list is empty, return an empty array for vocabularyExercises.
  2.  **Reading Practice:** Write a short, engaging German text (3-5 sentences) that is relevant to the user's level, naturally incorporates the '${grammarConcept}', and uses several words from the provided vocabulary list (if any).
  3.  **Comprehension Check:** Based on the text you just wrote, create an array of 2 comprehension questions in German. For each, provide the 'instruction' (e.g. "Ответьте на вопрос по тексту"), 'example' of how to answer, the question and the correct answer.
  4.  **Targeted Grammar Exercises:** Create an array of 4 fill-in-the-blank sentences. These exercises MUST directly target the primary weakness. **If the topic is related to cases (Akkusativ, Dativ), at least 2 of these must require the user to fill in the correct article or adjective ending.** Use words from the vocabulary list. Use underscores for the blank space (e.g., "Ich sehe ___ alt___ Mann."). For each, provide the 'instruction' describing what exactly to put in the blank (e.g., "Вставьте правильное окончание прилагательного в Dativ"), an 'example' demonstrating the rule, the full sentence as the question and the exact word(s) for the blank as the answer.
  5.  **Sentence Construction:** Create an array of 2 exercises where the user must form a correct sentence from a given set of words. This tests word order and should also reflect the identified weakness. Provide a specific 'instruction' and 'example' word order.
  6.  **Explanation:** Provide a clear, concise explanation of the grammar rule being tested. The explanation MUST be in Russian and formatted with HTML. Use tags like <h2>, <ul>, <li>, and <strong>. Highlight key terms and concepts using '<strong class="text-primary">term for Dativ</strong>' and '<strong class="text-accent">term for Akkusativ</strong>'.

  Ensure the output is parsable JSON and follows the specified schema.`;
};

const adaptiveExerciseGenerationFlow = ai.defineFlow(
  {
    name: 'adaptiveExerciseGenerationFlow',
    inputSchema: AdaptiveExerciseInputSchema,
    outputSchema: AdaptiveExerciseOutputSchema,
  },
  async (input: AdaptiveExerciseInput) => {
    return executeWithRetry(async (aiInstance) => {
      const { output } = await aiInstance.generate({
        prompt: renderPrompt(input),
        output: { schema: AdaptiveExerciseOutputSchema },
      });
      return output!;
    });
  }
);
