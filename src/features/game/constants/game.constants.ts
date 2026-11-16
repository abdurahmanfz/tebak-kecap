import type { CategoryFilter } from '../types/word.types';

/**
 * ============================================================================
 * GAME CONSTANTS
 * ============================================================================
 */

/** Maximum number of wrong guesses allowed (6 snacks in the nyiru) */
export const MAX_LIVES = 6;

/** Points awarded for completing a word */
export const BASE_POINTS = 25;

/** Bonus points per remaining life */
export const LIFE_BONUS = 5;

/** Cost in points to use a hint */
export const HINT_COST = 15;

/**
 * All available game categories
 */
export const CATEGORIES: readonly CategoryFilter[] = [
  'Sadaya',           // All
  'Kadaharan',      // Food & Culinary
  'Budaya & Seni',    // Culture & Arts
  'Basa & Paribasa',  // Language & Wisdom
  'Tempat & Alam',    // Places & Nature
] as const;

/**
 * Names of the six traditional Sundanese snacks shown in the Nyiru
 */
export const SNACK_NAMES: readonly string[] = [
  'Surabi',
  'Peuyeum',
  'Colenak',
  'Bala-bala',
  'Combro',
  'Misro',
] as const;

/**
 * Reactions shown when player makes a wrong guess (one per snack lost)
 */
export const WRONG_REACTIONS: readonly string[] = [
  'Aduh! Surabina dicokot ucing garong!',
  'Waduh! Peuyeumna dibawa kabur ku Si Kabayan!',
  'Euleuh! Colenakna leungit hiji!',
  'Kade! Bala-balana geus dicokot!',
  'Aduh gusti! Combrona tinggal kari sésa!',
  'Béak sadaya lalawuh dina nyiru!',
] as const;

/**
 * Positive reactions shown when player makes a correct guess
 */
export const RIGHT_REACTIONS: readonly string[] = [
  'Tah kitu! Bener pisan aksarana!',
  'Saé! Tuluykeun nebakna!',
  'Mantap! Lalawuhna aman kénéh!',
  'Leres pisan! Pinter geuning!',
] as const;

/**
 * QWERTY keyboard layout for on-screen keyboard
 */
export const KEYBOARD_ROWS: readonly (readonly string[])[] = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
] as const;

/**
 * Sundanese Pelog pentatonic scale frequencies (Hz)
 * Used for musical feedback when correct letters are guessed
 * Notes: Da, Mi, Na, Ti, La, Da (higher)
 */
export const PELOG_SCALE: readonly number[] = [
  440,    // A4
  493.88, // B4
  523.25, // C5
  659.25, // E5
  783.99, // G5
  880,    // A5
] as const;
