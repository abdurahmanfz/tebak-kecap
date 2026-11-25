/**
 * ============================================================================
 * GAME STATE REDUCER
 * ============================================================================
 * 
 * Pure functions for state transitions
 */

import type { GameState, GameAction } from './game.types';
import { GameActionType } from './game.types';
import { MAX_LIVES, BASE_POINTS, LIFE_BONUS } from '../constants';
import { normalizePhrase } from '../utils';

/**
 * Main game reducer
 * Handles all state transitions in a predictable, pure way
 */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case GameActionType.START_ROUND: {
      const { word } = action.payload;
      
      return {
        ...state,
        currentWord: word,
        guessedLetters: new Set(),
        wrongLetters: [],
        lives: MAX_LIVES,
        roundOver: false,
        correctCombo: 0,
        usedWords: new Set([...state.usedWords, word.display]),
      };
    }

    case GameActionType.END_ROUND: {
      const { won } = action.payload;
      
      if (won) {
        // Calculate points: base + bonus per remaining life
        const roundPoints = BASE_POINTS + (state.lives * LIFE_BONUS);
        
        return {
          ...state,
          roundOver: true,
          score: state.score + roundPoints,
          streak: state.streak + 1,
        };
      } else {
        // Lost the round
        return {
          ...state,
          roundOver: true,
          streak: 0, // Reset streak on loss
        };
      }
    }

    case GameActionType.RESET_GAME: {
      return {
        ...state,
        score: 0,
        streak: 0,
        usedWords: new Set(),
        currentWord: null,
        guessedLetters: new Set(),
        wrongLetters: [],
        lives: MAX_LIVES,
        roundOver: false,
        correctCombo: 0,
      };
    }

    case GameActionType.SET_CATEGORY: {
      const { category } = action.payload;
      
      return {
        ...state,
        selectedCategory: category,
        // Reset used words when changing category
        usedWords: new Set(),
      };
    }

    case GameActionType.GUESS_LETTER: {
      const { letter, isCorrect } = action.payload;
      
      if (isCorrect) {
        // Correct guess
        return {
          ...state,
          guessedLetters: new Set([...state.guessedLetters, letter]),
          correctCombo: state.correctCombo + 1,
        };
      } else {
        // Wrong guess - lose a life
        return {
          ...state,
          wrongLetters: [...state.wrongLetters, letter],
          lives: Math.max(0, state.lives - 1),
          correctCombo: 0, // Reset combo on wrong guess
        };
      }
    }

    case GameActionType.USE_HINT: {
      const { revealedLetter } = action.payload;
      
      return {
        ...state,
        guessedLetters: new Set([...state.guessedLetters, revealedLetter]),
        // Hint costs 15 points
        score: Math.max(0, state.score - 15),
      };
    }

    case GameActionType.TOGGLE_MUTE: {
      return {
        ...state,
        isMuted: !state.isMuted,
      };
    }

    case GameActionType.TOGGLE_VIRTUAL_KEYBOARD: {
      return {
        ...state,
        showVirtualKeyboard: !state.showVirtualKeyboard,
      };
    }

    default:
      return state;
  }
}

/**
 * ============================================================================
 * SELECTORS
 * ============================================================================
 * 
 * Derived state calculations
 */

/**
 * Check if the current word is completely solved
 */
export function isWordSolved(state: GameState): boolean {
  if (!state.currentWord) return false;
  
  const normalized = normalizePhrase(state.currentWord.display);
  const lettersOnly = normalized.replace(/[^A-Z]/g, '');
  
  return lettersOnly.split('').every(letter => state.guessedLetters.has(letter));
}

/**
 * Check if the game is over (out of lives)
 */
export function isGameOver(state: GameState): boolean {
  return state.lives <= 0;
}

/**
 * Check if a letter has already been guessed
 */
export function isLetterGuessed(state: GameState, letter: string): boolean {
  return state.guessedLetters.has(letter) || state.wrongLetters.includes(letter);
}

/**
 * Check if hint can be used (requires 15+ points and game not over)
 */
export function canUseHint(state: GameState): boolean {
  return state.score >= 15 && !state.roundOver && state.currentWord !== null;
}

/**
 * Get all letters in the current word that haven't been guessed yet
 */
export function getUnguessedLetters(state: GameState): string[] {
  if (!state.currentWord) return [];
  
  const normalized = normalizePhrase(state.currentWord.display);
  const lettersOnly = normalized.replace(/[^A-Z]/g, '');
  const uniqueLetters = [...new Set(lettersOnly.split(''))];
  
  return uniqueLetters.filter(letter => !state.guessedLetters.has(letter));
}

/**
 * Get a random unguessed letter (for hint feature)
 */
export function getRandomUnguessedLetter(state: GameState): string | null {
  const unguessed = getUnguessedLetters(state);
  
  if (unguessed.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * unguessed.length);
  return unguessed[randomIndex];
}
