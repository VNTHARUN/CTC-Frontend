/** Post-login home: USER panel vs ADMIN panel. */
export function homePathForRole(role?: string | null): string {
  return role?.toUpperCase() === 'ADMIN' ? '/admin/practice' : '/practice';
}
