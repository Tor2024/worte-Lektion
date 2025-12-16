
import { enrichWord } from './ai/flows/enrich-word';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
    console.log('Testing Word Enrichment Flow for Verbs...');

    // Test with a common verb
    const item = { word: 'machen', context: 'general' };

    console.log(`\n-----------------------------------`);
    console.log(`Enriching: "${item.word}" (Context: ${item.context})`);
    try {
        const result = await enrichWord(item);
        console.log('Result:', JSON.stringify(result, null, 2));

        if (result.type === 'verb') {
            if (result.conjugations) {
                console.log('PASS: Has conjugations');
            } else {
                console.error('FAIL: Missing conjugations object');
            }
        } else {
            console.error('FAIL: Word was not classified as a verb');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

main().catch(console.error);
