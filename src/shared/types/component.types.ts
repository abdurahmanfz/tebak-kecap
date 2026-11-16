/**
 * ============================================================================
 * SHARED COMPONENT TYPES
 * ============================================================================
 */

import type { ReactNode } from 'react';

/**
 * Base props that all components can receive
 */
export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}

/**
 * Props for interactive components
 */
export interface InteractiveProps extends BaseComponentProps {
  onClick?: () => void;
  disabled?: boolean;
}
