import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
const keys = Array.from(new Set(rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0)));

if (keys.length > 0) {
  console.log(`Loaded ${keys.length} Gemini API keys.`);
} else {
  console.error("No Gemini API keys found in environment variables!");
}

// Unified pool using the only working model
const aiInstances = keys.map(key => {
  const apiKey = key.trim();
  if (!apiKey) return null;
  return genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });
}).filter(instance => instance !== null);

export const ai = aiInstances[0];
export const aiStable = ai;

export const executeWithRetry = async <T>(
  operation: (aiInstance: any) => Promise<T>
): Promise<T> => {
  if (aiInstances.length === 0) throw new Error("No Genkit instances available.");

  const MAX_ATTEMPTS = Math.max(aiInstances.length, 3);
  let lastError: any;
  const startOffset = Math.floor(Math.random() * aiInstances.length);

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    const index = (startOffset + attempt) % aiInstances.length;
    const instance = aiInstances[index];

    try {
      return await operation(instance);
    } catch (error: any) {
      lastError = error;
      const msg = error.message || '';
      if (msg.includes('429') || msg.includes('quota') || error.status === 429) {
        console.warn(`Key ${index} hit quota, trying next...`);
        continue;
      }
      if (attempt < MAX_ATTEMPTS - 1) {
        await new Promise(r => setTimeout(r, 500));
        continue;
      }
    }
  }
  throw lastError || new Error("All AI keys failed.");
};

export const executeWithRetryStable = executeWithRetry;
