/**
 * ============================================================================
 * KEYBOARD COMPONENT
 * ============================================================================
 * 
 * On-screen QWERTY keyboard with letter state indicators
 * Shows correct (green), wrong (red), and unused (default) states
 */

import { motion } from 'framer-motion';
import { useGameState, useGameActions, useGameSelectors } from '../../state';
import { KEYBOARD_ROWS } from '../../constants';

type LetterState = 'correct' | 'wrong' | 'unused';

export function Keyboard() {
  const { currentWord, guessedLetters, wrongLetters } = useGameState();
  const { guessLetter } = useGameActions();
  const { isGameOver } = useGameSelectors();

  const handleLetterClick = (letter: string) => {
    if (isGameOver() || !currentWord) return;
    
    const normalizedLetter = letter.toUpperCase();
    if (guessedLetters.has(normalizedLetter)) return;

    guessLetter(normalizedLetter);
  };

  const getLetterState = (letter: string): LetterState => {
    if (!currentWord) return 'unused';
    
    const normalizedLetter = letter.toUpperCase();
    
    if (wrongLetters.includes(normalizedLetter)) {
      return 'wrong';
    }
    
    if (guessedLetters.has(normalizedLetter)) {
      return 'correct';
    }
    
    return 'unused';
  };

  const getLetterStyles = (state: LetterState, isDisabled: boolean) => {
    const baseStyles = "relative w-7 sm:w-9 h-10 sm:h-12 rounded-lg font-bold text-sm sm:text-base transition-all duration-200";
    
    if (isDisabled) {
      return `${baseStyles} opacity-40 cursor-not-allowed bg-amber-900/20 text-amber-600 border border-amber-800/30`;
    }

    switch (state) {
      case 'correct':
        return `${baseStyles} bg-gradient-to-br from-emerald-600 to-emerald-800 text-emerald-50 border border-emerald-400/30 shadow-lg shadow-emerald-900/30`;
      
      case 'wrong':
        return `${baseStyles} bg-gradient-to-br from-rose-600 to-rose-800 text-rose-50 border border-rose-400/30 shadow-lg shadow-rose-900/30`;
      
      case 'unused':
        return `${baseStyles} bamboo-card text-amber-200 hover:border-amber-400/60 hover:bg-amber-800/30 cursor-pointer active:scale-95`;
      
      default:
        return baseStyles;
    }
  };

  if (!currentWord) {
    return null;
  }

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <div className="flex flex-col items-center gap-2">
        {KEYBOARD_ROWS.map((row, rowIndex) => (
          <div 
            key={`row-${rowIndex}`} 
            className="flex gap-1 sm:gap-2 justify-center"
          >
            {row.map((letter) => {
              const state = getLetterState(letter);
              const isDisabled = isGameOver() || guessedLetters.has(letter.toUpperCase());
              
              return (
                <motion.button
                  key={letter}
                  onClick={() => handleLetterClick(letter)}
                  disabled={isDisabled}
                  className={getLetterStyles(state, isDisabled)}
                  whileTap={!isDisabled ? { scale: 0.9 } : undefined}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    delay: rowIndex * 0.05 + (row.indexOf(letter) * 0.02) 
                  }}
                >
                  {letter}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      {/* Instruction text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center text-xs text-amber-200/40 mt-3"
      >
        Pencét aksara atawa paké keyboard komputer
      </motion.p>
    </div>
  );
}
