/**
 * ============================================================================
 * MAIN GAME COMPONENT
 * ============================================================================
 * 
 * Orchestrates the complete game loop:
 * - Loads words based on selected category
 * - Manages round lifecycle (start/end)
 * - Handles win/loss detection
 * - Plays appropriate audio feedback
 * - Coordinates all game UI components
 */

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameState, useGameActions, useGameSelectors } from '../state';
import { useWords, useBambooAudio, useKeyboardInput } from '../hooks';
import {
  Header,
  CategoryBar,
  NyiruTray,
  ClueCard,
  WordDisplay,
  Keyboard,
  ResultModal,
} from './';

export function Game() {
  const gameState = useGameState();
  const { 
    currentWord, 
    guessedLetters, 
    wrongLetters,
    roundOver, 
    selectedCategory,
    isMuted,
    correctCombo,
    showVirtualKeyboard,
  } = gameState;

  const { startRound, endRound } = useGameActions();
  const { isWordSolved, isGameOver } = useGameSelectors();
  const audio = useBambooAudio({ muted: isMuted });

  // Track previous values for detecting changes
  const prevGuessedRef = useRef(guessedLetters.size);
  const prevWrongRef = useRef(wrongLetters.length);

  // Fetch words based on selected category
  const { data: wordsResponse, isLoading, error } = useWords(selectedCategory);
  const words = wordsResponse?.data || [];

  /**
   * Start a new round with a random word
   */
  const startNewRound = useCallback(() => {
    if (!words || words.length === 0) return;

    // Pick a random word
    const randomWord = words[Math.floor(Math.random() * words.length)];
    startRound(randomWord);
    
    // Reset refs
    prevGuessedRef.current = 0;
    prevWrongRef.current = 0;
  }, [words, startRound]);

  /**
   * Play audio feedback when guesses change
   */
  useEffect(() => {
    if (!currentWord || roundOver) return;

    // Correct guess detected
    if (guessedLetters.size > prevGuessedRef.current) {
      audio.playCorrect(correctCombo);
      prevGuessedRef.current = guessedLetters.size;
    }

    // Wrong guess detected
    if (wrongLetters.length > prevWrongRef.current) {
      audio.playWrong();
      prevWrongRef.current = wrongLetters.length;
    }
  }, [guessedLetters.size, wrongLetters.length, correctCombo, currentWord, roundOver, audio]);

  /**
   * Check for round end conditions (win or loss)
   */
  useEffect(() => {
    if (!currentWord || roundOver) return;

    // Check for loss (no lives left)
    if (isGameOver()) {
      audio.playLose();
      endRound(false);
      return;
    }

    // Check for win (all letters guessed)
    if (isWordSolved()) {
      audio.playWin();
      endRound(true);
      return;
    }
  }, [currentWord, roundOver, isGameOver, isWordSolved, endRound, audio]);

  /**
   * Start first round when words are loaded
   */
  useEffect(() => {
    if (words && words.length > 0 && !currentWord && !roundOver) {
      startNewRound();
    }
  }, [words, currentWord, roundOver, startNewRound]);

  /**
   * Restart round when category changes
   */
  useEffect(() => {
    if (currentWord && !roundOver) {
      startNewRound();
    }
  }, [selectedCategory]);

  /**
   * Enable keyboard input only when virtual keyboard is off
   */
  useKeyboardInput({ 
    onNextRound: startNewRound,
    enabled: !showVirtualKeyboard,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-amber-900 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="text-6xl mb-4">🏞️</div>
          <p className="text-xl font-bold text-amber-200">Muatkeun kecap Sunda...</p>
        </motion.div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-amber-900 flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bamboo-card p-8 max-w-md text-center"
        >
          <div className="text-5xl mb-4">😞</div>
          <h2 className="text-xl font-bold text-rose-400 mb-2">
            Aya Kasalahan
          </h2>
          <p className="text-amber-200/80 mb-4">
            Teu bisa ngamuat kecap-kecap. Mangga cobian deui.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-500 text-amber-50 font-semibold rounded-lg transition"
          >
            Reload
          </button>
        </motion.div>
      </div>
    );
  }

  // Main game UI
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-950 via-orange-950 to-amber-900">
      <div className="container mx-auto pb-8">
        {/* Header */}
        <Header />

        {/* Category Filter */}
        <CategoryBar />

        {/* Lives Display (Nyiru Tray) */}
        <NyiruTray />

        {/* Clue Card */}
        <AnimatePresence mode="wait">
          {currentWord && (
            <motion.div
              key={currentWord.display}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <ClueCard />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Word Display */}
        <AnimatePresence mode="wait">
          {currentWord && (
            <motion.div
              key={`word-${currentWord.display}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <WordDisplay />
            </motion.div>
          )}
        </AnimatePresence>

        {/* On-Screen Keyboard */}
        {showVirtualKeyboard && <Keyboard />}

        {/* Keyboard Mode Hint */}
        {!showVirtualKeyboard && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto px-4 py-2"
          >
            <p className="text-center text-xs sm:text-sm text-amber-200/50">
              ⌨️ Mode Keyboard Fisik Aktif - Paké tombol A-Z, Enter pikeun hint, Space pikeun babak salajengna
            </p>
          </motion.div>
        )}

        {/* Result Modal */}
        <ResultModal onNextRound={startNewRound} />
      </div>
    </div>
  );
}
