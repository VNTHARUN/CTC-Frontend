/**
 * Centralized REST API Endpoint Constants
 * These endpoints map directly to Java Spring Boot REST Controllers
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/signUp',         
    GENERATE_PASSWORD_RESET_OTP: '/auth/generatePasswordResetOtp',
    VERIFY_PASSWORD_RESET_OTP: '/auth/verifyPasswordResetOtp',
    REFRESH_TOKEN: '/auth/refresh',
    // ME: '/auth/me', // Not yet implemented by backend
    LOGOUT: '/auth/logout',
    // Google OAuth lives on the backend origin, not under /api/v1.
    // See getGoogleAuthorizationUrl() in features/auth/utils/googleOAuth.ts
  },
  PROBLEMS: {
    LIST: '/problems',
    DETAILS: (id: string) => `/problems/${id}`,
    SUBMIT: (id: string) => `/problems/${id}/submit`,
    CATEGORIES: '/problems/categories',
  },
  COMPANIES: {
    LIST: '/companies',
    DETAILS: (id: string) => `/companies/${id}`,
    PROBLEMS: (id: string) => `/companies/${id}/problems`,
  },
  APTITUDE: {
    LIST: '/prep/aptitude',
    TOPICS: '/prep/aptitude/topics',
  },
  LOGICAL: {
    LIST: '/prep/logical',
    TOPICS: '/prep/logical/topics',
  },
  VERBAL: {
    LIST: '/prep/verbal',
    TOPICS: '/prep/verbal/topics',
  },
  INTERVIEWS: {
    LIST: '/interviews',
    CATEGORIES: '/interviews/categories',
  },
  DASHBOARD: {
    OVERVIEW: '/dashboard/overview',
    STATS: '/dashboard/stats',
    RECENT_ACTIVITY: '/dashboard/activity',
  },
  BOOKMARKS: {
    LIST: '/bookmarks',
    TOGGLE: (id: string) => `/bookmarks/toggle/${id}`,
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile/update',
    CHANGE_PASSWORD: '/profile/change-password',
  },
  SETTINGS: {
    GET: '/settings',
    UPDATE: '/settings/update',
  },
} as const;
