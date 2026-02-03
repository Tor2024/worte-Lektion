'use client';

import { useState, useEffect, useCallback } from 'react';
import { ExamText } from '@/lib/types';
import { storage } from '@/lib/storage';

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
    const [localCustomTexts, setLocalCustomTexts] = useState<ExamText[]>([]);
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setLocalCustomTexts(storage.getExamTexts());
        setIsInitialLoadDone(true);
    }, []);

    const addCustomText = useCallback(async (text: Omit<ExamText, 'id' | 'isCustom'>) => {
        const id = Math.random().toString(36).substr(2, 9);
        const newText: ExamText = { ...text, id, isCustom: true };
        const nextTexts = [...localCustomTexts, newText];
        setLocalCustomTexts(nextTexts);
        storage.setExamTexts(nextTexts);
        return newText;
    }, [localCustomTexts]);

    const removeCustomText = useCallback(async (id: string) => {
        const nextTexts = localCustomTexts.filter(t => t.id !== id);
        setLocalCustomTexts(nextTexts);
        storage.setExamTexts(nextTexts);
    }, [localCustomTexts]);

    const getExamText = useCallback((id: string): ExamText | undefined => {
        const builtIn = BUILT_IN_TEXTS.find(t => t.id === id);
        if (builtIn) return builtIn;
        return localCustomTexts.find(t => t.id === id);
    }, [localCustomTexts]);

    return {
        allTexts: [...BUILT_IN_TEXTS, ...localCustomTexts],
        customTexts: localCustomTexts,
        isLoading: !isInitialLoadDone,
        addCustomText,
        removeCustomText,
        getExamText
    };
}
