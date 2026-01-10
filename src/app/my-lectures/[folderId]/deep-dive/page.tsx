
'use client';

import { use, useState, useEffect } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, ArrowRight, CheckCircle2, Headphones, RefreshCw, Sparkles, Mic, Play } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { generatePodcastScript } from '@/ai/flows/generate-podcast-script';
import { generateCollocations } from '@/ai/flows/generate-collocations';
import { generateSynonymSwap } from '@/ai/flows/generate-synonym-swap';
import { startInterview } from '@/ai/flows/start-interview';
import { PodcastPlayer } from '@/components/podcast-player';
import { CollocationGame } from '@/components/collocation-game';
import { SynonymGame } from '@/components/synonym-game';
import { RoleplayInterface } from '@/components/roleplay-interface';
import { evaluateRoleplay } from '@/ai/flows/evaluate-roleplay';

type Stage = 'intro' | 'podcast' | 'collocation' | 'synonym' | 'interview' | 'done';

export default function DeepDivePage({ params }: { params: Promise<{ folderId: string }> }) {
    const { folderId } = use(params);
    const { getFolder, updateWord } = useCustomFolders();
    const folder = getFolder(folderId);

    const [stage, setStage] = useState<Stage>('intro');
    const [words, setWords] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    // Data for stages
    const [podcastData, setPodcastData] = useState<any>(null);
    const [collocationData, setCollocationData] = useState<any>(null);
    const [synonymData, setSynonymData] = useState<any>(null);
    const [interviewData, setInterviewData] = useState<any>(null);

    // Initialize: pick 5 words
    useEffect(() => {
        if (folder && words.length === 0) {
            // Pick 5 random words, preferring ones with deepDiveStage < 4 if possible
            // For MVP, just random 5
            const shuffled = [...folder.words].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 5).map(w => w.word.german);
            setWords(selected);
        }
    }, [folder]);

    const startDeepDive = async () => {
        setLoading(true);
        try {
            // Pre-fetch Podcast
            const pData = await generatePodcastScript({ topic: folder!.name, words });
            setPodcastData(pData);
            setStage('podcast');
        } catch (e) {
            alert("Error starting deep dive");
        } finally {
            setLoading(false);
        }
    };

    const nextStage = async (next: Stage) => {
        setLoading(true);
        try {
            if (next === 'collocation') {
                const cData = await generateCollocations({ words });
                setCollocationData(cData);
            }
            if (next === 'synonym') {
                const sData = await generateSynonymSwap({ words });
                setSynonymData(sData);
            }
            if (next === 'interview') {
                const iData = await startInterview({
                    folderName: folder!.name,
                    vocabulary: words
                });
                setInterviewData(iData);
            }
            if (next === 'done') {
                // Save progress!
                folder?.words.forEach(w => {
                    if (words.includes(w.word.german)) {
                        updateWord(folder.id, w.id, { ...w, deepDiveStage: 4 });
                    }
                });
            }
            setStage(next);
        } catch (e) {
            console.error(e);
            alert("Error loading next stage");
        } finally {
            setLoading(false);
        }
    };

    if (!folder) return <div>Folder not found</div>;

    const progress = {
        'intro': 0, 'podcast': 25, 'collocation': 50, 'synonym': 75, 'interview': 90, 'done': 100
    }[stage];

    return (
        <div className="container mx-auto py-8 max-w-4xl px-4 min-h-screen">
            {/* HEADER */}
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold font-headline">Мастер Глубокого Погружения</h1>
                    <p className="text-sm text-muted-foreground">Слова: {words.join(', ')}</p>
                </div>
                <div className="w-1/3">
                    <Progress value={progress} className="h-2" />
                </div>
            </div>

            {loading && (
                <div className="flex flex-col items-center justify-center py-20 animate-pulse">
                    <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                    <p>Подготовка уровня {stage === 'intro' ? '1' : stage === 'podcast' ? '2' : stage === 'collocation' ? '3' : '4'}...</p>
                </div>
            )}

            {!loading && (
                <>
                    {/* INTRO */}
                    {stage === 'intro' && (
                        <Card className="text-center py-12">
                            <CardContent className="flex flex-col items-center">
                                <div className="bg-primary/10 p-6 rounded-full mb-6 relative">
                                    <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full"></div>
                                    <Play className="h-16 w-16 text-primary relative z-10 ml-1" />
                                </div>
                                <h2 className="text-3xl font-bold mb-4">Начать Глубокое Обучение</h2>
                                <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                                    Мы выбрали 5 слов. Вы освоите их через 4 этапа: Контекст, Связи, Нюансы и Практика.
                                </p>
                                <Button size="lg" onClick={startDeepDive} className="text-lg px-8 py-6 rounded-full shadow-lg hover:scale-105 transition-transform">
                                    Начать
                                </Button>
                            </CardContent>
                        </Card>
                    )}

                    {/* STAGE 1: PODCAST */}
                    {stage === 'podcast' && podcastData && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-500">
                            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center gap-4 border border-blue-100">
                                <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">1</div>
                                <h3 className="font-bold text-lg">Контекст: Послушайте и догадайтесь о значении.</h3>
                            </div>
                            <PodcastPlayer data={podcastData} />
                            <div className="flex justify-end pt-4">
                                <Button onClick={() => nextStage('collocation')} size="lg" className="gap-2">
                                    Далее: Связи <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 2: COLLOCATION */}
                    {stage === 'collocation' && collocationData && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-500">
                            <div className="bg-indigo-50 dark:bg-indigo-900/20 p-4 rounded-lg flex items-center gap-4 border border-indigo-100">
                                <div className="bg-indigo-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">2</div>
                                <h3 className="font-bold text-lg">Связи: Найдите пары (Коллокации)</h3>
                            </div>
                            <CollocationGame items={collocationData.items} onComplete={() => { }} /> {/* Auto-advance optional, keeping manual for control */}
                            <div className="flex justify-end pt-8">
                                <Button onClick={() => nextStage('synonym')} size="lg" className="gap-2">
                                    Далее: Нюансы <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 3: SYNONYM */}
                    {stage === 'synonym' && synonymData && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-500">
                            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg flex items-center gap-4 border border-orange-100">
                                <div className="bg-orange-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">3</div>
                                <h3 className="font-bold text-lg">Нюансы: Прокачайте стиль (B2)</h3>
                            </div>
                            <SynonymGame items={synonymData.items} />
                            <div className="flex justify-end pt-8">
                                <Button onClick={() => nextStage('interview')} size="lg" className="gap-2">
                                    Далее: Активация <ArrowRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* STAGE 4: INTERVIEW */}
                    {stage === 'interview' && interviewData && (
                        <div className="space-y-6 animate-in slide-in-from-right duration-500">
                            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-center gap-4 border border-purple-100">
                                <div className="bg-purple-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold">4</div>
                                <h3 className="font-bold text-lg">Активация: Пройдите собеседование.</h3>
                            </div>
                            <RoleplayInterface
                                scenario={interviewData.scenario}
                                initialMessage={interviewData.initialMessage}
                                aiRole={interviewData.aiRole}
                                userRole={interviewData.userRole}
                                objectives={interviewData.objectives}
                                userLevel="B2"
                                onSendMessage={async (history, message) => {
                                    const simpleHistory = history.map(h => ({ role: h.role, content: h.content }));
                                    return await evaluateRoleplay({
                                        history: simpleHistory,
                                        userLevel: 'B2',
                                        objectives: interviewData.objectives,
                                        scenarioContext: "Job Interview: " + interviewData.scenario
                                    });
                                }}
                                onComplete={() => { }}
                            />
                            <div className="flex justify-end pt-8">
                                <Button onClick={() => nextStage('done')} size="lg" className="gap-2" variant="default">
                                    Завершить Погружение <CheckCircle2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    )}

                    {/* DONE */}
                    {stage === 'done' && (
                        <Card className="text-center py-12 animate-in zoom-in duration-500">
                            <CardContent className="flex flex-col items-center">
                                <div className="bg-green-100 p-6 rounded-full mb-6">
                                    <CheckCircle2 className="h-20 w-20 text-green-600" />
                                </div>
                                <h2 className="text-4xl font-bold mb-4 text-green-700">Миссия выполнена!</h2>
                                <p className="text-xl text-muted-foreground mb-8">
                                    Вы глубоко проработали эти 5 слов. Теперь они часть вашего активного словаря.
                                </p>
                                <Button size="lg" onClick={() => window.location.reload()} variant="outline">
                                    Новая партия слов
                                </Button>
                            </CardContent>
                        </Card>
                    )}
                </>
            )}
        </div>
    );
}
