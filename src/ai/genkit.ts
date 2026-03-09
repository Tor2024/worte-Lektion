import { genkit } from 'genkit';
// Trigger reload 4
import { googleAI } from '@genkit-ai/google-genai';

const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
let keys = rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);

// Also look for indexed keys GEMINI_API_KEY_1 to GEMINI_API_KEY_50
for (let i = 1; i <= 50; i++) {
  const keyMap = process.env[`GEMINI_API_KEY_${i}`];
  if (keyMap && keyMap.trim().length > 0) {
    keys.push(keyMap.trim());
  }
}

// Remove duplicates
keys = Array.from(new Set(keys));

if (keys.length > 0) {
  console.log(`Loaded ${keys.length} Gemini API keys.`);
} else {
  console.error("No Gemini API keys found in environment variables!");
}

// Create pools of Genkit instances
const aiInstances = keys.map(key => {
  const apiKey = key.trim();
  if (!apiKey) return null;
  return genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });
}).filter(instance => instance !== null);

const aiInstancesStable = keys.map(key => {
  const apiKey = key.trim();
  if (!apiKey) return null;
  return genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.0-flash',
  });
}).filter(instance => instance !== null);

if (aiInstances.length === 0) {
  console.error("No valid Gemini API keys found!");
}

// Export instances
export const ai = aiInstances[0];
export const aiStable = aiInstancesStable[0];

// Generic retry helper
const internalExecuteWithRetry = async <T>(
  instances: any[],
  operation: (aiInstance: any) => Promise<T>
): Promise<T> => {
  if (instances.length === 0) {
    throw new Error("No Genkit instances available. Check API keys.");
  }

  const MAX_GLOBAL_RETRIES = 2;
  let globalAttempts = 0;

  while (globalAttempts <= MAX_GLOBAL_RETRIES) {
    let lastError: any;
    const startOffset = Math.floor(Math.random() * instances.length);

    for (let i = 0; i < instances.length; i++) {
      const index = (startOffset + i) % instances.length;
      const instance = instances[index];

      try {
        return await operation(instance);
      } catch (error: any) {
        lastError = error;
      }
    }

    const isRetryable =
      lastError?.message?.includes('429') ||
      lastError?.message?.includes('quota') ||
      lastError?.status === 429 ||
      lastError?.status === 503 ||
      lastError?.status === 500;

    if (isRetryable && globalAttempts < MAX_GLOBAL_RETRIES) {
      const waitTime = 2000 * Math.pow(2, globalAttempts) + Math.random() * 1000;
      await new Promise(resolve => setTimeout(resolve, waitTime));
      globalAttempts++;
      continue;
    }

    throw lastError || new Error("All AI instances failed.");
  }
  throw new Error("All AI instances failed after retries.");
};

// Export specialized retry helpers
export const executeWithRetry = async <T>(
  operation: (aiInstance: typeof ai) => Promise<T>
): Promise<T> => {
  return internalExecuteWithRetry(aiInstances, operation);
};

export const executeWithRetryStable = async <T>(
  operation: (aiInstance: typeof aiStable) => Promise<T>
): Promise<T> => {
  return internalExecuteWithRetry(aiInstancesStable, operation);
};
