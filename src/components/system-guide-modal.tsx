
'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { BookOpen, Map, Headphones, RefreshCw, Mic, Sparkles } from "lucide-react";

export function SystemGuideModal() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="gap-2 border-primary/20 hover:bg-primary/5">
                    <Map className="h-4 w-4 text-primary" />
                    <span className="hidden sm:inline">System Guide</span>
                    <span className="sm:hidden">Guide</span>
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold font-headline flex items-center gap-2">
                        <Map className="h-6 w-6 text-primary" />
                        Deep Dive System: Как учить эффективно?
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <p className="text-muted-foreground text-lg">
                        Не зубрите слова! Используйте инструменты в правильном порядке, чтобы создать "глубокое понимание" (B2/C1).
                    </p>

                    <div className="grid gap-6 md:grid-cols-2">
                        {/* STEP 1 */}
                        <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-xl border border-blue-100 dark:border-blue-900">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                <h3 className="font-bold text-blue-700 dark:text-blue-300">Контекст (Context)</h3>
                            </div>
                            <div className="flex items-start gap-3">
                                <Headphones className="h-8 w-8 text-blue-500 mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium text-sm">Инструмент: AI Podcast / Story</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Слушайте слова <b>до</b> того, как учить перевод. Мозг должен "угадать" их смысл.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* STEP 2 */}
                        <div className="bg-indigo-50 dark:bg-indigo-950/20 p-4 rounded-xl border border-indigo-100 dark:border-indigo-900">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-indigo-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                <h3 className="font-bold text-indigo-700 dark:text-indigo-300">Связи (Connections)</h3>
                            </div>
                            <div className="flex items-start gap-3">
                                <RefreshCw className="h-8 w-8 text-indigo-500 mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium text-sm">Инструмент: Collocations</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Учите не слово, а пару. Не "решение", а "принимать решение".
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* STEP 3 */}
                        <div className="bg-orange-50 dark:bg-orange-950/20 p-4 rounded-xl border border-orange-100 dark:border-orange-900">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-orange-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                <h3 className="font-bold text-orange-700 dark:text-orange-300">Стиль (Nuance)</h3>
                            </div>
                            <div className="flex items-start gap-3">
                                <Sparkles className="h-8 w-8 text-orange-500 mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium text-sm">Инструмент: Synonym Swap</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Поймите, почему это слово лучше простого синонима. Это уровень B2.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* STEP 4 */}
                        <div className="bg-purple-50 dark:bg-purple-950/20 p-4 rounded-xl border border-purple-100 dark:border-purple-900">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="bg-purple-600 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                <h3 className="font-bold text-purple-700 dark:text-purple-300">Актив (Action)</h3>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mic className="h-8 w-8 text-purple-500 mt-1 shrink-0" />
                                <div>
                                    <p className="font-medium text-sm">Инструмент: Interview / Roleplay</p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        Используйте слово в стрессовой беседе с HR. Только так оно станет вашим.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-muted p-4 rounded-lg text-sm text-muted-foreground italic">
                        Совет: Используйте карточки (Smart Session) только в самом конце, чтобы "отполировать" память.
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
