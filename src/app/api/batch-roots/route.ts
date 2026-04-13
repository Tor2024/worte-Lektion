
import { NextResponse } from 'next/server';
import { detectRoots } from '@/ai/flows/detect-roots';

export async function POST(req: Request) {
    try {
        const { words } = await req.json();
        
        if (!words || !Array.isArray(words)) {
            return NextResponse.json({ error: 'Missing words array' }, { status: 400 });
        }

        console.log(`[AI-Roots] Processing batch of ${words.length} words: ${words.slice(0, 3).join(', ')}...`);
        
        const rootMap = await detectRoots(words);
        
        console.log(`[AI-Roots] Successfully indexed ${Object.keys(rootMap).length} roots.`);
        return NextResponse.json({ rootMap });
    } catch (error: any) {
        console.error('[AI-Roots] ERROR:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
