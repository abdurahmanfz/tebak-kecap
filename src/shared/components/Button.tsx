/**
 * ============================================================================
 * BUTTON COMPONENT
 * ============================================================================
 * 
 * Reusable button with variants matching the game's design language
 */

import { type ButtonHTMLAttributes, forwardRef } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style variant */
  variant?: ButtonVariant;
  /** Button size */
  size?: ButtonSize;
  /** Full width button */
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-gradient-to-r from-amber-500/20 to-orange-500/20 hover:from-amber-500/35 hover:to-orange-500/35 text-amber-200 border-amber-400/35',
  secondary: 'bg-stone-800/50 hover:bg-stone-700/50 text-amber-200 border-amber-500/20',
  success: 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border-emerald-500/30',
  danger: 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border-rose-500/30',
  ghost: 'bg-transparent hover:bg-amber-500/10 text-amber-200 border-transparent',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

/**
 * Reusable Button component
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="md" onClick={handleClick}>
 *   Click Me
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    variant = 'primary', 
    size = 'md', 
    fullWidth = false,
    className = '',
    disabled,
    children,
    ...props 
  }, ref) => {
    const baseClasses = 'rounded-xl font-bold border transition active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100';
    const widthClass = fullWidth ? 'w-full' : '';
    
    const classes = [
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      widthClass,
      className,
    ].filter(Boolean).join(' ');

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
