/**
 * ============================================================================
 * WORD DATA SERVICE
 * ============================================================================
 * 
 * This service provides an abstraction layer for fetching word data.
 * It's designed to support both local JSON data (current) and future API integration.
 * 
 * Architecture:
 * - Uses adapter pattern for easy switching between data sources
 * - Returns consistent data structure regardless of source
 * - Handles errors gracefully with fallback mechanism
 */

import wordsData from '@/data/words.json';
import type { WordEntry, WordsApiResponse, CategoryFilter } from '../types';

/**
 * Base API URL - can be configured via environment variable
 * Currently unused as we're using local data, but prepared for future API
 */
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

/**
 * Simulated network delay for development (ms)
 * Set to 0 in production
 */
const DEV_DELAY = import.meta.env.DEV ? 300 : 0;

/**
 * Utility to simulate network delay in development
 */
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Fetches words from local JSON file
 * This is the current implementation - serves as fallback for API failures
 * 
 * @param category - Optional category filter
 * @returns Promise with words data
 */
async function fetchWordsFromLocal(category?: CategoryFilter): Promise<WordsApiResponse> {
  // Simulate network delay in development
  if (DEV_DELAY > 0) {
    await delay(DEV_DELAY);
  }

  const words = wordsData as WordEntry[];

  // Filter by category if specified
  const filteredWords = category && category !== 'Sadaya'
    ? words.filter(word => word.category === category)
    : words;

  return {
    data: filteredWords,
    total: filteredWords.length,
    category: category || 'Sadaya',
  };
}

/**
 * Fetches words from API endpoint
 * Currently stubbed - will be implemented when API is available
 * 
 * @param category - Optional category filter
 * @returns Promise with words data
 */
async function fetchWordsFromApi(category?: CategoryFilter): Promise<WordsApiResponse> {
  const params = new URLSearchParams();
  if (category && category !== 'Sadaya') {
    params.append('category', category);
  }

  const url = `${API_BASE_URL}/words${params.toString() ? `?${params}` : ''}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Main service function to fetch words
 * Implements fallback strategy: Try API first, fall back to local data
 * 
 * @param category - Optional category filter
 * @returns Promise with words data
 */
export async function fetchWords(category?: CategoryFilter): Promise<WordsApiResponse> {
  // Check if API should be used
  const useApi = import.meta.env.VITE_USE_API === 'true';

  if (useApi) {
    try {
      // Try to fetch from API
      return await fetchWordsFromApi(category);
    } catch (error) {
      console.warn('API fetch failed, falling back to local data:', error);
      // Fall back to local data
      return await fetchWordsFromLocal(category);
    }
  }

  // Use local data by default
  return await fetchWordsFromLocal(category);
}

/**
 * Fetches a random word entry
 * Useful for game initialization
 * 
 * @param category - Optional category filter
 * @returns Promise with a single random word
 */
export async function fetchRandomWord(category?: CategoryFilter): Promise<WordEntry> {
  const response = await fetchWords(category);
  const randomIndex = Math.floor(Math.random() * response.data.length);
  return response.data[randomIndex];
}

/**
 * Service object for easy import and mocking in tests
 */
export const wordService = {
  fetchWords,
  fetchRandomWord,
};
