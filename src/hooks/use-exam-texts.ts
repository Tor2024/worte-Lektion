
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
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
    const userId = "anonymous";
    const [localCustomTexts, setLocalCustomTexts] = useState<ExamText[]>([]);
    const [syncEnabled, setSyncEnabled] = useState(false);
    const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

    useEffect(() => {
        setLocalCustomTexts(storage.getExamTexts());
        setSyncEnabled(storage.isCloudSyncEnabled());
        setIsInitialLoadDone(true);
    }, []);

    // 1. Convex Hooks
    const cloudTextsRaw = useQuery(
        api.examTexts.getExamTexts,
        syncEnabled ? { userId } : "skip"
    );
    const addTextMutation = useMutation(api.examTexts.addExamText);
    const removeTextMutation = useMutation(api.examTexts.deleteExamText);



    // 3. Map Cloud Data
    const customTexts = useMemo(() => {
        if (!cloudTextsRaw) return localCustomTexts;
        return cloudTextsRaw.map((t: any) => ({
            id: t._id,
            title: t.title,
            description: t.description,
            level: t.level,
            content: t.content,
            isCustom: t.isCustom,
            createdAt: t.createdAt
        })) as ExamText[];
    }, [cloudTextsRaw, localCustomTexts]);

    // 4. Sync Cloud -> Local
    useEffect(() => {
        if (cloudTextsRaw) {
            storage.setExamTexts(cloudTextsRaw);
        }
    }, [cloudTextsRaw]);

    const addCustomText = useCallback(async (text: Omit<ExamText, 'id' | 'isCustom'>) => {
        // Optimistic update
        const tempId = `temp-${Date.now()}`;
        const newText: ExamText = { ...text, id: tempId, isCustom: true };
        setLocalCustomTexts(prev => [...prev, newText]);

        try {
            if (syncEnabled) {
                await addTextMutation({
                    userId,
                    title: text.title,
                    description: text.description || "",
                    level: text.level || "B2",
                    content: text.content || "",
                    isCustom: true,
                });
            }
        } catch (e) {
            console.error("Failed to add exam text to cloud:", e);
        }
        return newText;
    }, [addTextMutation, userId, syncEnabled]);

    const removeCustomText = useCallback(async (id: string) => {
        // Optimistic update
        setLocalCustomTexts(prev => prev.filter(t => t.id !== id));

        try {
            if (syncEnabled) {
                await removeTextMutation({ id: id as any }); // Convex IDs are used here
            }
        } catch (e) {
            console.error("Failed to remove exam text from cloud:", e);
        }
    }, [removeTextMutation, syncEnabled]);

    const getExamText = useCallback((id: string): ExamText | undefined => {
        const builtIn = BUILT_IN_TEXTS.find(t => t.id === id);
        if (builtIn) return builtIn;
        return customTexts.find(t => t.id === id);
    }, [customTexts]);

    return {
        allTexts: [...BUILT_IN_TEXTS, ...customTexts],
        customTexts,
        isLoading: !isInitialLoadDone || (syncEnabled && cloudTextsRaw === undefined),
        addCustomText,
        removeCustomText,
        getExamText
    };
}
