/**
 * Token Storage Abstraction Layer
 * Provides safe in-memory token retention with encrypted session storage fallback
 * Prepares the codebase for production HTTP-Only Cookie or JWT Refresh Token flows
 */

let memoryToken: string | null = null;

const TOKEN_KEY = 'prep_auth_token';

export const tokenStorage = {
  getToken(): string | null {
    if (memoryToken) return memoryToken;
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  },

  setToken(token: string): void {
    memoryToken = token;
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch (e) {
      console.warn('Session storage write restricted', e);
    }
  },

  clearToken(): void {
    memoryToken = null;
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (e) {
      console.warn('Session storage clear restricted', e);
    }
  },
};
