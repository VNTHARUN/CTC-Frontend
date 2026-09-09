import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Bookmark,
  Check,
  ChevronRight,
  CirclePlus,
  Edit3,
  FilterX,
  RefreshCw,
  Search,
  Trash2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import problemsData from '../../../mock/data/problems.json';
import { Badge } from '../../../shared/components/ui/Badge';
import { Button } from '../../../shared/components/ui/Button';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { Modal } from '../../../shared/components/ui/Modal';
import { PageContainer } from '../../../shared/components/ui/Page';
import { Pagination } from '../../../shared/components/ui/Pagination';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import {
  PracticeDifficulty,
  PracticeQuestion,
  PracticeQuestionDraft,
  PracticeRole,
  PracticeSort,
  PracticeStatus,
} from '../practiceTypes';
import {
  PracticeCompanyFilter,
  PracticeFilterSelect,
} from './PracticeFilterDropdown';
import { PracticeQuestionForm } from './PracticeQuestionForm';

interface PracticeExplorerProps {
  role: PracticeRole;
}

const STORAGE_KEY = 'c2c_practice_admin_questions';
const PAGE_SIZE = 8;
const allQuestions = problemsData as PracticeQuestion[];

const searchClassName =
  'min-h-12 w-full rounded-xl border border-[var(--c2c-border)] bg-[var(--c2c-surface-raised)]/60 pl-10 pr-4 text-sm text-[var(--c2c-text)] outline-none transition-all placeholder:text-[var(--c2c-text-subtle)] hover:border-[var(--c2c-border-strong)] focus:border-violet-500/55 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/15';

const getMockSubmissions = (question: PracticeQuestion) => {
  const numericId = Number(question.id.replace(/\D/g, '')) || question.title.length;
  return 700 + ((numericId * 947) % 18400);
};

const getNewestRank = (question: PracticeQuestion) => {
  if (question.id.startsWith('local-')) return Number(question.id.replace('local-', ''));
  return Number(question.id.replace(/\D/g, '')) || 0;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 }).format(value);

const difficultyVariant = (difficulty: PracticeDifficulty) =>
  difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';

export const PracticeExplorer: React.FC<PracticeExplorerProps> = ({ role }) => {
  const isAdmin = role === 'ADMIN';
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [topic, setTopic] = useState('All');
  const [difficulty, setDifficulty] = useState('All');
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [status, setStatus] = useState<PracticeStatus>('All');
  const [sort, setSort] = useState<PracticeSort>('submissions');
  const [page, setPage] = useState(1);
  const [editingQuestion, setEditingQuestion] = useState<PracticeQuestion | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<PracticeQuestion | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const loadQuestions = () => {
    setLoading(true);
    setLoadError('');
    window.setTimeout(() => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        setQuestions(saved ? (JSON.parse(saved) as PracticeQuestion[]) : allQuestions);
      } catch {
        setLoadError('The local question preview could not be loaded.');
      } finally {
        setLoading(false);
      }
    }, 350);
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const topics = useMemo(
    () => ['All', ...Array.from(new Set(questions.map((question) => question.topic))).sort()],
    [questions]
  );
  const companies = useMemo(
    () => Array.from(new Set(questions.flatMap((question) => question.companies))).sort(),
    [questions]
  );

  const filteredQuestions = useMemo(() => {
    const query = search.trim().toLowerCase();
    const filtered = questions.filter((question) => {
      const matchesSearch =
        !query ||
        question.title.toLowerCase().includes(query) ||
        question.topic.toLowerCase().includes(query) ||
        question.companies.some((item) => item.toLowerCase().includes(query));
      const matchesTopic = topic === 'All' || question.topic === topic;
      const matchesDifficulty = difficulty === 'All' || question.difficulty === difficulty;
      // Multiple companies use OR matching: a question can match any selected company.
      const matchesCompany =
        selectedCompanies.length === 0 ||
        selectedCompanies.some((selectedCompany) => question.companies.includes(selectedCompany));
      const matchesStatus =
        status === 'All' ||
        (status === 'Solved' && question.isSolved) ||
        (status === 'Unsolved' && !question.isSolved) ||
        (status === 'Bookmarked' && question.isBookmarked);
      return matchesSearch && matchesTopic && matchesDifficulty && matchesCompany && matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'newest') return getNewestRank(b) - getNewestRank(a);
      return getMockSubmissions(b) - getMockSubmissions(a);
    });
  }, [difficulty, questions, search, selectedCompanies, sort, status, topic]);

  useEffect(() => {
    setPage(1);
  }, [difficulty, search, selectedCompanies, sort, status, topic]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const visibleQuestions = filteredQuestions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilters = [
    ...(search
      ? [{ id: 'search', label: `Search: ${search}`, remove: () => setSearch('') }]
      : []),
    ...(topic !== 'All'
      ? [{ id: 'topic', label: `Topic: ${topic}`, remove: () => setTopic('All') }]
      : []),
    ...(difficulty !== 'All'
      ? [{ id: 'difficulty', label: `Difficulty: ${difficulty}`, remove: () => setDifficulty('All') }]
      : []),
    ...selectedCompanies.map((selectedCompany) => ({
      id: `company-${selectedCompany}`,
      label: `Company: ${selectedCompany}`,
      remove: () =>
        setSelectedCompanies((current) => current.filter((item) => item !== selectedCompany)),
    })),
    ...(status !== 'All'
      ? [{ id: 'status', label: `Status: ${status}`, remove: () => setStatus('All') }]
      : []),
  ];

  const clearFilters = () => {
    setSearch('');
    setTopic('All');
    setDifficulty('All');
    setSelectedCompanies([]);
    setStatus('All');
  };

  const toggleCompany = (selectedCompany: string) => {
    setSelectedCompanies((current) =>
      current.includes(selectedCompany)
        ? current.filter((item) => item !== selectedCompany)
        : [...current, selectedCompany]
    );
  };

  const persistQuestions = (nextQuestions: PracticeQuestion[]) => {
    setQuestions(nextQuestions);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextQuestions));
  };

  const handleSave = async (draft: PracticeQuestionDraft) => {
    await new Promise((resolve) => window.setTimeout(resolve, 450));
    const duplicate = questions.some(
      (question) => question.slug === draft.slug && question.id !== editingQuestion?.id
    );
    if (duplicate) throw new Error('A question with this slug already exists.');

    if (editingQuestion) {
      persistQuestions(
        questions.map((question) =>
          question.id === editingQuestion.id
            ? {
                ...question,
                ...draft,
                companies: draft.companies.split(',').map((item) => item.trim()),
              }
            : question
        )
      );
      toast.success('Question updated in local preview');
      return;
    }

    const nextQuestion: PracticeQuestion = {
      id: `local-${Date.now()}`,
      title: draft.title,
      slug: draft.slug,
      difficulty: draft.difficulty,
      topic: draft.topic,
      category: 'DSA',
      companies: draft.companies.split(',').map((item) => item.trim()),
      description: draft.description,
      acceptanceRate: 'New',
      isSolved: false,
      isBookmarked: false,
      examples: [],
    };
    persistQuestions([nextQuestion, ...questions]);
    toast.success('Question added to local preview');
  };

  const handleDelete = async () => {
    if (!questionToDelete) return;
    setIsDeleting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 400));
    persistQuestions(questions.filter((question) => question.id !== questionToDelete.id));
    setIsDeleting(false);
    setQuestionToDelete(null);
    toast.success('Question deleted from local preview');
  };

  const toggleQuestionState = (id: string, field: 'isSolved' | 'isBookmarked') => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === id ? { ...question, [field]: !question[field] } : question
      )
    );
  };

  return (
    <main className="c2c-page font-sans">
      <PageContainer className="max-w-[max-w-360]">
        <header className="relative overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) px-5 py-7 shadow-(--c2c-shadow-sm) sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-300 light:text-violet-700">
                  {isAdmin ? 'Admin workspace' : 'Explore & practice'}
                </span>
                <span className="text-xs text-(--c2c-text-subtle)">Frontend preview · local data</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-(--c2c-text) sm:text-4xl">
                {isAdmin ? 'Manage practice questions' : 'Practice questions'}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text---c2c-text-muted) sm:text-base">
                {isAdmin
                  ? 'Create, review, and organize the question collection before backend integration.'
                  : 'Search the collection, focus by topic or company, and keep your interview preparation moving.'}
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              {isAdmin && (
                <Button
                  onClick={() => {
                    setEditingQuestion(null);
                    setIsFormOpen(true);
                  }}
                  leftIcon={<CirclePlus className="h-4 w-4" />}
                  className="border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
                >
                  Add question
                </Button>
              )}
            </div>
          </div>
        </header>

        <section
          aria-label="Question filters"
          className="mt-5 rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) p-4 shadow-(--c2c-shadow-sm) sm:p-5"
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-sm font-bold text-(--c2c-text)">Find the right question</h2>
              <p className="mt-0.5 text-xs text-(--c2c-text-subtle)">
                Combine filters to narrow the collection.
              </p>
            </div>
            <span className="rounded-full bg-(--c2c-surface-raised) px-2.5 py-1 text-xs font-semibold text-(--c2c-text-muted)">
              {filteredQuestions.length} results
            </span>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-[minmax(18rem,1.5fr)_repeat(5,minmax(9rem,1fr))]">
            <div className="relative sm:col-span-2 lg:col-span-1">
              <label htmlFor="question-search" className="sr-only">
                Search questions, topics, or companies
              </label>
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--c2c-text-subtle)" />
              <input
                id="question-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search questions, topics, companies"
                className={searchClassName}
              />
            </div>
            <PracticeFilterSelect
              label="Topic"
              value={topic}
              onChange={setTopic}
              options={topics.map((item) => ({
                value: item,
                label: item === 'All' ? 'All topics' : item,
              }))}
            />
            <PracticeFilterSelect
              label="Difficulty"
              value={difficulty}
              onChange={setDifficulty}
              options={[
                { value: 'All', label: 'All difficulties' },
                { value: 'Easy', label: 'Easy' },
                { value: 'Medium', label: 'Medium' },
                { value: 'Hard', label: 'Hard' },
              ]}
            />
            <PracticeCompanyFilter
              options={companies}
              selectedValues={selectedCompanies}
              onToggle={toggleCompany}
              onClear={() => setSelectedCompanies([])}
            />
            <PracticeFilterSelect
              label="Status"
              value={status}
              onChange={(value) => setStatus(value as PracticeStatus)}
              options={[
                { value: 'All', label: 'All statuses' },
                { value: 'Solved', label: 'Solved' },
                { value: 'Unsolved', label: 'Unsolved' },
                { value: 'Bookmarked', label: 'Bookmarked' },
              ]}
            />
            <PracticeFilterSelect
              label="Sort by"
              value={sort}
              onChange={(value) => setSort(value as PracticeSort)}
              options={[
                { value: 'submissions', label: 'Most submissions' },
                { value: 'newest', label: 'Newest first' },
                { value: 'title', label: 'Title A–Z' },
              ]}
            />
          </div>

          <div className="mt-3 flex min-h-8 flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-(--c2c-text-subtle)">
              {activeFilters.length === 0 ? 'No active filters' : 'Active filters'}
            </span>
            {activeFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={filter.remove}
                aria-label={`Remove ${filter.label} filter`}
                className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-300 transition-colors hover:border-violet-400/50 hover:bg-violet-500/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--c2c-primary) light:text-violet-700"
              >
                <span className="max-w-52 truncate">{filter.label}</span>
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            ))}
            {activeFilters.length > 0 && (
              <button
                type="button"
                onClick={clearFilters}
                className="ml-auto inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-(--c2c-text-muted) hover:bg-(--c2c-surface-raised) hover:text-(--c2c-text) focus-visible:outline-2 focus-visible:outline-(--c2c-primary)"
              >
                <FilterX className="h-3.5 w-3.5" />
                Clear all
              </button>
            )}
          </div>
        </section>

        <section aria-label="Question list" className="mt-5">
          {loading ? (
            <div className="c2c-card space-y-3 p-4" role="status" aria-label="Loading questions">
              <div className="flex items-center gap-2 text-sm text-(--c2c-text-muted)">
                <span className="c2c-spinner h-4 w-4" aria-hidden="true" />
                Loading local question preview…
              </div>
              <Skeleton className="h-24 w-full rounded-xl" count={6} />
            </div>
          ) : loadError ? (
            <div role="alert" className="c2c-card flex flex-col items-center px-5 py-12 text-center">
              <AlertTriangle className="h-9 w-9 text-rose-400" />
              <h2 className="mt-4 text-lg font-bold text-(--c2c-text)">Could not load questions</h2>
              <p className="mt-1 text-sm text-(--c2c-text-muted)">{loadError}</p>
              <Button className="mt-5" variant="secondary" onClick={loadQuestions} leftIcon={<RefreshCw className="h-4 w-4" />}>
                Try again
              </Button>
            </div>
          ) : visibleQuestions.length === 0 ? (
            <EmptyState
              title="No questions match these filters"
              description="Clear one or more filters, or try a broader search."
              actionText="Clear all filters"
              onAction={clearFilters}
              icon={<Search className="h-7 w-7 text-(--c2c-primary)" />}
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) shadow-(--c2c-shadow-sm)">
              <div className={`hidden border-b border-(--c2c-border) bg-(--c2c-surface-raised) px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-(--c2c-text-subtle) lg:grid ${
                isAdmin ? 'grid-cols-[minmax(22rem,2fr)_9rem_10rem_10rem_7rem]' : 'grid-cols-[minmax(22rem,2fr)_9rem_10rem_10rem_7rem]'
              }`}>
                <span>Question</span>
                <span>Difficulty</span>
                <span>Company</span>
                <span>Metadata</span>
                <span className="text-right">{isAdmin ? 'Actions' : 'Open'}</span>
              </div>

              {visibleQuestions.map((question) => (
                <article
                  key={question.id}
                  className={`group grid gap-3 border-b border-(--c2c-border) p-4 transition-colors last:border-b-0 hover:bg-(--c2c-surface-raised) lg:grid-cols-[minmax(22rem,2fr)_9rem_10rem_10rem_7rem] lg:items-center lg:px-5 ${
                    question.isSolved ? 'border-l-2 border-l-(--c2c-success)' : ''
                  }`}
                >
                  <div className="flex min-w-0 items-start gap-3">
                    {!isAdmin && (
                      <button
                        type="button"
                        onClick={() => toggleQuestionState(question.id, 'isSolved')}
                        className={`c2c-tooltip mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--c2c-primary) ${
                          question.isSolved
                            ? 'border-emerald-500/30 bg-emerald-500/15 text-emerald-400'
                            : 'border-(--c2c-border) text-c2c-text-subtle) hover:border-emerald-500/40 hover:text-emerald-400'
                        }`}
                        aria-label={question.isSolved ? `Mark ${question.title} unsolved` : `Mark ${question.title} solved`}
                        aria-pressed={question.isSolved}
                        data-tooltip={question.isSolved ? 'Mark unsolved' : 'Mark solved'}
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                    <div className="min-w-0">
                      <Link
                        to={`/problems/${question.slug}`}
                        className="font-semibold leading-6 text-(--c2c-text) transition-colors hover:text-(--c2c-primary) focus-visible:rounded focus-visible:outline-2 focus-visible:outline-(--c2c-primary)"
                      >
                        {question.title}
                      </Link>
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <Badge size="sm" variant="primary">{question.topic}</Badge>
                        {question.isSolved && <Badge size="sm" variant="success">Solved</Badge>}
                        {question.isBookmarked && <Badge size="sm" variant="warning">Saved</Badge>}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="mr-2 text-[11px] uppercase text-(--c2c-text-subtle) lg:hidden">Difficulty</span>
                    <Badge variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {question.companies.slice(0, 2).map((item) => (
                      <Badge key={item} size="sm" variant="neutral">{item}</Badge>
                    ))}
                    {question.companies.length > 2 && <Badge size="sm" variant="neutral">+{question.companies.length - 2}</Badge>}
                  </div>

                  <div className="text-xs text-(--c2c-text-muted)">
                    <p>{formatNumber(getMockSubmissions(question))} submissions</p>
                    <p className="mt-1 text-(--c2c-text-subtle)">{question.acceptanceRate} accepted</p>
                  </div>

                  <div className="flex items-center justify-end gap-1">
                    {isAdmin ? (
                      <>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingQuestion(question);
                            setIsFormOpen(true);
                          }}
                          className="c2c-icon-button c2c-tooltip"
                          aria-label={`Edit ${question.title}`}
                          data-tooltip="Edit question"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuestionToDelete(question)}
                          className="c2c-icon-button c2c-tooltip hover:border-rose-500/40 hover:text-rose-400"
                          aria-label={`Delete ${question.title}`}
                          data-tooltip="Delete question"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleQuestionState(question.id, 'isBookmarked')}
                          className={`c2c-icon-button c2c-tooltip ${
                            question.isBookmarked ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : ''
                          }`}
                          aria-label={question.isBookmarked ? `Remove ${question.title} bookmark` : `Bookmark ${question.title}`}
                          aria-pressed={question.isBookmarked}
                          data-tooltip={question.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        >
                          <Bookmark className={`h-4 w-4 ${question.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <Link
                          to={`/problems/${question.slug}`}
                          className="c2c-icon-button c2c-tooltip"
                          aria-label={`Open ${question.title}`}
                          data-tooltip="Open question"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}

          {!loading && !loadError && filteredQuestions.length > 0 && (
            <div className="mt-6 flex justify-center">
              <Pagination currentPage={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          )}
        </section>
      </PageContainer>

      {isAdmin && (
        <>
          <PracticeQuestionForm
            isOpen={isFormOpen}
            question={editingQuestion}
            onClose={() => {
              setIsFormOpen(false);
              setEditingQuestion(null);
            }}
            onSave={handleSave}
          />
          <Modal
            isOpen={Boolean(questionToDelete)}
            onClose={() => setQuestionToDelete(null)}
            title="Delete question?"
            maxWidth="sm"
          >
            <div className="text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400">
                <Trash2 className="h-5 w-5" />
              </span>
              <p className="mt-4 text-sm leading-6 text-(--c2c-text-muted)">
                <strong className="text-var(--c2c-text)">{questionToDelete?.title}</strong> will be removed from this browser preview.
              </p>
              <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-center">
                <Button variant="ghost" onClick={() => setQuestionToDelete(null)} disabled={isDeleting}>
                  Cancel
                </Button>
                <Button variant="danger" onClick={handleDelete} isLoading={isDeleting} leftIcon={<Trash2 className="h-4 w-4" />}>
                  Delete question
                </Button>
              </div>
            </div>
          </Modal>
        </>
      )}
    </main>
  );
};
