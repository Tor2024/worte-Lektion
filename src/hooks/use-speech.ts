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

            if (langVoices.length > 0) {
                let targetVoice: SpeechSynthesisVoice | undefined;

                if (gender) {
                    const maleKeywords = ['male', 'markus', 'stefan', 'paul', 'klaus', 'david', 'conrad', 'google deutsch'];
                    const femaleKeywords = ['female', 'anna', 'katja', 'hedda', 'steffi', 'zira', 'amy', 'elke', 'google deutsch female'];

                    if (gender === 'male') {
                        // Try to find a male voice, explicitly avoiding ones with female indicators
                        targetVoice = langVoices.find(v => {
                            const name = v.name.toLowerCase();
                            const isMaleName = maleKeywords.some(k => name.includes(k));
                            const isFemaleName = femaleKeywords.some(k => name.includes(k));
                            return isMaleName && !name.includes('female');
                        });

                        // Fallback for male: pick first voice that ISN'T in female list
                        if (!targetVoice) {
                            targetVoice = langVoices.find(v => !femaleKeywords.some(k => v.name.toLowerCase().includes(k)));
                        }
                    } else {
                        // Try to find a female voice
                        targetVoice = langVoices.find(v => {
                            const name = v.name.toLowerCase();
                            return femaleKeywords.some(k => name.includes(k));
                        });
                    }
                }

                // If no gender match or no gender specified, prioritize Google/Premium high quality voices
                if (!targetVoice) {
                    if (lang.startsWith('ru')) {
                        // Specific priority for Russian to avoid "shaky" voices like Pavel or lower-quality ones
                        // Avoid "Pavel", "Yuri", "Alexander" as they can be shaky / robotic on some systems. 
                        // Prioritize Microsoft Elena/Irina, Google, or Premium voices.
                        const russianPriority = ['microsoft elena', 'microsoft irina', 'google', 'premium', 'milena', 'katya', 'irina'];
                        const excludes = ['pavel', 'yuri', 'alexander', 'desktop'];

                        targetVoice = langVoices.find(v =>
                            russianPriority.some(p => v.name.toLowerCase().includes(p)) &&
                            !excludes.some(e => v.name.toLowerCase().includes(e))
                        );

                        if (!targetVoice) {
                            targetVoice = langVoices.find(v => !excludes.some(e => v.name.toLowerCase().includes(e))) || langVoices[0];
                        }
                    } else {
                        targetVoice = langVoices.find(v => v.name.includes('Google') || v.name.includes('Premium')) || langVoices[0];
                    }
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
