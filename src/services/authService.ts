import { apiClient } from '../core/api/apiClient';
import { API_ENDPOINTS } from '../core/api/endpoints';
import { mockDelay } from '../mock/mockAdapter';
import userProfileData from '../mock/data/userProfile.json';
import { tokenStorage } from '../core/security/tokenStorage';
import { ApiResponse } from '../core/types/api';

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  password: string;
  phone?: string;
}

export interface AuthResponseData {
  token: string;
  user: typeof userProfileData;
}

export const authService = {
  async login(payload: LoginPayload): Promise<ApiResponse<AuthResponseData>> {
    if (USE_MOCK) {
      const token = 'mock_jwt_token_header_secret_12345';
      tokenStorage.setToken(token);
      return mockDelay({
        token,
        user: userProfileData,
      }, 'Login successful');
    }
    const response = await apiClient.post<any, ApiResponse<AuthResponseData>>(API_ENDPOINTS.AUTH.LOGIN, payload);
    if (response.data?.token) {
      tokenStorage.setToken(response.data.token);
    }
    return response;
  },

  async register(payload: RegisterPayload): Promise<ApiResponse<AuthResponseData>> {
    if (USE_MOCK) {
      const token = 'mock_jwt_token_header_secret_67890';
      tokenStorage.setToken(token);
      return mockDelay({
        token,
        user: { ...userProfileData, fullName: payload.fullName, email: payload.email },
      }, 'Account registered successfully');
    }
    const response = await apiClient.post<any, ApiResponse<AuthResponseData>>(API_ENDPOINTS.AUTH.REGISTER, payload);
    if (response.data?.token) {
      tokenStorage.setToken(response.data.token);
    }
    return response;
  },

  async forgotPassword(email: string): Promise<ApiResponse<null>> {
    if (USE_MOCK) {
      return mockDelay(null, 'Password reset link sent to your email.');
    }
    return apiClient.post(API_ENDPOINTS.AUTH.FORGOT_PASSWORD, { email });
  },

  async getCurrentUser(): Promise<ApiResponse<typeof userProfileData>> {
    if (USE_MOCK) {
      return mockDelay(userProfileData, 'User profile fetched');
    }
    return apiClient.get(API_ENDPOINTS.AUTH.ME);
  },

  async logout(): Promise<ApiResponse<null>> {
    tokenStorage.clearToken();
    if (USE_MOCK) {
      return mockDelay(null, 'Logged out successfully');
    }
    return apiClient.post(API_ENDPOINTS.AUTH.LOGOUT);
  },
};
