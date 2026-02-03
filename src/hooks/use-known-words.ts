'use client';

import { useState, useEffect, useCallback } from 'react';
import { storage } from '@/lib/storage';

export function useKnownWords() {
  const [localKnownWords, setLocalKnownWords] = useState<string[]>([]);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

  useEffect(() => {
    setLocalKnownWords(storage.getKnownWords());
    setIsInitialLoadDone(true);
  }, []);

  const addKnownWord = useCallback(async (word: string) => {
    if (!localKnownWords.includes(word)) {
      const nextWords = [...localKnownWords, word];
      setLocalKnownWords(nextWords);
      storage.setKnownWords(nextWords);
    }
  }, [localKnownWords]);

  const removeKnownWord = useCallback(async (word: string) => {
    if (localKnownWords.includes(word)) {
      const nextWords = localKnownWords.filter(w => w !== word);
      setLocalKnownWords(nextWords);
      storage.setKnownWords(nextWords);
    }
  }, [localKnownWords]);

  const isKnown = useCallback((word: string) => {
    return localKnownWords.includes(word);
  }, [localKnownWords]);

  return {
    knownWords: localKnownWords,
    addKnownWord,
    removeKnownWord,
    isKnown,
    isLoading: !isInitialLoadDone
  };
}
