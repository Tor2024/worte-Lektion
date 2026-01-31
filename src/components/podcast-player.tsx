'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Play, Pause, SkipBack, SkipForward, Headphones } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cleanTextForSpeech } from '@/lib/german-utils';
import { useSpeech } from '@/hooks/use-speech';

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
    const { speak, stop, isSpeaking } = useSpeech();
    const wasSpeakingRef = useRef(false);

    const playLine = (index: number) => {
        if (index >= data.script.length) {
            setIsPlaying(false);
            return;
        }

        const line = data.script[index];
        const gender = line.speaker === 'Host' ? 'male' : 'female';

        speak(cleanTextForSpeech(line.text), 'de-DE', gender);
    };

    useEffect(() => {
        if (isSpeaking) {
            wasSpeakingRef.current = true;
        }

        if (isPlaying && !isSpeaking && wasSpeakingRef.current) {
            wasSpeakingRef.current = false;

            if (currentLineIndex < data.script.length - 1) {
                const timer = setTimeout(() => {
                    const nextIndex = currentLineIndex + 1;
                    setCurrentLineIndex(nextIndex);
                    playLine(nextIndex);
                }, 600);
                return () => clearTimeout(timer);
            } else {
                setIsPlaying(false);
            }
        }
    }, [isSpeaking, isPlaying, currentLineIndex]);

    const togglePlay = () => {
        if (isPlaying) {
            stop();
            setIsPlaying(false);
            wasSpeakingRef.current = false;
        } else {
            setIsPlaying(true);
            playLine(currentLineIndex);
        }
    };

    const skip = (direction: 'forward' | 'back') => {
        wasSpeakingRef.current = false;
        stop();

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
                            wasSpeakingRef.current = false;
                            stop();
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
