'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, X, Folder, ArrowRight, Command } from 'lucide-react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { FormattedGermanWord } from './formatted-german-word';

export function GlobalSearch() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState('');
    const { searchWords } = useCustomFolders();
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const results = searchWords(query);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen(open => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => inputRef.current?.focus(), 100);
        } else {
            setQuery('');
        }
    }, [isOpen]);

    const handleSelect = (folderId: string) => {
        setIsOpen(false);
        router.push(`/my-lectures/${folderId}`);
    };

    return (
        <>
            <Button
                variant="outline"
                className="relative h-9 w-9 p-0 xl:h-10 xl:w-60 xl:justify-start xl:px-3 xl:py-2 text-muted-foreground bg-muted/50 hover:bg-muted"
                onClick={() => setIsOpen(true)}
            >
                <Search className="h-4 w-4 xl:mr-2" />
                <span className="hidden xl:inline-flex">Поиск по всем папкам...</span>
                <kbd className="pointer-events-none absolute right-1.5 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 xl:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm"
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            className="relative w-full max-w-2xl bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                        >
                            <div className="p-4 border-b border-white/5 flex items-center gap-3">
                                <Search className="h-5 w-5 text-primary" />
                                <Input
                                    ref={inputRef}
                                    placeholder="Введите слово на немецком или русском..."
                                    className="border-none bg-transparent focus-visible:ring-0 text-lg h-10 px-0"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-muted-foreground"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <ScrollArea className="max-h-[60vh]">
                                <div className="p-2">
                                    {query.trim() === '' ? (
                                        <div className="p-8 text-center text-muted-foreground">
                                            <Command className="h-12 w-12 mx-auto mb-4 opacity-20" />
                                            <p>Введите запрос для поиска по всем вашим папкам</p>
                                        </div>
                                    ) : results.length === 0 ? (
                                        <div className="p-8 text-center text-muted-foreground">
                                            <p>Ничего не найдено для &ldquo;{query}&rdquo;</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-1">
                                            {results.map((res, i) => (
                                                <button
                                                    key={`${res.folderId}-${i}`}
                                                    className="w-full text-left p-3 rounded-xl hover:bg-white/5 transition-colors flex items-center justify-between group"
                                                    onClick={() => handleSelect(res.folderId)}
                                                >
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex flex-col">
                                                            <div className="text-lg font-bold text-white flex items-center gap-2">
                                                                <FormattedGermanWord word={res.word.word} />
                                                            </div>
                                                            <div className="text-sm text-muted-foreground italic">
                                                                {res.word.word.russian}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 flex items-center gap-1.5 px-2 py-1">
                                                            <Folder className="h-3 w-3" />
                                                            {res.folderName}
                                                        </Badge>
                                                        <ArrowRight className="h-4 w-4 text-primary opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0" />
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </ScrollArea>

                            <div className="p-3 border-t border-white/5 bg-black/20 flex justify-between items-center text-[10px] text-muted-foreground uppercase tracking-widest font-bold">
                                <span>Найдено результатов: {results.length}</span>
                                <div className="flex gap-4">
                                    <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1 rounded">ESC</kbd> Закрыть</span>
                                    <span className="flex items-center gap-1"><kbd className="bg-white/10 px-1 rounded">↵</kbd> Перейти</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence >
        </>
    );
}
