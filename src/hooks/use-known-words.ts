'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { storage } from '@/lib/storage';

export function useKnownWords() {
  const [localKnownWords, setLocalKnownWords] = useState<string[]>([]);
  const [isInitialLoadDone, setIsInitialLoadDone] = useState(false);

  useEffect(() => {
    setLocalKnownWords(storage.getKnownWords());
    setIsInitialLoadDone(true);
  }, []);

  const addKnownWord = useCallback(async (word: string) => {
    setLocalKnownWords(prev => {
      if (prev.includes(word)) return prev;
      const next = [...prev, word];
      storage.setKnownWords(next);
      return next;
    });
  }, []);

  const removeKnownWord = useCallback(async (word: string) => {
    setLocalKnownWords(prev => {
      if (!prev.includes(word)) return prev;
      const next = prev.filter(w => w !== word);
      storage.setKnownWords(next);
      return next;
    });
  }, []);

  const isKnown = useCallback((word: string) => {
    return localKnownWords.includes(word);
  }, [localKnownWords]);

  return useMemo(() => ({
    knownWords: localKnownWords,
    addKnownWord,
    removeKnownWord,
    isKnown,
    isLoading: !isInitialLoadDone
  }), [localKnownWords, addKnownWord, removeKnownWord, isKnown, isInitialLoadDone]);
}
