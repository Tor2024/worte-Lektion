
import { SmartSessionManager } from '@/components/smart-session/session-manager';

export default function DailySessionPage() {
    return (
        <div className="container mx-auto py-8 min-h-screen flex flex-col">
            <header className="mb-8 text-center">
                <h1 className="text-2xl font-bold text-muted-foreground">Ежедневная Тренировка</h1>
            </header>
            <SmartSessionManager />
        </div>
    );
}
