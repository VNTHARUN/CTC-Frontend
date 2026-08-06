import { ApiResponse } from '../core/types/api';

/**
 * Mock API Network Delay Simulator
 * Wraps static JSON objects in realistic Promises simulating production REST APIs
 */
export const mockDelay = <T>(
  data: T,
  message = 'Success',
  delayMs = 300,
  meta?: ApiResponse<T>['meta']
): Promise<ApiResponse<T>> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message,
        data,
        meta,
      });
    }, delayMs);
  });
};
