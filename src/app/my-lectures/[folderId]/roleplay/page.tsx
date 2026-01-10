
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, Mic, User } from 'lucide-react';
import Link from 'next/link';
import { startRoleplay } from '@/ai/flows/start-roleplay';
import { evaluateRoleplay } from '@/ai/flows/evaluate-roleplay';
import { RoleplayInterface } from '@/components/roleplay-interface';

// Helper to determine rough level based on word count (or just default to A2/B1 for now)
const determineLevel = (wordCount: number) => wordCount > 50 ? 'B1' : 'A2';

export default function RoleplayPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [isLoading, setIsLoading] = useState(false);
    const [scenarioData, setScenarioData] = useState<any>(null);

    const handleStart = async () => {
        if (!folder) return;
        setIsLoading(true);
        try {
            // Pick random words for context
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, 10).map(w => w.word.german);

            const result = await startRoleplay({
                topicTitle: folder.name,
                userLevel: 'B2', // Defaulting to B2 as per project goal, or could be dynamic
                vocabulary: selectedWords
            });
            setScenarioData(result);
        } catch (error) {
            console.error(error);
            alert("Ошибка запуска ролевой игры. Попробуйте снова.");
        } finally {
            setIsLoading(false);
        }
    };

    if (!folder) return <div className="p-8">Папка не найдена</div>;

    return (
        <div className="container mx-auto py-8 max-w-4xl px-4">
            <div className="mb-6">
                <Link href={`/my-lectures/${folderId}`} className="text-sm text-primary hover:underline flex items-center mb-4">
                    <ArrowLeft className="mr-1 h-3 w-3" /> Назад к папке
                </Link>
                <div className="flex justify-between items-center">
                    <h1 className="text-3xl font-bold font-headline flex items-center gap-2">
                        <Mic className="h-8 w-8 text-purple-500" />
                        Roleplay Scenarios
                    </h1>
                </div>
            </div>

            {/* INTRO */}
            {!scenarioData && !isLoading && (
                <Card className="text-center py-12">
                    <CardContent className="flex flex-col items-center">
                        <div className="bg-purple-100 p-4 rounded-full mb-4">
                            <User className="h-12 w-12 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Разговорный симулятор</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            AI создаст для вас ситуацию (в магазине, в офисе, у врача) используя слова из этой папки.
                        </p>
                        <Button size="lg" onClick={handleStart} className="bg-purple-600 hover:bg-purple-700 text-white">
                            Начать диалог
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* LOADING */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-purple-500" />
                    <p className="text-muted-foreground animate-pulse">Придумываем сценарий...</p>
                </div>
            )}

            {/* CHAT INTERFACE */}
            {scenarioData && (
                <RoleplayInterface
                    scenario={scenarioData.scenario}
                    aiRole={scenarioData.aiRole}
                    userRole={scenarioData.userRole}
                    initialMessage={scenarioData.initialMessage}
                    objectives={scenarioData.objectives}
                    userLevel="B2"
                    onSendMessage={async (history, message) => {
                        // Map history to simple format
                        const simpleHistory = history.map(h => ({ role: h.role, content: h.content }));
                        return await evaluateRoleplay({
                            history: simpleHistory,
                            userLevel: 'B2',
                            objectives: scenarioData.objectives,
                            scenarioContext: scenarioData.scenario
                        });
                    }}
                    onComplete={() => setScenarioData(null)}
                />
            )}
        </div>
    );
}
