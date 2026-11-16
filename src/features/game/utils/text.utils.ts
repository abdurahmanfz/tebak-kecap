/**
 * ============================================================================
 * TEXT NORMALIZATION UTILITIES
 * ============================================================================
 * 
 * These utilities handle the normalization of Sundanese text with accented
 * characters (like É, Ó) for comparison while preserving the original display.
 */

/**
 * Normalizes a single character by removing accents/diacritics
 * 
 * Example: É → E, Ó → O, À → A
 * 
 * @param char - Single character to normalize
 * @returns Normalized uppercase character
 */
export function normalizeChar(char: string): string {
  return char
    .normalize('NFD')  // Decompose combined characters
    .replace(/[\u0300-\u036f]/g, '')  // Remove diacritical marks
    .toUpperCase();
}

/**
 * Normalizes an entire phrase by removing all accents
 * 
 * Used for comparing user input against the target word
 * while keeping the original display intact.
 * 
 * Example: "PEUYEUM" → "PEUYEUM", "LOTÉK" → "LOTEK"
 * 
 * @param text - Text to normalize
 * @returns Normalized uppercase text without accents
 */
export function normalizePhrase(text: string): string {
  return text
    .split('')
    .map(char => normalizeChar(char))
    .join('');
}

/**
 * Checks if a character is a letter (A-Z)
 * 
 * @param char - Character to check
 * @returns True if the character is A-Z
 */
export function isLetter(char: string): boolean {
  return /^[A-Z]$/i.test(char);
}

/**
 * Extracts only the letters from a normalized phrase
 * (removes spaces and other non-letter characters)
 * 
 * @param text - Text to extract letters from
 * @returns String containing only A-Z letters
 */
export function extractLetters(text: string): string {
  return text.replace(/[^A-Z]/g, '');
}
