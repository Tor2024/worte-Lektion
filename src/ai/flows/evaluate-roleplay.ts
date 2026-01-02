
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const RoleplayMessageSchema = z.object({
    role: z.enum(['user', 'model']),
    content: z.string(),
});

const EvaluateRoleplayInputSchema = z.object({
    history: z.array(RoleplayMessageSchema).describe('The conversation history so far.'),
    userLevel: z.enum(['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']).describe('The proficiency level of the user.'),
    objectives: z.array(z.string()).describe('The goals the user is trying to achieve.'),
    scenarioContext: z.string().describe('The context of the scenario (from startRoleplay).'),
});

export type EvaluateRoleplayInput = z.infer<typeof EvaluateRoleplayInputSchema>;

const EvaluateRoleplayOutputSchema = z.object({
    aiReply: z.string().describe('The AI character\'s response in German.'),
    feedback: z.string().describe('Feedback on the USER\'S last message in Russian (HTML). Focus on grammar and tone.'),
    suggestions: z.array(z.string()).describe('3 possible German responses the user could have given or can give next.'),
    isCompleted: z.boolean().describe('True if the user has successfully achieved the objectives or the conversation has reached a natural conclusion.'),
});

export type EvaluateRoleplayOutput = z.infer<typeof EvaluateRoleplayOutputSchema>;

export async function evaluateRoleplay(input: EvaluateRoleplayInput): Promise<EvaluateRoleplayOutput> {
    return evaluateRoleplayFlow(input);
}

const renderPrompt = (input: EvaluateRoleplayInput) => {
    const lastUserMessage = input.history[input.history.length - 1]; // This might be used for specific feedback

    return `You are an expert German language tutor playing a character in a roleplay.

  **Context:**
  - Scenario: ${input.scenarioContext}
  - Student Level: ${input.userLevel}
  - Objectives: ${input.objectives.join(', ')}
  
  **Conversation History:**
  ${input.history.map(m => `${m.role === 'user' ? 'Student' : 'You'}: ${m.content}`).join('\n')}

  **Task:**
  1. **Analyze the Student's Last Message:**
     - **Grammar & Usage:** Check for correctness. Crucially, check if the **Tense** matches the context. 
       - If the AI asked a question in the Past ("Was hast du gemacht?"), the user MUST respond in the Past (Perfekt/Präteritum).
       - If the user uses the wrong tense (e.g., "Ich gehe gestern ins Kino"), mark this as a significant error.
     - Check for appropriateness/tone (Höflichkeit).
     - **Important:** If the student's message is empty or "start", just provide the initial greeting.
  
  2. **Generate Feedback (Russian, HTML):**
     - If the user used the wrong tense, explicitly explain: "Вы использовали настоящее время, но мы говорим о прошлом. Используйте Perfekt (haben/sein + Partizip II)."
     - If the tone was off, correct it.
     - If it was good, praise it briefly.
  
  4. **Generate Your Reply (German):**
     - Respond naturally as your character.
     - **Critically Important:** Your response MUST be a direct reaction to the Student's LAST message in the conversation history. 
     - Move the conversation forward.
     - If the user hasn't met the objectives, guide them slightly.
     - If objectives are met, wrap up the conversation politely.
  
  4. **Suggestions:** Provide 3 diverse options for what the student *could* say next or *could have* said better.
  
  5. **Completion Check:** Set 'isCompleted' to true ONLY if the conversation is naturally finished and objectives are met.

  **Output Format:** JSON matching the schema.`;
};

const evaluateRoleplayFlow = ai.defineFlow(
    {
        name: 'evaluateRoleplayFlow',
        inputSchema: EvaluateRoleplayInputSchema,
        outputSchema: EvaluateRoleplayOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: EvaluateRoleplayOutputSchema },
            });
            return output!;
        });
    }
);
