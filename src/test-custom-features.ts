
import { generateStory } from './ai/flows/generate-story';
import { evaluateSentence } from './ai/flows/evaluate-sentence';

async function testCustomFeatures() {
    console.log("--- Testing Generate Story ---");
    try {
        const story = await generateStory({
            words: ['Entscheidung', 'entwickeln', 'Erfahrung'],
            topic: 'Im Büro'
        });
        console.log("Story Title:", story.title);
        console.log("Russian Title:", story.japaneseTitle); // Using the field mapped to Russian title
        console.log("Used Words:", story.usedWords);
        console.log("Story Length:", story.story.length);
    } catch (e) {
        console.error("Story Gen Failed:", e);
    }

    console.log("\n--- Testing Evaluate Sentence ---");
    try {
        const feedback = await evaluateSentence({
            word: 'Entscheidung',
            sentence: 'Ich habe eine Entscheidung gemacht.' // Deliberate error (treffen vs machen)
        });
        console.log("Is Correct:", feedback.isCorrect);
        console.log("Correction:", feedback.correctedSentence);
        console.log("Explanation:", feedback.explanation);
        console.log("Style Score:", feedback.styleScore);
    } catch (e) {
        console.error("Evaluation Failed:", e);
    }
}

testCustomFeatures();
