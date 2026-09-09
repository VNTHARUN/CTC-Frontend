import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { tokenStorage } from '../security/tokenStorage';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8081/api/v1';

export const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 60000, // 60s — accounts for Render free tier cold start (can take 30-50s)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

// Single-flight refresh token mechanism to prevent concurrent refresh requests
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value: any) => void;
  reject: (error: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

// Request Interceptor - Inject JWT Bearer Token
const isPublicAuthUrl = (url = ''): boolean =>
  url.includes('/auth/login') ||
  url.includes('/signUp') ||
  url.includes('/auth/generatePasswordResetOtp') ||
  url.includes('/auth/verifyPasswordResetOtp') ||
  url.includes('/oauth2/authorization');

apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStorage.getToken();
    const url = `${config.baseURL ?? ''}${config.url ?? ''}`;
    // Public auth calls must not send a leftover JWT — a 401 would trigger
    // refresh/redirect and wipe the toast the form is trying to show.
    if (token && config.headers && !isPublicAuthUrl(url)) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor - Handle Common HTTP Statuses & Token Refresh
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      const status = error.response.status;
      
      const url: string = originalRequest?.url ?? '';
      // Credential submissions: the user is not logged in yet, so a 401 means
      // "wrong credentials" — reject with the backend envelope and let the form
      // render it. Redirecting here would reload the page and drop the message.
      const isCredentialSubmission = isPublicAuthUrl(url);
      // Session endpoints: a 401 here means the existing session is gone.
      const isSessionEndpoint =
        url.includes('/auth/refresh') || url.includes('/auth/logout');

      if (status === 401 && isCredentialSubmission) {
        return Promise.reject(error.response?.data || {
          success: false,
          message: 'Authentication failed. Please check your credentials.',
        });
      }

      // 401 Unauthorized — attempt token refresh for non-auth endpoints
      if (status === 401 && !originalRequest._retry) {
        // Do NOT refresh on session endpoints to prevent infinite loops
        if (isSessionEndpoint) {
          // Session expired — clear tokens and redirect to login
          tokenStorage.clearToken();
          if (window.location.pathname !== '/login') {
            window.location.href = '/login?expired=true';
          }
          return Promise.reject(error.response?.data || {
            success: false,
            message: 'Authentication failed. Please log in again.',
          });
        }

        // For other endpoints, attempt refresh token rotation
        if (isRefreshing) {
          // If refresh is already in progress, queue this request to retry after refresh completes
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then(token => {
            if (token && originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return apiClient(originalRequest);
          }).catch(err => {
            return Promise.reject(err);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          // Dynamically import to avoid circular dependency
          const { authService } = await import('../../services/authService');
          const newToken = await authService.refreshToken();

          if (newToken) {
            processQueue(null, newToken);
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${newToken}`;
            }
            // Retry the original request with the new token
            return apiClient(originalRequest);
          } else {
            throw new Error('Token refresh failed');
          }
        } catch (refreshError) {
          processQueue(refreshError, null);
          tokenStorage.clearToken();
          
          // Redirect to login if refresh failed
          if (window.location.pathname !== '/login') {
            window.location.href = '/login?expired=true';
          }
          
          return Promise.reject(error.response?.data || {
            success: false,
            message: 'Session expired. Please log in again.',
          });
        } finally {
          isRefreshing = false;
        }
      }
    }

    // For all other errors (400, 403, 404, 500, etc), reject with the backend
    // envelope untouched so callers can read its `message` and `errors` fields.
    if (error.response?.data) {
      return Promise.reject(error.response.data);
    }

    // No response at all (offline, DNS, CORS, timeout) — there is no backend
    // message to show, so substitute a readable one instead of the raw Axios text.
    return Promise.reject({
      success: false,
      message:
        error.code === 'ECONNABORTED'
          ? 'The server took too long to respond. Please try again.'
          : 'Unable to reach the server. Please check your connection.',
    });
  }
);
