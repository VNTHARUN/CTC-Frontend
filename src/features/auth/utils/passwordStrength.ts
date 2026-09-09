/** Password rules mirrored by the signup and reset-password Zod schemas. */
export const PWD_RULES = [
  /[A-Z]/,
  /[a-z]/,
  /[0-9]/,
  /[@$!%*?&#^()_\-+=]/,
  /.{8}/,
] as const;

export interface PasswordStrength {
  score: number;
  label: string;
  color: string;
}

export function strength(pwd: string): PasswordStrength {
  if (!pwd) return { score: 0, label: '', color: '' };
  const s = PWD_RULES.filter((r) => r.test(pwd)).length;
  if (s <= 2) return { score: s, label: 'Weak', color: '#F43F5E' };
  if (s === 3) return { score: s, label: 'Fair', color: '#F59E0B' };
  if (s === 4) return { score: s, label: 'Good', color: '#A3E635' };
  return { score: s, label: 'Strong', color: '#10B981' };
}
