'use client';

import type { VocabularyWord } from '@/lib/types';
import { useState, useEffect } from 'react';
import { WordCard } from '@/components/word-card';
import { useKnownWords } from '@/hooks/use-known-words';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Plus } from 'lucide-react';
import { expandVocabularyWithAI } from '@/ai/flows/expand-vocabulary';
import { usePathname } from 'next/navigation';

export function TopicVocabulary({ words, topicTitle }: { words: VocabularyWord[], topicTitle: string }) {
  const { isKnown } = useKnownWords();
  const [wordsForLearning, setWordsForLearning] = useState(words);
  const [extraWords, setExtraWords] = useState<VocabularyWord[]>([]);
  const [isClient, setIsClient] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);

  // We need context (Title/Level) to generate relevant words.
  // In a real app we'd pass these as props. For now, we will infer or ask for them.
  // Ideally, update the component signature in the parent to pass `topicTitle` and `levelId`.
  // BUT for now, let's just use the words we have to infer context or simplistic placeholders if props aren't available.
  // Wait, I should update the parent to pass title.
  // Let's implement the logic first, assuming props are passed, then I'll fix the parent.

  // NOTE: I will update the parent `page.tsx` next to pass these props.
  // For now, I'll add them to the component input type.

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      setWordsForLearning(words.filter(word => !isKnown(word.german)));
    }
  }, [words, isKnown, isClient]);

  const handleExpand = async () => {
    setIsExpanding(true);
    try {
      // Title passed via props

      const newWords = await expandVocabularyWithAI(topicTitle, [...words, ...extraWords].map(w => w.german), 'A1-A2');
      setExtraWords(prev => [...prev, ...newWords]);
    } catch (e) {
      console.error(e);
    } finally {
      setIsExpanding(false);
    }
  };

  const allDisplayWords = [...wordsForLearning, ...extraWords];

  if (!isClient) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {words.map((word, i) => (
          <WordCard key={word.german + i} word={word} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {allDisplayWords.length === 0 ? (
        <div className="text-center text-muted-foreground p-4">
          <p>Вы уже отметили все базовые слова как известные.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allDisplayWords.map((word, i) => (
            <WordCard key={word.german + i} word={word} />
          ))}
        </div>
      )}

      <div className="flex flex-col items-center">
        <Button
          onClick={handleExpand}
          disabled={isExpanding}
          variant="outline"
          className="w-full sm:w-auto border-dashed border-2 h-16 text-lg hover:border-primary/50 hover:bg-primary/5 gap-2"
        >
          {isExpanding ? (
            <>
              <Loader2 className="animate-spin" />
              ИИ ищет новые слова...
            </>
          ) : (
            <>
              <Plus className="h-5 w-5" />
              <span className="font-bold">Добавить 15 слов по этой теме</span>
              <Sparkles className="h-4 w-4 text-amber-500" />
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground mt-2">
          Сгенерированные слова не сохраняются в курс навсегда, но вы можете добавить их в свои папки.
        </p>
      </div>
    </div>
  );
}
