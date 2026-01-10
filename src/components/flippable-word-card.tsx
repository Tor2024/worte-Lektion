
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

    // Determine Card Base Color and Style
    let cardStyle = "border-2 border-primary/20 bg-background hover:border-primary/50";
    let badgeVariant: "outline" | "default" | "secondary" | "destructive" = "outline";

    if (word.type === 'noun') {
        if ((word as any).article === 'der') {
            cardStyle = "border-2 border-blue-200 bg-blue-50/50 dark:bg-blue-900/10 dark:border-blue-800 hover:border-blue-400";
        } else if ((word as any).article === 'die') {
            cardStyle = "border-2 border-pink-200 bg-pink-50/50 dark:bg-pink-900/10 dark:border-pink-800 hover:border-pink-400";
        } else if ((word as any).article === 'das') {
            cardStyle = "border-2 border-green-200 bg-green-50/50 dark:bg-green-900/10 dark:border-green-800 hover:border-green-400";
        }
    } else if (word.type === 'verb') {
        cardStyle = "border-2 border-amber-200 bg-amber-50/50 dark:bg-amber-900/10 dark:border-amber-800 hover:border-amber-400";
    } else if (word.type === 'conjunction') {
        cardStyle = "border-2 border-purple-200 bg-purple-50/50 dark:bg-purple-900/10 dark:border-purple-800 hover:border-purple-400";
    } else if (word.type === 'preposition') {
        cardStyle = "border-2 border-yellow-200 bg-yellow-50/50 dark:bg-yellow-900/10 dark:border-yellow-800 hover:border-yellow-400";
    }

    const handleFlip = () => {
        if (!isRefreshing) setIsFlipped(!isFlipped);
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
                        <p className="text-sm text-muted-foreground italic text-center max-w-full break-words whitespace-normal">"{userWord.context}"</p>
                    )}
                    {userWord.contextTranslation && (
                        <p className="text-xs text-muted-foreground/70 text-center max-w-full break-words whitespace-normal">({userWord.contextTranslation})</p>
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
                    <h3 className="text-3xl font-bold font-headline select-none text-center break-words hyphens-auto max-w-full">
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
                            {((word as any).preposition || (word as any).case) && (
                                <span className="font-bold text-primary mt-1">
                                    {[(word as any).preposition ? `+ ${(word as any).preposition}` : null, (word as any).case ? `+ ${(word as any).case}` : null].filter(Boolean).join(' ')}
                                </span>
                            )}
                        </div>
                    )}
                    {word.type === 'preposition' && (
                        <Badge variant="secondary" className="mt-2">
                            + {(word as any).case}
                        </Badge>
                    )}

                    {/* Context Example on Front (Requested for Verbs, helpful for all) */}
                    {userWord.context && (
                        <p className="text-sm text-muted-foreground italic text-center mt-4 max-w-full break-words whitespace-normal px-2">
                            "{userWord.context}"
                        </p>
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
                    {word.type === 'verb' && (
                        <div className="text-sm text-muted-foreground italic flex flex-col gap-1 text-center">
                            <span>{(word as any).conjugation}</span>
                            <span>{(word as any).perfektForm}</span>
                            {((word as any).preposition || (word as any).case) && (
                                <span className="font-bold text-primary mt-1">
                                    {[(word as any).preposition ? `+ ${(word as any).preposition}` : null, (word as any).case ? `+ ${(word as any).case}` : null].filter(Boolean).join(' ')}
                                </span>
                            )}
                        </div>
                    )}

                    {(userWord.synonyms && userWord.synonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-2 p-2 bg-background/50 rounded-md border border-border/50">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Синонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.synonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal whitespace-pre-wrap h-auto text-left">
                                        {s.word} <span className="opacity-50 ml-1">({s.translation})</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {(userWord.antonyms && userWord.antonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-1 p-2 bg-background/50 rounded-md border border-border/50">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Антонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.antonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal text-red-600 border-red-200 dark:text-red-400 whitespace-pre-wrap h-auto text-left">
                                        {s.word} <span className="opacity-50 ml-1">({s.translation})</span>
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
                        <p className="text-sm text-muted-foreground italic text-center max-w-full break-words whitespace-normal">"{userWord.context}"</p>
                    )}
                    {userWord.contextTranslation && (
                        <p className="text-xs text-muted-foreground/70 text-center max-w-full break-words whitespace-normal">({userWord.contextTranslation})</p>
                    )}
                    {(userWord.synonyms && userWord.synonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-2 p-2 bg-background/50 rounded-md border border-border/50">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Синонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.synonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal whitespace-pre-wrap h-auto text-left">
                                        {s.word} <span className="opacity-50 ml-1">({s.translation})</span>
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )}
                    {(userWord.antonyms && userWord.antonyms.length > 0) && (
                        <div className="w-full text-left text-sm mt-1 p-2 bg-background/50 rounded-md border border-border/50">
                            <span className="text-xs font-bold text-muted-foreground uppercase">Антонимы:</span>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {userWord.antonyms.map((s, i) => (
                                    <Badge key={i} variant="outline" className="text-xs font-normal text-red-600 border-red-200 dark:text-red-400 whitespace-pre-wrap h-auto text-left">
                                        {s.word} <span className="opacity-50 ml-1">({s.translation})</span>
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
            className={cn("relative h-96 w-full perspective-1000 cursor-pointer group", className)}
            onClick={handleFlip}
        >
            <motion.div
                className="w-full h-full relative preserve-3d transition-all duration-500"
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 260, damping: 20 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                {/* FRONT SIDE */}
                <Card
                    className={cn("absolute inset-0 backface-hidden flex flex-col shadow-md hover:shadow-xl transition-shadow bg-card overflow-hidden", cardStyle)}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="flex-grow overflow-y-auto no-scrollbar p-4 flex flex-col items-center justify-center text-center space-y-4">
                        {renderFrontContent()}
                    </div>

                    <div className="absolute bottom-3 right-3 text-xs text-muted-foreground flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity bg-background/80 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
                        <RotateCcw className="h-3 w-3" /> Click to flip
                    </div>

                    {onRefresh && (
                        <Button
                            variant="ghost"
                            size="sm"
                            className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity z-20 h-6 w-6 p-0 bg-background/50 hover:bg-background/80"
                            onClick={handleRefreshClick}
                            disabled={isRefreshing}
                        >
                            <RotateCcw className={cn("h-3 w-3", isRefreshing && "animate-spin")} />
                        </Button>
                    )}
                </Card>

                {/* BACK SIDE */}
                <Card
                    className={cn("absolute inset-0 backface-hidden rotate-y-180 bg-muted shadow-md flex flex-col overflow-hidden", cardStyle)}
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                    <div className="flex-grow overflow-y-auto no-scrollbar p-3 flex flex-col items-center justify-center text-center space-y-2">
                        {renderBackContent()}
                        <div className="h-4 w-full flex-shrink-0" /> {/* Spacer for bottom scroll */}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
