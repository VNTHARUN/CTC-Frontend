import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  Bookmark,
  Check,
  ChevronDown,
  ChevronRight,
  CirclePlus,
  Code2,
  Edit3,
  RefreshCw,
  Search,
  Trash2,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { buildQuestionSearchPayload, getPracticeApiErrorMessage } from '../../../services/practiceService';
import { Badge } from '../../../shared/components/ui/Badge';
import { Button } from '../../../shared/components/ui/Button';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { Modal } from '../../../shared/components/ui/Modal';
import { PageContainer } from '../../../shared/components/ui/Page';
import { Pagination } from '../../../shared/components/ui/Pagination';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import {
  PracticeDifficulty,
  PracticeFilterOption,
  PracticeQuestion,
  PracticeQuestionDraft,
  PracticeRole,
  PracticeSort,
  PracticeStatus,
} from '../practiceTypes';
import {
  fetchPracticeCompanies,
  fetchPracticeDifficulties,
  fetchPracticeQpf,
  fetchPracticeTopics,
  getPracticeOptionLabel,
  searchPracticeQuestions,
} from '../redux/practiceSlice';
import { AdminQuestionWorkspace } from './AdminQuestionWorkspace';
import { PracticeFilterBar } from './PracticeFilterBar';
import { PracticeQuestionForm } from './PracticeQuestionForm';

interface PracticeExplorerProps {
  role: PracticeRole;
}

const PAGE_SIZE = 8;

const getNewestRank = (question: PracticeQuestion) => {
  const numericId = Number(String(question.id).replace(/\D/g, ''));
  return Number.isFinite(numericId) ? numericId : 0;
};

const difficultyVariant = (difficulty: PracticeDifficulty) =>
  difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';

const withSelectedOption = (
  options: PracticeFilterOption[],
  selectedId: string,
  selectedLabel: string
): PracticeFilterOption[] => {
  if (!selectedId || options.some((option) => option.value === selectedId)) return options;
  return [...options, { value: selectedId, label: selectedLabel }];
};

export const PracticeExplorer: React.FC<PracticeExplorerProps> = ({ role }) => {
  const isAdmin = role === 'ADMIN';
  const dispatch = useAppDispatch();
  const {
    topicOptions,
    difficultyOptions,
    companyOptions,
    qpfOptions,
    optionLabels,
    dropdownLoading,
    searching,
  } = useAppSelector((state) => state.practice);
  const [questions, setQuestions] = useState<PracticeQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [search, setSearch] = useState('');
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [selectedDifficultyId, setSelectedDifficultyId] = useState('');
  const [selectedCompanyIds, setSelectedCompanyIds] = useState<string[]>([]);
  const [selectedQpfId, setSelectedQpfId] = useState('');
  const [status, setStatus] = useState<PracticeStatus>('All');
  const [sort, setSort] = useState<PracticeSort>('submissions');
  const [page, setPage] = useState(1);
  const [editingQuestion, setEditingQuestion] = useState<PracticeQuestion | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<PracticeQuestion | null>(null);
  const [expandedCompanyRows, setExpandedCompanyRows] = useState<Set<string>>(() => new Set());
  const [isDeleting, setIsDeleting] = useState(false);
  const requestInFlightRef = useRef(false);

  const currentSearchPayload = useCallback(
    () =>
      buildQuestionSearchPayload({
        topicId: selectedTopicId,
        difficultyId: selectedDifficultyId,
        companyIds: selectedCompanyIds,
        searchText: search,
      }),
    [search, selectedCompanyIds, selectedDifficultyId, selectedTopicId]
  );

  const fetchQuestions = useCallback(
    async (payload = buildQuestionSearchPayload(), replaceOnError = false) => {
      if (requestInFlightRef.current) return false;
      requestInFlightRef.current = true;
      setLoading(true);
      setLoadError('');
      try {
        const nextQuestions = await dispatch(searchPracticeQuestions(payload)).unwrap();
        setQuestions(nextQuestions);
        setPage(1);
        return true;
      } catch (error) {
        const message = getPracticeApiErrorMessage(error, 'Failed to load questions');
        toast.error(message);
        if (replaceOnError) {
          setQuestions([]);
          setLoadError(message);
        }
        return false;
      } finally {
        requestInFlightRef.current = false;
        setLoading(false);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    void fetchQuestions(buildQuestionSearchPayload(), true);
  }, [fetchQuestions]);

  const topicSelectOptions = useMemo(
    () => [
      { value: '', label: 'All topics' },
      ...withSelectedOption(
        topicOptions,
        selectedTopicId,
        getPracticeOptionLabel(optionLabels, 'topic', selectedTopicId, 'Selected topic')
      ),
    ],
    [optionLabels, selectedTopicId, topicOptions]
  );
  const difficultySelectOptions = useMemo(
    () => [
      { value: '', label: 'All difficulties' },
      ...withSelectedOption(
        difficultyOptions,
        selectedDifficultyId,
        getPracticeOptionLabel(optionLabels, 'difficulty', selectedDifficultyId, 'Selected difficulty')
      ),
    ],
    [difficultyOptions, optionLabels, selectedDifficultyId]
  );
  const qpfSelectOptions = useMemo(
    () => [
      { value: '', label: 'All QPF' },
      ...withSelectedOption(
        qpfOptions,
        selectedQpfId,
        getPracticeOptionLabel(optionLabels, 'qpf', selectedQpfId, 'Selected QPF')
      ),
    ],
    [optionLabels, qpfOptions, selectedQpfId]
  );
  const companyLabelById = useMemo(() => {
    const labels: Record<string, string> = {};
    selectedCompanyIds.forEach((companyId) => {
      labels[companyId] = getPracticeOptionLabel(optionLabels, 'company', companyId);
    });
    companyOptions.forEach((option) => {
      labels[option.value] = option.label;
    });
    return labels;
  }, [companyOptions, optionLabels, selectedCompanyIds]);

  const filteredQuestions = useMemo(() => {
    const filtered = questions.filter((question) => {
      const matchesStatus =
        status === 'All' ||
        (status === 'Solved' && question.isSolved) ||
        (status === 'Unsolved' && !question.isSolved) ||
        (status === 'Bookmarked' && question.isBookmarked);
      return matchesStatus;
    });

    return filtered.sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title);
      if (sort === 'newest') return getNewestRank(b) - getNewestRank(a);
      return Number(b.id) - Number(a.id) || b.title.localeCompare(a.title);
    });
  }, [questions, sort, status]);

  useEffect(() => {
    setPage(1);
  }, [search, sort, status]);

  const totalPages = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE));
  const visibleQuestions = filteredQuestions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const activeFilters = [
    ...(search
      ? [{ id: 'search', label: `Search: ${search}`, remove: () => setSearch('') }]
      : []),
    ...(selectedTopicId
      ? [{
          id: 'topic',
          label: `Topic: ${getPracticeOptionLabel(optionLabels, 'topic', selectedTopicId)}`,
          remove: () => setSelectedTopicId(''),
        }]
      : []),
    ...(selectedDifficultyId
      ? [{
          id: 'difficulty',
          label: `Difficulty: ${getPracticeOptionLabel(optionLabels, 'difficulty', selectedDifficultyId)}`,
          remove: () => setSelectedDifficultyId(''),
        }]
      : []),
    ...selectedCompanyIds.map((companyId) => ({
      id: `company-${companyId}`,
      label: `Company: ${companyLabelById[companyId] || companyId}`,
      remove: () => setSelectedCompanyIds((current) => current.filter((item) => item !== companyId)),
    })),
    ...(selectedQpfId
      ? [{
          id: 'qpf',
          label: `QPF: ${getPracticeOptionLabel(optionLabels, 'qpf', selectedQpfId)}`,
          remove: () => setSelectedQpfId(''),
        }]
      : []),
    ...(status !== 'All'
      ? [{ id: 'status', label: `Status: ${status}`, remove: () => setStatus('All') }]
      : []),
  ];

  const clearFilters = () => {
    setSearch('');
    setSelectedTopicId('');
    setSelectedDifficultyId('');
    setSelectedCompanyIds([]);
    setSelectedQpfId('');
    setStatus('All');
    void fetchQuestions(buildQuestionSearchPayload());
  };

  const toastFilterError = (error: unknown, fallback: string) => {
    toast.error(typeof error === 'string' && error.trim() ? error : fallback);
  };

  const loadTopicOptions = () => {
    void dispatch(fetchPracticeTopics()).unwrap().catch((error) => toastFilterError(error, 'Failed to load topics'));
  };
  const loadDifficultyOptions = () => {
    void dispatch(fetchPracticeDifficulties()).unwrap().catch((error) => toastFilterError(error, 'Failed to load difficulties'));
  };
  const loadCompanyOptions = () => {
    void dispatch(fetchPracticeCompanies()).unwrap().catch((error) => toastFilterError(error, 'Failed to load companies'));
  };
  const loadQpfOptions = () => {
    void dispatch(fetchPracticeQpf()).unwrap().catch((error) => toastFilterError(error, 'Failed to load QPF options'));
  };

  const handleViewResults = useCallback(async () => {
    if (searching || loading) return false;
    return fetchQuestions(currentSearchPayload());
  }, [currentSearchPayload, fetchQuestions, loading, searching]);

  const persistQuestions = (nextQuestions: PracticeQuestion[]) => {
    setQuestions(nextQuestions);
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

  const toggleCompanyRow = (questionId: string) => {
    setExpandedCompanyRows((current) => {
      const next = new Set(current);
      if (next.has(questionId)) next.delete(questionId);
      else next.add(questionId);
      return next;
    });
  };

  return (
    <main className="c2c-page font-sans">
      <PageContainer>
        <header className="relative overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) px-5 py-6 shadow-(--c2c-shadow-sm) sm:px-8 sm:py-7">
          <div className="pointer-events-none absolute -right-24 -top-28 h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-violet-500/25 bg-violet-500/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-violet-300 light:text-violet-700">
                  {isAdmin ? 'Admin workspace' : 'Explore & practice'}
                </span>
                <span className="text-xs text-(--c2c-text-subtle)">Press F for filters · / to search</span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-(--c2c-text) sm:text-4xl">
                {isAdmin ? 'Manage practice questions' : 'Practice questions'}
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-(--c2c-text-muted) sm:text-base">
                {isAdmin
                  ? 'Create, review, and organize the question collection. Open filters in this card when you need them.'
                  : 'Search quickly, then open filters in this card only when you need to narrow the set.'}
              </p>
            </div>
            <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:items-center">
              {isAdmin && (
                <Button
                  onClick={() => setIsComposerOpen(true)}
                  leftIcon={<CirclePlus className="h-4 w-4" />}
                  className="border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
                >
                  Add question
                </Button>
              )}
            </div>
          </div>
        </header>

        <PracticeFilterBar
          search={search}
          onSearchChange={setSearch}
          sort={sort}
          onSortChange={setSort}
          status={status}
          onStatusChange={setStatus}
          selectedTopicId={selectedTopicId}
          onTopicChange={setSelectedTopicId}
          topicOptions={topicSelectOptions}
          onTopicOpen={loadTopicOptions}
          topicLoading={dropdownLoading.topic}
          selectedDifficultyId={selectedDifficultyId}
          onDifficultyChange={setSelectedDifficultyId}
          difficultyOptions={difficultySelectOptions}
          onDifficultyOpen={loadDifficultyOptions}
          difficultyLoading={dropdownLoading.difficulty}
          selectedCompanyIds={selectedCompanyIds}
          companyOptions={companyOptions}
          companyLabels={companyLabelById}
          onCompanyToggle={(companyId) =>
            setSelectedCompanyIds((current) =>
              current.includes(companyId)
                ? current.filter((item) => item !== companyId)
                : [...current, companyId]
            )
          }
          onCompanyClear={() => setSelectedCompanyIds([])}
          onCompanyOpen={loadCompanyOptions}
          companyLoading={dropdownLoading.company}
          selectedQpfId={selectedQpfId}
          onQpfChange={setSelectedQpfId}
          qpfOptions={qpfSelectOptions}
          onQpfOpen={loadQpfOptions}
          qpfLoading={dropdownLoading.qpf}
          activeFilters={activeFilters}
          resultCount={filteredQuestions.length}
          isSearching={searching}
          isBusy={loading}
          onClearFilters={clearFilters}
          onViewResults={handleViewResults}
        />

        <section aria-label="Question list" className="mt-5">
          {loading ? (
            <div className="c2c-card space-y-3 p-4" role="status" aria-label="Loading questions">
              <div className="flex items-center gap-2 text-sm text-(--c2c-text-muted)">
                <span className="c2c-spinner h-4 w-4" aria-hidden="true" />
                Loading questions…
              </div>
              <Skeleton className="h-24 w-full rounded-xl" count={6} />
            </div>
          ) : loadError ? (
            <div role="alert" className="c2c-card flex flex-col items-center px-5 py-12 text-center">
              <AlertTriangle className="h-9 w-9 text-rose-400" />
              <h2 className="mt-4 text-lg font-bold text-(--c2c-text)">Could not load questions</h2>
              <p className="mt-1 text-sm text-(--c2c-text-muted)">{loadError}</p>
              <Button
                className="mt-5"
                variant="secondary"
                onClick={() => void fetchQuestions(currentSearchPayload(), true)}
                leftIcon={<RefreshCw className="h-4 w-4" />}
              >
                Try again
              </Button>
            </div>
          ) : visibleQuestions.length === 0 ? (
            <EmptyState
              title={activeFilters.length > 0 ? 'No questions match these filters' : 'No questions found'}
              description={
                activeFilters.length > 0
                  ? 'Clear one or more filters, then view results again.'
                  : 'Questions from the server will appear here once they are available.'
              }
              actionText={activeFilters.length > 0 ? 'Clear all filters' : undefined}
              onAction={activeFilters.length > 0 ? clearFilters : undefined}
              icon={<Search className="h-7 w-7 text-(--c2c-primary)" />}
            />
          ) : (
            <div className="overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) shadow-(--c2c-shadow-sm)">
              <div className="hidden grid-cols-[minmax(0,2.2fr)_8rem_minmax(11rem,1fr)_7rem] items-center gap-x-4 border-b border-(--c2c-border) bg-(--c2c-surface-raised) px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-(--c2c-text-subtle) lg:grid">
                <span className="justify-self-start">Question</span>
                <span className="justify-self-start">Difficulty</span>
                <span className="justify-self-start">Companies</span>
                <span className="justify-self-start">{isAdmin ? 'Actions' : 'Open'}</span>
              </div>

              {visibleQuestions.map((question) => (
                <article
                  key={question.id}
                  className={`group grid gap-x-4 gap-y-3 border-b border-(--c2c-border) p-4 transition-colors last:border-b-0 hover:bg-(--c2c-surface-raised) lg:grid-cols-[minmax(0,2.2fr)_8rem_minmax(11rem,1fr)_7rem] lg:items-center lg:px-5 ${
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
                            : 'border-(--c2c-border) text-(--c2c-text-subtle) hover:border-emerald-500/40 hover:text-emerald-400'
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
                        to={isAdmin ? `/admin/practice/${question.id}` : `/practice/${question.id}`}
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

                  <div className="flex items-center lg:justify-self-start">
                    <span className="mr-2 text-[11px] uppercase text-(--c2c-text-subtle) lg:hidden">Difficulty</span>
                    <Badge variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge>
                  </div>

                  <div className="flex min-w-0 items-center gap-2">
                    <span className="mr-1 text-[11px] uppercase text-(--c2c-text-subtle) lg:hidden">Companies</span>
                    {question.companies.length > 0 ? (
                      <div className="flex min-w-0 flex-wrap items-center gap-1.5">
                        {question.companies.slice(0, expandedCompanyRows.has(question.id) ? question.companies.length : 2).map((item) => (
                          <span key={item} title={item} className="inline-flex max-w-36 items-center truncate rounded-md border border-(--c2c-border) bg-(--c2c-surface-raised) px-2 py-1 text-[11px] font-medium text-(--c2c-text-muted)">
                            {item}
                          </span>
                        ))}
                        {question.companies.length > 2 && (
                          <button
                            type="button"
                            onClick={() => toggleCompanyRow(question.id)}
                            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-(--c2c-border) bg-(--c2c-surface-raised) text-(--c2c-text-subtle) transition-colors hover:border-(--c2c-border-strong) hover:bg-(--c2c-surface-hover) hover:text-(--c2c-text)"
                            aria-label={expandedCompanyRows.has(question.id) ? `Collapse companies for ${question.title}` : `Show all companies for ${question.title}`}
                            aria-expanded={expandedCompanyRows.has(question.id)}
                            title={expandedCompanyRows.has(question.id) ? 'Collapse companies' : 'Show all companies'}
                          >
                            <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${expandedCompanyRows.has(question.id) ? 'rotate-180' : ''}`} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-xs text-(--c2c-text-subtle)">Not specified</span>
                    )}
                  </div>

                  <div className="flex items-center justify-self-start">
                    {isAdmin ? (
                      <div className="inline-flex items-center gap-0.5 rounded-lg border border-(--c2c-border) bg-(--c2c-surface-raised) p-0.5">
                        <Link
                          to={`/admin/practice/${question.id}`}
                          className="c2c-icon-button c2c-tooltip h-9! w-9! border-0!"
                          aria-label={`Open code workspace for ${question.title}`}
                          data-tooltip="Open code workspace"
                        >
                          <Code2 className="h-4 w-4" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingQuestion(question);
                            setIsFormOpen(true);
                          }}
                          className="c2c-icon-button c2c-tooltip h-9! w-9! border-0!"
                          aria-label={`Edit ${question.title}`}
                          data-tooltip="Edit question"
                        >
                          <Edit3 className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setQuestionToDelete(question)}
                          className="c2c-icon-button c2c-tooltip h-9! w-9! border-0! hover:text-rose-400"
                          aria-label={`Delete ${question.title}`}
                          data-tooltip="Delete question"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={() => toggleQuestionState(question.id, 'isBookmarked')}
                          className={`c2c-icon-button c2c-tooltip h-9! w-9! ${
                            question.isBookmarked ? 'border-amber-500/30 bg-amber-500/10 text-amber-400' : ''
                          }`}
                          aria-label={question.isBookmarked ? `Remove ${question.title} bookmark` : `Bookmark ${question.title}`}
                          aria-pressed={question.isBookmarked}
                          data-tooltip={question.isBookmarked ? 'Remove bookmark' : 'Bookmark'}
                        >
                          <Bookmark className={`h-4 w-4 ${question.isBookmarked ? 'fill-current' : ''}`} />
                        </button>
                        <Link
                          to={`/practice/${question.id}`}
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
          <AdminQuestionWorkspace
            isOpen={isComposerOpen}
            onClose={() => setIsComposerOpen(false)}
            onCreated={() => void fetchQuestions(currentSearchPayload())}
          />
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
