/**
 * ============================================================================
 * RESULT MODAL COMPONENT
 * ============================================================================
 * 
 * Shows win/loss results with word information and cultural trivia
 */

import { motion } from 'framer-motion';
import { Modal, Button, Badge } from '@/shared/components';
import { useGameState } from '../../state';
import { useBambooAudio } from '../../hooks';
import { BASE_POINTS, LIFE_BONUS } from '../../constants';

interface ResultModalProps {
  onNextRound: () => void;
}

export function ResultModal({ onNextRound }: ResultModalProps) {
  const { currentWord, score, streak, lives, roundOver, isMuted } = useGameState();
  const audio = useBambooAudio({ muted: isMuted });

  if (!roundOver || !currentWord) {
    return null;
  }

  const isWin = lives > 0;
  const earnedPoints = isWin ? BASE_POINTS + (lives * LIFE_BONUS) : 0;

  const handleNextRound = () => {
    audio.playClick();
    onNextRound();
  };

  return (
    <Modal 
      isOpen={roundOver} 
      onClose={handleNextRound}
    >
      <div className="text-center">
        {/* Result Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.6 }}
          className="text-7xl mb-4"
        >
          {isWin ? '🎉' : '😢'}
        </motion.div>

        {/* Result Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`text-2xl sm:text-3xl font-bold mb-2 ${
            isWin ? 'text-emerald-400' : 'text-rose-400'
          }`}
        >
          {isWin ? 'Alus Pisan!' : 'Hampura, Salah!'}
        </motion.h2>

        {/* Result Message */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-amber-200/80 mb-6"
        >
          {isWin 
            ? 'Anjeun suksés nebak kecapna! Lalawuh dina nyiru tetep aman.' 
            : 'Lalawuhna béak sadaya. Coba deui, nya!'
          }
        </motion.p>

        {/* Word Information */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bamboo-card p-5 mb-6 text-left"
        >
          {/* Category */}
          <div className="flex justify-center mb-3">
            <Badge variant="warning">{currentWord.category}</Badge>
          </div>

          {/* Word */}
          <div className="mb-4">
            <div className="text-xs uppercase tracking-wider text-amber-300/50 font-bold mb-1">
              Kecapna
            </div>
            <p className="text-2xl font-bold text-amber-100">
              {currentWord.display}
            </p>
          </div>

          {/* Meaning */}
          {currentWord.meaning && (
            <div className="mb-4">
              <div className="text-xs uppercase tracking-wider text-amber-300/50 font-bold mb-1">
                Hartina
              </div>
              <p className="text-base text-amber-200/90">
                {currentWord.meaning}
              </p>
            </div>
          )}

          {/* Trivia */}
          {currentWord.trivia && (
            <div>
              <div className="text-xs uppercase tracking-wider text-amber-300/50 font-bold mb-1">
                Trivia Budaya
              </div>
              <p className="text-sm text-amber-200/70 leading-relaxed">
                {currentWord.trivia}
              </p>
            </div>
          )}
        </motion.div>

        {/* Score Summary */}
        {isWin && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="mb-6 grid grid-cols-3 gap-3"
          >
            <div className="bamboo-card p-3">
              <div className="text-xs text-amber-300/50 font-bold mb-1">Poin Dasar</div>
              <div className="text-lg font-bold text-amber-300">+{BASE_POINTS}</div>
            </div>
            <div className="bamboo-card p-3">
              <div className="text-xs text-amber-300/50 font-bold mb-1">Bonus Nyawa</div>
              <div className="text-lg font-bold text-emerald-400">+{lives * LIFE_BONUS}</div>
            </div>
            <div className="bamboo-card p-3">
              <div className="text-xs text-amber-300/50 font-bold mb-1">Total</div>
              <div className="text-lg font-bold text-amber-200">{earnedPoints}</div>
            </div>
          </motion.div>
        )}

        {/* Current Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex justify-center gap-4 mb-6 text-sm"
        >
          <div>
            <span className="text-amber-300/60">Total Skor:</span>
            <span className="ml-2 font-bold text-amber-300">{score}</span>
          </div>
          <div className="w-px bg-amber-600/30"></div>
          <div>
            <span className="text-amber-300/60">Runtuyan:</span>
            <span className="ml-2 font-bold text-emerald-400">{streak}🔥</span>
          </div>
        </motion.div>

        {/* Next Round Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Button
            onClick={handleNextRound}
            variant={isWin ? "success" : "primary"}
            size="lg"
            className="w-full"
          >
            {isWin ? 'Kecap Salajengna' : 'Coba Deui'}
          </Button>
        </motion.div>
      </div>
    </Modal>
  );
}
