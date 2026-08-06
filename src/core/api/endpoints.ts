/**
 * Centralized REST API Endpoint Constants
 * These endpoints map directly to Java Spring Boot REST Controllers
 */
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password',
    REFRESH_TOKEN: '/auth/refresh-token',
    ME: '/auth/me',
    LOGOUT: '/auth/logout',
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
