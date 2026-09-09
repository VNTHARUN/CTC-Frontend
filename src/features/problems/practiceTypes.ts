export type PracticeDifficulty = 'Easy' | 'Medium' | 'Hard';
export type PracticeRole = 'USER' | 'ADMIN';
export type PracticeSort = 'submissions' | 'newest' | 'title';
export type PracticeStatus = 'All' | 'Solved' | 'Unsolved' | 'Bookmarked';

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

export interface PracticeQuestionDraft {
  title: string;
  slug: string;
  difficulty: PracticeDifficulty;
  topic: string;
  companies: string;
  description: string;
}
