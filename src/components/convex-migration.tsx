"use client";

import { useState, useEffect } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { storage } from "@/lib/storage";
import { Button } from "./ui/button";
import { RefreshCw, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function ConvexMigration() {
    const [isMigrating, setIsMigrating] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const migrate = useMutation(api.migration.migrateFromLocalStorage);

    // Key to track migration status in localStorage itself
    const MIGRATION_KEY = "convex-migration-v1-status";

    useEffect(() => {
        if (typeof window !== "undefined") {
            const status = window.localStorage.getItem(MIGRATION_KEY);
            if (status === "completed") setIsCompleted(true);
        }
    }, []);

    const handleMigration = async () => {
        setIsMigrating(true);
        try {
            const progress = storage.getProgress();
            const srs = storage.getSRS();
            const folders = storage.getCustomFolders();

            await migrate({
                userId: "anonymous", // For now, we use a default ID
                progress,
                srs,
                folders,
            });

            window.localStorage.setItem(MIGRATION_KEY, "completed");
            setIsCompleted(true);
            toast({
                title: "Синхронизация завершена! 🎉",
                description: "Все ваши данные из localStorage перенесены в облако Convex.",
            });
        } catch (error) {
            console.error("Migration failed:", error);
            toast({
                variant: "destructive",
                title: "Ошибка миграции",
                description: "Не удалось перенести данные. Попробуйте еще раз.",
            });
        } finally {
            setIsMigrating(false);
        }
    };

    if (isCompleted) return null;

    return (
        <div className="bg-indigo-600/10 border border-indigo-600/20 p-4 rounded-2xl mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-600/20 rounded-full">
                    <RefreshCw className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Перейти на облачное хранение</h3>
                    <p className="text-xs text-muted-foreground">Ваш прогресс будет доступен на всех устройствах через Convex.</p>
                </div>
            </div>
            <Button
                onClick={handleMigration}
                disabled={isMigrating}
                size="sm"
                className="bg-indigo-600 hover:bg-indigo-700 font-bold"
            >
                {isMigrating ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Перенос...
                    </>
                ) : (
                    "Синхронизировать"
                )}
            </Button>
        </div>
    );
}
