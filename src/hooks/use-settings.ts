'use client';

import { useState, useEffect } from 'react';
import { storage, AppSettings } from '@/lib/storage';

export function useSettings() {
    const [settings, setSettings] = useState<AppSettings>({ productionMode: 'full' });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        // Load initial settings
        const initialSettings = storage.getSettings();
        setSettings(initialSettings);
        setIsLoaded(true);

        // Listen for changes from other tabs/components
        const handleStorageChange = (e: StorageEvent) => {
            if (e.key === 'deutsch-app-settings-v1' && e.newValue) {
                try {
                    const parsed = JSON.parse(e.newValue);
                    if (parsed.skipProductionPhase === true) parsed.productionMode = 'skip';
                    else if (parsed.skipProductionPhase === false && !parsed.productionMode) parsed.productionMode = 'full';
                    setSettings({ productionMode: 'full', ...parsed });
                } catch (err) { }
            }
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const updateSettings = (newSettings: Partial<AppSettings>) => {
        const updated = { ...settings, ...newSettings };
        setSettings(updated);
        storage.setSettings(updated);
    };

    return { settings, updateSettings, isLoaded };
}
