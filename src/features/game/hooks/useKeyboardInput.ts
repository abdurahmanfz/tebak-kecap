/**
 * ============================================================================
 * KEYBOARD INPUT HOOK
 * ============================================================================
 * 
 * Listens to physical keyboard input for letter guessing
 * Supports A-Z keys, Enter for hints, and Space for next round
 */

import { useEffect } from 'react';
import { useGameState, useGameActions, useGameSelectors } from '../state';

interface UseKeyboardInputOptions {
  onNextRound?: () => void;
  enabled?: boolean;
}

export function useKeyboardInput(options: UseKeyboardInputOptions = {}) {
  const { onNextRound, enabled = true } = options;
  
  const { guessedLetters, roundOver } = useGameState();
  const { guessLetter, useHint } = useGameActions();
  const { isGameOver, canUseHint } = useGameSelectors();

  useEffect(() => {
    if (!enabled) return;

    const handleKeyPress = (event: KeyboardEvent) => {
      const key = event.key.toUpperCase();

      // Prevent default behavior for game keys
      if (/^[A-Z]$/.test(key) || key === 'ENTER' || key === ' ') {
        event.preventDefault();
      }

      // If round is over, Space/Enter triggers next round
      if (roundOver) {
        if ((key === ' ' || key === 'ENTER') && onNextRound) {
          onNextRound();
        }
        return;
      }

      // Game is over (no lives), don't accept input
      if (isGameOver()) {
        return;
      }

      // Letter keys (A-Z)
      if (/^[A-Z]$/.test(key)) {
        // Don't guess if already guessed
        if (!guessedLetters.has(key)) {
          guessLetter(key);
        }
        return;
      }

      // Enter key - use hint
      if (key === 'ENTER') {
        if (canUseHint()) {
          useHint();
        }
        return;
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [
    enabled,
    guessedLetters,
    roundOver,
    isGameOver,
    canUseHint,
    guessLetter,
    useHint,
    onNextRound,
  ]);
}
