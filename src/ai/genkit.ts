import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Initialize keys array
let keys: string[] = [];

// 1. Get keys from the main comma-separated variable
const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
if (rawKeys) {
  keys.push(...rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0));
}

// 2. Get keys from indexed variables GEMINI_API_KEY_1 to GEMINI_API_KEY_50
for (let i = 1; i <= 50; i++) {
  const k = process.env[`GEMINI_API_KEY_${i}`];
  if (k && k.trim()) {
    keys.push(k.trim());
  }
}

// 3. Remove duplicates
keys = Array.from(new Set(keys));

if (keys.length > 0) {
  console.log(`[AI] Loaded ${keys.length} unique Gemini API keys.`);
} else {
  console.error("[AI] No Gemini API keys found in environment variables!");
}

// Unified pool using the only working model (2.5-flash) across all keys
const aiInstances = keys.map((apiKey, idx) => {
  try {
    return genkit({
      plugins: [googleAI({ apiKey })],
      model: 'googleai/gemini-2.5-flash',
    });
  } catch (e) {
    console.error(`[AI] Failed to initialize instance for key at index ${idx}`);
    return null;
  }
}).filter((instance): instance is NonNullable<typeof instance> => instance !== null);

// Export primary instances
export const ai = aiInstances[0];
export const aiStable = ai; // Everything uses the same large pool now for reliability

/**
 * Executes an AI operation with aggressive round-robin retries across all available keys.
 */
export const executeWithRetry = async <T>(
  operation: (aiInstance: any) => Promise<T>
): Promise<T> => {
  if (aiInstances.length === 0) {
    throw new Error("No Genkit instances available. Please check your environment variables.");
  }

  // We try all keys, plus some extra attempts just in case
  const MAX_ATTEMPTS = Math.max(aiInstances.length * 2, 5);
  let lastError: any;

  // Start at a random key to distribute load
  const startOffset = Math.floor(Math.random() * aiInstances.length);

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const index = (startOffset + attempt) % aiInstances.length;
    const instance = aiInstances[index];

    try {
      return await operation(instance);
    } catch (error: any) {
      lastError = error;
      const msg = error.message || '';
      const status = error.status || (error.response ? error.response.status : null);

      // If it's a quota/rate limit error, immediately rotate to next key
      if (status === 429 || msg.includes('429') || msg.toLowerCase().includes('quota')) {
        console.warn(`[AI] Key #${index} hit quota limit. Rotating...`);
        continue;
      }

      // For other errors, wait slightly then rotate
      if (attempt < MAX_ATTEMPTS - 1) {
        await new Promise(r => setTimeout(r, 300));
        continue;
      }
    }
  }

  throw lastError || new Error("All available AI keys failed.");
};

export const executeWithRetryStable = executeWithRetry;
