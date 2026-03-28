'use client';

import { VocabularyWord } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { formatGermanWord, getGenderColorClass, getGermanType } from '@/lib/german-utils';
import { SpeakButton } from '@/components/speak-button';
import { cn } from '@/lib/utils';
import { FormattedGermanWord } from '../formatted-german-word';

import { useSpeech } from '@/hooks/use-speech';
 
interface UnifiedWordHeaderProps {
    word: VocabularyWord;
    className?: string;
    showRussian?: boolean;
    russianTitle?: string;
    isDark?: boolean;
}
 
export function UnifiedWordHeader({ word, className, showRussian = false, russianTitle, isDark = false }: UnifiedWordHeaderProps) {
    const genderClass = getGenderColorClass(word);
    const { speak } = useSpeech();
    
    const handleSpeakGerman = () => speak(formatGermanWord(word), 'de-DE');
    const handleSpeakRussian = () => speak(russianTitle || word.russian, 'ru-RU');

    // Type-specific colors for badges
    const getTypeBadgeClass = (type: string) => {
        switch (type) {
            case 'noun': return 'bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-500/20 dark:text-blue-400 dark:border-blue-800';
            case 'verb': return 'bg-amber-500/10 text-amber-600 border-amber-200 dark:bg-amber-500/20 dark:text-amber-400 dark:border-amber-800';
            case 'adjective': return 'bg-indigo-500/10 text-indigo-600 border-indigo-200 dark:bg-indigo-500/20 dark:text-indigo-400 dark:border-indigo-800';
            case 'preposition': return 'bg-rose-500/10 text-rose-600 border-rose-200 dark:bg-rose-500/20 dark:text-rose-400 dark:border-rose-800';
            default: return 'bg-slate-500/10 text-slate-600 border-slate-200 dark:bg-slate-500/20 dark:text-slate-400 dark:border-slate-800';
        }
    };
 
    return (
        <div className={cn("w-full flex flex-col items-center space-y-2", className)}>
            <div className="w-full flex justify-between items-start">
                {/* Part of Speech & Level */}
                <div className="flex gap-2">
                    <Badge variant="outline" className={cn("font-black uppercase tracking-widest text-[10px] px-3 py-1 border-2", getTypeBadgeClass(word.type))}>
                        {getGermanType(word.type)}
                    </Badge>
                    {word.level && (
                        <Badge variant="secondary" className="font-black text-[10px] px-3 py-1 bg-primary/10 text-primary border-primary/20 border-2">
                            {word.level}
                        </Badge>
                    )}
                </div>
 
                {/* Speaker Button */}
                <SpeakButton text={formatGermanWord(word)} size="sm" variant="ghost" className="h-8 w-8 text-primary/40 hover:text-primary transition-colors" />
            </div>
 
            {/* Main Word */}
            <div className="flex flex-col items-center">
                <h2 
                    onClick={handleSpeakGerman}
                    className={cn(
                        "text-4xl sm:text-5xl font-black tracking-tighter transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95",
                        isDark ? "text-white" : "text-slate-900 shadow-sm"
                    )}
                >
                    <FormattedGermanWord word={word} />
                </h2>
 
                {/* Grammar Bar */}
                <div className="flex flex-wrap gap-2 justify-center mt-1.5 opacity-60">
                    {word.type === 'noun' && (word.plural || word.pluralArticle) && (
                        <div className="text-[12px] font-bold text-slate-500 flex gap-1">
                            <span className="opacity-40 uppercase text-[9px] mt-0.5">Pl:</span>
                            <span>{word.pluralArticle} {word.plural}</span>
                        </div>
                    )}
                    {word.type === 'verb' && (word.conjugation || word.perfektForm) && (
                        <div className="flex gap-3 text-[12px] font-bold text-slate-500">
                            {word.conjugation && <span>{word.conjugation}</span>}
                            {word.perfektForm && <span className="text-emerald-600 dark:text-emerald-400">{word.perfektForm}</span>}
                        </div>
                    )}
                    {word.type === 'adjective' && (word.comparative || word.superlative) && (
                        <div className="text-[12px] font-bold text-slate-500 flex gap-2 italic">
                            <span>{word.comparative}</span>
                            <span className="opacity-30">|</span>
                            <span>{word.superlative}</span>
                        </div>
                    )}
                    {word.type === 'preposition' && (word as any).case && (
                        <div className="text-[12px] font-bold text-rose-600 dark:text-rose-400 flex gap-1 italic">
                            <span className="opacity-40 uppercase text-[9px] mt-0.5">Kasus:</span>
                            <span>{(word as any).case}</span>
                        </div>
                    )}
                    {/* Verb/Adjective Governance (Rektion) */}
                    {(word.type === 'verb' || word.type === 'adjective') && (word as any).governance && (word as any).governance.length > 0 && (
                        <div className="flex gap-2 text-[12px] font-black items-center">
                            <span className="opacity-30 text-[9px] uppercase">Rektion:</span>
                            {(word as any).governance.map((gov: any, idx: number) => (
                                <div key={idx} className="flex gap-1 items-center">
                                    <span className="text-primary">+ {gov.preposition}</span>
                                    <span className={cn(
                                        "text-[10px] px-1.5 py-0.5 rounded-md text-white",
                                        gov.case === 'Akkusativ' ? "bg-red-500/80" : 
                                        gov.case === 'Dativ' ? "bg-emerald-500/80" : "bg-slate-500"
                                    )}>
                                        {gov.case === 'Akkusativ' ? 'Akk' : gov.case === 'Dativ' ? 'Dat' : gov.case}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                {showRussian && (
                    <div className="mt-1 flex flex-col items-center group">
                        <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/40 mb-0.5">Перевод</div>
                        <div 
                            onClick={handleSpeakRussian}
                            className={cn(
                                "text-xl sm:text-2xl font-black italic tracking-tight cursor-pointer hover:text-primary transition-all hover:scale-105 active:scale-95",
                                isDark ? "text-primary" : "text-primary/70"
                            )}
                        >
                            {russianTitle || word.russian}
                        </div>
                        <div className="h-0.5 w-0 group-hover:w-full bg-primary/20 transition-all duration-300 mt-0.5" />
                    </div>
                )}
            </div>
        </div>
    );
}
