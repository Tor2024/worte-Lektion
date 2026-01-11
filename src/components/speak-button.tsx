'use client';

import { useSpeech } from '@/hooks/use-speech';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cleanTextForSpeech } from '@/lib/german-utils';

interface SpeakButtonProps {
    text: string;
    lang?: string;
    className?: string;
    size?: 'sm' | 'default' | 'lg' | 'icon';
    variant?: 'ghost' | 'outline' | 'secondary' | 'default';
    showText?: boolean;
}

export function SpeakButton({
    text,
    lang = 'de-DE',
    className,
    size = 'icon',
    variant = 'ghost',
    showText = false
}: SpeakButtonProps) {
    const { speak, stop, isSpeaking } = useSpeech();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (isSpeaking) {
            stop();
        } else {
            // Clean markdown bold/italic characters before speaking
            const cleanedText = cleanTextForSpeech(text);
            speak(cleanedText, lang);
        }
    };

    const handlePointerDown = (e: React.PointerEvent) => {
        e.stopPropagation();
    };

    return (
        <Button
            variant={variant}
            size={size}
            className={cn(
                "rounded-full transition-all duration-300",
                isSpeaking && "text-primary bg-primary/10 animate-pulse",
                className
            )}
            onClick={handleClick}
            onPointerDown={handlePointerDown}
            title={isSpeaking ? "Остановить" : "Озвучить"}
            type="button"
        >
            {isSpeaking ? (
                <VolumeX className="h-4 w-4" />
            ) : (
                <Volume2 className="h-4 w-4" />
            )}
            {showText && <span className="ml-2">{isSpeaking ? 'Стоп' : 'Слушать'}</span>}
        </Button>
    );
}
