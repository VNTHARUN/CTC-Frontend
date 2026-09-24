import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  authService,
  clearClientAuthState,
  LoginPayload,
  RegisterPayload,
  AuthUser,
  authUserStorage,
} from '../../../services/authService';
import { tokenStorage } from '../../../core/security/tokenStorage';
import { toAuthFeedback, type AuthFeedback } from '../utils/authToasts';
import { markExplicitLogout } from '../utils/authHome';
import { OAUTH_PENDING_KEY } from '../utils/googleOAuth';

// ─── State Shape ──────────────────────────────────────────────────────────────

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  initialized: boolean;
  error: string | null;
  isAuthModalOpen: boolean;
  authModalMode: 'login' | 'signup';
  /** Backend refresh `message` after a Google OAuth return; consumed by the handler. */
  oauthMessage: string | null;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  initialized: false,
  error: null,
  isAuthModalOpen: false,
  authModalMode: 'login',
  oauthMessage: null,
};

// ─── Async Thunks ──────────────────────────────────────────────────────────────

/**
 * Login — authenticates and stores access token.
 */
export const loginUser = createAsyncThunk(
  'auth/login',
  async (payload: LoginPayload, { rejectWithValue }) => {
    try {
      const res = await authService.login(payload);
      // `message` is the backend envelope message, surfaced as a success toast.
      return { token: res.data.token, user: res.data.user, message: res.message };
    } catch (err: unknown) {
      return rejectWithValue(toAuthFeedback(err));
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (payload: RegisterPayload, { rejectWithValue }) => {
    try {
      const res = await authService.register(payload);
      return res;
    } catch (err: unknown) {
      return rejectWithValue(toAuthFeedback(err));
    }
  }
);

/**
 * Logout — invalidates refresh token on the server and clears local state.
 */
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    markExplicitLogout();
    try {
      const res = await authService.logout();
      return { message: res.message };
    } catch (err: unknown) {
      return rejectWithValue(toAuthFeedback(err));
    } finally {
      clearClientAuthState();
    }
  }
);

/**
 * Initialize auth state from the existing token flow and the login identity
 * cached in session storage. If only a refresh token remains, rotate it first.
 * Replace the cached identity with GET /auth/me when that endpoint is available.
 */
export const initializeAuth = createAsyncThunk(
  'auth/initialize',
  async (_, { rejectWithValue }) => {
    const oauthReturn =
      typeof sessionStorage !== 'undefined' && sessionStorage.getItem(OAUTH_PENDING_KEY) === '1';

    try {
      const existingToken = tokenStorage.getToken();
      const existingUser = authUserStorage.getUser();
      if (existingToken && existingUser && !oauthReturn) {
        return { token: existingToken, user: existingUser, message: null, oauthReturn: false };
      }

      const session = await authService.refreshSession();
      return {
        token: session.token,
        user: session.user,
        message: session.message,
        oauthReturn,
      };
    } catch (err: unknown) {
      clearClientAuthState();
      if (oauthReturn) {
        return rejectWithValue(toAuthFeedback(err));
      }
      return rejectWithValue('Session check failed');
    }
  }
);

// ─── Slice ────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
    },
    openAuthModal(
      state,
      action: PayloadAction<{ mode?: 'login' | 'signup' } | undefined>
    ) {
      state.isAuthModalOpen = true;
      if (action?.payload?.mode) {
        state.authModalMode = action.payload.mode;
      }
    },
    closeAuthModal(state) {
      state.isAuthModalOpen = false;
    },
    setAuthModalMode(state, action: PayloadAction<'login' | 'signup'>) {
      state.authModalMode = action.payload;
    },
    clearOauthMessage(state) {
      state.oauthMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // ── Login ──────────────────────────────────────────────────────────────
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = true;
        state.isAuthModalOpen = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.initialized = true;
        const feedback = action.payload as AuthFeedback | undefined;
        state.error = feedback?.errors?.[0] ?? feedback?.message ?? null;
      })

      // ── Register ───────────────────────────────────────────────────────────
      // Signup does NOT authenticate — it only creates the account.
      // On success, the modal switches to login mode (handled in Login.tsx).
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
        // Switch modal to login so user can sign in with their new account
        state.authModalMode = 'login';
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        const feedback = action.payload as AuthFeedback | undefined;
        state.error = feedback?.errors?.[0] ?? feedback?.message ?? null;
      })

      // ── Logout ─────────────────────────────────────────────────────────────
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.initialized = true;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state) => {
        // Even if the API call failed, clear local state
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.loading = false;
        state.initialized = true;
      })

      // ── Initialize Auth ────────────────────────────────────────────────────
      .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.initialized = false;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.error = null;
        state.oauthMessage = action.payload.oauthReturn ? action.payload.message : null;
      })
      .addCase(initializeAuth.rejected, (state) => {
        state.loading = false;
        state.initialized = true;
        state.isAuthenticated = false;
        state.user = null;
        state.token = null;
        state.error = null;
        state.oauthMessage = null;
      });
  },
});

export const {
  clearAuthError,
  openAuthModal,
  closeAuthModal,
  setAuthModalMode,
  clearOauthMessage,
} = authSlice.actions;
export default authSlice.reducer;
