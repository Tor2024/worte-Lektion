
import { NextResponse } from 'next/server';
import { detectRoots } from '@/ai/flows/detect-roots';

export async function POST(req: Request) {
    try {
        const { words } = await req.json();
        
        if (!words || !Array.isArray(words)) {
            return NextResponse.json({ error: 'Missing words array' }, { status: 400 });
        }

        const rootMap = await detectRoots(words);
        
        return NextResponse.json({ rootMap });
    } catch (error: any) {
        console.error('Batch root detection failed:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
