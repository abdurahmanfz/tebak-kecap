/**
 * ============================================================================
 * BADGE COMPONENT
 * ============================================================================
 * 
 * Small label/indicator component
 */

import type { HTMLAttributes, ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  /** Badge content */
  children: ReactNode;
  /** Visual style variant */
  variant?: BadgeVariant;
  /** Badge size */
  size?: BadgeSize;
}

const variantClasses: Record<BadgeVariant, string> = {
  default: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
  success: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  warning: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  danger: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
  info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
};

const sizeClasses: Record<BadgeSize, string> = {
  sm: 'px-2 py-0.5 text-[10px]',
  md: 'px-2.5 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

/**
 * Badge component for labels and indicators
 * 
 * @example
 * ```tsx
 * <Badge variant="success" size="md">
 *   6 Lives
 * </Badge>
 * ```
 */
export function Badge({ 
  children, 
  variant = 'default',
  size = 'md',
  className = '',
  ...props 
}: BadgeProps) {
  const baseClasses = 'inline-flex items-center justify-center rounded-full font-bold uppercase tracking-wider border';
  
  const classes = [
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    className,
  ].filter(Boolean).join(' ');

  return (
    <span className={classes} {...props}>
      {children}
    </span>
  );
}
