import { NextResponse } from 'next/server';
import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

export async function GET() {
    const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
    const keys = Array.from(new Set(rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0)));

    const modelsToTest = [
        'gemini-1.5-flash',
        'gemini-1.5-flash-latest',
        'gemini-1.5-pro',
        'gemini-2.0-flash',
        'gemini-2.5-flash'
    ];

    const report: any = {
        keyCount: keys.length,
        results: []
    };

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const keyObfuscated = key.substring(0, 4) + '...' + key.substring(key.length - 4);
        const keyReport: any = { keyIndex: i, key: keyObfuscated, models: {} };

        for (const modelName of modelsToTest) {
            try {
                const ai = genkit({
                    plugins: [googleAI({ apiKey: key })],
                    model: `googleai/${modelName}`
                });

                const start = Date.now();
                const resp = await ai.generate({ prompt: 'hi' });
                keyReport.models[modelName] = {
                    status: 'SUCCESS',
                    output: resp.text,
                    latency: Date.now() - start
                };
            } catch (e: any) {
                keyReport.models[modelName] = {
                    status: 'ERROR',
                    error: e.message.substring(0, 200) + (e.message.length > 200 ? '...' : '')
                };
            }
        }
        report.results.push(keyReport);
    }

    return NextResponse.json(report);
}
