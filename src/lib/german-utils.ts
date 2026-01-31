import { VocabularyWord, UserVocabularyWord } from "./types";

/**
 * Safely formats a German word, adding the article for nouns if not already present.
 * Prevents issues like "die die Reinigung".
 */
export function formatGermanWord(word: VocabularyWord): string {
    if (!word || !word.german) return ""; // Safety check

    if (word.type === 'noun') {
        const german = (word.german || "").trim();
        const article = (word.article || "").trim();

        // Check if the german string already starts with an article (case-insensitive)
        const lowerGerman = german.toLowerCase();
        const articles = ['der ', 'die ', 'das '];

        if (articles.some(a => lowerGerman.startsWith(a))) {
            return word.german;
        }

        if (article) {
            return `${article} ${german}`;
        }
    }

    return word.german;
}

/**
 * Strips markdown and other technical characters that shouldn't be voiced by TTS.
 * Prevents hearing "stern" or "star" when encountering bold (**) or italic (*) text.
 */
export function cleanTextForSpeech(text: string): string {
    if (!text) return "";
    return text.replace(/[*_~`#]/g, '');
}
/**
 * Checks if a word meets the new B2 Beruf standardization criteria.
 * Used for UI indicators (dots/circles) and smart batch updates.
 */
export function isWordStandardized(userWord: UserVocabularyWord): boolean {
    if (!userWord || !userWord.word) return false;
    const word = userWord.word;

    // 1. Basic check: all words should have allTranslations if updated
    if (!word.allTranslations) return false;

    // 2. Synonyms check: updated words should have synonyms
    if (!userWord.synonyms || userWord.synonyms.length === 0) return false;

    // 3. Example check: handle naming inconsistency (example vs exampleSingular)
    const hasExample = word.type === 'noun'
        ? !!(word as any).exampleSingular || !!(word as any).example
        : !!(word as any).example;

    if (!hasExample) return false;

    // 4. Type-specific checks
    if (word.type === 'verb') {
        const hasGov = (word as any).governance?.length > 0;
        const hasConj = !!(word as any).conjugations;
        return hasGov && hasConj;
    }

    if (word.type === 'noun') {
        return !!((word as any).plural && (word as any).article);
    }

    // Adjectives, conjunctions etc are considered standardized if basic checks pass
    return true;
}
