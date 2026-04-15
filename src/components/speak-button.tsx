import { useSpeech, VoiceGender } from '@/hooks/use-speech';
import { Button } from '@/components/ui/button';
import { Volume2, VolumeX, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { cleanTextForSpeech } from '@/lib/german-utils';
import { useRef } from 'react';

interface SpeakButtonProps {
    text: string;
    lang?: string;
    secondaryText?: string;
    secondaryLang?: string;
    gender?: VoiceGender;
    className?: string;
    size?: 'sm' | 'default' | 'lg' | 'icon';
    variant?: 'ghost' | 'outline' | 'secondary' | 'default';
    showText?: boolean;
}

export function SpeakButton({
    text,
    lang = 'de-DE',
    secondaryText,
    secondaryLang = 'ru-RU',
    gender,
    className,
    size = 'icon',
    variant = 'ghost',
    showText = false
}: SpeakButtonProps) {
    const { speak, speakSequence, stop, isSpeaking } = useSpeech();
    const sequenceIdRef = useRef<number>(0);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        // If currently speaking, stop it
        if (isSpeaking) {
            sequenceIdRef.current++;
            stop();
            return;
        }

        // Use a local sequence ID to handle concurrent click attempts
        const currentId = ++sequenceIdRef.current;
        const cleanedText = cleanTextForSpeech(text);
        if (!cleanedText) return;

        try {
            if (secondaryText) {
                // For sequences (e.g. German then Russian), use a simplified await pattern
                await speak(cleanedText, lang, gender);
                
                // Only proceed if no other click has happened in the meantime
                if (currentId === sequenceIdRef.current) {
                    await new Promise(r => setTimeout(r, 400));
                    if (currentId === sequenceIdRef.current) {
                        const cleanedSecondary = cleanTextForSpeech(secondaryText);
                        if (cleanedSecondary) {
                            await speak(cleanedSecondary, secondaryLang, gender);
                        }
                    }
                }
            } else {
                // Simple single text speak
                await speak(cleanedText, lang, gender);
            }
        } catch (error) {
            console.error("SpeakButton error:", error);
            stop(); // Reset everything on error
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
