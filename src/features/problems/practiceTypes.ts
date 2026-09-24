export type PracticeDifficulty = 'Easy' | 'Medium' | 'Hard';
export type PracticeRole = 'USER' | 'ADMIN';
export type PracticeSort = 'submissions' | 'newest' | 'title';
export type PracticeStatus = 'All' | 'Solved' | 'Unsolved' | 'Bookmarked';
export type PracticeFilterKey = 'topic' | 'difficulty' | 'company' | 'qpf';

export interface PracticeFilterOption {
  value: string;
  label: string;
}

export interface ReferenceLibraryItem {
  id: number | string;
  refCode: string;
  refName?: string;
  refGroupCode?: string;
  isActive?: boolean;
}

export interface CodeLanguage {
  id: string;
  refCode: string;
  refName: string;
  isActive: boolean;
  monacoLanguage: string;
}

export interface CodeExecutionRequest {
  questionId: string;
  languageId: string;
  sourceCode: string;
}

export interface CodeExecutionTestCaseResult {
  id: string;
  type: string;
  passed: boolean;
  isHidden: boolean;
  input: string | null;
  expectedOutput: string | null;
  actualOutput: string | null;
}

export interface CodeExecutionResult {
  message: string;
  totalTestCases: number;
  passedTestCases: number;
  failedTestCases: number;
  testCases: CodeExecutionTestCaseResult[];
}

export interface PracticeCompanyItem {
  id: number | string;
  name: string;
  isActive?: boolean;
}

export interface QuestionPageRequest {
  pageNumber: number;
  pageSize: number;
  sortBy: string;
  sortDirection: string;
}

export interface QuestionSearchPayload {
  level: Array<number | string> | null;
  companies: Array<number | string> | null;
  topic: Array<number | string> | null;
  searchText: string | null;
  pageRequest: QuestionPageRequest;
}

export interface PracticeQuestion {
  id: string;
  title: string;
  slug: string;
  difficulty: PracticeDifficulty;
  category: string;
  topic: string;
  acceptanceRate: string;
  isSolved: boolean;
  isBookmarked: boolean;
  companies: string[];
  description: string;
  examples: Array<{
    input: string;
    output: string;
    explanation: string;
  }>;
}

export interface CodingQuestionHint {
  id: string;
  displayOrder: number;
  hintText: string;
}

export interface CodingQuestionTestCase {
  id: string;
  input: string;
  expectedOutput: string;
  explanation: string;
  displayOrder: number;
  isHidden: boolean;
}

export interface CodingQuestionResource {
  label: string;
  url: string;
}

export interface CodingQuestion {
  id: string;
  title: string;
  description: string;
  constraints: string;
  difficulty: PracticeDifficulty;
  topic: string;
  qpf: string;
  companies: string[];
  hints: CodingQuestionHint[];
  testCases: CodingQuestionTestCase[];
  resources: CodingQuestionResource[];
  starterCode: Record<string, string>;
}

export interface PracticeQuestionDraft {
  title: string;
  slug: string;
  difficulty: PracticeDifficulty;
  topic: string;
  companies: string;
  description: string;
}

export interface CreateQuestionPayload {
  title: string;
  description: string;
  constraints: string;
  difficultyRefGroupCode: 'DIFF';
  difficultyRefCode: string;
  topicRefGroupCode: 'TOPIC';
  topicRefCode: string;
  qpfRefGroupCode: 'QPF';
  qpfRefCode: string;
  questionHints: string[];
  companies: Array<number | string>;
  hackerRankUrl: string | null;
  leetCodeUrl: string | null;
  gfgUrl: string | null;
  isOwnProblem: boolean;
  askedDate: string | null;
  isActive: boolean;
}

export interface CreateTestCasePayload {
  input: string;
  expectedOutput: string;
  explanation: string;
  isHidden: boolean;
  displayOrder: number;
  typeRefGroupCode: 'TESTCASETYPE';
  typeRefCode: string;
}
