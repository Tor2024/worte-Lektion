
'use server';

import { ai, executeWithRetry } from '@/ai/genkit';
import { z } from 'genkit';

const ExpandTheoryInputSchema = z.object({
    topicTitle: z.string(),
    currentBriefExplanation: z.string().describe('The existing short HTML explanation.'),
});

type ExpandTheoryInput = z.infer<typeof ExpandTheoryInputSchema>;

const ExpandTheoryOutputSchema = z.object({
    expandedContent: z.string().describe('Rich HTML content string with comprehensive explanation.'),
});

type ExpandTheoryOutput = z.infer<typeof ExpandTheoryOutputSchema>;

export async function expandTheoryWithAI(title: string, briefTheory: string): Promise<string> {
    const result = await expandTheoryFlow({ topicTitle: title, currentBriefExplanation: briefTheory });
    return result.expandedContent;
}

const renderPrompt = (input: ExpandTheoryInput) => {
    return `
    You are an expert German language professor (C2 level native).
    
    Task: Expand the following BRIEF theory explanation into a COMPREHENSIVE educational guide.
    
    Topic: "${input.topicTitle}"
    Existing Brief: "${input.currentBriefExplanation.replace(/<[^>]*>/g, '')}" (Use this as a starting point)

    Requirements for the Expanded Version:
    1. **Deep "Why" & "How":** Don't just list rules. Explain the LOGIC behind them. (e.g., "Why do we use Dativ here? Because this preposition implies location/static state...").
    2. **Structure:**
       - **Introduction:** What is this? Why is it important?
       - **Core Rules:** Detailed breakdown.
       - **Examples (Crucial):** Provide at least 3-5 distinct examples for each rule.
       - **Common Mistakes:** "What usually confuses beginners?" (e.g. confusing 'ie' and 'ei', or 'mir' and 'mich').
       - **Pro Tips:** Mnemonics or shortcuts.
    
    3. **Tone:** Supportive, encouraging, but academically rigorous. A2-B1 friendly.
    
    4. **Formatting:**
       - Use BEAUTIFUL HTML.
       - Use <div class="bg-muted p-4 rounded-lg my-4"> for examples.
       - Use <span class="text-primary font-bold"> for key terms.
       - Use tables if helpful for conjugations/declensions.
       - Do NOT use markdown. Return PURE HTML string inside the JSON.
       - Explanations in RUSSIAN. German examples.
    `;
};

const expandTheoryFlow = ai.defineFlow(
    {
        name: 'expandTheoryFlow',
        inputSchema: ExpandTheoryInputSchema,
        outputSchema: ExpandTheoryOutputSchema,
    },
    async (input) => {
        return executeWithRetry(async (aiInstance) => {
            const { output } = await aiInstance.generate({
                prompt: renderPrompt(input),
                output: { schema: ExpandTheoryOutputSchema },
            });
            return output!;
        });
    }
);
