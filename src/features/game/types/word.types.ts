/**
 * Word entry data structure from the vocabulary bank
 */
export interface WordEntry {
  /** The word to guess (displayed in uppercase) */
  display: string;
  /** Category: Kadaharan | Budaya & Seni | Basa & Paribasa | Tempat & Alam */
  category: GameCategory;
  /** Clue in Sundanese */
  clueSu: string;
  /** Clue in English */
  clueEn: string;
  /** Cultural trivia about the word */
  trivia: string;
  /** Meaning/translation of the word */
  meaning?: string;
}

/**
 * Game categories
 */
export type GameCategory = 
  | 'Kadaharan'      // Food & Culinary
  | 'Budaya & Seni'    // Culture & Arts
  | 'Basa & Paribasa'  // Language & Wisdom
  | 'Tempat & Alam';   // Places & Nature

/**
 * All available categories including "All" option
 */
export type CategoryFilter = 'Sadaya' | GameCategory;

/**
 * API response structure for words endpoint
 * (prepared for future API integration)
 */
export interface WordsApiResponse {
  data: WordEntry[];
  total: number;
  category?: string;
}
