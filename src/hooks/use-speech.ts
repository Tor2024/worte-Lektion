'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { cleanTextForSpeech } from '@/lib/german-utils';

export type VoiceGender = 'male' | 'female';

export function useSpeech() {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const voicesRef = useRef<SpeechSynthesisVoice[]>([]);

    useEffect(() => {
        const updateVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                voicesRef.current = availableVoices;
                setIsLoaded(true);
            }
        };

        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.onvoiceschanged = updateVoices;
            updateVoices();
        }

        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.onvoiceschanged = null;
            }
        };
    }, []);

    // Keep a reference to the active utterance to prevent garbage collection
    const activeUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const sequenceIdRef = useRef<number>(0);

    const stop = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            // Aggressive reset: resume before cancel to un-jam the engine
            window.speechSynthesis.resume();
            window.speechSynthesis.cancel();
            sequenceIdRef.current++; // Cancel any running sequence loop
            setIsSpeaking(false);
            activeUtteranceRef.current = null;
        }
    }, []);

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            if (typeof window !== 'undefined' && window.speechSynthesis) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const speak = useCallback(async (text: string, lang: string = 'de-DE', gender?: VoiceGender, cancelFirst = true) => {
        if (typeof window === 'undefined' || !window.speechSynthesis) {
            return;
        }

        const cleanedText = cleanTextForSpeech(text);
        if (!cleanedText) return;

        // CHUNKING LOGIC: If text is long, split by sentences and speak them sequentially
        // This prevents the 'synthesis-failed' limit in Chrome/Windows
        if (cleanedText.length > 200) {
            const chunks = cleanedText.match(/[^.!?]+[.!?]*/g) || [cleanedText];
            if (chunks.length > 1) {
                if (cancelFirst) stop();
                for (const chunk of chunks) {
                    await speak(chunk.trim(), lang, gender, false);
                    await new Promise(r => setTimeout(r, 100)); // Gap between chunks
                }
                return;
            }
        }

        return new Promise<void>((resolve) => {
            if (cancelFirst) {
                // Aggressive reset: resume before cancel to un-jam the engine if it was paused
                window.speechSynthesis.resume();
                window.speechSynthesis.cancel();
            }

            const utterance = new SpeechSynthesisUtterance(cleanedText);
            activeUtteranceRef.current = utterance;

            utterance.lang = lang;
            utterance.rate = 0.9;
            utterance.pitch = 1.0;
            utterance.volume = 1.0;

            const currentVoices = voicesRef.current;
            const langVoices = currentVoices.filter(v => v.lang.startsWith(lang.split('-')[0]));
            let targetVoice: SpeechSynthesisVoice | undefined;

            if (langVoices.length > 0) {
                if (gender) {
                    const maleKeywords = ['male', 'markus', 'stefan', 'paul', 'klaus', 'david', 'conrad', 'microsoft stefan'];
                    const femaleKeywords = ['female', 'anna', 'katja', 'hedda', 'steffi', 'zira', 'amy', 'elke', 'microsoft elena', 'microsoft irina'];
                    const ruExcludes = ['pavel', 'yuri', 'alexander', 'desktop'];

                    if (gender === 'male') {
                        targetVoice = langVoices.find(v => {
                            const name = v.name.toLowerCase();
                            const matchesMale = maleKeywords.some(k => name.includes(k));
                            const isRuShaky = lang.startsWith('ru') && ruExcludes.some(e => name.includes(e));
                            return matchesMale && !name.includes('female') && !isRuShaky;
                        });

                        if (!targetVoice) {
                            targetVoice = langVoices.find(v => !femaleKeywords.some(k => v.name.toLowerCase().includes(k)));
                        }
                    } else {
                        targetVoice = langVoices.find(v => femaleKeywords.some(k => v.name.toLowerCase().includes(k)));
                    }
                }

                if (!targetVoice) {
                    if (lang.startsWith('ru')) {
                        const ruPriority = ['microsoft elena', 'microsoft irina', 'google', 'premium', 'milena', 'katya', 'irina'];
                        const ruExcludes = ['pavel', 'yuri', 'alexander', 'desktop'];

                        for (const p of ruPriority) {
                            targetVoice = langVoices.find(v => v.name.toLowerCase().includes(p) && !ruExcludes.some(e => v.name.toLowerCase().includes(e)));
                            if (targetVoice) break;
                        }

                        if (!targetVoice) {
                            targetVoice = langVoices.find(v => !ruExcludes.some(e => v.name.toLowerCase().includes(e)));
                        }
                    } else {
                        targetVoice = langVoices.find(v => v.name.includes('Google') || v.name.includes('Premium'));
                    }
                }

                if (!targetVoice) targetVoice = langVoices[0];
                if (targetVoice) utterance.voice = targetVoice;
            }

            let backupTimeout: NodeJS.Timeout;

            utterance.onstart = () => setIsSpeaking(true);
            
            utterance.onend = () => {
                clearTimeout(backupTimeout);
                if (activeUtteranceRef.current === utterance) activeUtteranceRef.current = null;
                setIsSpeaking(false);
                resolve();
            };
            
            utterance.onerror = (e: SpeechSynthesisErrorEvent) => {
                clearTimeout(backupTimeout);
                if (e.error !== 'canceled' && e.error !== 'interrupted') {
                    console.error("Speech error", e.error, e);
                    // If synthesis failed, try to resume the engine for next calls
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                        window.speechSynthesis.resume();
                    }
                }
                if (activeUtteranceRef.current === utterance) activeUtteranceRef.current = null;
                setIsSpeaking(false);
                resolve();
            };

            const timeoutDuration = Math.max(5000, text.length * 100);
            backupTimeout = setTimeout(() => {
                if (activeUtteranceRef.current === utterance) {
                    console.warn("Speech onend timed out, forcing resolve");
                    activeUtteranceRef.current = null;
                    setIsSpeaking(false);
                    resolve();
                    if (typeof window !== 'undefined' && window.speechSynthesis) {
                        window.speechSynthesis.cancel();
                    }
                }
            }, timeoutDuration);

            // Safety delay: 100ms gap before actual speak call 
            // This helps browser stabilize after cancel() or sequence transitions
            setTimeout(() => {
                if (typeof window !== 'undefined' && window.speechSynthesis) {
                    window.speechSynthesis.speak(utterance);
                }
            }, 100);
        });
    }, [stop]);

    const speakSequence = useCallback(async (items: { text: string, lang: string }[]) => {
        // Stop any currently running speech and increment sequence ID
        stop();
        const currentSequenceId = sequenceIdRef.current;

        for (const item of items) {
            // Check if we should abort this sequence
            if (sequenceIdRef.current !== currentSequenceId) break;

            await speak(item.text, item.lang, undefined, false);

            if (sequenceIdRef.current !== currentSequenceId) break;

            // Slight pause between items in sequence
            await new Promise(r => setTimeout(r, 400));
        }
    }, [speak, stop]);

    return { speak, speakSequence, stop, isSpeaking, voices, isLoaded };
}
