import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, leftIcon, rightIcon, helperText, className = '', id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, '-') : undefined);

    return (
      <div className="w-full flex flex-col gap-1.5 text-left">
        {label && (
          <label htmlFor={inputId} className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 font-mono">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {leftIcon && (
            <div className="absolute left-3.5 text-gray-500 pointer-events-none flex items-center">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            ref={ref}
            aria-invalid={Boolean(error)}
            aria-describedby={error || helperText ? `${inputId}-message` : undefined}
            className={`min-h-11 w-full bg-[var(--c2c-surface)] border ${
              error ? 'border-rose-500/80' : 'border-[var(--c2c-border)] focus:border-[var(--c2c-primary)]'
            } text-[var(--c2c-text)] placeholder:text-[var(--c2c-text-subtle)] rounded-lg text-sm px-3.5 py-2.5 transition-all outline-none ${
              leftIcon ? 'pl-10' : ''
            } ${rightIcon ? 'pr-10' : ''} ${className}`}
            {...props}
          />
          {rightIcon && <div className="absolute right-3.5 text-gray-400 flex items-center">{rightIcon}</div>}
        </div>
        {error ? (
          <span id={`${inputId}-message`} className="text-xs text-rose-400 font-medium">{error}</span>
        ) : helperText ? (
          <span id={`${inputId}-message`} className="text-xs text-gray-500">{helperText}</span>
        ) : null}
      </div>
    );
  }
);

Input.displayName = 'Input';
