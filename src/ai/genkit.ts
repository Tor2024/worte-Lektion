import { genkit } from 'genkit';
// Trigger reload 4
import { googleAI } from '@genkit-ai/google-genai';

const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
const keys = rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);

if (keys.length > 0) {
  console.log(`Loaded ${keys.length} Gemini API keys.`);
} else {
  console.error("No Gemini API keys found in environment variables!");
}

// Create a pool of Genkit instances, one for each key
const aiInstances = keys.map(key => {
  const apiKey = key.trim();
  if (!apiKey) return null;
  return genkit({
    plugins: [googleAI({ apiKey })],
    model: 'googleai/gemini-2.5-flash',
  });
}).filter(instance => instance !== null);

if (aiInstances.length === 0) {
  console.error("No valid Gemini API keys found!");
}

// Export the first instance as default for backward compatibility
export const ai = aiInstances[0];

// Helper to execute an AI operation with retries across all available keys
export const executeWithRetry = async <T>(
  operation: (aiInstance: typeof ai) => Promise<T>
): Promise<T> => {
  if (aiInstances.length === 0) {
    throw new Error("No Genkit instances available. Check API keys.");
  }

  const MAX_GLOBAL_RETRIES = 2; // Total 3 attempts (initial + 2 retries)
  let globalAttempts = 0;

  while (globalAttempts <= MAX_GLOBAL_RETRIES) {
    let lastError: any;

    // Try each key in sequence (starting from a random offset to distribute load)
    const startOffset = Math.floor(Math.random() * aiInstances.length);

    for (let i = 0; i < aiInstances.length; i++) {
      const index = (startOffset + i) % aiInstances.length;
      const instance = aiInstances[index];

      try {
        return await operation(instance);
      } catch (error: any) {
        // console.warn(`AI request failed with key index ${index}:`, error.message);
        lastError = error;

        // If it's NOT a quota error/429, and it's a fatal error (like invalid prompt), 
        // we might NOT want to retry with other keys. 
        // However, "internal error" or "service unavailable" should be retried.
        // For now, we continue to rotate keys as a safe default for robustness.
      }
    }

    // If we are here, all keys failed for this attempt.
    console.warn(`All ${aiInstances.length} keys failed (Attempt ${globalAttempts + 1}/${MAX_GLOBAL_RETRIES + 1}). Last error: ${lastError?.message}`);

    // Check if we should wait and retry the whole pool.
    // We retry on 429 (quota), 503 (service unavailable), or 500 (internal).
    const isRetryable =
      lastError?.message?.includes('429') ||
      lastError?.message?.includes('quota') ||
      lastError?.status === 429 ||
      lastError?.status === 503 ||
      lastError?.status === 500;

    if (isRetryable && globalAttempts < MAX_GLOBAL_RETRIES) {
      // Exponential backoff: 2s, 4s, 8s...
      const baseDelay = 2000 * Math.pow(2, globalAttempts);
      // Add jitter (0-1000ms) to avoid thundering herd locally
      const jitter = Math.random() * 1000;
      const waitTime = baseDelay + jitter;

      console.log(`Waiting ${Math.round(waitTime)}ms before global retry...`);
      await new Promise(resolve => setTimeout(resolve, waitTime));

      globalAttempts++;
      continue;
    }

    throw lastError || new Error("All AI instances failed.");
  }

  throw new Error("All AI instances failed after retries.");
};
