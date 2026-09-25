import { apiClient } from '../core/api/apiClient';
import { API_ENDPOINTS } from '../core/api/endpoints';
import { BackendEnvelope } from '../core/types/api';
import {
  CreateQuestionPayload,
  CreateTestCasePayload,
  CodeExecutionRequest,
  CodeExecutionResult,
  CodeExecutionTestCaseResult,
  CodeLanguage,
  CodingQuestion,
  CodingQuestionHint,
  CodingQuestionResource,
  CodingQuestionTestCase,
  PracticeCompanyItem,
  PracticeDifficulty,
  PracticeQuestion,
  QuestionSearchPayload,
  ReferenceLibraryItem,
} from '../features/problems/practiceTypes';

const DEFAULT_QUESTION_PAGE: QuestionSearchPayload['pageRequest'] = {
  pageNumber: 0,
  pageSize: 25,
  sortBy: 'id',
  sortDirection: 'ASC',
};

function asRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function readString(value: unknown, fallback = ''): string {
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  const record = asRecord(value);
  if (!record) return fallback;
  if (typeof record.refCode === 'string') return record.refCode;
  if (typeof record.name === 'string') return record.name;
  if (typeof record.title === 'string') return record.title;
  return fallback;
}

export function getPracticeApiErrorMessage(error: unknown, fallback: string): string {
  if (typeof error === 'string' && error.trim()) return error;
  const record = asRecord(error);
  if (record) {
    if (Array.isArray(record.errors)) {
      const first = record.errors.find((entry) => typeof entry === 'string' && entry.trim());
      if (typeof first === 'string') return first;
    }
    if (typeof record.message === 'string' && record.message.trim()) return record.message;
  }
  if (error instanceof Error && error.message.trim()) return error.message;
  return fallback;
}

function unwrapEnvelopeData<T>(envelope: BackendEnvelope<T> | T): T | null {
  const record = asRecord(envelope);
  if (record && typeof record.statusCode === 'number' && record.statusCode >= 400) {
    throw envelope;
  }
  if (record && 'data' in record) {
    return (record.data as T | null) ?? null;
  }
  return (envelope as T) ?? null;
}

function extractList<T>(payload: unknown): T[] {
  if (Array.isArray(payload)) return payload as T[];
  const record = asRecord(payload);
  if (!record) return [];
  if (Array.isArray(record.data)) return record.data as T[];
  if (Array.isArray(record.content)) return record.content as T[];
  if (Array.isArray(record.records)) return record.records as T[];
  if (Array.isArray(record.questions)) return record.questions as T[];
  return [];
}

function isActiveRecord(item: { isActive?: boolean }): boolean {
  return item.isActive === true;
}

function toSlug(value: string, fallback: string) {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return slug || fallback;
}

function normalizeDifficulty(value: unknown): PracticeDifficulty {
  const text = readString(value).toLowerCase();
  if (text.includes('easy') || text === 'e') return 'Easy';
  if (text.includes('hard') || text === 'h') return 'Hard';
  return 'Medium';
}

function extractCompanies(raw: Record<string, unknown>): string[] {
  const value = raw.companies ?? raw.companyNames ?? raw.companyList ?? raw.company;
  if (typeof value === 'string') {
    return value.split(',').map((item) => item.trim()).filter(Boolean);
  }
  if (!Array.isArray(value)) return [];
  return value.map((item) => readString(item)).filter(Boolean);
}

function extractTopic(raw: Record<string, unknown>): string {
  const value = raw.topic ?? raw.topicName ?? raw.topics ?? raw.refCode;
  if (Array.isArray(value)) {
    return value.map((item) => readString(item)).filter(Boolean).join(', ') || 'Topic';
  }
  return readString(value, 'Topic');
}

function mapApiQuestion(raw: unknown, index: number): PracticeQuestion {
  const record = asRecord(raw) ?? {};
  const id = readString(record.id ?? record.questionId, `question-${index}`);
  const title = readString(record.title ?? record.questionTitle ?? record.name, 'Untitled question');
  const topic = extractTopic(record);

  return {
    id,
    title,
    slug: readString(record.slug, toSlug(title, id)),
    difficulty: normalizeDifficulty(record.difficulty ?? record.level ?? record.levelName),
    category: readString(record.category, 'DSA'),
    topic,
    acceptanceRate: readString(record.acceptanceRate ?? record.acceptance, '—'),
    isSolved: Boolean(record.isSolved),
    isBookmarked: Boolean(record.isBookmarked),
    companies: extractCompanies(record),
    description: readString(record.description ?? record.questionText),
    examples: Array.isArray(record.examples) ? (record.examples as PracticeQuestion['examples']) : [],
  };
}

function readNumber(value: unknown, fallback: number): number {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function monacoLanguageFor(value: string): string {
  const normalized = value.toLowerCase().replace(/[^a-z+#]/g, '');
  const aliases: Record<string, string> = {
    py: 'python', python: 'python',
    js: 'javascript', javascript: 'javascript',
    ts: 'typescript', typescript: 'typescript',
    c: 'cpp', cpp: 'cpp', 'c++': 'cpp',
    cs: 'csharp', csharp: 'csharp', 'c#': 'csharp',
    java: 'java', go: 'go', kotlin: 'kotlin', kt: 'kotlin', rust: 'rust', rs: 'rust',
  };
  return aliases[normalized] ?? 'plaintext';
}

function mapCodeLanguage(raw: unknown): CodeLanguage | null {
  const record = asRecord(raw);
  if (!record || record.isActive !== true) return null;
  const refCode = readString(record.refCode);
  const refName = readString(record.refName ?? record.name, refCode);
  const id = readString(record.id);
  if (!id || !refCode) return null;
  return { id, refCode, refName, isActive: true, monacoLanguage: monacoLanguageFor(refCode || refName) };
}

function readOutputText(value: unknown): string | null {
  if (value === null || value === undefined) return null;
  if (typeof value === 'string') return value;
  if (typeof value === 'number' || typeof value === 'boolean') return String(value);
  return null;
}

function normalizeOutput(value: string): string {
  return value.replace(/\r\n/g, '\n').trimEnd();
}

function readBooleanFlag(value: unknown): boolean | null {
  if (value === true || value === 1) return true;
  if (value === false || value === 0) return false;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (['true', '1', 'yes'].includes(normalized)) return true;
    if (['false', '0', 'no'].includes(normalized)) return false;
  }
  return null;
}

function readPassFromStatus(value: unknown): boolean | null {
  const status = readString(value).trim().toUpperCase().replace(/[\s-]+/g, '_');
  if (!status) return null;
  if (['PASSED', 'PASS', 'SUCCESS', 'SUCCESSFUL', 'ACCEPTED', 'AC', 'OK', 'CORRECT'].includes(status)) return true;
  if (['FAILED', 'FAIL', 'WRONG_ANSWER', 'WA', 'ERROR', 'TLE', 'RTE', 'CE', 'REJECTED'].includes(status)) return false;
  return null;
}

function mapExecutionTestCase(raw: unknown, index: number): CodeExecutionTestCaseResult | null {
  const record = asRecord(raw);
  if (!record) return null;
  const id = readString(record.id ?? record.testCaseId, `test-case-${index + 1}`);
  const type = readString(record.type ?? record.testCaseType ?? record.typeRefCode, 'Test case');
  const input = readOutputText(record.input);
  const expectedOutput = readOutputText(record.expectedOutput ?? record.expected);
  const actualOutput = readOutputText(record.actualOutput ?? record.output ?? record.actual);
  const passed =
    readBooleanFlag(record.passed ?? record.isPassed ?? record.success ?? record.isSuccess)
    ?? readPassFromStatus(record.status ?? record.result ?? record.verdict ?? record.outcome)
    ?? (expectedOutput !== null && actualOutput !== null
      ? normalizeOutput(expectedOutput) === normalizeOutput(actualOutput)
      : false);
  return {
    id,
    type,
    passed,
    isHidden: record.isHidden === true || record.isHidden === 'true' || record.hidden === true,
    input,
    expectedOutput,
    actualOutput,
  };
}

function mapCodeExecution(raw: unknown, message = ''): CodeExecutionResult {
  const record = asRecord(raw);
  if (!record) throw new Error('The execution service returned an invalid response.');
  const rawTestCases = record.testCases ?? record.results ?? record.testCaseResults;
  if (!Array.isArray(rawTestCases)) throw new Error('The execution service returned no test case results.');
  const testCases = rawTestCases.map(mapExecutionTestCase).filter((item): item is CodeExecutionTestCaseResult => Boolean(item));
  const passedFromCases = testCases.filter((testCase) => testCase.passed).length;
  const totalTestCases = readNumber(record.totalTestCases, testCases.length);
  const passedTestCases = testCases.length ? passedFromCases : readNumber(record.passedTestCases, 0);
  const failedTestCases = Math.max(0, totalTestCases - passedTestCases);
  const dataMessage = readString(record.message).trim();
  return {
    message: message || dataMessage,
    totalTestCases,
    passedTestCases,
    failedTestCases,
    testCases,
  };
}

function executionStatus(error: unknown): number {
  const record = asRecord(error);
  return Number(record?.statusCode ?? record?.status ?? 0);
}

const CLIENT_NETWORK_MESSAGES = new Set([
  'The server took too long to respond. Please try again.',
  'Unable to reach the server. Please check your connection.',
]);

function readBackendErrorDetails(error: unknown): string[] {
  const record = asRecord(error);
  if (!record || !Array.isArray(record.errors)) return [];
  return record.errors.filter((entry): entry is string => typeof entry === 'string' && Boolean(entry.trim())).map((entry) => entry.trim());
}

function readBackendErrorMessage(error: unknown): string {
  const record = asRecord(error);
  if (typeof record?.message === 'string' && record.message.trim()) {
    const message = record.message.trim();
    if (message === 'The server took too long to respond. Please try again.') {
      return 'Code execution timed out. Please try again.';
    }
    if (message === 'Unable to reach the server. Please check your connection.') {
      return 'Unable to reach the execution service. Check your connection and try again.';
    }
    if (!CLIENT_NETWORK_MESSAGES.has(message) && error instanceof Error === false) {
      return message;
    }
    if (record.statusCode || record.errors || record.data !== undefined) {
      return message;
    }
  }
  return '';
}

export function getCodeExecutionErrorMessage(error: unknown): string {
  const details = readBackendErrorDetails(error);
  if (details[0]) return details[0];

  const backendMessage = readBackendErrorMessage(error);
  if (backendMessage) return backendMessage;

  const status = executionStatus(error);
  if (status === 400) return 'The code request was invalid. Check the selected language and source code.';
  if (status === 401) return 'Your session has expired. Please sign in again.';
  if (status === 403) return 'You do not have permission to execute code here.';
  if (status === 404) return 'The question or execution service could not be found.';
  if (status === 408) return 'Code execution timed out. Try a simpler solution.';
  if (status === 429) return 'Too many execution requests. Please wait and try again.';
  if ([500, 502, 503].includes(status)) return 'The code execution service is temporarily unavailable.';
  const record = asRecord(error);
  if (record?.message === 'The execution service returned an invalid response.' || record?.message === 'The execution service returned no test case results.') {
    return String(record.message);
  }
  return 'Unable to execute code. Please try again.';
}

export function getCodeExecutionErrorMessages(error: unknown): string[] {
  const details = readBackendErrorDetails(error);
  if (details.length) return details;
  return [getCodeExecutionErrorMessage(error)];
}

function mapQuestionHint(raw: unknown, index: number): CodingQuestionHint {
  const record = asRecord(raw) ?? {};
  return {
    id: readString(record.id ?? record.hintId, `hint-${index}`),
    displayOrder: readNumber(record.displayOrder ?? record.order, index + 1),
    hintText: readString(record.hintText ?? record.text ?? record.hint),
  };
}

function mapQuestionTestCase(raw: unknown, index: number): CodingQuestionTestCase {
  const record = asRecord(raw) ?? {};
  return {
    id: readString(record.id ?? record.testCaseId, `test-case-${index}`),
    input: readString(record.input),
    expectedOutput: readString(record.expectedOutput ?? record.output),
    explanation: readString(record.explanation),
    displayOrder: readNumber(record.displayOrder ?? record.order, index + 1),
    isHidden: record.isHidden === true || record.isHidden === 'true',
  };
}

function mapQuestionResource(label: string, value: unknown): CodingQuestionResource | null {
  const url = readString(value);
  return url ? { label, url } : null;
}

function mapCodingQuestion(raw: unknown): CodingQuestion {
  const record = asRecord(raw) ?? {};
  const data = asRecord(record.data) ?? record;
  const question = asRecord(data.question) ?? data;
  const starterCodeRecord = asRecord(question.codeSnippets ?? question.starterCode) ?? {};
  const hints = question.questionHints ?? question.hints;
  const testCases = question.testCases ?? question.examples ?? data.testCases;
  const linkedResources = Array.isArray(question.externalResources)
    ? question.externalResources
        .map((resource, index) => {
          const item = asRecord(resource) ?? {};
          return mapQuestionResource(readString(item.label ?? item.name, `Resource ${index + 1}`), item.url ?? item.href);
        })
        .filter((item): item is CodingQuestionResource => Boolean(item))
    : [];
  const resources = [
    mapQuestionResource('HackerRank', question.hackerRankUrl),
    mapQuestionResource('LeetCode', question.leetCodeUrl),
    mapQuestionResource('GeeksforGeeks', question.gfgUrl),
    ...linkedResources,
  ].filter((item): item is CodingQuestionResource => Boolean(item));

  return {
    id: readString(question.id ?? question.questionId),
    title: readString(question.title ?? question.questionTitle, 'Untitled question'),
    description: readString(question.description ?? question.questionText),
    constraints: readString(question.constraints),
    difficulty: normalizeDifficulty(question.difficulty ?? question.level ?? question.difficultyRefCode),
    topic: extractTopic(question),
    qpf: readString(question.qpf ?? question.qpfName ?? question.qpfRefCode),
    companies: extractCompanies(question),
    hints: (Array.isArray(hints) ? hints : []).map(mapQuestionHint).filter((hint) => hint.hintText),
    testCases: (Array.isArray(testCases) ? testCases : []).map(mapQuestionTestCase),
    resources,
    starterCode: Object.fromEntries(
      Object.entries(starterCodeRecord).map(([language, code]) => [language, readString(code)])
    ),
  };
}

export function toQuestionFilterIds(value: string | string[]): Array<number | string> {
  const values = Array.isArray(value) ? value : value ? [value] : [];
  return values
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const numeric = Number(item);
      return Number.isFinite(numeric) && String(numeric) === item ? numeric : item;
    });
}

function toNullableIds(value: string | string[]): Array<number | string> | null {
  const ids = toQuestionFilterIds(value);
  return ids.length > 0 ? ids : null;
}

export function buildQuestionSearchPayload(filters: {
  topicId?: string;
  difficultyId?: string;
  companyIds?: string[];
  searchText?: string;
  pageNumber?: number;
} = {}): QuestionSearchPayload {
  const searchText = filters.searchText?.trim() ?? '';
  return {
    level: toNullableIds(filters.difficultyId ?? ''),
    companies: toNullableIds(filters.companyIds ?? []),
    topic: toNullableIds(filters.topicId ?? ''),
    searchText: searchText || null,
    pageRequest: {
      ...DEFAULT_QUESTION_PAGE,
      pageNumber: filters.pageNumber ?? 0,
    },
  };
}

const inFlightRequests = new Map<string, Promise<unknown>>();

function shareInFlight<T>(key: string, factory: () => Promise<T>): Promise<T> {
  const existing = inFlightRequests.get(key);
  if (existing) return existing as Promise<T>;
  const request = factory().finally(() => {
    if (inFlightRequests.get(key) === request) {
      inFlightRequests.delete(key);
    }
  });
  inFlightRequests.set(key, request);
  return request;
}

export const practiceService = {
  async getCodeLanguages(): Promise<CodeLanguage[]> {
    return shareInFlight('code-languages', async () => {
      const envelope = await apiClient.get<unknown, BackendEnvelope<unknown>>(
        API_ENDPOINTS.CODE_EXECUTION.LANGUAGES
      );
      return extractList<unknown>(unwrapEnvelopeData(envelope))
        .map(mapCodeLanguage)
        .filter((language): language is CodeLanguage => Boolean(language));
    });
  },

  async executeCode(
    role: 'USER' | 'ADMIN',
    mode: 'RUN' | 'SUBMIT',
    payload: CodeExecutionRequest,
    signal?: AbortSignal
  ): Promise<CodeExecutionResult> {
    const endpoint = role === 'ADMIN'
      ? mode === 'RUN' ? API_ENDPOINTS.CODE_EXECUTION.ADMIN_RUN : API_ENDPOINTS.CODE_EXECUTION.ADMIN_SUBMIT
      : mode === 'RUN' ? API_ENDPOINTS.CODE_EXECUTION.USER_RUN : API_ENDPOINTS.CODE_EXECUTION.USER_SUBMIT;
    const envelope = await apiClient.post<unknown, BackendEnvelope<unknown>>(endpoint, payload, { signal });
    const record = asRecord(envelope);
    const message = readString(record?.message).trim();
    return mapCodeExecution(unwrapEnvelopeData(envelope), message);
  },

  async getQuestion(questionId: string): Promise<CodingQuestion> {
    return shareInFlight(`question:${questionId}`, async () => {
      const envelope = await apiClient.get<unknown, BackendEnvelope<unknown>>(
        API_ENDPOINTS.QUESTIONS.DETAILS(questionId)
      );
      return mapCodingQuestion(unwrapEnvelopeData(envelope));
    });
  },

  async getReferenceLibrary(refGroupCode: string): Promise<ReferenceLibraryItem[]> {
    const envelope = await apiClient.get<unknown, BackendEnvelope<ReferenceLibraryItem[]>>(
      API_ENDPOINTS.REFERENCE_LIBRARY.BY_GROUP(refGroupCode)
    );
    return extractList<ReferenceLibraryItem>(unwrapEnvelopeData(envelope)).filter(isActiveRecord);
  },

  async getCompanies(): Promise<PracticeCompanyItem[]> {
    return shareInFlight('practice-company-list', async () => {
      const envelope = await apiClient.get<unknown, BackendEnvelope<PracticeCompanyItem[]>>(
        API_ENDPOINTS.PRACTICE_COMPANY.LIST
      );
      return extractList<PracticeCompanyItem>(unwrapEnvelopeData(envelope)).filter(isActiveRecord);
    });
  },

  async createQuestion(payload: CreateQuestionPayload): Promise<number> {
    const envelope = await apiClient.post<unknown, BackendEnvelope<unknown>>(
      API_ENDPOINTS.QUESTIONS.CREATE,
      payload
    );
    const data = unwrapEnvelopeData(envelope);
    const record = asRecord(data);
    const nestedData = asRecord(record?.data);
    const rawId = record?.id
      ?? record?.questionId
      ?? nestedData?.id
      ?? nestedData?.questionId
      ?? data;
    const questionId = Number(rawId);
    if (!Number.isFinite(questionId)) {
      throw { message: 'Question was created, but the API did not return its ID.' };
    }
    return questionId;
  },

  async createTestCases(questionId: number, testCases: CreateTestCasePayload[]): Promise<void> {
    const envelope = await apiClient.post<unknown, BackendEnvelope<unknown>>(
      API_ENDPOINTS.QUESTIONS.TEST_CASES(questionId),
      testCases
    );
    unwrapEnvelopeData(envelope);
  },

  async searchQuestions(payload: QuestionSearchPayload): Promise<PracticeQuestion[]> {
    const envelope = await apiClient.post<unknown, BackendEnvelope<unknown>>(
      API_ENDPOINTS.QUESTIONS.SEARCH,
      {
        ...payload,
        pageRequest: { ...DEFAULT_QUESTION_PAGE, ...payload.pageRequest },
      }
    );
    return extractList<unknown>(unwrapEnvelopeData(envelope)).map(mapApiQuestion);
  },
};
