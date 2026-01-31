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
        if (typeof window === 'undefined' || !window.speechSynthesis) return;

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
                const maleKeywords = ['male', 'markus', 'stefan', 'paul', 'klaus', 'david', 'google deutsch']; // Google Deutsch is often male-ish or neutral, but we'll refine
                const femaleKeywords = ['female', 'anna', 'katja', 'hedda', 'steffi', 'zira', 'amy', 'google deutsch female'];

                const keywords = gender === 'male' ? maleKeywords : femaleKeywords;

                // Try to find by name keywords
                targetVoice = langVoices.find(v => keywords.some(k => v.name.toLowerCase().includes(k)));
            }

            // If no gender match or no gender specified, prioritize Google/Premium high quality voices
            if (!targetVoice) {
                targetVoice = langVoices.find(v => v.name.includes('Google') || v.name.includes('Premium')) || langVoices[0];
            }

            if (targetVoice) {
                utterance.voice = targetVoice;
            }
        }

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    }, []);

    const stop = useCallback(() => {
        if (typeof window !== 'undefined' && window.speechSynthesis) {
            window.speechSynthesis.cancel();
            setIsSpeaking(false);
        }
    }, []);

    return { speak, stop, isSpeaking, voices, isLoaded };
}
