'use server';

import { evaluateLetter } from "@/ai/flows/evaluate-letter";
import { WRITING_TOPICS } from "@/lib/writing-data";

export async function submitLetterAction(userText: string, topicId: string) {
    const topic = WRITING_TOPICS.find(t => t.id === topicId); // Removed findLast which might not be supported if target is old ES, using find is safer

    if (!topic) {
        throw new Error("Topic not found");
    }

    try {
        const result = await evaluateLetter(userText, topic.description, topic.taskPoints);
        return { success: true, data: result };
    } catch (error) {
        console.error("Error evaluating letter:", error);
        return { success: false, error: "Failed to evaluate letter. Please try again." };
    }
}
