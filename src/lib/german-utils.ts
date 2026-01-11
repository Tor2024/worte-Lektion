import { VocabularyWord } from "./types";

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
