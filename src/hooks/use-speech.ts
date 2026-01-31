'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

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

    const speak = useCallback((text: string, lang: string = 'de-DE', gender?: VoiceGender) => {
        return new Promise<void>((resolve) => {
            if (typeof window === 'undefined' || !window.speechSynthesis) {
                resolve();
                return;
            }

            // Stop any current speech
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = lang;
            utterance.rate = 0.9;

            // Voice Selection Logic
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

                // Fallback for Quality
                if (!targetVoice) {
                    if (lang.startsWith('ru')) {
                        const ruPriority = ['microsoft elena', 'microsoft irina', 'google', 'premium', 'milena', 'katya', 'irina'];
                        const ruExcludes = ['pavel', 'yuri', 'alexander', 'desktop'];

                        // Try priority first, avoiding excludes
                        for (const p of ruPriority) {
                            targetVoice = langVoices.find(v => v.name.toLowerCase().includes(p) && !ruExcludes.some(e => v.name.toLowerCase().includes(e)));
                            if (targetVoice) break;
                        }

                        // Final fallback for Russian: any non-shaky voice
                        if (!targetVoice) {
                            targetVoice = langVoices.find(v => !ruExcludes.some(e => v.name.toLowerCase().includes(e)));
                        }
                    } else {
                        targetVoice = langVoices.find(v => v.name.includes('Google') || v.name.includes('Premium'));
                    }
                }

                // Absolute last resort
                if (!targetVoice) {
                    targetVoice = langVoices[0];
                }

                if (targetVoice) {
                    utterance.voice = targetVoice;
                }
            }

            utterance.onstart = () => setIsSpeaking(true);
            utterance.onend = () => {
                setIsSpeaking(false);
                resolve();
            };
            utterance.onerror = () => {
                setIsSpeaking(false);
                resolve();
            };

            window.speechSynthesis.speak(utterance);
        });
    }, []);

    const stop = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return { speak, stop, isSpeaking, voices, isLoaded };
}
