
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
import { User, Settings, Database, Cloud, CloudOff } from 'lucide-react';
import { storage } from '@/lib/storage';
import { useState, useEffect } from 'react';

export function UserMenu() {
    const [isSyncEnabled, setIsSyncEnabled] = useState(false);

    useEffect(() => {
        setIsSyncEnabled(storage.isCloudSyncEnabled());
    }, []);

    const toggleSync = () => {
        storage.setCloudSyncEnabled(!isSyncEnabled);
    };

    return (
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
                            {isSyncEnabled ? 'Cloud User' : 'Local User'}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            {isSyncEnabled ? 'sync active' : 'local-only mode'}
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleSync}>
                    {isSyncEnabled ? (
                        <>
                            <CloudOff className="mr-2 h-4 w-4 text-red-500" />
                            <span>Disable Cloud Sync</span>
                        </>
                    ) : (
                        <>
                            <Cloud className="mr-2 h-4 w-4 text-green-500" />
                            <span>Enable Cloud Sync</span>
                        </>
                    )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Профиль</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Настройки</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
