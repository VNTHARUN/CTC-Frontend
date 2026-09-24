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
    LIST: '/company',
    DETAILS: (id: string) => `/company/${id}`,
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
  REFERENCE_LIBRARY: {
    BY_GROUP: (refGroupCode: string) => `/referenceLibrary/refGroupCode/${refGroupCode}`,
  },
  CODE_EXECUTION: {
    LANGUAGES: '/referenceLibrary/refGroupCode/LANG',
    USER_RUN: '/runCode',
    USER_SUBMIT: '/submitCode',
    ADMIN_RUN: '/admin/testCode',
    ADMIN_SUBMIT: '/admin/submitCode',
  },
  PRACTICE_COMPANY: {
    LIST: '/company',
    CREATE: '/company',
    DETAILS: (id: string | number) => `/company/${id}`,
  },
  QUESTIONS: {
    SEARCH: '/questions',
    CREATE: '/question',
    DETAILS: (questionId: number | string) => `/question/${questionId}`,
    TEST_CASES: (questionId: number | string) => `/question/${questionId}/testCases`,
  },
} as const;
