/**
 * ============================================================================
 * CLUE CARD COMPONENT
 * ============================================================================
 * 
 * Displays Sundanese and English clues, category badge, and hint button
 */

import { motion } from 'framer-motion';
import { Card, Badge, Button } from '@/shared/components';
import { useGameState, useGameActions, useGameSelectors } from '../../state';
import { useBambooAudio } from '../../hooks';
import { HINT_COST } from '../../constants';

export function ClueCard() {
  const { currentWord, score, isMuted } = useGameState();
  const { useHint } = useGameActions();
  const { canUseHint } = useGameSelectors();
  const audio = useBambooAudio({ muted: isMuted });

  if (!currentWord) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4 py-3">
        <Card bamboo padding="lg" className="text-center">
          <p className="text-amber-200/60">Muatkeun kecap...</p>
        </Card>
      </div>
    );
  }

  const handleUseHint = () => {
    if (canUseHint()) {
      audio.playClick();
      useHint();
    }
  };

  const isHintDisabled = !canUseHint();
  const isHintAffordable = score >= HINT_COST;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-3">
      <Card bamboo padding="lg">
        {/* Category Badge */}
        <div className="flex justify-center mb-4">
          <Badge variant="warning">
            {currentWord.category}
          </Badge>
        </div>

        {/* Sundanese Clue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-4"
        >
          <div className="text-xs uppercase tracking-wider text-amber-300/50 font-bold mb-1">
            Pitunjuk (Sunda)
          </div>
          <p className="text-base sm:text-lg font-semibold text-amber-100 leading-relaxed">
            {currentWord.clueSu}
          </p>
        </motion.div>

        {/* English Clue */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-5"
        >
          <div className="text-xs uppercase tracking-wider text-amber-300/50 font-bold mb-1">
            Clue (English)
          </div>
          <p className="text-sm sm:text-base text-amber-200/80 leading-relaxed">
            {currentWord.clueEn}
          </p>
        </motion.div>

        {/* Hint Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center"
        >
          <Button
            onClick={handleUseHint}
            disabled={isHintDisabled}
            variant={isHintAffordable ? "secondary" : "ghost"}
            size="sm"
            className="gap-2"
          >
            <svg 
              className="w-4 h-4" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            
            <span>
              {isHintDisabled 
                ? 'Hint Dipaké' 
                : `Paké Hint (-${HINT_COST} poin)`
              }
            </span>

            {!isHintAffordable && !isHintDisabled && (
              <span className="text-[10px] opacity-60">(Kurang {HINT_COST - score})</span>
            )}
          </Button>
        </motion.div>
      </Card>
    </div>
  );
}
