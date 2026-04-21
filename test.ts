import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
require('dotenv').config({path: '.env.local'});
const ai = genkit({
    plugins: [googleAI({ apiKey: process.env.GEMINI_API_KEY_1 || process.env.GEMINI_API_KEY })],
    model: 'googleai/gemini-2.0-flash'
});
ai.generate('hallo').then(r => console.log("SUCCESS:", r.text)).catch(e => console.error("ERROR:", e.message));
