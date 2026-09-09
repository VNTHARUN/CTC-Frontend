import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../shared/context/ThemeContext';
import { PasswordResetCard } from '../components/PasswordResetCard';

/**
 * Standalone /forgot-password route. The same card is also rendered inside the
 * auth modal when the user clicks "Forgot password?" on the sign-in form.
 */
export const ForgotPassword: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className="flex w-full justify-center px-4 py-10 sm:py-16 font-sans">
      <div
        className={`relative w-full max-w-120 overflow-hidden rounded-3xl border-2 shadow-[0_50px_120px_rgba(0,0,0,0.35)] animate-slide-up ${
          theme === 'dark'
            ? 'border-white/20 bg-linear-to-br from-[#111215] via-[#1a1c21] to-[#111215]'
            : 'border-gray-300 bg-linear-to-br from-white via-gray-50 to-white'
        }`}
      >
        {/* Top accent line */}
        <div className="h-0.75 w-full bg-linear-to-r from-transparent via-[#A3E635] to-transparent animate-shimmer bg-size-[200%_100%]" />

        <div className="relative p-8 sm:p-10">
          {/* Floating gradient orbs */}
          <div className="pointer-events-none absolute top-10 right-10 h-40 w-40 animate-pulse rounded-full bg-[#A3E635]/10 blur-3xl" />
          <div
            className="pointer-events-none absolute bottom-10 left-10 h-48 w-48 animate-pulse rounded-full bg-[#627eff]/10 blur-3xl"
            style={{ animationDelay: '1s' }}
          />

          <PasswordResetCard
            theme={theme}
            onBackToLogin={() => navigate('/login', { replace: true })}
          />
        </div>
      </div>
    </div>
  );
};
