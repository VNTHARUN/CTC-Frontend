/**
 * Resolves the refresh token used in POST /auth/refresh and /auth/logout.
 *
 * Login/refresh persist a sessionStorage copy. Google OAuth may also put the
 * token in a readable cookie or a one-time query param. HttpOnly cookies
 * cannot be read here — they still travel via withCredentials, but the API
 * body requires a value we can send.
 */

import { tokenStorage } from '../../../core/security/tokenStorage';

const QUERY_KEYS = ['refreshToken', 'refresh_token'] as const;

const COOKIE_NAMES = [
  import.meta.env.VITE_REFRESH_TOKEN_COOKIE,
  import.meta.env.VITE_JWT_COOKIE,
  'refreshToken',
  'refresh_token',
  'RefreshToken',
  'c2c_refresh_token',
  'JwtToken',
  'jwtToken',
  'jwt_token',
  'accessToken',
  'AccessToken',
  'token',
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
  const fromStore = stored?.trim() || tokenStorage.getRefreshToken()?.trim();
  if (fromStore) return fromStore;

  const fromQuery = consumeRefreshTokenFromQuery();
  if (fromQuery) {
    tokenStorage.setRefreshToken(fromQuery);
    return fromQuery;
  }

  const fromCookie = readRefreshTokenFromCookie();
  if (fromCookie) {
    tokenStorage.setRefreshToken(fromCookie);
    return fromCookie;
  }

  return null;
}

function expireCookie(name: string): void {
  const expires = 'Thu, 01 Jan 1970 00:00:00 GMT';
  const paths = ['/', '/api', '/api/v1'];
  const host = typeof window !== 'undefined' ? window.location.hostname : '';
  const domains = host ? ['', host, `.${host}`] : [''];
  for (const path of paths) {
    for (const domain of domains) {
      const domainPart = domain ? `domain=${domain}; ` : '';
      document.cookie = `${name}=; expires=${expires}; path=${path}; ${domainPart}Max-Age=0; SameSite=Lax`;
      document.cookie = `${name}=; expires=${expires}; path=${path}; ${domainPart}Max-Age=0; SameSite=None; Secure`;
    }
  }
}

export function clearReadableRefreshCookies(): void {
  if (typeof document === 'undefined') return;
  const names = new Set([
    ...COOKIE_NAMES,
    ...Object.keys(parseCookies()).filter((name) => /refresh|jwt|token/i.test(name)),
  ]);
  names.forEach((name) => expireCookie(name));
}
