import React from 'react';
import { strength } from '../utils/passwordStrength';
import type { AuthTheme } from '../utils/authStyles';

interface PasswordStrengthMeterProps {
  password: string;
  theme: AuthTheme;
}

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password, theme }) => {
  if (password.length === 0) return null;

  const { score, label, color } = strength(password);

  return (
    <div className="mt-2.5 flex items-center gap-2.5 animate-fade-in">
      <div className="flex gap-1.5 flex-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="h-1 flex-1 rounded-full transition-all duration-300"
            style={{
              backgroundColor: i <= score ? color : theme === 'dark' ? '#1F2937' : '#E5E7EB',
            }}
          />
        ))}
      </div>
      <span className="text-xs font-bold w-14 text-right shrink-0" style={{ color }}>
        {label}
      </span>
    </div>
  );
};
