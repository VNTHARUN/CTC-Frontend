export const OAUTH_PENDING_KEY = 'c2c_oauth_pending';

/** Backend origin, e.g. https://codingplatform-tdt0.onrender.com */
export function getBackendOrigin(): string {
  const configured = import.meta.env.VITE_OAUTH_GOOGLE_URL;
  if (configured) {
    try {
      return new URL(configured).origin;
    } catch {
      return configured.replace(/\/oauth2\/authorization\/google\/?$/, '');
    }
  }

  const apiBase = import.meta.env.VITE_API_BASE_URL || 'https://codingplatform-tdt0.onrender.com/api/v1';
  return apiBase.replace(/\/api\/v1\/?$/, '');
}

export function getGoogleAuthorizationUrl(): string {
  if (import.meta.env.VITE_OAUTH_GOOGLE_URL) {
    return import.meta.env.VITE_OAUTH_GOOGLE_URL;
  }
  return `${getBackendOrigin()}/oauth2/authorization/google`;
}

/**
 * Leaves the SPA and starts the Spring OAuth2 Google flow.
 * On success the backend redirects back to /practice with a refresh cookie.
 */
export function startGoogleOAuth(): void {
  try {
    sessionStorage.setItem(OAUTH_PENDING_KEY, '1');
  } catch {
    // Redirect still proceeds; return handling just skips the success toast.
  }
  window.location.assign(getGoogleAuthorizationUrl());
}

export function consumeOAuthPending(): boolean {
  try {
    const pending = sessionStorage.getItem(OAUTH_PENDING_KEY) === '1';
    if (pending) sessionStorage.removeItem(OAUTH_PENDING_KEY);
    return pending;
  } catch {
    return false;
  }
}
