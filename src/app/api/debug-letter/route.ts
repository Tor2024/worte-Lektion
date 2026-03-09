import { NextResponse } from 'next/server';

export async function GET() {
    try {
        // 1. Check keys
        const rawKeys = process.env.GEMINI_API_KEYS || process.env.GEMINI_API_KEY || '';
        const keys = rawKeys.split(',').map(k => k.trim()).filter(k => k.length > 0);

        // 2. Try a simple AI call
        const { evaluateLetter } = await import('@/ai/flows/evaluate-letter');
        const result = await evaluateLetter(
            'Sehr geehrte Damen und Herren, ich schreibe Ihnen.',
            'Test task',
            ['Point 1']
        );

        return NextResponse.json({
            status: 'SUCCESS',
            keyCount: keys.length,
            result: result
        });
    } catch (error: any) {
        return NextResponse.json({
            status: 'ERROR',
            error: error.message,
            stack: error.stack?.substring(0, 500)
        }, { status: 200 }); // Return 200 so we can see the error
    }
}
