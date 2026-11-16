/**
 * ============================================================================
 * USE WORDS HOOK
 * ============================================================================
 * 
 * React Query hook for fetching and caching word data.
 * Provides loading states, error handling, and automatic refetching.
 */

import { useQuery } from '@tanstack/react-query';
import { fetchWords } from '../services/word.service';
import type { CategoryFilter } from '../types';

/**
 * Query key factory for words queries
 * Helps with cache management and invalidation
 */
export const wordsKeys = {
  all: ['words'] as const,
  lists: () => [...wordsKeys.all, 'list'] as const,
  list: (category?: CategoryFilter) => [...wordsKeys.lists(), category] as const,
};

/**
 * Hook to fetch words with optional category filter
 * 
 * Features:
 * - Automatic caching (5 minutes stale time)
 * - Loading and error states
 * - Refetch on category change
 * - Type-safe data access
 * 
 * @param category - Optional category filter
 * @returns Query result with words data, loading state, and error
 * 
 * @example
 * ```tsx
 * function WordList() {
 *   const { data, isLoading, error } = useWords('Kadaharan');
 *   
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error loading words</div>;
 *   
 *   return (
 *     <ul>
 *       {data.data.map(word => (
 *         <li key={word.display}>{word.display}</li>
 *       ))}
 *     </ul>
 *   );
 * }
 * ```
 */
export function useWords(category?: CategoryFilter) {
  return useQuery({
    queryKey: wordsKeys.list(category),
    queryFn: () => fetchWords(category),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
    retry: 2,
    refetchOnWindowFocus: false,
  });
}

/**
 * Hook to get the total count of words for a category
 * Uses the same query as useWords but only returns the count
 * 
 * @param category - Optional category filter
 * @returns Total count of words
 */
export function useWordsCount(category?: CategoryFilter): number {
  const { data } = useWords(category);
  return data?.total ?? 0;
}
