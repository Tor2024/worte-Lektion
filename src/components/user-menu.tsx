
'use client';

import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, AlertCircle, RotateCcw } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export function UserMenu() {
    const [confirmStep, setConfirmStep] = useState(0);

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                        <Avatar className="h-8 w-8 border">
                            <AvatarImage src="/avatars/01.png" alt="@user" />
                            <AvatarFallback>L</AvatarFallback>
                        </Avatar>
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                            <p className="text-sm font-medium leading-none">
                                Local User
                            </p>
                            <p className="text-xs leading-none text-muted-foreground">
                                local-only mode
                            </p>
                        </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <User className="mr-2 h-4 w-4" />
                        <span>Профиль</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Настройки</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                        className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                        onSelect={(e) => {
                            e.preventDefault();
                            setConfirmStep(1);
                        }}
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        <span>Сброс прогресса</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* First Confirmation */}
            <AlertDialog open={confirmStep === 1} onOpenChange={(open) => !open && setConfirmStep(0)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Это сбросит весь прогресс обучения, включая уровни владения словами и статистику сессий.
                            Ваши папки и слова останутся, но они снова станут "новыми" для изучения.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => setConfirmStep(2)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Да, продолжить
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Second Confirmation */}
            <AlertDialog open={confirmStep === 2} onOpenChange={(open) => !open && setConfirmStep(0)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="text-destructive flex items-center gap-2">
                            <AlertCircle className="h-5 w-5" />
                            Окончательное подтверждение
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            Это действие невозможно отменить. Вы действительно хотите полностью сбросить свой прогресс и начать сначала?
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Я передумал</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => storage.resetAllProgress()}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            СБРОСИТЬ ВСЁ
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
