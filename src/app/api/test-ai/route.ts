import { NextResponse } from 'next/server';
import { ai, aiStable } from '@/ai/genkit';

export async function GET() {
    const results: any = {
        pool_standard: { model: 'gemini-2.5-flash', status: 'testing' },
        pool_stable: { model: 'gemini-2.0-flash', status: 'testing' },
    };

    try {
        if (!ai) throw new Error("AI Standard pool not initialized");
        const resp = await ai.generate({ prompt: 'Respond with "Standard OK"' });
        results.pool_standard.status = 'SUCCESS';
        results.pool_standard.output = resp.text;
    } catch (e: any) {
        results.pool_standard.status = 'ERROR';
        results.pool_standard.error = e.message;
    }

    try {
        if (!aiStable) throw new Error("AI Stable pool not initialized");
        const resp = await aiStable.generate({ prompt: 'Respond with "Stable OK"' });
        results.pool_stable.status = 'SUCCESS';
        results.pool_stable.output = resp.text;
    } catch (e: any) {
        results.pool_stable.status = 'ERROR';
        results.pool_stable.error = e.message;
    }

    return NextResponse.json(results);
}
