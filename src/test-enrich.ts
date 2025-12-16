
import { enrichWord } from './ai/flows/enrich-word';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function main() {
    const wordsToTest = [
        { word: 'laufen', context: 'sport' },
        { word: 'warten', context: 'time' },
        { word: 'Tisch', context: 'furniture' },
        { word: 'alt', context: 'description' }
    ];

    console.log('Testing Word Enrichment Flow...');

    for (const item of wordsToTest) {
        console.log(`\n-----------------------------------`);
        console.log(`Enriching: "${item.word}" (Context: ${item.context})`);
        try {
            const result = await enrichWord(item);
            console.log('Result:', JSON.stringify(result, null, 2));

            if (result.type === 'verb') {
                if (!result.perfektForm) console.error('FAIL: Missing Perfekt form for verb');
                else console.log('PASS: Has Perfekt form:', result.perfektForm);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
}

main().catch(console.error);
