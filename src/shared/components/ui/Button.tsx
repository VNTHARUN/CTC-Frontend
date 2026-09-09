import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex min-h-11 items-center justify-center rounded-lg font-semibold transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-50 active:scale-[0.98]';

  const variantStyles = {
    primary: 'bg-[var(--c2c-primary)] hover:bg-[var(--c2c-primary-hover)] text-[var(--c2c-primary-foreground)] shadow-sm border border-transparent',
    secondary: 'bg-[var(--c2c-surface-raised)] hover:bg-[var(--c2c-surface-hover)] text-[var(--c2c-text)] border border-[var(--c2c-border)]',
    outline: 'border border-[var(--c2c-border)] hover:border-[var(--c2c-border-strong)] text-[var(--c2c-text-muted)] hover:text-[var(--c2c-text)] hover:bg-[var(--c2c-surface-raised)]',
    ghost: 'text-[var(--c2c-text-muted)] hover:text-[var(--c2c-text)] hover:bg-[var(--c2c-surface-raised)]',
    danger: 'bg-rose-600 hover:bg-rose-500 text-white shadow-md shadow-rose-600/20',
    success: 'bg-[#48c78e] hover:bg-[#3ec487] text-white shadow-md shadow-[#48c78e]/20',
  };

  const sizeStyles = {
    sm: 'px-3 py-2 text-xs gap-1.5',
    md: 'px-4 py-2.5 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5',
    icon: 'w-11 p-0 text-sm',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <>
          <span className="c2c-spinner" aria-hidden="true" />
          <span className="sr-only">Loading</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="inline-flex shrink-0 items-center">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="inline-flex shrink-0 items-center">{rightIcon}</span>}
        </>
      )}
    </button>
  );
};
