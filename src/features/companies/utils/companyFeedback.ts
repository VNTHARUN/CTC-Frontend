const INTERNAL_ERROR_PATTERN =
  /sql|syntax|hibernate|constraint|jdbc|psql|ora-\d+|exception|stack trace|at [\w.$]+\(/i;

const DUPLICATE_PATTERN = /already exists|duplicate|unique|taken/i;

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readStatus(error: unknown): number {
  const record = asRecord(error);
  return Number(record?.statusCode ?? record?.status ?? 0);
}

function readMessages(error: unknown): string[] {
  const record = asRecord(error);
  if (!record) return [];
  const details = Array.isArray(record.errors)
    ? record.errors.filter((entry): entry is string => typeof entry === 'string' && Boolean(entry.trim()))
    : [];
  if (typeof record.message === 'string' && record.message.trim()) {
    return [...details, record.message.trim()];
  }
  return details;
}

function sanitizeMessage(message: string, status: number): string {
  if (INTERNAL_ERROR_PATTERN.test(message) || DUPLICATE_PATTERN.test(message) || status === 409) {
    if (status === 409 || DUPLICATE_PATTERN.test(message)) {
      return 'A company with this name already exists.';
    }
    return 'Unable to create the company. Please try again.';
  }
  return message;
}

export function getCompanyErrorMessage(error: unknown, fallback = 'Unable to load companies. Please try again.'): string {
  const status = readStatus(error);
  const messages = readMessages(error);
  const first = messages[0] ? sanitizeMessage(messages[0], status) : '';

  if (status === 401) return 'Your session has expired. Please sign in again.';
  if (status === 403) return 'You do not have permission to view this company.';
  if (status === 404) return 'That company could not be found.';
  if (status === 408) return 'The request timed out. Please try again.';
  if (status === 429) return 'Too many requests. Please wait and try again.';
  if ([500, 502, 503].includes(status)) return 'The company service is temporarily unavailable.';
  if (first === 'The server took too long to respond. Please try again.') {
    return 'The request timed out. Please try again.';
  }
  if (first === 'Unable to reach the server. Please check your connection.') {
    return 'Unable to reach the company service. Check your connection and try again.';
  }
  if (first && !INTERNAL_ERROR_PATTERN.test(first)) return first;
  return fallback;
}

export function getCreateCompanyErrorMessage(error: unknown): string {
  const status = readStatus(error);
  const messages = readMessages(error);
  const first = messages[0] ? sanitizeMessage(messages[0], status) : '';

  if (status === 401) return 'Your session has expired. Please sign in again.';
  if (status === 403) return 'You do not have permission to add companies.';
  if (status === 409) return first || 'A company with this name already exists.';
  if (status === 400) return first || 'Check the company details and try again.';
  if (status === 408) return 'The request timed out. Please try again.';
  if (status === 429) return 'Too many requests. Please wait and try again.';
  if ([500, 502, 503].includes(status)) return 'The company service is temporarily unavailable.';

  if (first === 'The server took too long to respond. Please try again.') {
    return 'The request timed out. Please try again.';
  }
  if (first === 'Unable to reach the server. Please check your connection.') {
    return 'Unable to reach the company service. Check your connection and try again.';
  }
  if (first) return first;
  return 'Unable to create the company. Please try again.';
}
