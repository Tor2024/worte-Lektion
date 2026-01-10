
'use client';

import { use, useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2, ArrowLeft, Briefcase, UserCheck } from 'lucide-react';
import Link from 'next/link';
import { startInterview } from '@/ai/flows/start-interview';
import { evaluateRoleplay } from '@/ai/flows/evaluate-roleplay'; // Reuse evaluation logic as it's the same mechanic
import { RoleplayInterface } from '@/components/roleplay-interface';

export default function InterviewPage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder } = useCustomFolders();
    const folder = getFolder(folderId);

    const [isLoading, setIsLoading] = useState(false);
    const [scenarioData, setScenarioData] = useState<any>(null);

    const handleStart = async () => {
        if (!folder) return;
        setIsLoading(true);
        try {
            // Pick random words
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selectedWords = shuffled.slice(0, 10).map(w => w.word.german);

            const result = await startInterview({
                folderName: folder.name,
                vocabulary: selectedWords,
                jobTitle: "Spezialist" // Default, could be asked from user later
            });
            setScenarioData(result);
        } catch (error) {
            console.error(error);
            alert("Ошибка запуска интервью. Попробуйте снова.");
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
                        <Briefcase className="h-8 w-8 text-blue-800" />
                        Job Interview Simulator
                    </h1>
                </div>
            </div>

            {/* INTRO */}
            {!scenarioData && !isLoading && (
                <Card className="text-center py-12 border-blue-800/20 bg-blue-50/50 dark:bg-blue-950/20">
                    <CardContent className="flex flex-col items-center">
                        <div className="bg-blue-100 p-4 rounded-full mb-4 dark:bg-blue-900">
                            <UserCheck className="h-12 w-12 text-blue-800 dark:text-blue-200" />
                        </div>
                        <h2 className="text-xl font-bold mb-2">Симулятор Собеседования (B2+)</h2>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            Строгий HR-менеджер проверит ваше владение лексикой "{folder.name}".
                            Готовьтесь отвечать на неудобные вопросы!
                        </p>
                        <Button size="lg" onClick={handleStart} className="bg-blue-800 hover:bg-blue-900 text-white">
                            Начать собеседование
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* LOADING */}
            {isLoading && (
                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                    <Loader2 className="h-12 w-12 animate-spin text-blue-800" />
                    <p className="text-muted-foreground animate-pulse">HR изучает ваше резюме...</p>
                </div>
            )}

            {/* CHAT INTERFACE */}
            {scenarioData && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                    <RoleplayInterface
                        scenario={scenarioData.scenario}
                        aiRole={scenarioData.aiRole}
                        userRole={scenarioData.userRole}
                        initialMessage={scenarioData.initialMessage}
                        objectives={scenarioData.objectives}
                        userLevel="B2" // Interview is always B2+
                        onSendMessage={async (history, message) => {
                            const simpleHistory = history.map(h => ({ role: h.role, content: h.content }));
                            return await evaluateRoleplay({
                                history: simpleHistory,
                                userLevel: 'B2',
                                objectives: scenarioData.objectives,
                                scenarioContext: "Job Interview: " + scenarioData.scenario
                            });
                        }}
                        onComplete={() => setScenarioData(null)}
                    />
                </div>
            )}
        </div>
    );
}
