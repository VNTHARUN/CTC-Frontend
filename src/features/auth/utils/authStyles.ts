export type AuthTheme = 'dark' | 'light';

/** Input styling shared by every auth form so the modal stays visually consistent. */
export function authInputClass(theme: AuthTheme, hasError: boolean): string {
  return [
    'w-full text-sm placeholder-gray-500 dark:placeholder-gray-500 font-medium',
    'px-4 py-3 rounded-xl outline-none transition-all duration-300 font-sans',
    'border-2',
    theme === 'dark' ? 'bg-[#0D0E11]/80 text-white' : 'bg-white text-gray-900',
    hasError
      ? theme === 'dark'
        ? 'border-rose-500/70 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 shadow-lg shadow-rose-500/10'
        : 'border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20'
      : theme === 'dark'
        ? 'border-white/10 focus:border-[#A3E635]/70 focus:ring-2 focus:ring-[#A3E635]/10 hover:border-white/20'
        : 'border-gray-200 focus:border-[#A3E635]/70 focus:ring-2 focus:ring-[#A3E635]/10 hover:border-gray-300',
  ].join(' ');
}

/** Primary call-to-action button used by every auth form. */
export const authPrimaryButtonClass =
  'w-full py-3.5 mt-2 bg-[#A3E635] hover:bg-[#b5f037] text-black font-bold text-base rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgba(163,230,53,0.25)] hover:shadow-[0_12px_40px_rgba(163,230,53,0.35)] relative overflow-hidden group';

/** Eye / show-password toggle placed inside a password input. */
export function authInputIconButtonClass(theme: AuthTheme): string {
  return [
    'absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer',
    theme === 'dark'
      ? 'text-gray-500 hover:text-gray-300'
      : 'text-gray-400 hover:text-gray-600',
  ].join(' ');
}
