
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeft, Play, Pause, Square, Volume2, Headphones } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

const EXAM_TEXT = `Heute wird Arbeit in der Ukraine hauptsächlich über Online-Plattformen gesucht. Besonders wichtig sind dabei spezialisierte Webseiten und berufliche soziale Netzwerk. Außerdem spielen persönliche Kontakte eine große Rolle, da Empfehlungen oft die Chancen auf eine Anstellung erhöhen. In großen Städten ist der Arbeitsmarkt besser entwickelt, deshalb gibt es dort mehr Möglichkeiten.
Der erste Kontakt mit dem Arbeitgeber erfolgt per E-Mail oder Telefon. 
Zu den wichtigsten Bewerbungsunterlagen gehören ein Lebenslauf und professionelle Zertifikate. 
Das Bewerbungsgespräch kann entweder persönlich oder online stattfinden. Dabei werden die berufliche Erfahrung, die Qualifikationen und die sozialen Kompetenzen des Bewerbers geprüft. In manchen Fällen muss auch eine praktische Aufgabe erledigt werden. Am Ende werden die Bewerber über die nächsten Schritte informiert.`;

export default function JobSearchTextPage() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState<number | null>(null);
    const synthesisRef = useRef<SpeechSynthesis | null>(null);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

    // Split text into sentences for granular highlighting
    const sentences = EXAM_TEXT.split(/[.!?]+\s/).filter(s => s.trim().length > 0).map((s, i, arr) => {
        return i < arr.length - 1 ? s + '.' : s;
    });

    useEffect(() => {
        synthesisRef.current = window.speechSynthesis;
        return () => {
            if (synthesisRef.current) synthesisRef.current.cancel();
        };
    }, []);

    const playText = () => {
        if (!synthesisRef.current) return;

        synthesisRef.current.cancel();
        setIsPlaying(true);

        // Create one continuous utterance but track boundaries if possible
        // Alternatively, play sentence by sentence for better UI sync
        playSentence(0);
    };

    const playSentence = (index: number) => {
        if (index >= sentences.length) {
            setIsPlaying(false);
            setCurrentSentenceIndex(null);
            return;
        }

        setCurrentSentenceIndex(index);
        const utterance = new SpeechSynthesisUtterance(sentences[index]);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9; // Slightly slower for learning

        utterance.onend = () => {
            if (isPlaying) {
                playSentence(index + 1);
            }
        };

        utteranceRef.current = utterance;
        synthesisRef.current?.speak(utterance);
    };

    const stopText = () => {
        synthesisRef.current?.cancel();
        setIsPlaying(false);
        setCurrentSentenceIndex(null);
    };

    const togglePause = () => {
        if (synthesisRef.current?.paused) {
            synthesisRef.current.resume();
            setIsPlaying(true);
        } else {
            synthesisRef.current?.pause();
            setIsPlaying(false);
        }
    }

    return (
        <div className="container mx-auto py-8 px-4 max-w-4xl">
            <div className="mb-8">
                <Button asChild variant="ghost" size="sm" className="mb-4">
                    <Link href="/exam-texts">
                        <ArrowLeft className="mr-2 h-4 w-4" /> Назад к списку
                    </Link>
                </Button>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-blue-500/10 rounded-xl">
                        <Headphones className="h-8 w-8 text-blue-500" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-black font-headline">Поиск работы (B2)</h1>
                        <p className="text-muted-foreground">Текст для аудирования и заучивания (Thema: Arbeitssuche)</p>
                    </div>
                </div>
            </div>

            <Card className="border-2 shadow-2xl relative overflow-hidden">
                {/* Progress Bar */}
                <div className="absolute top-0 left-0 h-1 bg-blue-500 transition-all duration-300"
                    style={{ width: currentSentenceIndex !== null ? `${((currentSentenceIndex + 1) / sentences.length) * 100}%` : '0%' }}
                />

                <CardContent className="p-8 md:p-12">
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        {sentences.map((sentence, idx) => (
                            <motion.span
                                key={idx}
                                animate={{
                                    backgroundColor: currentSentenceIndex === idx ? 'rgba(59, 130, 246, 0.15)' : 'transparent',
                                    color: currentSentenceIndex === idx ? 'var(--primary)' : 'inherit',
                                    scale: currentSentenceIndex === idx ? 1.02 : 1
                                }}
                                className={cn(
                                    "inline-block rounded px-1 transition-all duration-300 cursor-pointer",
                                    currentSentenceIndex === idx && "font-bold shadow-sm"
                                )}
                                onClick={() => {
                                    synthesisRef.current?.cancel();
                                    setIsPlaying(true);
                                    playSentence(idx);
                                }}
                            >
                                {sentence}{' '}
                            </motion.span>
                        ))}
                    </div>
                </CardContent>
            </Card>

            <div className="mt-8 flex justify-center gap-4">
                {!isPlaying ? (
                    <Button size="lg" className="h-16 px-8 rounded-full shadow-xl bg-blue-600 hover:bg-blue-700" onClick={playText}>
                        <Play className="mr-3 h-6 w-6 fill-current" /> Слушать всё
                    </Button>
                ) : (
                    <>
                        <Button size="lg" variant="outline" className="h-16 w-16 rounded-full shadow-lg border-2" onClick={togglePause}>
                            {synthesisRef.current?.paused ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
                        </Button>
                        <Button size="lg" variant="destructive" className="h-16 w-16 rounded-full shadow-lg" onClick={stopText}>
                            <Square className="h-6 w-6" />
                        </Button>
                    </>
                )}
            </div>

            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-muted/50 p-6 rounded-2xl border">
                    <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
                        <Volume2 className="h-5 w-5 text-primary" />
                        Советы по заучиванию
                    </h3>
                    <ul className="text-sm space-y-2 text-muted-foreground list-disc pl-4">
                        <li>Слушайте текст несколько раз с закрытыми глазами.</li>
                        <li>Повторяйте вслух за диктором, соблюдая интонацию.</li>
                        <li>Используйте метод "тени" (Shadowing): говорите одновременно с аудио.</li>
                        <li>Нажимайте на конкретные предложения, чтобы отработать их отдельно.</li>
                    </ul>
                </div>

                <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10">
                    <h3 className="text-lg font-bold mb-3">Сводка (B2 Vokabeln)</h3>
                    <div className="flex flex-wrap gap-2">
                        {['Online-Plattformen', 'berufliche Netzwerke', 'Anstellung erhöhen', 'Arbeitsmarkt', 'Bewerbungsunterlagen', 'Lebenslauf', 'soziale Kompetenzen'].map(v => (
                            <span key={v} className="bg-background px-2 py-1 rounded text-xs border font-medium">{v}</span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
