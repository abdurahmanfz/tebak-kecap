/**
 * ============================================================================
 * GAME STATE HOOKS
 * ============================================================================
 * 
 * Custom hooks for accessing and manipulating game state
 */

import { useContext, useCallback } from 'react';
import { GameContext } from './game.context';
import { GameActionType } from './game.types';
import type { WordEntry, CategoryFilter } from '../types';
import {
  isWordSolved,
  isGameOver,
  isLetterGuessed,
  canUseHint,
  getRandomUnguessedLetter,
} from './game.reducer';
import { normalizeChar } from '../utils';

/**
 * Hook to access game context
 * Throws error if used outside GameProvider
 */
function useGameContext() {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  
  return context;
}

/**
 * Hook to access game state
 * 
 * @example
 * ```tsx
 * const { score, lives, currentWord } = useGameState();
 * ```
 */
export function useGameState() {
  const { state } = useGameContext();
  return state;
}

/**
 * Hook to access game actions
 * Provides convenient action creators that wrap dispatch
 * 
 * @example
 * ```tsx
 * const actions = useGameActions();
 * actions.startRound(wordEntry);
 * actions.guessLetter('A');
 * ```
 */
export function useGameActions() {
  const { state, dispatch } = useGameContext();

  const startRound = useCallback((word: WordEntry) => {
    dispatch({
      type: GameActionType.START_ROUND,
      payload: { word },
    });
  }, [dispatch]);

  const endRound = useCallback((won: boolean) => {
    dispatch({
      type: GameActionType.END_ROUND,
      payload: { won },
    });
  }, [dispatch]);

  const resetGame = useCallback(() => {
    dispatch({
      type: GameActionType.RESET_GAME,
    });
  }, [dispatch]);

  const setCategory = useCallback((category: CategoryFilter) => {
    dispatch({
      type: GameActionType.SET_CATEGORY,
      payload: { category },
    });
  }, [dispatch]);

  const guessLetter = useCallback((letter: string) => {
    if (!state.currentWord) return;
    
    // Normalize the letter
    const normalizedLetter = normalizeChar(letter);
    
    // Check if already guessed
    if (isLetterGuessed(state, normalizedLetter)) {
      return;
    }
    
    // Check if letter is in the word
    const normalizedWord = state.currentWord.display
      .split('')
      .map(char => normalizeChar(char))
      .join('');
    
    const isCorrect = normalizedWord.includes(normalizedLetter);
    
    dispatch({
      type: GameActionType.GUESS_LETTER,
      payload: { letter: normalizedLetter, isCorrect },
    });
    
    // Check win/loss conditions after dispatch
    // Note: These checks use the current state, will be validated in parent component
  }, [state, dispatch]);

  const useHint = useCallback(() => {
    if (!canUseHint(state)) {
      console.warn('Cannot use hint: insufficient score or round is over');
      return;
    }
    
    const revealedLetter = getRandomUnguessedLetter(state);
    
    if (!revealedLetter) {
      console.warn('No letters left to reveal');
      return;
    }
    
    dispatch({
      type: GameActionType.USE_HINT,
      payload: { revealedLetter },
    });
  }, [state, dispatch]);

  const toggleMute = useCallback(() => {
    dispatch({
      type: GameActionType.TOGGLE_MUTE,
    });
  }, [dispatch]);

  const toggleVirtualKeyboard = useCallback(() => {
    dispatch({
      type: GameActionType.TOGGLE_VIRTUAL_KEYBOARD,
    });
  }, [dispatch]);

  return {
    startRound,
    endRound,
    resetGame,
    setCategory,
    guessLetter,
    useHint,
    toggleMute,
    toggleVirtualKeyboard,
  };
}

/**
 * Hook to access game selectors
 * Provides derived state calculations
 * 
 * @example
 * ```tsx
 * const selectors = useGameSelectors();
 * if (selectors.isWordSolved()) {
 *   // Show win modal
 * }
 * ```
 */
export function useGameSelectors() {
  const { state } = useGameContext();

  return {
    isWordSolved: useCallback(() => isWordSolved(state), [state]),
    isGameOver: useCallback(() => isGameOver(state), [state]),
    isLetterGuessed: useCallback((letter: string) => isLetterGuessed(state, letter), [state]),
    canUseHint: useCallback(() => canUseHint(state), [state]),
  };
}

/**
 * All-in-one hook for complete game access
 * Combines state, actions, and selectors
 * 
 * @example
 * ```tsx
 * const game = useGame();
 * 
 * // Access state
 * console.log(game.state.score);
 * 
 * // Use actions
 * game.actions.guessLetter('A');
 * 
 * // Check conditions
 * if (game.selectors.isWordSolved()) {
 *   game.actions.endRound(true);
 * }
 * ```
 */
export function useGame() {
  const state = useGameState();
  const actions = useGameActions();
  const selectors = useGameSelectors();

  return {
    state,
    actions,
    selectors,
  };
}
