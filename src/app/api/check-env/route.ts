import { NextResponse } from 'next/server';
import { ai } from '@/ai/genkit';

export async function GET() {
  const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
  const key1 = process.env.GEMINI_API_KEY_1 || 'not-found';
  
  // Count indexed keys
  let indexedCount = 0;
  for (let i = 1; i <= 50; i++) {
    if (process.env[`GEMINI_API_KEY_${i}`]) indexedCount++;
  }

  return NextResponse.json({
    status: 'ok',
    environment: process.env.NODE_ENV,
    aiInitialized: (ai as any).isInitialized,
    instancesCount: (ai as any).instancesCount,
    hasMainKey: !!rawKeys,
    hasKey1: key1 !== 'not-found',
    indexedKeysCount: indexedCount,
    message: rawKeys ? 'Keys found' : 'No keys found in environment variables!'
  });
}
