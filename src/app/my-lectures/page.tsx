import { FolderManager } from '@/components/folder-manager';
import { BookMarked } from 'lucide-react';

export default function MyLecturesPage() {
    return (
        <div className="container mx-auto py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold font-headline flex items-center gap-3">
                    <BookMarked className="h-8 w-8 text-primary" />
                    Мой Словарь
                </h1>
                <p className="text-muted-foreground mt-2">
                    Создавайте собственные списки слов, изучайте их с помощью интервальных повторений и AI-тренера.
                </p>
            </div>

            <FolderManager />
        </div>
    );
}
