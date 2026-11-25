/**
 * ============================================================================
 * NYIRU TRAY COMPONENT
 * ============================================================================
 * 
 * Visual representation of lives as traditional Sundanese snacks in a bamboo tray
 * Snacks disappear one by one when wrong guesses are made
 */

import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/shared/components';
import { useGameState } from '../../state';
import { SNACK_NAMES, MAX_LIVES } from '../../constants';

const SNACK_EMOJI_MAP: Record<string, string> = {
  'Surabi': '🥞',
  'Peuyeum': '🍠',
  'Colenak': '🍡',
  'Bala-bala': '🥟',
  'Combro': '🌮',
  'Misro': '🥐',
};

export function NyiruTray() {
  const { lives, wrongLetters } = useGameState();
  
  // Determine which snacks should be visible
  const visibleSnacks = SNACK_NAMES.slice(0, lives);
  const shouldShake = wrongLetters.length > 0 && lives < MAX_LIVES;

  return (
    <div className="w-full max-w-4xl mx-auto px-2 sm:px-4 py-2 sm:py-3">
      <Card bamboo padding="md" className="relative">
        {/* Tray shake animation when snack is taken */}
        <motion.div
          animate={shouldShake ? {
            x: [0, -4, 4, -4, 4, 0],
            rotate: [0, -1, 1, -1, 1, 0]
          } : {}}
          transition={{ duration: 0.4 }}
        >
          {/* Nyiru Title */}
          <div className="text-center mb-2 sm:mb-3">
            <h3 className="text-xs sm:text-sm font-bold text-amber-200/70 uppercase tracking-wider">
              Lalawuh dina Nyiru
            </h3>
            <p className="text-[10px] sm:text-xs text-amber-200/50 mt-0.5">
              {lives} tina {MAX_LIVES} lalawuh
            </p>
          </div>

          {/* Snacks Display */}
          <div className="flex justify-center items-center gap-2 sm:gap-3 md:gap-4 min-h-[70px] sm:min-h-[80px]">
            <AnimatePresence mode="popLayout">
              {visibleSnacks.map((snackName, index) => (
                <motion.div
                  key={`${snackName}-${index}`}
                  layout
                  initial={{ scale: 0, rotate: -180, opacity: 0 }}
                  animate={{ 
                    scale: 1, 
                    rotate: 0, 
                    opacity: 1,
                    y: [0, -5, 0],
                  }}
                  exit={{ 
                    scale: 0, 
                    rotate: 180, 
                    opacity: 0,
                    y: -50,
                    transition: { duration: 0.4 }
                  }}
                  transition={{
                    layout: { duration: 0.3 },
                    y: {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.15
                    }
                  }}
                  className="flex flex-col items-center gap-1"
                >
                  {/* Snack Emoji */}
                  <div className="text-2xl sm:text-3xl md:text-4xl select-none">
                    {SNACK_EMOJI_MAP[snackName]}
                  </div>
                  
                  {/* Snack Name */}
                  <div className="text-[9px] sm:text-[10px] md:text-xs font-semibold text-amber-300/70 text-center whitespace-nowrap">
                    {snackName}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Empty State */}
            {lives === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-3 sm:py-4"
              >
                <div className="text-4xl sm:text-5xl mb-2">😱</div>
                <p className="text-xs sm:text-sm font-bold text-rose-400">
                  Lalawuhna béak sadayana!
                </p>
              </motion.div>
            )}
          </div>

          {/* Bamboo Tray Decoration */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-1 bg-gradient-to-r from-transparent via-amber-700/30 to-transparent rounded-full"></div>
        </motion.div>
      </Card>
    </div>
  );
}
