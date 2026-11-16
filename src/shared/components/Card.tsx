/**
 * ============================================================================
 * CARD COMPONENT
 * ============================================================================
 * 
 * Container component with bamboo-inspired styling
 */

import type { HTMLAttributes, ReactNode } from 'react';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  /** Card content */
  children: ReactNode;
  /** Apply bamboo card styling */
  bamboo?: boolean;
  /** Padding size */
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const paddingClasses = {
  none: '',
  sm: 'p-3',
  md: 'p-4 sm:p-5',
  lg: 'p-6 sm:p-8',
};

/**
 * Card component with optional bamboo styling
 * 
 * @example
 * ```tsx
 * <Card bamboo padding="md">
 *   <h2>Card Title</h2>
 *   <p>Card content...</p>
 * </Card>
 * ```
 */
export function Card({ 
  children, 
  bamboo = true,
  padding = 'md',
  className = '',
  ...props 
}: CardProps) {
  const baseClasses = 'rounded-2xl';
  const bambooClasses = bamboo ? 'bamboo-card' : 'bg-stone-900/50 border border-amber-500/20';
  
  const classes = [
    baseClasses,
    bambooClasses,
    paddingClasses[padding],
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
