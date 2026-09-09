import { apiClient } from '../core/api/apiClient';
import { API_ENDPOINTS } from '../core/api/endpoints';
import { mockDelay } from '../mock/mockAdapter';
import { tokenStorage } from '../core/security/tokenStorage';
import { ApiResponse } from '../core/types/api';
import { clearReadableRefreshCookies, resolveRefreshToken } from '../features/auth/utils/refreshTokenSource';

// Auth talks to the real backend by default so login/signup surface real
// server messages. Opt into fixtures explicitly with VITE_USE_MOCK_AUTH=true.
const USE_MOCK = import.meta.env.VITE_USE_MOCK_AUTH === 'true';

// ─── Payload Interfaces ────────────────────────────────────────────────────────

export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Matches the real API's signUp request body exactly.
 * POST /api/v1/signUp
 */
export interface RegisterPayload {
  firstName: string;
  lastName: string;
  labelUserName: string;
  email: string;
  password: string;
}

/**
 * Refresh token request payload.
 * POST /api/v1/auth/refresh
 */
export interface RefreshTokenPayload {
  refreshToken: string;
}

/**
 * Password reset step 2 payload.
 * POST /api/v1/auth/verifyPasswordResetOtp
 */
export interface VerifyPasswordResetOtpPayload {
  email: string;
  otp: string;
  password: string;
}

// ─── Response Interfaces ───────────────────────────────────────────────────────

export interface AuthUser {
  id?: number;
  firstName: string;
  lastName: string;
  username?: string | null;
  email: string;
  role: string;
}

export interface LoginResponseData {
  token: string;
  refreshToken: string;
  role: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * signUp API returns user info but no token — the user must log in after signup.
 * POST /api/v1/signUp
 * Response: { statusCode, message, data: { firstName, lastName, username, email, password, role }, errors, timestamp }
 *
 * NOTE: The backend returns password in the response. The frontend should NOT persist, log, or display this.
 */
export interface SignUpResponseData {
  firstName: string;
  lastName: string;
  username: string | null;
  email: string;
  password?: string; // Returned by backend but should not be used
  role: string;
}

/**
 * POST /api/v1/auth/refresh
 * Body: { refreshToken }
 * Data matches the login payload so Google OAuth can hydrate the session.
 */
export interface RefreshTokenResponseData {
  token?: string;
  accessToken?: string;
  refreshToken: string;
  role: string;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

export interface AuthSession {
  token: string;
  user: AuthUser;
  message: string;
}

/**
 * Shape the authSlice works with for a logged-in user.
 */
export interface AuthResponseData {
  token: string;
  user: AuthUser;
}

const AUTH_USER_KEY = 'c2c_auth_user';

export const authUserStorage = {
  getUser(): AuthUser | null {
    try {
      const storedUser = sessionStorage.getItem(AUTH_USER_KEY);
      if (!storedUser) return null;
      const user = JSON.parse(storedUser) as Partial<AuthUser>;
      if (!user.email || !user.firstName || !user.lastName) return null;
      return {
        ...user,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role?.toUpperCase() ?? '',
      };
    } catch {
      return null;
    }
  },

  setUser(user: AuthUser): void {
    try {
      sessionStorage.setItem(
        AUTH_USER_KEY,
        JSON.stringify({ ...user, role: user.role?.toUpperCase() ?? '' })
      );
    } catch {
      // Redux keeps the active session even when browser storage is unavailable.
    }
  },

  clearUser(): void {
    try {
      sessionStorage.removeItem(AUTH_USER_KEY);
    } catch {
      // Storage may be unavailable in restricted browsing contexts.
    }
  },
};

// ─── Backend API Response Envelope ────────────────────────────────────────────

interface BackendEnvelope<T> {
  statusCode: number;
  message: string;
  data: T | null;
  errors: string[] | null;
  timestamp: string;
}

// ─── Auth Service ──────────────────────────────────────────────────────────────

export const authService = {
  /**
   * POST /api/v1/auth/login
   * Payload: { email, password }
   * On success: JWT → sessionStorage; refresh token copy → sessionStorage for
   * logout/refresh POST bodies. The backend also sets the refresh token as an
   * HttpOnly cookie (sent automatically via withCredentials).
   */
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> {
    if (USE_MOCK) {
      const token = 'mock_jwt_token_header_secret_12345';
      const mockRefreshToken = 'mock_refresh_token_12345';
      const user: AuthUser = {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        role: 'USER',
      };
      tokenStorage.setToken(token);
      tokenStorage.setRefreshToken(mockRefreshToken);
      cookieStorage.clearRefreshToken();
      authUserStorage.setUser(user);
      return mockDelay(
        {
          token,
          user,
        },
        'Login successful'
      );
    }

    // apiClient interceptor already rejects with the backend envelope on HTTP errors.
    // We let those propagate as-is — the thunk's rejectWithValue will catch them.
    const envelope = await apiClient.post<any, BackendEnvelope<LoginResponseData>>(
      API_ENDPOINTS.AUTH.LOGIN,
      payload
    );

    // HTTP 200 but logical failure (e.g. statusCode: 401 in body).
    // Throw the envelope so the UI can toast errors[] or message.
    if (envelope.statusCode !== 200 || !envelope.data) {
      throw envelope;
    }

    const { token, refreshToken, id, firstName, lastName, email, role } = envelope.data;
    const user: AuthUser = {
      id,
      firstName,
      lastName,
      email,
      role: role?.toUpperCase() ?? '',
    };

    tokenStorage.setToken(token);
    tokenStorage.setRefreshToken(refreshToken);
    // Drop any leftover JS-writable cookie from the previous implementation.
    cookieStorage.clearRefreshToken();
    authUserStorage.setUser(user);

    return {
      success: true,
      message: envelope.message,
      data: {
        token,
        user,
      },
    };
  },

  /**
   * POST /api/v1/signUp
   * Payload: { firstName, lastName, userName, email, password }
   * On success: returns user data. The user is NOT auto-logged in — they must login after signup.
   */
  async register(payload: RegisterPayload): Promise<{ message: string; data: SignUpResponseData }> {
    if (USE_MOCK) {
      await new Promise((r) => setTimeout(r, 400));
      return {
        message: 'User Created Successfully',
        data: {
          firstName: payload.firstName,
          lastName: payload.lastName,
          username: payload.labelUserName,
          email: payload.email,
          role: 'USER',
        },
      };
    }

    // Let HTTP errors propagate — the thunk catches them via rejectWithValue.
    const envelope = await apiClient.post<any, BackendEnvelope<SignUpResponseData>>(
      API_ENDPOINTS.AUTH.REGISTER,
      payload
    );

    // HTTP 200 but logical failure (statusCode: 500 in body).
    // Throw the envelope so the UI can toast errors[] or message.
    if (envelope.statusCode !== 200 || !envelope.data) {
      throw envelope;
    }

    return {
      message: envelope.message,
      data: envelope.data,
    };
  },

  /**
   * POST /api/v1/auth/generatePasswordResetOtp
   * Body: { email }
   * Backend mails a 6-digit OTP. Response carries only the envelope message.
   */
  async generatePasswordResetOtp(email: string): Promise<{ message: string }> {
    if (USE_MOCK) {
      const res = await mockDelay(null, 'OTP sent to your registered email');
      return { message: res.message };
    }

    const envelope = await apiClient.post<
      { email: string },
      BackendEnvelope<unknown>
    >(API_ENDPOINTS.AUTH.GENERATE_PASSWORD_RESET_OTP, { email });

    // Throw the envelope so the UI can toast errors[] or message.
    if (envelope.statusCode !== 200) {
      throw envelope;
    }

    return { message: envelope.message };
  },

  /**
   * POST /api/v1/auth/verifyPasswordResetOtp
   * Body: { email, otp, password }
   * Verifies the mailed OTP and sets the new password.
   */
  async verifyPasswordResetOtp(payload: VerifyPasswordResetOtpPayload): Promise<{ message: string }> {
    if (USE_MOCK) {
      const res = await mockDelay(null, 'Password reset successfully');
      return { message: res.message };
    }

    const envelope = await apiClient.post<
      VerifyPasswordResetOtpPayload,
      BackendEnvelope<unknown>
    >(API_ENDPOINTS.AUTH.VERIFY_PASSWORD_RESET_OTP, payload);

    if (envelope.statusCode !== 200) {
      throw envelope;
    }

    return { message: envelope.message };
  },

  // ME endpoint not yet implemented by backend — commented out until available
  // async getCurrentUser(): Promise<ApiResponse<AuthUser>> {
  //   if (USE_MOCK) {
  //     const mockUser: AuthUser = {
  //       id: 1,
  //       firstName: 'Test',
  //       lastName: 'User',
  //       email: 'test@example.com',
  //       role: 'USER',
  //     };
  //     return mockDelay(mockUser, 'User profile fetched');
  //   }
  //   const envelope = await apiClient.get<any, BackendEnvelope<AuthUser>>(
  //     API_ENDPOINTS.AUTH.ME
  //   );
  //   if (envelope.statusCode !== 200 || !envelope.data) {
  //     throw new Error(extractErrorMessage(envelope, 'Failed to fetch user profile'));
  //   }
  //   return {
  //     success: true,
  //     message: envelope.message,
  //     data: envelope.data,
  //   };
  // },

  /**
   * POST /api/v1/auth/logout
   * Body: { refreshToken }
   *
   * Revokes the refresh token in the DB, then clears JWT + refresh copies from
   * the UI. Local storage is still cleared if the API call fails.
   */
  async logout(): Promise<{ message: string }> {
    const refreshToken = resolveRefreshToken(tokenStorage.getRefreshToken());
    let message = 'Logout Successful';

    if (!USE_MOCK && refreshToken) {
      try {
        const envelope = await apiClient.post<
          { refreshToken: string },
          BackendEnvelope<string>
        >(API_ENDPOINTS.AUTH.LOGOUT, { refreshToken });
        if (typeof envelope?.message === 'string' && envelope.message.trim()) {
          message = envelope.message;
        }
      } catch (err: unknown) {
        const fallback = (err as { message?: string })?.message;
        if (typeof fallback === 'string' && fallback.trim()) {
          message = fallback;
        }
      }
    }

    clearClientAuthState();
    return { message };
  },

  /**
   * POST /api/v1/auth/refresh
   * Body: { refreshToken }
   * Stores JWT + identity and rotates the refresh token.
   */
  async refreshSession(
    explicitToken?: string,
    options?: { allowEmptyBody?: boolean }
  ): Promise<AuthSession> {
    const refreshToken =
      resolveRefreshToken(explicitToken || tokenStorage.getRefreshToken()) ?? '';
    if (!refreshToken && !options?.allowEmptyBody) {
      throw { statusCode: 401, message: 'No refresh token available', data: null, errors: null };
    }

    if (USE_MOCK) {
      const user: AuthUser = {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        role: 'USER',
      };
      tokenStorage.setToken('mock_jwt_token_header_secret_12345');
      tokenStorage.setRefreshToken(refreshToken);
      authUserStorage.setUser(user);
      return { token: 'mock_jwt_token_header_secret_12345', user, message: 'Token Refreshed Successfully' };
    }

    const envelope = await apiClient.post<
      { refreshToken: string },
      BackendEnvelope<RefreshTokenResponseData>
    >(API_ENDPOINTS.AUTH.REFRESH_TOKEN, { refreshToken });

    if (envelope.statusCode !== 200 || !envelope.data) {
      throw envelope;
    }

    return persistRefreshedSession(envelope);
  },

  /**
   * Used by the Axios 401 interceptor. Returns the new access JWT or null.
   */
  async refreshToken(): Promise<string | null> {
    try {
      const session = await authService.refreshSession();
      return session.token;
    } catch {
      clearClientAuthState();
      return null;
    }
  },
};

function persistRefreshedSession(
  envelope: BackendEnvelope<RefreshTokenResponseData>
): AuthSession {
  const data = envelope.data!;
  const token = data.token || data.accessToken;
  if (!token) {
    throw envelope;
  }

  const user: AuthUser = {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    role: data.role?.toUpperCase() ?? '',
  };

  tokenStorage.setToken(token);
  if (data.refreshToken) {
    tokenStorage.setRefreshToken(data.refreshToken);
  }
  authUserStorage.setUser(user);

  return { token, user, message: envelope.message };
}

function clearClientAuthState(): void {
  tokenStorage.clearToken();
  tokenStorage.clearRefreshToken();
  cookieStorage.clearRefreshToken();
  authUserStorage.clearUser();
  delete apiClient.defaults.headers.common['Authorization'];
}

export const cookieStorage = {
  clearRefreshToken(): void {
    clearReadableRefreshCookies();
  },
};
