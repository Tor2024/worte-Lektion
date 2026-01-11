
export interface Exercise {
  id: string;
  type: 'fill-in-the-blank' | 'multiple-choice' | 'translation' | 'free-text-sentence' | 'word-order';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
}

export type WordType = 'noun' | 'verb' | 'adjective' | 'conjunction' | 'preposition' | 'adverb' | 'other';

interface BaseVocabularyWord {
  german: string;
  russian: string;
}

interface Noun extends BaseVocabularyWord {
  type: 'noun';
  article: 'der' | 'die' | 'das';
  plural: string;
  pluralArticle: 'die' | '-';
  exampleSingular: string;
  examplePlural: string;
  isIrregular?: boolean;
}

export interface Governance {
  preposition: string; // e.g. "auf", "an", or "без предлога"
  case: 'Akkusativ' | 'Dativ' | 'Genitiv' | 'Nominativ' | 'no-case';
  meaning: string; // Russian explanation
  example: string; // German example sentence
}

interface Verb extends BaseVocabularyWord {
  type: 'verb';
  conjugation: string; // 3rd person singular Present
  conjugations?: {
    ich: string;
    du: string;
    er_sie_es: string;
    wir: string;
    ihr: string;
    sie_Sie: string;
  };
  example: string;
  // New fields for extended learning
  perfektForm?: string; // "hat gemacht", "ist gegangen"
  auxiliaryVerb?: 'haben' | 'sein';
  preposition?: string; // e.g. "auf"
  case?: 'Akkusativ' | 'Dativ' | 'Genitiv' | 'Nominativ'; // e.g. "Akkusativ" for "warten auf + Akk"
  governance?: Governance[];
}

interface Adjective extends BaseVocabularyWord {
  type: 'adjective';
  comparative: string;
  superlative: string;
  example: string;
  governance?: Governance[];
}

interface Conjunction extends BaseVocabularyWord {
  type: 'conjunction';
  structure: string;
  example: string;
}

interface Preposition extends BaseVocabularyWord {
  type: 'preposition';
  case: 'Akkusativ' | 'Dativ' | 'Wechselpräposition' | 'Genitiv';
  example: string;
}

interface Adverb extends BaseVocabularyWord {
  type: 'adverb';
  structure?: string;
  example: string;
}

interface OtherWord extends BaseVocabularyWord {
  type: 'other';
  example: string;
}

export interface Synonym {
  word: string;
  translation: string;
}

export type VocabularyWord = Noun | Verb | Adjective | Conjunction | Preposition | Adverb | OtherWord;

export interface SM2State {
  interval: number;
  repetitions: number;
  easeFactor: number;
  nextReviewDate: number | null;
  step?: number;
}

export interface UserVocabularyWord {
  id: string;
  word: VocabularyWord;
  sm2State: SM2State;
  context?: string;
  contextTranslation?: string;
  synonyms?: Synonym[];
  antonyms?: Synonym[];
  addedAt: number;
  deepDiveStage?: number; // 0=None, 1=Podcast, 2=Collocation, 3=Synonym, 4=Interview
}

export interface CustomFolder {
  id: string;
  name: string;
  words: UserVocabularyWord[];
  createdAt: number;
  updatedAt: number;
}


export interface VocabularyTheme {
  theme: string;
  words: VocabularyWord[];
}

export interface Topic {
  id: string;
  title: string;
  explanation: string;
  exercises: Exercise[];
  vocabulary: VocabularyTheme[];
}

export interface Level {
  id: string;
  title: string;
  description: string;
  topics: Topic[];
}

export interface Curriculum {
  levels: Level[];
}

export const INITIAL_SM2_STATE: SM2State = {
  interval: 0,
  repetitions: 0,
  easeFactor: 2.5,
  nextReviewDate: null,
};
