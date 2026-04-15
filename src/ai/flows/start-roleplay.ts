
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const StartRoleplayInputSchema = z.object({
    topicTitle: z.string().describe('The title of the lesson topic (e.g., "Im Restaurant", "Bewerbungsgespräch").'),
    userLevel: z.enum(['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']).describe('The proficiency level of the user.'),
    vocabulary: z.array(z.string()).optional().describe('List of vocabulary words from the current lesson to potentialy incorporate.'),
});

export type StartRoleplayInput = z.infer<typeof StartRoleplayInputSchema>;

const StartRoleplayOutputSchema = z.object({
    scenario: z.string().describe('A short description of the situation in Russian (e.g., "Вы пришли в кафе и хотите заказать кофе.").'),
    aiRole: z.string().describe('The role the AI will play (e.g., "Официант", "HR-менеджер").'),
    userRole: z.string().describe('The role the user will play (e.g., "Клиент", "Кандидат").'),
    initialMessage: z.string().describe('The first message from the AI character in German to start the conversation.'),
    objectives: z.array(z.string()).describe('A list of 2-3 specific goals for the user in this dialogue (e.g., "Узнать цену", "Заказать напиток").'),
});

export type StartRoleplayOutput = z.infer<typeof StartRoleplayOutputSchema>;

export async function startRoleplay(input: StartRoleplayInput): Promise<StartRoleplayOutput> {
    return startRoleplayFlow(input);
}

const renderPrompt = (input: StartRoleplayInput) => {
    return `You are an expert German language tutor engaging in a roleplay scenario with a student.
  
  **Context:**
  - Topic: "${input.topicTitle}"
  - Student Level: ${input.userLevel}
  - Target Vocabulary: ${input.vocabulary?.join(', ')}

  **Goal:**
  Create a realistic, level-appropriate roleplay scenario.
  
  **Instructions:**
  1. **Temporal Focus:** Randomly select one primary tense for this conversation:
     - **Past (Vergangenheit):** (e.g., "What did you do?", "Why were you late?", "How was the vacation?"). Mandatory for describing completed actions.
     - **Present (Gegenwart):** (e.g., "What are you doing now?", "Describe the picture", "I have a problem").
     - **Future (Zukunft):** (e.g., "What are your plans?", "When will you finish?", "Schedule a meeting").
     *Note: Ensure the tense is appropriate for the User Level (e.g., A1 uses simple Perfekt for past, B2 uses Präteritum/Plusquamperfekt).*

  2. **Scenario:** Describe the setting in Russian. It MUST adhere to the selected Temporal Focus. 
     - *Example (Past):* "Вы опоздали на работу. Объясните начальнику, что случилось вчера."
     - *Example (Future):* "Обсудите с коллегой планы на следующую неделю."

  3. **Roles:** Assign a role to yourself (AI) and the student.
     - For A1-A2: Keep roles simple (e.g., Waiter/Customer).
     - For B1-B2: Make roles more professional or specific.

  4. **Initial Message:** Write the FIRST line of dialogue in German.
     - It should immediately set the temporal context (e.g., "Warum waren Sie gestern nicht da?" for Past).

  5. **Objectives:** Define 2-3 specific goals for the student (in Russian).
     - One objective MUST explicitly mention the time frame (e.g., "Рассказать, что вы делали вчера").

  **Output Format:** JSON matching the schema.`;
};

const startRoleplayFlow = ai.defineFlow(
    {
        name: 'startRoleplayFlow',
        inputSchema: StartRoleplayInputSchema,
        outputSchema: StartRoleplayOutputSchema,
    },
    async (input: z.infer<typeof StartRoleplayInputSchema>) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: StartRoleplayOutputSchema },
            });
            return output!;
        });
    }
);
