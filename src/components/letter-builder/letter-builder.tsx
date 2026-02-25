"use client";

import { useState } from 'react';
import { LETTER_MODULES, LetterModule, LetterType, LetterSection } from '@/lib/letter-data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, ChevronRight, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const SECTIONS: { id: LetterSection; label: string }[] = [
    { id: 'salutation', label: '1. Приветствие' },
    { id: 'intro', label: '2. Вступление' },
    { id: 'body', label: '3. Основная часть' },
    { id: 'closing', label: '4. Заключение' },
    { id: 'farewell', label: '5. Прощание' },
];

const SCENARIOS: { id: LetterType; label: string; icon: string }[] = [
    { id: 'complaint', label: 'Жалоба (Beschwerde)', icon: '😡' },
    { id: 'inquiry', label: 'Запрос (Anfrage)', icon: '❓' },
    { id: 'apology', label: 'Извинение (Entschuldigung)', icon: '😔' },
    { id: 'opinion', label: 'Мнение (Meinung)', icon: '💭' },
];

export function LetterBuilder() {
    const [scenario, setScenario] = useState<LetterType | null>(null);
    const [selectedModules, setSelectedModules] = useState<Record<LetterSection, LetterModule | null>>({
        salutation: null,
        intro: null,
        body: null,
        closing: null,
        farewell: null
    });

    // Custom text for placeholders or manual edits
    const [customText, setCustomText] = useState<{ [key: string]: string }>({});

    const handleSelectModule = (section: LetterSection, module: LetterModule) => {
        setSelectedModules(prev => ({
            ...prev,
            [section]: module
        }));

        // Reset custom text for this section if switching modules
        // In a more complex app, we might want to preserve it or map it
    };

    const handleReset = () => {
        setScenario(null);
        setSelectedModules({
            salutation: null,
            intro: null,
            body: null,
            closing: null,
            farewell: null
        });
        setCustomText({});
    };

    const generateFullText = () => {
        return SECTIONS.map(section => {
            const module = selectedModules[section.id];
            if (!module) return '';

            let text = module.german;
            // Simple placeholder replacement logic if needed, 
            // though for now we rely on the user editing the final textarea
            return text;
        }).filter(Boolean).join('\n\n');
    };

    const copyToClipboard = () => {
        const text = generateFullText();
        navigator.clipboard.writeText(text);
        // Toast notification would go here
    };

    if (!scenario) {
        return (
            <div className="max-w-4xl mx-auto p-6">
                <h1 className="text-3xl font-bold text-center mb-8">Brief-Baukasten (Конструктор Писем)</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {SCENARIOS.map((s) => (
                        <Card
                            key={s.id}
                            className="cursor-pointer hover:border-primary hover:bg-primary/5 transition-all group"
                            onClick={() => setScenario(s.id)}
                        >
                            <CardHeader>
                                <CardTitle className="flex items-center gap-4 text-2xl">
                                    <span>{s.icon}</span>
                                    {s.label}
                                </CardTitle>
                                <CardDescription className="group-hover:text-primary transition-colors">
                                    Нажмите, чтобы начать
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        );
    }

    const currentText = generateFullText();

    return (
        <div className="max-w-6xl mx-auto p-4 h-[calc(100vh-100px)] flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                    <span className="text-3xl">{SCENARIOS.find(s => s.id === scenario)?.icon}</span>
                    {SCENARIOS.find(s => s.id === scenario)?.label}
                </h2>
                <Button variant="outline" onClick={handleReset}>
                    <RefreshCw className="w-4 h-4 mr-2" /> Сбросить
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* LEFT: Builder Interface */}
                <Card className="flex flex-col min-h-0 border-2">
                    <CardHeader className="py-4 border-b bg-muted/30">
                        <CardTitle className="text-lg">Конструктор</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1 p-0 min-h-0">
                        <Tabs defaultValue="salutation" className="h-full flex flex-col">
                            <ScrollArea className="flex-none border-b">
                                <TabsList className="w-full justify-start p-0 h-auto bg-transparent">
                                    {SECTIONS.map((section, idx) => (
                                        <TabsTrigger
                                            key={section.id}
                                            value={section.id}
                                            className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-3"
                                        >
                                            <div className="flex flex-col items-start gap-1 text-left">
                                                <span className={cn(
                                                    "text-xs font-bold uppercase",
                                                    selectedModules[section.id] ? "text-green-600" : "text-muted-foreground"
                                                )}>
                                                    Шак {idx + 1}
                                                    {selectedModules[section.id] && <Check className="inline w-3 h-3 ml-1" />}
                                                </span>
                                                <span className="font-medium">{section.label.split('. ')[1]}</span>
                                            </div>
                                        </TabsTrigger>
                                    ))}
                                </TabsList>
                            </ScrollArea>

                            {SECTIONS.map(section => (
                                <TabsContent key={section.id} value={section.id} className="flex-1 p-4 m-0 overflow-y-auto">
                                    <div className="space-y-3">
                                        <p className="text-sm text-muted-foreground mb-4">
                                            Выберите подходящий вариант для вашего письма:
                                        </p>
                                        {LETTER_MODULES
                                            .filter(m => m.section === section.id && (m.types.includes(scenario) || m.types.includes('general')))
                                            .map(module => (
                                                <div
                                                    key={module.id}
                                                    className={cn(
                                                        "p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-muted",
                                                        selectedModules[section.id]?.id === module.id
                                                            ? "border-primary bg-primary/5 shadow-md"
                                                            : "border-border"
                                                    )}
                                                    onClick={() => handleSelectModule(section.id, module)}
                                                >
                                                    <div className="flex justify-between items-start mb-2">
                                                        <div className="flex gap-2">
                                                            <Badge variant="outline">{module.label}</Badge>
                                                            {module.isUniversal && (
                                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                                                                    ⭐ Экзамен
                                                                </Badge>
                                                            )}
                                                        </div>
                                                        {selectedModules[section.id]?.id === module.id && (
                                                            <Check className="w-5 h-5 text-primary" />
                                                        )}
                                                    </div>
                                                    <p className="font-medium text-lg leading-relaxed mb-2">
                                                        {module.german}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground italic">
                                                        {module.russian}
                                                    </p>
                                                    {module.isPlaceholder && (
                                                        <div className="mt-2 text-xs text-amber-600 flex items-center gap-1">
                                                            ⚠️ Требует заполнения данных
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                </TabsContent>
                            ))}
                        </Tabs>
                    </CardContent>
                </Card>

                {/* RIGHT: Live Preview */}
                <Card className="flex flex-col min-h-0 border-2 shadow-xl bg-orange-50/50 dark:bg-slate-900/50">
                    <CardHeader className="py-4 border-b flex flex-row justify-between items-center bg-white/50 dark:bg-slate-900/50 backdrop-blur">
                        <CardTitle className="text-lg">Предпросмотр</CardTitle>
                        <Button size="sm" onClick={copyToClipboard} disabled={!currentText}>
                            <Copy className="w-4 h-4 mr-2" /> Копировать
                        </Button>
                    </CardHeader>
                    <CardContent className="flex-1 p-6 overflow-y-auto">
                        <div className="bg-white dark:bg-slate-950 p-8 rounded-lg shadow-sm border min-h-full font-serif text-lg leading-relaxed whitespace-pre-wrap">
                            {SECTIONS.map((section, idx) => {
                                const module = selectedModules[section.id];
                                if (!module) return (
                                    <div key={section.id} className="mb-6 last:mb-0 p-4 border-2 border-dashed border-muted-foreground/20 rounded-lg flex items-center justify-center text-muted-foreground text-sm">
                                        {section.label} не выбран
                                    </div>
                                );

                                return (
                                    <div key={section.id} className="mb-6 last:mb-0 group relative">
                                        <span dangerouslySetInnerHTML={{
                                            // Highlight placeholders like [Name] or [Datum]
                                            __html: module.german.replace(/\[(.*?)\]/g, '<span class="bg-yellow-200 dark:bg-yellow-900/50 px-1 rounded text-yellow-800 dark:text-yellow-200 font-bold cursor-text">[$1]</span>')
                                        }} />

                                        {/* Quick Edit Hint */}
                                        <div className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                            {/* Could add actionable edit buttons here later */}
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Empty State Hint */}
                            {!currentText && (
                                <div className="text-center text-muted-foreground mt-20">
                                    <p>Здесь появится текст вашего письма.</p>
                                    <p className="text-sm">Начните с выбора приветствия слева.</p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
