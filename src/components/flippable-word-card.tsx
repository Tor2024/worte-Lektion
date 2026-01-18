
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
                <div className="flex flex-col items-center justify-center h-full gap-6 w-full">
                    <div className="flex flex-col items-center">
                        <Badge variant="outline" className="opacity-40 text-[10px] uppercase tracking-widest mb-3">
                            {word.type} (RU → DE)
                        </Badge>
                        <h3 className="text-3xl font-bold font-headline select-none text-center leading-tight">
                            {word.russian}
                        </h3>
                    </div>

                    {(userWord.context || userWord.contextTranslation) && (
                        <div className="relative text-center max-w-sm mx-auto p-4 bg-background/30 rounded-xl border border-border/20">
                            {userWord.context && (
                                <p
                                    className="text-base text-foreground/90 italic mb-1 leading-relaxed prose prose-slate dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: `"${userWord.context}"` }}
                                />
                            )}
                            {userWord.contextTranslation && (
                                <p
                                    className="text-sm text-muted-foreground/80 prose prose-slate dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: `(${userWord.contextTranslation})` }}
                                />
                            )}
                        </div>
                    )}
                </div>
            );
        } else {
            // DE Front
            return (
                <div className="flex flex-col items-center w-full h-full relative">
                    {/* Top: Meta Badge */}
                    <Badge variant="outline" className="opacity-40 text-[10px] uppercase tracking-widest mb-4">
                        {word.type}
                    </Badge>

                    {/* Center Top: Word */}
                    <div className="mb-4 flex flex-col items-center">
                        <h3 className="text-4xl font-black font-headline select-none text-center break-words hyphens-auto tracking-tight leading-none text-foreground">
                            {formatGermanWord(word)}
                        </h3>
                        {word.type === 'noun' && (
                            <div className="text-base text-muted-foreground font-medium mt-1">
                                {(word as any)?.plural ? `Pl: die ${(word as any).plural}` : 'Singular only'}
                            </div>
                        )}
                        <div className="mt-2" onClick={(e) => e.stopPropagation()}>
                            <SpeakButton text={formatGermanWord(word)} variant="ghost" size="sm" className="h-8 w-8 text-muted-foreground/50 hover:text-primary hover:bg-primary/10" />
                        </div>
                    </div>

                    {/* Middle: Rich Verb Details */}
                    {word.type === 'verb' && (
                        <div className="w-full flex-grow flex flex-col gap-2">
                            {/* Conjugation Table (Präsens) */}
                            {(word as any)?.conjugations ? (
                                <div className="bg-white/50 dark:bg-black/20 p-3 rounded-xl border border-black/5 dark:border-white/10 text-xs shadow-sm">
                                    <span className="font-bold text-muted-foreground text-[10px] block mb-2 text-center uppercase tracking-widest">Präsens (Настоящее)</span>
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-left px-2">
                                        <div className="flex justify-between border-b border-black/5 pb-1"><span className="opacity-50">ich</span> <span className="font-semibold text-foreground/90">{(word as any).conjugations?.ich || '-'}</span></div>
                                        <div className="flex justify-between border-b border-black/5 pb-1"><span className="opacity-50">wir</span> <span className="font-semibold text-foreground/90">{(word as any).conjugations?.wir || '-'}</span></div>
                                        <div className="flex justify-between border-b border-black/5 pb-1"><span className="opacity-50">du</span> <span className="font-semibold text-foreground/90">{(word as any).conjugations?.du || '-'}</span></div>
                                        <div className="flex justify-between border-b border-black/5 pb-1"><span className="opacity-50">ihr</span> <span className="font-semibold text-foreground/90">{(word as any).conjugations?.ihr || '-'}</span></div>
                                        <div className="flex justify-between pb-1"><span className="opacity-50">er/sie</span> <span className="font-semibold text-foreground/90">{(word as any).conjugations?.er_sie_es || '-'}</span></div>
                                        <div className="flex justify-between pb-1"><span className="opacity-50">sie</span> <span className="font-semibold text-foreground/90">{(word as any).conjugations?.sie_Sie || '-'}</span></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-sm text-muted-foreground italic text-center">
                                    {(word as any)?.conjugation || '-'}
                                </div>
                            )}

                            {/* Other Tenses Block */}
                            {(word as any)?.verbTenses && (
                                <div className="bg-white/30 dark:bg-black/10 p-3 rounded-xl border border-black/5 dark:border-white/5 text-xs text-left">
                                    <div className="grid grid-cols-1 gap-1.5">
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="opacity-60 w-24">Perfekt:</span>
                                            <span className="font-bold text-foreground truncate">{(word as any)?.perfektForm || '-'}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="opacity-60 w-24">Präteritum:</span>
                                            <span className="font-medium text-foreground truncate">{(word as any).verbTenses?.praeteritum || '-'}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="opacity-60 w-24">Futur I:</span>
                                            <span className="font-medium text-foreground truncate">{(word as any).verbTenses?.futur1 || '-'}</span>
                                        </div>
                                        <div className="flex items-center justify-between gap-2">
                                            <span className="opacity-60 w-24">Futur II:</span>
                                            <span className="font-medium text-foreground truncate">{(word as any).verbTenses?.futur2 || '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Governance List - NEW */}
                            {(word as any)?.governance && (word as any).governance.length > 0 && (
                                <div className="w-full mt-2 flex flex-col gap-2">
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mb-1">Управление (Rektion)</div>
                                    {(word as any).governance.map((gov: any, idx: number) => (
                                        <div key={idx} className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg border border-primary/10 text-left">
                                            <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                                <span className="font-bold text-primary">{word.german}</span>
                                                <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 text-[10px] px-1.5 py-0 h-5">
                                                    {gov.preposition} + {gov.case}
                                                </Badge>
                                                <span className="text-muted-foreground mx-1">→</span>
                                                <span
                                                    className="text-sm font-medium prose prose-slate dark:prose-invert max-w-none inline"
                                                    dangerouslySetInnerHTML={{ __html: gov.meaning }}
                                                />
                                            </div>
                                            <div
                                                className="text-xs text-muted-foreground italic leading-relaxed prose prose-slate dark:prose-invert max-w-none"
                                                dangerouslySetInnerHTML={{ __html: gov.example }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Legacy Case - Show only if no governance list */}
                            {!((word as any)?.governance && (word as any).governance.length > 0) && ((word as any)?.preposition || (word as any)?.case) && (
                                <div className="mt-auto pt-2 text-center">
                                    <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm shadow-sm ring-1 ring-primary/20">
                                        {[(word as any)?.preposition ? `+ ${(word as any).preposition}` : null, (word as any)?.case ? `+ ${(word as any).case}` : null].filter(Boolean).join(' ')}
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {word.type === 'adjective' && (word as any)?.governance && (word as any).governance.length > 0 && (
                        <div className="w-full mt-2 flex flex-col gap-2">
                            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center mb-1">Управление (Rektion)</div>
                            {(word as any).governance.map((gov: any, idx: number) => (
                                <div key={idx} className="bg-primary/5 dark:bg-primary/10 p-3 rounded-lg border border-primary/10 text-left">
                                    <div className="flex flex-wrap items-center gap-1.5 mb-1">
                                        <span className="font-bold text-primary">{word.german}</span>
                                        <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30 text-[10px] px-1.5 py-0 h-5">
                                            {gov.preposition} + {gov.case}
                                        </Badge>
                                        <span className="text-muted-foreground mx-1">→</span>
                                        <span className="text-sm font-medium">{gov.meaning}</span>
                                    </div>
                                    <p
                                        className="text-xs text-muted-foreground italic leading-relaxed"
                                        dangerouslySetInnerHTML={{ __html: gov.example }}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {word.type !== 'verb' && userWord.context && (
                        <div className="mt-auto mb-4 w-full">
                            <div className="p-4 bg-background/30 rounded-xl border border-border/20 text-center">
                                <div
                                    className="text-base text-foreground/90 italic leading-snug prose prose-slate dark:prose-invert max-w-none"
                                    dangerouslySetInnerHTML={{ __html: `"${userWord.context}"` }}
                                />
                            </div>
                        </div>
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
                        <div className="text-sm text-muted-foreground italic flex flex-col gap-1 text-center w-full">
                            <span>{(word as any).conjugation}</span>
                            <span>{(word as any).perfektForm}</span>

                            {(word as any).governance && (word as any).governance.length > 0 ? (
                                <div className="mt-2 space-y-1">
                                    {(word as any).governance.map((gov: any, i: number) => (
                                        <div key={i} className="text-xs font-bold text-primary">
                                            {gov.preposition} + {gov.case} <span className="text-muted-foreground">→</span> {gov.meaning}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                ((word as any).preposition || (word as any).case) && (
                                    <span className="font-bold text-primary mt-1">
                                        {[(word as any).preposition ? `+ ${(word as any).preposition}` : null, (word as any).case ? `+ ${(word as any).case}` : null].filter(Boolean).join(' ')}
                                    </span>
                                )
                            )}
                        </div>
                    )}

                    {word.type === 'adjective' && (word as any).governance && (word as any).governance.length > 0 && (
                        <div className="text-sm text-muted-foreground italic flex flex-col gap-1 text-center w-full mt-2">
                            <div className="space-y-1">
                                {(word as any).governance.map((gov: any, i: number) => (
                                    <div key={i} className="text-xs font-bold text-primary">
                                        {gov.preposition} + {gov.case} <span className="text-muted-foreground">→</span> {gov.meaning}
                                    </div>
                                ))}
                            </div>
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

                    <div className="flex gap-2 mt-4" onClick={(e) => e.stopPropagation()}>
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
                        <div
                            className="text-sm text-muted-foreground italic text-center max-w-full break-words whitespace-normal prose prose-slate dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: `"${userWord.context}"` }}
                        />
                    )}
                    {userWord.contextTranslation && (
                        <div
                            className="text-xs text-muted-foreground/70 text-center max-w-full break-words whitespace-normal prose prose-slate dark:prose-invert"
                            dangerouslySetInnerHTML={{ __html: `(${userWord.contextTranslation})` }}
                        />
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
                    <div className="mt-4 flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <SpeakButton text={formatGermanWord(word)} variant="ghost" size="sm" className="h-8 w-8" />
                    </div>
                </div>
            );
        }
    };

    return (
        <div
            className={cn("relative h-[700px] w-full perspective-1000 cursor-pointer group", className)}
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
                    className={cn("absolute inset-0 backface-hidden flex flex-col shadow-lg hover:shadow-2xl transition-all duration-300 bg-card overflow-hidden", cardStyle)}
                    style={{ backfaceVisibility: 'hidden' }}
                >
                    <div className="flex-grow flex flex-col p-6 items-center justify-between text-center relative z-10">
                        {renderFrontContent()}
                    </div>

                    <div className="absolute bottom-3 right-3 text-xs text-muted-foreground/60 flex items-center gap-1 opacity-50 group-hover:opacity-100 transition-opacity bg-background/40 px-2 py-1 rounded backdrop-blur-sm pointer-events-none">
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
                    className={cn("absolute inset-0 backface-hidden rotate-y-180 bg-muted shadow-lg flex flex-col overflow-hidden", cardStyle)}
                    style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden' }}
                >
                    <div className="flex-grow flex flex-col p-6 items-center justify-center text-center space-y-4 relative z-10 w-full">
                        {renderBackContent()}
                    </div>
                </Card>
            </motion.div>
        </div>
    );
}
