import { VocabularyWord } from "./types";

/**
 * Safely formats a German word, adding the article for nouns if not already present.
 * Prevents issues like "die die Reinigung".
 */
export function formatGermanWord(word: VocabularyWord): string {
    if (word.type === 'noun') {
        const german = word.german.trim();
        const article = word.article.trim();

        // Check if the german string already starts with an article (case-insensitive)
        const lowerGerman = german.toLowerCase();
        const articles = ['der ', 'die ', 'das '];

        if (articles.some(a => lowerGerman.startsWith(a))) {
            // If it starts with ANY article, return as is (trusting the data or AI)
            // or we could normalize it to use word.article. 
            // Let's normalize it for consistency if it starts with the WRONG article?
            // For now, let's just return it if it has ANY article to avoid "die die".
            return word.german;
        }

        return `${article} ${german}`;
    }

    return word.german;
}
