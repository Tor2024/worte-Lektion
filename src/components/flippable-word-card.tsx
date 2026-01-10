
'use client';

import { useState } from 'react';
import { UserVocabularyWord } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { SpeakButton } from '@/components/speak-button';
import { formatGermanWord } from '@/lib/german-utils';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { RotateCcw, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Added import for Button

interface FlippableWordCardProps {
    userWord: UserVocabularyWord;
    className?: string;
    reverse?: boolean;
    onRefresh?: () => Promise<void>; // Added onRefresh prop
}

export function FlippableWordCard({ userWord, className, reverse = false, onRefresh }: FlippableWordCardProps) {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false); // Added isRefreshing state
    const word = userWord.word;

    // Determine Card Base Color based on Gender/Type
    let baseColorClass = "border-l-4 border-l-primary";

    if (word.type === 'noun') {
        if ((word as any).article === 'der') baseColorClass = "border-l-blue-500";
        else if ((word as any).article === 'die') baseColorClass = "border-l-pink-500";
        else if ((word as any).article === 'das') baseColorClass = "border-l-green-500";
    } else if (word.type === 'verb') {
        baseColorClass = "border-l-amber-500";
    } else if (word.type === 'conjunction') {
        baseColorClass = "border-l-purple-500";
    } else if (word.type === 'preposition') {
        baseColorClass = "border-l-yellow-500";
    }

    const handleFlip = () => {
        if (!isRefreshing) setIsFlipped(!isFlipped); // Modified handleFlip
    };

    // Added handleRefreshClick function
    const handleRefreshClick = async (e: React.MouseEvent) => {
        e.stopPropagation(); // prevent flip
        if (onRefresh && confirm('Обновить данные карточки с помощью AI?')) {
            setIsRefreshing(true);
            try {
                await onRefresh();
            } catch (err) {
                alert('Failed to refresh');
            } finally {
                setIsRefreshing(false);
            }
        }
    };

    // Front Content (Default: DE, Reverse: RU)
    const renderFrontContent = () => {
        if (reverse) {
            // RU Front
            return (
                <div className="flex flex-col items-center gap-4">
                    <Badge variant="outline" className="opacity-50 text-xs uppercase tracking-wider mb-2">
                        {word.type} (Translate to DE)
                    </Badge>
                    <h3 className="text-2xl font-bold font-headline select-none text-center">
                        {word.russian}
                    </h3>
                    {userWord.context && (
                        <p className="text-sm text-muted-foreground italic text-center max-w-[200px] truncate">"{userWord.context}"</p>
                    )}
                </div>
            );
        } else {
            // DE Front
            return (
                <div className="flex flex-col items-center gap-2">
                    <Badge variant="outline" className="opacity-50 text-xs uppercase tracking-wider mb-2">
                        {word.type}
                    </Badge>
                    <h3 className="text-3xl font-bold font-headline select-none text-center">
                        {formatGermanWord(word)}
                    </h3>
                    {word.type === 'noun' && (
                        <div className="text-sm text-muted-foreground">
                            {(word as any).plural ? `Pl: die ${(word as any).plural}` : 'Singular only'}
                        </div>
                    )}
                    {word.type === 'verb' && (
                        <div className="text-sm text-muted-foreground italic flex flex-col gap-1 text-center">
                            <span>{(word as any).conjugation}</span>
                            <span>{(word as any).perfektForm}</span>
                        </div>
                    )}
                    {word.type === 'preposition' && (
                        <Badge variant="secondary" className="mt-2">
                            + {(word as any).case}
                        </Badge>
                    )}
                </div>
            );
        }
    };

    // Back Content (Default: RU, Reverse: DE)
    const renderBackContent = () => {
        if (reverse) {
            // DE Back
            return (
                <div className="flex flex-col items-center gap-4">
                    <h3 className="text-2xl font-bold font-headline select-none text-primary">
                        {formatGermanWord(word)}
                    </h3>
                    {word.type === 'noun' && (
                        <div className="text-sm text-muted-foreground">
                            {(word as any).plural ? `Pl: die ${(word as any).plural}` : ''}
                        </div>
                    )}

                    {(userWord.synonyms && userWord.synonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-2 p-2 bg-background/50 rounded-md">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Синонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.synonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal">
                                        {s.word}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {(userWord.antonyms && userWord.antonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-1 p-2 bg-background/50 rounded-md">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Антонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.antonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal text-red-500 border-red-200">
                                        {s.word}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex gap-2 mt-4">
                        <SpeakButton text={formatGermanWord(word)} variant="ghost" size="sm" className="h-8 w-8" />
                    </div>
                </div>
            );
        } else {
            // RU Back
            return (
                <div className="space-y-1 flex flex-col items-center">
                    <h4 className="text-xl font-bold text-primary mb-1">{word.russian}</h4>
                    {userWord.context && (
                        <p className="text-sm text-muted-foreground italic text-center">"{userWord.context}"</p>
                    )}
                    {(userWord.synonyms && userWord.synonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-2 p-2 bg-background/50 rounded-md">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Синонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.synonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal">
                                        {s.word}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {(userWord.antonyms && userWord.antonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-1 p-2 bg-background/50 rounded-md">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Антонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.antonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal text-red-500 border-red-200">
                                        {s.word}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="mt-4 flex gap-2">
                        <SpeakButton text={formatGermanWord(word)} variant="ghost" size="sm" className="h-8 w-8" />
                    </div>
                </div>
            );
        }
    };

    return (
        <div
            className={cn("relative h-64 w-full perspective-1000 cursor-pointer group", className)}
            onClick={handleFlip}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* FRONT SIDE */}
                <Card className={cn("absolute inset-0 backface-hidden flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow", baseColorClass)}>
                    <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                        {renderFrontContent()}

                        <div className="absolute bottom-4 right-4 text-xs text-muted-foreground flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity">
                            <RotateCcw className="h-3 w-3" /> Click to flip
                        </div>

                        {onRefresh && ( // Added Refresh button
                            <Button
                                variant="ghost"
                                size="sm"
                                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 h-6 w-6 p-0"
                                onClick={handleRefreshClick}
                                disabled={isRefreshing}
                            >
                                <RotateCcw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
                            </Button>
                        )}
                    </CardContent>
                </Card>

                {/* BACK SIDE */}
                <Card
                    className={cn("absolute inset-0 backface-hidden rotate-y-180 bg-muted/30 shadow-md", baseColorClass)}
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                    <CardContent className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
                        {renderBackContent()}
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
