/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_USE_MOCK: string;
  readonly VITE_USE_MOCK_AUTH: string;
  readonly VITE_OAUTH_GOOGLE_URL: string;
  readonly VITE_REFRESH_TOKEN_COOKIE: string;
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_TAGLINE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
