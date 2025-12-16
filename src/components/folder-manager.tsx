'use client';

import { useState } from 'react';
import { useCustomFolders } from '@/hooks/use-custom-folders';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { FolderPlus, Trash2, Folder, ChevronRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export function FolderManager() {
    const { folders, isLoading, createFolder, deleteFolder } = useCustomFolders();
    const [newFolderName, setNewFolderName] = useState('');
    const [isCreating, setIsCreating] = useState(false);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newFolderName.trim()) return;

        setIsCreating(true);
        // Simulate a small delay for better UX or if we move to backend later
        await new Promise(resolve => setTimeout(resolve, 300));
        createFolder(newFolderName);
        setNewFolderName('');
        setIsCreating(false);
    };

    if (isLoading) {
        return <div className="flex justify-center p-8"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>;
    }

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Создать новую папку</CardTitle>
                    <CardDescription>Организуйте свои слова по темам</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreate} className="flex gap-2">
                        <Input
                            placeholder="Название папки (например, 'Путешествия')"
                            value={newFolderName}
                            onChange={(e) => setNewFolderName(e.target.value)}
                            disabled={isCreating}
                        />
                        <Button type="submit" disabled={isCreating || !newFolderName.trim()}>
                            {isCreating ? <Loader2 className="h-4 w-4 animate-spin" /> : <FolderPlus className="h-4 w-4 mr-2" />}
                            Создать
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {folders.length === 0 ? (
                    <div className="col-span-full text-center p-8 text-muted-foreground border-2 border-dashed rounded-lg">
                        <Folder className="h-12 w-12 mx-auto mb-2 opacity-20" />
                        <p>У вас пока нет личных папок.</p>
                        <p className="text-sm">Создайте первую папку, чтобы начать добавлять слова.</p>
                    </div>
                ) : (
                    folders.map((folder) => (
                        <Card key={folder.id} className="hover:shadow-md transition-shadow cursor-pointer relative group">
                            <Link href={`/my-lectures/${folder.id}`} className="absolute inset-0 z-10" />
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <Folder className="h-8 w-8 text-primary mb-2" />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="z-20 text-muted-foreground hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (confirm('Вы уверены, что хотите удалить эту папку и все слова в ней?')) {
                                                deleteFolder(folder.id);
                                            }
                                        }}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <CardTitle className="line-clamp-1">{folder.name}</CardTitle>
                                <CardDescription>{folder.words.length} слов</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center text-sm text-primary font-medium mt-2">
                                    Открыть <ChevronRight className="h-4 w-4 ml-1" />
                                </div>
                            </CardContent>
                        </Card>
                    ))
                )}
            </div>
        </div>
    );
}
