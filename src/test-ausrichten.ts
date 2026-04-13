import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { enrichWord } from './ai/flows/enrich-word';

async function test() {
    console.log('Testing "ausrichten" enrichment...');
    try {
        const res = await enrichWord({ word: 'ausrichten', context: 'general' });
        console.log('SUCCESS!');
        console.log(JSON.stringify(res, null, 2));
    } catch (err: any) {
        console.error('FAILED enrichment:');
        if (err.issues) {
            console.error(JSON.stringify(err.issues, null, 2));
        } else {
            console.error(err);
        }
    }
}

test();
