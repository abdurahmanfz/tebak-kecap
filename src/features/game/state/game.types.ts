/**
 * ============================================================================
 * GAME STATE TYPES
 * ============================================================================
 * 
 * Defines the structure of game state and all possible actions
 */

import type { WordEntry, CategoryFilter } from '../types';

/**
 * Main game state interface
 */
export interface GameState {
  // Current word being guessed
  currentWord: WordEntry | null;
  
  // Game settings
  selectedCategory: CategoryFilter;
  
  // Game progress
  guessedLetters: Set<string>;
  wrongLetters: string[];
  lives: number;
  roundOver: boolean;
  
  // Scoring
  score: number;
  streak: number;
  correctCombo: number; // Consecutive correct guesses for audio progression
  
  // Tracking
  usedWords: Set<string>; // Words already played in current session
  
  // Audio & UI preferences
  isMuted: boolean;
  showVirtualKeyboard: boolean; // Toggle virtual keyboard visibility
}

/**
 * Game action types
 */
export enum GameActionType {
  // Game lifecycle
  START_ROUND = 'START_ROUND',
  END_ROUND = 'END_ROUND',
  RESET_GAME = 'RESET_GAME',
  
  // Category
  SET_CATEGORY = 'SET_CATEGORY',
  
  // Gameplay
  GUESS_LETTER = 'GUESS_LETTER',
  USE_HINT = 'USE_HINT',
  
  // Audio & UI preferences
  TOGGLE_MUTE = 'TOGGLE_MUTE',
  TOGGLE_VIRTUAL_KEYBOARD = 'TOGGLE_VIRTUAL_KEYBOARD',
}

/**
 * Action payload types
 */
export type GameAction =
  | { type: GameActionType.START_ROUND; payload: { word: WordEntry } }
  | { type: GameActionType.END_ROUND; payload: { won: boolean } }
  | { type: GameActionType.RESET_GAME }
  | { type: GameActionType.SET_CATEGORY; payload: { category: CategoryFilter } }
  | { type: GameActionType.GUESS_LETTER; payload: { letter: string; isCorrect: boolean } }
  | { type: GameActionType.USE_HINT; payload: { revealedLetter: string } }
  | { type: GameActionType.TOGGLE_MUTE }
  | { type: GameActionType.TOGGLE_VIRTUAL_KEYBOARD };

/**
 * Detect if device is likely mobile/tablet (no physical keyboard)
 */
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) 
    || window.matchMedia('(max-width: 768px)').matches;
}

/**
 * Initial game state factory
 */
export function createInitialGameState(): GameState {
  return {
    currentWord: null,
    selectedCategory: 'Sadaya',
    guessedLetters: new Set(),
    wrongLetters: [],
    lives: 6,
    roundOver: false,
    score: 0,
    streak: 0,
    correctCombo: 0,
    usedWords: new Set(),
    isMuted: false,
    showVirtualKeyboard: isMobileDevice(), // Auto-enable on mobile
  };
}
