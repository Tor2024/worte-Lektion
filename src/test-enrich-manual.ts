
import { enrichWord } from './ai/flows/enrich-word';

async function main() {
    try {
        console.log("Enriching 'warten'...");
        const result = await enrichWord({ word: 'warten' });
        console.log("Result:", JSON.stringify(result, null, 2));

        console.log("\nEnriching 'helfen'...");
        const result2 = await enrichWord({ word: 'helfen' });
        console.log("Result:", JSON.stringify(result2, null, 2));

    } catch (error) {
        console.error("Error:", error);
    }
}

main();
