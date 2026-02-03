import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { storage } from '@/lib/storage';

const KNOWN_WORDS_KEY = 'knownWords';

export function useKnownWords() {
  const userId = "anonymous";
  const [localKnownWords, setLocalKnownWords] = useState<string[]>([]);
  const [syncEnabled, setSyncEnabled] = useState(false);

  useEffect(() => {
    setSyncEnabled(storage.isCloudSyncEnabled());
  }, []);

  // 1. Convex Hooks
  const cloudWordsRaw = useQuery(
    api.knownWords.getKnownWords,
    syncEnabled ? { userId } : "skip"
  );
  const addWordMutation = useMutation(api.knownWords.addKnownWord);
  const removeWordMutation = useMutation(api.knownWords.removeKnownWord);

  // 2. Load from localStorage as initial fallback
  useEffect(() => {
    try {
      const item = window.localStorage.getItem(KNOWN_WORDS_KEY);
      if (item) setLocalKnownWords(JSON.parse(item));
    } catch (e) {
      console.error('Error reading known words from localStorage', e);
    }
  }, []);

  // 3. Map Cloud Data
  const knownWords = useMemo(() => {
    return cloudWordsRaw || localKnownWords;
  }, [cloudWordsRaw, localKnownWords]);

  // 4. Sync Cloud -> Local
  useEffect(() => {
    if (cloudWordsRaw) {
      window.localStorage.setItem(KNOWN_WORDS_KEY, JSON.stringify(cloudWordsRaw));
    }
  }, [cloudWordsRaw]);

  const addKnownWord = useCallback(async (word: string) => {
    if (!knownWords.includes(word)) {
      // Optimistic update
      setLocalKnownWords(prev => [...prev, word]);
      try {
        if (syncEnabled) {
          await addWordMutation({ userId, word });
        }
      } catch (e) {
        console.error("Failed to add known word to cloud:", e);
      }
    }
  }, [knownWords, addWordMutation, userId, syncEnabled]);

  const removeKnownWord = useCallback(async (word: string) => {
    if (knownWords.includes(word)) {
      setLocalKnownWords(prev => prev.filter(w => w !== word));
      try {
        if (syncEnabled) {
          await removeWordMutation({ userId, word });
        }
      } catch (e) {
        console.error("Failed to remove known word from cloud:", e);
      }
    }
  }, [knownWords, removeWordMutation, userId, syncEnabled]);

  const isKnown = useCallback((word: string) => {
    return knownWords.includes(word);
  }, [knownWords]);

  return {
    knownWords,
    addKnownWord,
    removeKnownWord,
    isKnown,
    isLoading: syncEnabled && cloudWordsRaw === undefined
  };
}
