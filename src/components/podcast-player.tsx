
'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PodcastScript {
    title: string;
    script: {
        speaker: 'Host' | 'Expert';
        text: string;
        translation: string;
    }[];
}

interface PodcastPlayerProps {
    data: PodcastScript;
}

export function PodcastPlayer({ data }: PodcastPlayerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentLineIndex, setCurrentLineIndex] = useState(0);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

    const synth = useRef<SpeechSynthesis | null>(null);
    const uttr = useRef<SpeechSynthesisUtterance | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            synth.current = window.speechSynthesis;
            const loadVoices = () => {
                const vs = window.speechSynthesis.getVoices();
                setVoices(vs.filter(v => v.lang.startsWith('de')));
            };
            window.speechSynthesis.onvoiceschanged = loadVoices;
            loadVoices();
        }
        return () => {
            if (synth.current) synth.current.cancel();
        };
    }, []);

    const playLine = (index: number) => {
        if (!synth.current || index >= data.script.length) {
            setIsPlaying(false);
            return;
        }

        const line = data.script[index];
        const utterance = new SpeechSynthesisUtterance(line.text);
        utterance.lang = 'de-DE';

        // Try to assign different voices
        if (voices.length > 0) {
            // Valid German voices
            // Improved Voice Selection
            // Host = Max (Male)
            // Expert = Anna (Female)

            const maleKeywords = ['Male', 'Markus', 'Stefan', 'Paul'];
            const femaleKeywords = ['Female', 'Anna', 'Katja', 'Hedda', 'Steffi'];

            const maleVoice = voices.find(v => maleKeywords.some(k => v.name.includes(k))) || voices.find(v => !v.name.includes('Google Deutsch')) || voices[1] || voices[0];
            const femaleVoice = voices.find(v => femaleKeywords.some(k => v.name.includes(k))) || voices.find(v => v.name.includes('Google Deutsch')) || voices[0];

            // If we ended up with the same voice, force a swap if possible
            const finalMale = maleVoice;
            const finalFemale = (femaleVoice === maleVoice && voices.length > 1) ? voices.find(v => v !== maleVoice) : femaleVoice;

            utterance.voice = line.speaker === 'Host' ? finalMale : finalFemale;
        }

        utterance.onend = () => {
            if (index < data.script.length - 1) {
                setCurrentLineIndex(index + 1);
                playLine(index + 1);
            } else {
                setIsPlaying(false);
            }
        };

        uttr.current = utterance;
        synth.current.speak(utterance);
    };

    const togglePlay = () => {
        if (!synth.current) return;

        if (isPlaying) {
            synth.current.cancel();
            setIsPlaying(false);
        } else {
            setIsPlaying(true);
            playLine(currentLineIndex);
        }
    };

    const skip = (direction: 'forward' | 'back') => {
        if (!synth.current) return;
        synth.current.cancel();

        let newIndex = direction === 'forward' ? currentLineIndex + 1 : currentLineIndex - 1;
        if (newIndex < 0) newIndex = 0;
        if (newIndex >= data.script.length) newIndex = 0;

        setCurrentLineIndex(newIndex);
        if (isPlaying) {
            playLine(newIndex);
        }
    };

    return (
        <div className="space-y-6">
            {/* PLAYER CONTROLS */}
            <Card className="bg-primary/5 border-primary/20 sticky top-4 z-10 shadow-lg backdrop-blur-sm bg-white/80 dark:bg-black/80">
                <CardContent className="p-4 flex flex-col items-center">
                    <div className="flex items-center gap-2 mb-2">
                        <Headphones className="h-4 w-4 text-primary" />
                        <span className="font-bold text-sm tracking-widest text-primary uppercase">Сейчас играет</span>
                    </div>
                    <h3 className="text-xl font-headline font-bold mb-6 text-center">{data.title}</h3>

                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" onClick={() => skip('back')}>
                            <SkipBack className="h-6 w-6" />
                        </Button>
                        <Button size="icon" className="h-16 w-16 rounded-full shadow-xl" onClick={togglePlay}>
                            {isPlaying ? <Pause className="h-8 w-8 fill-current" /> : <Play className="h-8 w-8 fill-current ml-1" />}
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => skip('forward')}>
                            <SkipForward className="h-6 w-6" />
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* SCRIPT DISPLAY */}
            <div className="space-y-4 max-w-2xl mx-auto pb-20">
                {data.script.map((line, idx) => (
                    <div
                        key={idx}
                        onClick={() => {
                            if (synth.current) synth.current.cancel();
                            setCurrentLineIndex(idx);
                            setIsPlaying(true);
                            playLine(idx);
                        }}
                        className={cn(
                            "p-4 rounded-xl transition-all cursor-pointer border-2 hover:border-primary/30",
                            currentLineIndex === idx
                                ? "bg-primary text-primary-foreground border-primary scale-105 shadow-lg"
                                : "bg-card border-transparent hover:bg-muted"
                        )}
                    >
                        <div className="flex justify-between items-center mb-1 opacity-80 text-xs uppercase font-bold tracking-wider">
                            <span>{line.speaker === 'Host' ? '🎙️ Max' : '👩‍🏫 Anna'}</span>
                        </div>
                        <p className="text-lg font-medium leading-relaxed mb-2">
                            {line.text}
                        </p>
                        <p className={cn(
                            "text-sm",
                            currentLineIndex === idx ? "text-primary-foreground/80" : "text-muted-foreground"
                        )}>
                            {line.translation}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
