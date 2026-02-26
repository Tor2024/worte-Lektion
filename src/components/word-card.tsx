
'use client';

import type { VocabularyWord } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { RefreshCw, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { SpeakButton } from '@/components/speak-button';
import { formatGermanWord, getGenderColorClass, getGermanType, getRussianType } from '@/lib/german-utils';

export function WordCard({ word, onTranslationSelect }: { word: VocabularyWord, onTranslationSelect?: (translation: string) => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset flip state when the word changes
  useEffect(() => {
    setIsFlipped(false);
  }, [word]);

  const handleFlip = () => setIsFlipped(!isFlipped);

  const getGermanDisplay = () => formatGermanWord(word);

  const renderTranslationSelector = (className = "text-lg font-medium text-foreground/70 italic leading-snug") => {
    if (!word.allTranslations) {
      const defaultClasses = className.includes("text-") ? className : cn("text-3xl font-black text-primary leading-none", className);
      return <p className={defaultClasses}>{word.russian}</p>;
    }

    return (
      <div className="flex flex-wrap justify-center gap-2 mt-2 w-full">
        {word.allTranslations.split(/[;,]+/).map(t => t.trim()).filter(Boolean).map((translation, idx) => {
          const isSelected = translation.toLowerCase() === word.russian.toLowerCase();
          return (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSelected && onTranslationSelect) onTranslationSelect(translation);
              }}
              className={cn(
                "text-sm font-medium px-3 py-1.5 rounded-full transition-all border",
                isSelected
                  ? "bg-primary text-primary-foreground border-primary shadow-sm"
                  : "bg-muted/50 text-muted-foreground border-transparent hover:bg-muted hover:text-foreground",
                onTranslationSelect && !isSelected ? "cursor-pointer" : "cursor-default"
              )}
              title={onTranslationSelect ? (isSelected ? "Главный перевод" : "Сделать главным переводом") : undefined}
            >
              {translation}
            </button>
          );
        })}
      </div>
    );
  };

  const renderDetails = () => {
    switch (word.type) {
      case 'noun':
        return (
          <>
            <p><span className="font-semibold">Ед. число:</span> {formatGermanWord(word)}</p>
            <p><span className="font-semibold">Мн. число:</span> {word.pluralArticle} {word.plural}</p>
            <p className="mt-2 italic text-muted-foreground">Пример (ед.ч.): {word.exampleSingular}</p>
            <p className="italic text-muted-foreground">Пример (мн.ч.): {word.examplePlural}</p>
          </>
        );
      case 'verb':
        return (
          <>
            <p className="italic text-muted-foreground">{word.conjugation}</p>
            {word.conjugations && (
              <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1 text-xs bg-muted/30 p-2 rounded-md">
                <div>ich {word.conjugations.ich}</div>
                <div>wir {word.conjugations.wir}</div>
                <div>du {word.conjugations.du}</div>
                <div>ihr {word.conjugations.ihr}</div>
                <div>er/sie/es {word.conjugations.er_sie_es}</div>
                <div>sie/Sie {word.conjugations.sie_Sie}</div>
              </div>
            )}
            <p className="mt-2 italic text-muted-foreground">Пример: {word.example}</p>
          </>
        );
      case 'adjective':
        return (
          <>
            <p>{word.german} → {word.comparative} → {word.superlative}</p>
            <p className="mt-2 italic text-muted-foreground">Пример: {word.example}</p>
          </>
        );
      case 'conjunction':
        return (
          <>
            <p className="italic text-muted-foreground">{word.structure}</p>
            <p className="mt-2 italic text-muted-foreground">Пример: {word.example}</p>
          </>
        );
      case 'preposition':
        return (
          <>
            <p className="font-semibold">Требует падеж: <span className="text-primary">{word.case}</span></p>
            <p className="mt-2 italic text-muted-foreground">Пример: {word.example}</p>
          </>
        );
      default:
        if ('example' in word) {
          return <p className="italic text-muted-foreground">{word.example}</p>;
        }
        return null;
    }
  };

  return (
    <div
      className="relative h-[520px] w-full cursor-pointer rounded-lg border bg-card text-card-foreground shadow-sm transition-transform duration-500 [transform-style:preserve-3d]"
      onClick={handleFlip}
      style={{ transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
    >
      {/* Front of the card (German) */}
      <div className={cn("flex h-full w-full flex-col p-4 [backface-visibility:hidden]")}>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div className="flex flex-col gap-1">
              <div className="flex flex-col items-start gap-0.5">
                <p className="text-2xl font-bold break-words text-primary">{getGermanDisplay()}</p>

                {/* Legacy case fallback for verbs */}
                {word.type === 'verb' && !((word as any).governance && (word as any).governance.length > 0) && ((word as any).preposition || (word as any).case) && (
                  <div className="text-sm font-bold text-primary/80 leading-none">
                    + {[(word as any).preposition, (word as any).case].filter(Boolean).join(' ')}
                  </div>
                )}
              </div>

              {/* Unobtrusive Synonyms block if available on the word object */}
              {(word as any).synonyms && (word as any).synonyms.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1 opacity-60 hover:opacity-100 transition-opacity">
                  {(word as any).synonyms.map((s: any, idx: number) => (
                    <span key={idx} className="text-[10px] font-medium text-muted-foreground px-1.5 py-0.5 rounded-full bg-muted/50 border border-border/50">
                      ≈ {s.word} ({s.translation})
                    </span>
                  ))}
                </div>
              )}

              <SpeakButton text={getGermanDisplay()} size="sm" variant="secondary" className="w-fit h-7 px-2 mt-1" showText />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant="secondary">{getGermanType(word.type)}</Badge>
              {(word as any).needsUpdate && (
                <div className="bg-red-500 text-white p-1 rounded-full animate-pulse shadow-lg" title="Требуется обновление">
                  <HelpCircle className="h-4 w-4" />
                </div>
              )}
            </div>
          </div>
          <Separator className="my-3" />
          <div className="flex-grow overflow-y-auto min-h-0 pr-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            <div className="text-sm space-y-1 pb-2">
              {renderDetails()}
            </div>
            {/* All Translations (Context) - NEW */}
            <div className="mt-2 pt-3 border-t border-primary/10">
              {renderTranslationSelector()}
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3" />
          <span>Нажмите, чтобы перевернуть</span>
        </div>
      </div>

      {/* Back of the card (Russian) */}
      <div
        className={cn("absolute inset-0 flex h-full w-full flex-col rounded-lg border bg-card p-4 text-card-foreground [backface-visibility:hidden] [transform:rotateY(180deg)]")}
      >
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">B2 Beruf Focus</div>
              {renderTranslationSelector("text-3xl font-black text-primary leading-none")}
              <div className="flex items-center gap-2">
                <p className="text-lg text-muted-foreground">{getGermanDisplay()}</p>
                <SpeakButton text={getGermanDisplay()} size="icon" className="h-6 w-6" />
              </div>
            </div>
            <Badge variant="outline">{getRussianType(word.type)}</Badge>
          </div>
          <Separator className="my-3" />
          <div className="flex-grow overflow-y-auto min-h-0 pr-1 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            <div className="text-sm space-y-1 pb-2">
              {renderDetails()}
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center justify-end gap-1 text-xs text-muted-foreground">
          <RefreshCw className="h-3 w-3" />
          <span>Нажмите, чтобы перевернуть</span>
        </div>
      </div>
    </div>
  );
};

