/**
 * Standard REST API Response Envelope matching Spring Boot backend conventions
 */
export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
  errors?: Record<string, string[]>;
}

export interface ApiErrorResponse {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

/**
 * Backend envelope shape from the Spring Boot API.
 * All endpoints return this structure.
 *
 * Example:
 * {
 *   "statusCode": 200,
 *   "message": "User Created Successfully",
 *   "data": { ... },
 *   "errors": null,
 *   "timestamp": "2026-08-12T22:12:10.1129678"
 * }
 */
export interface BackendEnvelope<T = any> {
  statusCode: number;
  message: string;
  data: T | null;
  errors: string[] | null;
  timestamp: string;
}
