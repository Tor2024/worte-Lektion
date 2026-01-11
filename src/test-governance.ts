
import { enrichWord } from './ai/flows/enrich-word';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function testGovernance(word: string) {
    console.log(`\nTesting Governance for: "${word}"`);
    try {
        const result = await enrichWord({ word });
        console.log(`Type: ${result.type}`);
        console.log(`Russian: ${result.russian}`);

        if (result.governance && result.governance.length > 0) {
            console.log('Governance (Rektion):');
            result.governance.forEach((g, i) => {
                console.log(` [${i + 1}] ${g.preposition} + ${g.case}`);
                console.log(`     Meaning: ${g.meaning}`);
                console.log(`     Example: ${g.example}`);
            });
        } else {
            console.log('No governance found.');
        }

        if (result.type === 'verb') {
            console.log(`Conjugation (er): ${result.conjugation}`);
            console.log(`Perfekt: ${result.perfektForm}`);
            console.log(`Synonyms: ${result.synonyms?.map(s => s.word).join(', ')}`);
        }
    } catch (error) {
        console.error(`Error enriching "${word}":`, error);
    }
}

async function main() {
    await testGovernance('bestehen');
    await testGovernance('warten');
    await testGovernance('interessiert');
}

main().catch(console.error);
