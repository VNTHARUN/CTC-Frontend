import { toast } from 'react-hot-toast';

/**
 * The user-facing part of the backend response envelope.
 *
 * Every endpoint returns `{ statusCode, message, data, errors, timestamp }`.
 * `errors` carries the specific reasons (e.g. "Email is already Registered")
 * and is null when there is nothing more specific than `message`.
 */
export interface AuthFeedback {
  message: string;
  errors: string[] | null;
}

/**
 * Shown only when the request never reached the backend, so there is no
 * server message to display. Server-provided text is never overridden.
 */
const NO_RESPONSE_MESSAGE = 'Something went wrong. Please try again.';

/**
 * Normalises a rejection into the envelope's `message` / `errors`.
 *
 * Anything that is not envelope-shaped (a thrown `Error` from our own code, a
 * runtime exception) is reported with a generic message so internal details
 * never reach the user.
 */
function readEnvelope(value: unknown): { message?: unknown; errors?: unknown } | null {
  if (!value || typeof value !== 'object' || value instanceof Error) return null;

  const asRecord = value as { message?: unknown; errors?: unknown; response?: { data?: unknown } };
  if (asRecord.response?.data && typeof asRecord.response.data === 'object') {
    return asRecord.response.data as { message?: unknown; errors?: unknown };
  }
  if ('message' in asRecord || 'errors' in asRecord) {
    return asRecord;
  }
  return null;
}

export function toAuthFeedback(rejection: unknown): AuthFeedback {
  const env = readEnvelope(rejection);
  if (!env) {
    return { message: NO_RESPONSE_MESSAGE, errors: null };
  }

  const { message, errors } = env;

  const parsedErrors = Array.isArray(errors)
    ? errors.filter((entry): entry is string => typeof entry === 'string' && entry.trim() !== '')
    : [];

  return {
    message:
      typeof message === 'string' && message.trim() !== '' ? message : NO_RESPONSE_MESSAGE,
    errors: parsedErrors.length > 0 ? parsedErrors : null,
  };
}

/**
 * Toasts the backend feedback: every entry of `errors` when it is populated,
 * otherwise the envelope's `message`.
 *
 * The message doubles as the toast id so repeated submits replace the existing
 * toast instead of stacking duplicates.
 */
export function toastAuthFeedback(feedback: AuthFeedback, variant: 'success' | 'error'): void {
  const messages = feedback.errors ?? [feedback.message];

  messages.forEach((message) => {
    if (variant === 'success') {
      toast.success(message, { id: message, duration: 4000 });
    } else {
      toast.error(message, { id: message, duration: 5000 });
    }
  });
}
