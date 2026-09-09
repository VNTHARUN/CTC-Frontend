/**
 * Access JWT lives in sessionStorage (and memory). The backend also sets the
 * refresh token as an HttpOnly cookie; this module keeps a JS-readable copy of
 * `data.refreshToken` from login so logout/refresh can POST `{ refreshToken }`.
 */

let memoryToken: string | null = null;
let memoryRefreshToken: string | null = null;

const TOKEN_KEY = 'prep_auth_token';
const REFRESH_TOKEN_KEY = 'c2c_refresh_token';

function readSession(key: string): string | null {
  try {
    return sessionStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeSession(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch (e) {
    console.warn('Session storage write restricted', e);
  }
}

function removeSession(key: string): void {
  try {
    sessionStorage.removeItem(key);
  } catch (e) {
    console.warn('Session storage clear restricted', e);
  }
}

export const tokenStorage = {
  getToken(): string | null {
    if (memoryToken) return memoryToken;
    return readSession(TOKEN_KEY);
  },

  setToken(token: string): void {
    memoryToken = token;
    writeSession(TOKEN_KEY, token);
  },

  clearToken(): void {
    memoryToken = null;
    removeSession(TOKEN_KEY);
  },

  getRefreshToken(): string | null {
    if (memoryRefreshToken) return memoryRefreshToken;
    return readSession(REFRESH_TOKEN_KEY);
  },

  setRefreshToken(token: string): void {
    memoryRefreshToken = token;
    writeSession(REFRESH_TOKEN_KEY, token);
  },

  clearRefreshToken(): void {
    memoryRefreshToken = null;
    removeSession(REFRESH_TOKEN_KEY);
  },
};
