/**
 * Resolves the refresh token used in POST /auth/refresh and /auth/logout.
 *
 * After Google OAuth the backend redirects to /practice and sets the token in
 * an HTTP cookie (and sometimes a query param). Login already stores a
 * sessionStorage copy. HttpOnly cookies cannot be read here — those still
 * travel on the request via withCredentials, but the API body needs a value
 * we can actually send.
 */

const QUERY_KEYS = ['refreshToken', 'refresh_token'] as const;

const COOKIE_NAMES = [
  import.meta.env.VITE_REFRESH_TOKEN_COOKIE,
  'refreshToken',
  'refresh_token',
  'RefreshToken',
  'c2c_refresh_token',
].filter((name): name is string => Boolean(name));

function parseCookies(): Record<string, string> {
  if (typeof document === 'undefined') return {};
  return document.cookie.split(';').reduce<Record<string, string>>((acc, part) => {
    const [rawName, ...rest] = part.trim().split('=');
    if (!rawName || rest.length === 0) return acc;
    try {
      acc[rawName] = decodeURIComponent(rest.join('='));
    } catch {
      acc[rawName] = rest.join('=');
    }
    return acc;
  }, {});
}

function readRefreshTokenFromCookie(): string | null {
  const cookies = parseCookies();
  for (const name of COOKIE_NAMES) {
    const value = cookies[name]?.trim();
    if (value) return value;
  }
  for (const [name, value] of Object.entries(cookies)) {
    if (/refresh/i.test(name) && value.trim()) return value.trim();
  }
  return null;
}

/** Pulls a one-time token off the URL so it is not left in browser history. */
function consumeRefreshTokenFromQuery(): string | null {
  if (typeof window === 'undefined') return null;
  const params = new URLSearchParams(window.location.search);
  let found: string | null = null;
  for (const key of QUERY_KEYS) {
    const value = params.get(key)?.trim();
    if (value) {
      found = value;
      params.delete(key);
    }
  }
  if (!found) return null;

  const nextSearch = params.toString();
  const next = `${window.location.pathname}${nextSearch ? `?${nextSearch}` : ''}${window.location.hash}`;
  window.history.replaceState({}, '', next);
  return found;
}

export function resolveRefreshToken(stored?: string | null): string | null {
  const fromStore = stored?.trim();
  if (fromStore) return fromStore;

  const fromQuery = consumeRefreshTokenFromQuery();
  if (fromQuery) return fromQuery;

  return readRefreshTokenFromCookie();
}

export function clearReadableRefreshCookies(): void {
  if (typeof document === 'undefined') return;
  const expired = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax';
  const names = new Set([...COOKIE_NAMES, ...Object.keys(parseCookies()).filter((n) => /refresh/i.test(n))]);
  names.forEach((name) => {
    document.cookie = `${name}=; ${expired}`;
  });
}
