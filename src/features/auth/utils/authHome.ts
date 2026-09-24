/** Post-login home: USER panel vs ADMIN panel. */
export function homePathForRole(role?: string | null): string {
  return role?.toUpperCase() === 'ADMIN' ? '/admin/practice' : '/practice';
}

const SKIP_RETURN_KEY = 'c2c_skip_post_login_return';
const AUTH_ONLY_PATHS = new Set(['/login', '/signup', '/forgot-password']);

/** Call on explicit logout so the next sign-in does not restore the last page. */
export function markExplicitLogout(): void {
  try {
    sessionStorage.setItem(SKIP_RETURN_KEY, '1');
  } catch {
    // Restricted browsing contexts still fall back to the role home.
  }
}

export function shouldSkipPostLoginReturn(): boolean {
  try {
    return sessionStorage.getItem(SKIP_RETURN_KEY) === '1';
  } catch {
    return false;
  }
}

export function consumeExplicitLogout(): boolean {
  const skip = shouldSkipPostLoginReturn();
  if (skip) {
    try {
      sessionStorage.removeItem(SKIP_RETURN_KEY);
    } catch {
      // Ignore storage failures after the flag was already read.
    }
  }
  return skip;
}

/**
 * After login: role home unless this was a protected-page bounce (session
 * expired / deep link). Explicit logout never restores a previous question.
 */
export function postLoginPath(role?: string | null, fromPath?: string | null): string {
  const home = homePathForRole(role);
  if (consumeExplicitLogout()) return home;

  const from = fromPath?.trim() ?? '';
  if (!from || AUTH_ONLY_PATHS.has(from)) return home;
  return from;
}
