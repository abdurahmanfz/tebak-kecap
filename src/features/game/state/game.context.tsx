/**
 * ============================================================================
 * GAME CONTEXT
 * ============================================================================
 * 
 * Provides game state and actions to all child components
 */

import { createContext, useReducer, type ReactNode } from 'react';
import { gameReducer } from './game.reducer';
import { createInitialGameState, type GameState, type GameAction } from './game.types';

/**
 * Context value interface
 */
interface GameContextValue {
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
}

/**
 * Create the context with undefined as default
 * This ensures we catch cases where context is used outside provider
 */
export const GameContext = createContext<GameContextValue | undefined>(undefined);

/**
 * Provider props
 */
interface GameProviderProps {
  children: ReactNode;
  initialState?: Partial<GameState>;
}

/**
 * Game Context Provider
 * Wraps components that need access to game state
 * 
 * @example
 * ```tsx
 * <GameProvider>
 *   <App />
 * </GameProvider>
 * ```
 */
export function GameProvider({ children, initialState }: GameProviderProps) {
  const [state, dispatch] = useReducer(
    gameReducer,
    initialState ? { ...createInitialGameState(), ...initialState } : createInitialGameState()
  );

  const value: GameContextValue = {
    state,
    dispatch,
  };

  return (
    <GameContext.Provider value={value}>
      {children}
    </GameContext.Provider>
  );
}
