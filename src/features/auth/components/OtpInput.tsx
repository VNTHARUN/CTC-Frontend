import React, { useEffect, useRef, useState } from 'react';
import type { AuthTheme } from '../utils/authStyles';

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  theme: AuthTheme;
  hasError?: boolean;
  disabled?: boolean;
  /** Fired once every box is filled, so the form can submit without an extra click. */
  onComplete?: (value: string) => void;
}

const toSlots = (value: string, length: number): string[] =>
  Array.from({ length }, (_, i) => value[i] ?? '');

/**
 * Segmented one-time-code input. Keeps a fixed-length slot array internally so
 * clearing a middle box never shifts the remaining digits.
 */
export const OtpInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  theme,
  hasError = false,
  disabled = false,
  onComplete,
}) => {
  const [slots, setSlots] = useState<string[]>(() => toSlots(value, length));
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  // Re-sync when the parent resets or prefills the value (e.g. after submit).
  useEffect(() => {
    setSlots((current) => (current.join('') === value ? current : toSlots(value, length)));
  }, [value, length]);

  const commit = (next: string[]) => {
    setSlots(next);
    const joined = next.join('');
    onChange(joined);
    if (joined.length === length && !next.includes('')) {
      onComplete?.(joined);
    }
  };

  const focusSlot = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index));
    inputsRef.current[clamped]?.focus();
    inputsRef.current[clamped]?.select();
  };

  const handleChange = (index: number, raw: string) => {
    const digits = raw.replace(/\D/g, '');
    const next = [...slots];

    if (digits === '') {
      next[index] = '';
      commit(next);
      return;
    }

    // Typing over a filled box, or a mobile keyboard delivering several digits.
    digits.split('').forEach((digit, offset) => {
      const target = index + offset;
      if (target < length) next[target] = digit;
    });
    commit(next);
    focusSlot(index + digits.length);
  };

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Backspace') {
      event.preventDefault();
      const next = [...slots];
      if (next[index]) {
        next[index] = '';
        commit(next);
        return;
      }
      if (index > 0) {
        next[index - 1] = '';
        commit(next);
        focusSlot(index - 1);
      }
      return;
    }

    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      focusSlot(index - 1);
      return;
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      focusSlot(index + 1);
    }
  };

  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLInputElement>) => {
    const digits = event.clipboardData.getData('text').replace(/\D/g, '');
    if (!digits) return;
    event.preventDefault();

    const next = [...slots];
    digits.split('').forEach((digit, offset) => {
      const target = index + offset;
      if (target < length) next[target] = digit;
    });
    commit(next);
    focusSlot(index + digits.length);
  };

  const slotClass = [
    'h-14 w-full rounded-xl border-2 text-center text-xl font-bold font-mono',
    'outline-none transition-all duration-200',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    theme === 'dark' ? 'bg-[#0D0E11]/80 text-white' : 'bg-white text-gray-900',
    hasError
      ? theme === 'dark'
        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
        : 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
      : theme === 'dark'
        ? 'border-white/10 focus:border-[#A3E635]/70 focus:ring-2 focus:ring-[#A3E635]/15 hover:border-white/20'
        : 'border-gray-200 focus:border-[#A3E635]/70 focus:ring-2 focus:ring-[#A3E635]/15 hover:border-gray-300',
  ].join(' ');

  return (
    <div className="grid grid-cols-6 gap-2 sm:gap-2.5" role="group" aria-label={`${length}-digit verification code`}>
      {slots.map((slot, index) => (
        <input
          key={index}
          ref={(el) => { inputsRef.current[index] = el; }}
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          maxLength={length}
          value={slot}
          disabled={disabled}
          aria-label={`Digit ${index + 1}`}
          aria-invalid={hasError}
          className={slotClass}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={(e) => handlePaste(index, e)}
          onFocus={(e) => e.target.select()}
        />
      ))}
    </div>
  );
};
