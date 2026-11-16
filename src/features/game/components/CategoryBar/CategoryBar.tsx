/**
 * ============================================================================
 * CATEGORY BAR COMPONENT
 * ============================================================================
 * 
 * Horizontal scrollable category selector with bamboo button styling
 */

import { motion } from 'framer-motion';
import { useGameState, useGameActions } from '../../state';
import { useBambooAudio } from '../../hooks';
import { CATEGORIES } from '../../constants';
import type { CategoryFilter } from '../../types';

export function CategoryBar() {
  const { selectedCategory, isMuted } = useGameState();
  const { setCategory } = useGameActions();
  const audio = useBambooAudio({ muted: isMuted });

  const handleSelectCategory = (cat: CategoryFilter) => {
    if (cat !== selectedCategory) {
      audio.playClick();
      setCategory(cat);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-2">
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-700/50 scrollbar-track-transparent">
        {CATEGORIES.map((cat) => {
          const isActive = cat === selectedCategory;
          
          return (
            <motion.button
              key={cat}
              onClick={() => handleSelectCategory(cat)}
              className={`
                relative px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap
                transition-all duration-200 shrink-0
                ${isActive 
                  ? 'bg-gradient-to-br from-amber-500 via-amber-600 to-orange-700 text-amber-50 shadow-lg shadow-amber-900/50 border border-amber-300/30' 
                  : 'bamboo-card text-amber-200/80 hover:text-amber-200 hover:border-amber-400/50'
                }
              `}
              whileTap={{ scale: 0.95 }}
              initial={false}
              animate={{
                scale: isActive ? 1 : 0.98,
              }}
            >
              {cat}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
