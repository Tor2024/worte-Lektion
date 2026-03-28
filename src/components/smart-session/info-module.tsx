'use client';

import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface InfoModuleProps {
    title: string;
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
    variant?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'indigo' | 'amber' | 'rose';
    fullWidth?: boolean;
}

export function InfoModule({ title, icon: Icon, children, className, variant = 'default', fullWidth = false }: InfoModuleProps) {
    const variants = {
        default: "bg-muted/10 border-muted-foreground/10 text-muted-foreground",
        primary: "bg-primary/5 border-primary/20 text-primary",
        success: "bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-400",
        warning: "bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400",
        error: "bg-red-500/5 border-red-500/20 text-red-600 dark:text-red-400",
        indigo: "bg-indigo-500/5 border-indigo-500/20 text-indigo-600 dark:text-indigo-400",
        amber: "bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-400",
        rose: "bg-rose-500/5 border-rose-500/20 text-rose-600 dark:text-rose-400",
    };

    return (
        <div className={cn(
            "p-5 rounded-[2rem] border-2 transition-all duration-300",
            variants[variant],
            fullWidth ? "w-full" : "w-full sm:w-[calc(50%-0.5rem)]",
            className
        )}>
            <div className="flex items-center gap-2 mb-3">
                <div className={cn(
                    "p-1.5 rounded-lg shadow-sm border",
                    "bg-white/80 dark:bg-slate-900/80"
                )}>
                    <Icon className="h-4 w-4" />
                </div>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">
                    {title}
                </h4>
            </div>
            <div className="text-sm font-medium leading-relaxed">
                {children}
            </div>
        </div>
    );
}
