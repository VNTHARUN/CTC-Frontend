import React from 'react';
import type { AuthTheme } from '../utils/authStyles';

interface AuthFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  theme: AuthTheme;
  hint?: string;
}

/** Labelled form row with the shared error styling used across the auth modal. */
export const AuthField: React.FC<AuthFieldProps> = ({ label, error, children, theme, hint }) => (
  <div className="flex flex-col gap-1.5">
    <label className={`text-xs font-bold uppercase tracking-wider ${
      theme === 'dark' ? 'text-gray-400' : 'text-gray-700'
    }`}>
      {label}
    </label>
    {children}
    {!error && hint && (
      <p className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
        {hint}
      </p>
    )}
    {error && (
      <p role="alert" className="text-xs text-rose-400 flex items-center gap-1.5 mt-0.5 animate-fade-in">
        <i className="fa-solid fa-circle-exclamation text-[10px] shrink-0" />
        {error}
      </p>
    )}
  </div>
);
