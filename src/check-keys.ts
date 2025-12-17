import { config } from 'dotenv';
config({ path: '.env.local' }); // Explicitly load .env.local for this test script

const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
let keys = rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);

console.log('--- Debugging Keys ---');
console.log(`Initial keys from comma-separated list: ${keys.length}`);

// Also look for indexed keys GEMINI_API_KEY_1 to GEMINI_API_KEY_50
for (let i = 1; i <= 50; i++) {
    const keyMap = process.env[`GEMINI_API_KEY_${i}`];
    if (keyMap && keyMap.trim().length > 0) {
        // console.log(`Found key ${i}: ${keyMap.substring(0, 5)}...`);
        keys.push(keyMap.trim());
    }
}

// Remove duplicates
keys = Array.from(new Set(keys));

console.log(`Total unique keys loaded: ${keys.length}`);

if (keys.length >= 10) {
    console.log("SUCCESS: All keys correctly loaded!");
} else {
    console.log("WARNING: Not all keys were found. Check .env.local naming.");
}
