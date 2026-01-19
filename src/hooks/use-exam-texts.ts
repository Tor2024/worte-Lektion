
'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExamText } from '@/lib/types';

const BUILT_IN_TEXTS: ExamText[] = [
    {
        id: 'job-search',
        title: 'Поиск работы (Arbeitssuche)',
        description: 'Текст о современных платформах поиска работы в Украине и процедуре найма.',
        level: 'B2',
        content: `Heute wird Arbeit in der Ukraine hauptsächlich über Online-Plattformen gesucht. Besonders wichtig sind dabei spezialisierte Webseiten und berufliche soziale Netzwerke. Außerdem spielen persönliche Kontakte eine große Rolle, da Empfehlungen oft die Chancen auf eine Anstellung erhöhen. In großen Städten ist der Arbeitsmarkt besser entwickelt, deshalb gibt es dort mehr Möglichkeiten.
Der erste Kontakt mit dem Arbeitgeber erfolgt per E-Mail или Telefon. 
Zu den wichtigsten Bewerbungsunterlagen gehören ein Lebenslauf und professionelle Zertifikate. 
Das Bewerbungsgespräch kann entweder persönlich или online stattfinden. Dabei werden die berufliche Erfahrung, die Qualifikationen и die sozialen Kompetenzen des Bewerbers geprüft. In manchen Fällen muss auch eine praktische Aufgabe erledigt werden. Am Ende werden die Bewerber über die nächsten Schritte informiert.`
    }
];

export function useExamTexts() {
    const [customTexts, setCustomTexts] = useState<ExamText[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const saved = localStorage.getItem('custom_exam_texts');
        if (saved) {
            try {
                setCustomTexts(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse custom texts', e);
            }
        }
        setIsLoading(false);
    }, []);

    const saveTexts = (texts: ExamText[]) => {
        setCustomTexts(texts);
        localStorage.setItem('custom_exam_texts', JSON.stringify(texts));
    };

    const addCustomText = (text: Omit<ExamText, 'id' | 'isCustom'>) => {
        const newText: ExamText = {
            ...text,
            id: `custom-${Date.now()}`,
            isCustom: true
        };
        saveTexts([...customTexts, newText]);
        return newText;
    };

    const removeCustomText = (id: string) => {
        saveTexts(customTexts.filter(t => t.id !== id));
    };

    const getExamText = (id: string): ExamText | undefined => {
        // Check built-in first
        const builtIn = BUILT_IN_TEXTS.find(t => t.id === id);
        if (builtIn) return builtIn;
        // Then check custom
        return customTexts.find(t => t.id === id);
    }

    return {
        allTexts: [...BUILT_IN_TEXTS, ...customTexts],
        customTexts,
        isLoading,
        addCustomText,
        removeCustomText,
        getExamText
    };
}
