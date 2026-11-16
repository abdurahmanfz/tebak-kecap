/**
 * ============================================================================
 * WORD DISPLAY COMPONENT
 * ============================================================================
 * 
 * Shows the word as letter slots with reveal animations
 * Displays wrong guessed letters below
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components';
import { useGameState } from '../../state';

export function WordDisplay() {
  const { currentWord, guessedLetters, wrongLetters } = useGameState();

  if (!currentWord) {
    return null;
  }

  const displayWord = currentWord.display.toUpperCase();

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-4">
      <Card bamboo padding="lg">
        {/* Letter Slots */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {displayWord.split('').map((char, index) => {
            const isLetter = /[A-Z]/i.test(char);
            const normalizedChar = char.toUpperCase();
            const isRevealed = guessedLetters.has(normalizedChar);
            const isSpace = char === ' ';

            // Space between words
            if (isSpace) {
              return (
                <div 
                  key={`space-${index}`} 
                  className="w-2"
                  aria-hidden="true"
                />
              );
            }

            // Non-letter characters (punctuation, etc) - always shown
            if (!isLetter) {
              return (
                <div
                  key={`punct-${index}`}
                  className="w-8 sm:w-10 h-12 sm:h-14 flex items-center justify-center text-amber-300 text-xl sm:text-2xl font-bold"
                >
                  {char}
                </div>
              );
            }

            // Letter slot
            return (
              <motion.div
                key={`letter-${index}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.03 }}
                className="relative w-10 sm:w-12 h-12 sm:h-14 rounded-lg border-2 border-amber-600/40 bg-gradient-to-b from-amber-900/20 to-amber-950/40 flex items-center justify-center overflow-hidden"
              >
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.span
                      key="revealed"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 300, 
                        damping: 20 
                      }}
                      className="text-xl sm:text-2xl font-bold text-amber-200"
                    >
                      {normalizedChar}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="hidden"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.3 }}
                      exit={{ opacity: 0 }}
                      className="text-2xl font-bold text-amber-500"
                    >
                      ?
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Wrong Guesses Display */}
        {wrongLetters.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="text-xs uppercase tracking-wider text-rose-400/60 font-bold mb-2">
              Aksara Salah
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {wrongLetters.map((letter: string, index: number) => (
                <motion.div
                  key={`wrong-${letter}-${index}`}
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 400,
                    damping: 15
                  }}
                  className="w-8 h-8 rounded-md bg-rose-900/30 border border-rose-500/30 flex items-center justify-center"
                >
                  <span className="text-sm font-bold text-rose-400 line-through">
                    {letter}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </Card>
    </div>
  );
}
