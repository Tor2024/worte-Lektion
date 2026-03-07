'use client';

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';
import { Loader2, Database } from 'lucide-react';
import { motion } from 'framer-motion';

export function StorageProvider({ children }: { children: React.ReactNode }) {
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        storage.initStorage().then(() => {
            setIsInitialized(true);
        });
    }, []);

    if (!isInitialized) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-background space-y-6">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center"
                >
                    <div className="bg-primary/10 p-4 rounded-full mb-4">
                        <Database className="h-10 w-10 text-primary animate-pulse" />
                    </div>
                    <h1 className="text-xl font-bold font-headline mb-2">Запуск базы данных...</h1>
                    <p className="text-sm text-muted-foreground max-w-xs text-center leading-relaxed">
                        Подключаемся к мощному локальному хранилищу IndexedDB. Ваши слова в безопасности!
                    </p>
                    <Loader2 className="h-5 w-5 animate-spin text-primary mt-6" />
                </motion.div>
            </div>
        );
    }

    return <>{children}</>;
}
