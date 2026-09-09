import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchProblems, toggleSolveProblem } from '../redux/problemSlice';
import { toggleBookmarkItem, fetchBookmarks } from '../../bookmarks/redux/bookmarkSlice';
import { openAuthModal } from '../../auth/redux/authSlice';
import { toast } from 'react-hot-toast';
import { PageContainer, PageHeader, StatCard } from '../../../shared/components/ui/Page';

export const ProblemList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { problems, loading } = useAppSelector((state) => state.problems);
  const { bookmarks } = useAppSelector((state) => state.bookmarks);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const [expandedModuleNum, setExpandedModuleNum] = useState<string | null>('01');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Answered' | 'Bookmarked'>('All');

  useEffect(() => {
    dispatch(fetchProblems({ limit: 100 }));
    if (isAuthenticated) {
      dispatch(fetchBookmarks());
    }
  }, [dispatch, isAuthenticated]);

  const handleSolveToggle = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to track your solved problems');
      dispatch(openAuthModal({ mode: 'login' }));
      return;
    }
    dispatch(toggleSolveProblem(id));
    toast.success('Problem solved status updated');
  };

  const handleBookmarkToggle = (q: any, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error('Please log in to bookmark questions');
      dispatch(openAuthModal({ mode: 'login' }));
      return;
    }
    dispatch(
      toggleBookmarkItem({
        itemId: q.id,
        type: 'PROBLEM',
        title: q.title,
        difficulty: q.difficulty,
        category: q.topic || 'DSA',
      })
    );
    toast.success('Bookmark updated');
  };

  // Ultimate DSA Sheet & GFG 160 Topic Modules
  const dsaModules = [
    { num: '01', title: 'Prerequisites', topic: 'Prerequisites', total: 6, solved: 2 },
    { num: '02', title: 'Time Complexity', topic: 'Time Complexity', total: 4, solved: 2 },
    { num: '03', title: 'Space Complexity', topic: 'Space Complexity', total: 2, solved: 0 },
    { num: '04', title: 'Pattern & String Conversion', topic: 'Pattern', total: 2, solved: 1 },
    { num: '05', title: 'String Basics & KMP', topic: 'Strings', total: 3, solved: 1 },
    { num: '06', title: 'Array Basics & Dutch Flag', topic: 'Arrays & Hashing', total: 4, solved: 2 },
    { num: '07', title: 'Two Pointers Approach', topic: 'Two Pointers', total: 3, solved: 1 },
    { num: '08', title: 'Sliding Window', topic: 'Sliding Window', total: 3, solved: 0 },
    { num: '09', title: 'Binary Search & Answers Range', topic: 'Binary Search', total: 3, solved: 0 },
    { num: '10', title: 'Sorting & Intervals', topic: 'Sorting', total: 3, solved: 1 },
    { num: '11', title: 'Matrixes & Traversals', topic: 'Matrixes', total: 2, solved: 1 },
    { num: '12', title: 'Bit Manipulation', topic: 'Bit Manipulation', total: 2, solved: 1 },
    { num: '13', title: 'Recursion & Backtracking', topic: 'Backtracking', total: 2, solved: 0 },
    { num: '14', title: 'Linked List', topic: 'Linked List', total: 3, solved: 2 },
    { num: '15', title: 'Stack & Queue', topic: 'Stack', total: 3, solved: 1 },
    { num: '16', title: 'Binary Trees', topic: 'Trees', total: 2, solved: 1 },
    { num: '17', title: 'Binary Search Trees', topic: 'BST', total: 2, solved: 1 },
    { num: '18', title: 'Heaps & Priority Queues', topic: 'Heap', total: 2, solved: 1 },
    { num: '19', title: 'Graphs & BFS / DFS', topic: 'Graphs', total: 3, solved: 1 },
    { num: '20', title: 'Dynamic Programming', topic: '1-D Dynamic Programming', total: 3, solved: 0 },
    { num: '21', title: 'Tries & Segment Trees', topic: 'Tries', total: 2, solved: 1 },
  ];

  const solvedCount = problems.filter((problem) => problem.isSolved).length;
  const bookmarkedCount = problems.filter((problem) =>
    bookmarks.some((bookmark) => bookmark.itemId === problem.id)
  ).length;

  return (
    <main className="c2c-page min-h-screen bg-[var(--c2c-bg)] font-sans">
      <PageContainer>
        <PageHeader
          eyebrow="Learn · Practice · Master"
          title="Ultimate DSA Sheet"
          description="Build strong problem-solving habits with a structured path from fundamentals to advanced data structures and algorithms."
        >
          <div
            className="mx-auto mt-6 inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-xl border border-[var(--c2c-border)] bg-[var(--c2c-surface)] p-1"
            role="group"
            aria-label="Filter problems by status"
          >
            {(['All', 'Answered', 'Bookmarked'] as const).map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setStatusFilter(status)}
                aria-pressed={statusFilter === status}
                className={`min-h-11 whitespace-nowrap rounded-lg px-4 text-sm font-semibold transition-colors ${
                  statusFilter === status
                    ? 'bg-[var(--c2c-primary)] text-[var(--c2c-primary-foreground)]'
                    : 'text-[var(--c2c-text-muted)] hover:bg-[var(--c2c-surface-hover)] hover:text-[var(--c2c-text)]'
                }`}
              >
                {status === 'All' ? 'All problems' : status === 'Answered' ? 'Solved' : 'Bookmarked'}
              </button>
            ))}
          </div>
        </PageHeader>

        <section className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3" aria-label="Problem sheet overview">
          <StatCard
            label="Problems"
            value={problems.length}
            detail="Available in this sheet"
            icon={<i className="fa-solid fa-code" aria-hidden="true" />}
          />
          <StatCard
            label="Solved"
            value={solvedCount}
            detail={problems.length ? `${Math.round((solvedCount / problems.length) * 100)}% complete` : 'Start your first problem'}
            icon={<i className="fa-solid fa-circle-check text-emerald-400" aria-hidden="true" />}
          />
          <StatCard
            label="Bookmarked"
            value={bookmarkedCount}
            detail="Saved for later"
            icon={<i className="fa-solid fa-bookmark" aria-hidden="true" />}
          />
        </section>

        <section className="mt-8 flex flex-col gap-3" aria-label="DSA curriculum modules">
        {dsaModules.map((module) => {
          const isExpanded = expandedModuleNum === module.num;

          const moduleProblems = problems.filter(
            (p) =>
              p.topic?.toLowerCase().includes(module.topic.toLowerCase()) ||
              p.category?.toLowerCase().includes(module.topic.toLowerCase()) ||
              p.title?.toLowerCase().includes(module.topic.toLowerCase())
          );

          let topicQuestions = moduleProblems.length > 0 ? moduleProblems : problems.slice(0, 3);
          
          if (statusFilter === 'Answered') {
            topicQuestions = topicQuestions.filter((q) => q.isSolved);
          } else if (statusFilter === 'Bookmarked') {
            topicQuestions = topicQuestions.filter((q) => bookmarks.some((b) => b.itemId === q.id));
          }

          const solvedInModule = topicQuestions.filter((q) => q.isSolved).length;
          const progressPercent = Math.round((solvedInModule / (topicQuestions.length || 1)) * 100);

          const moduleButtonId = `module-${module.num}-button`;
          const modulePanelId = `module-${module.num}-panel`;

          return (
            <article key={module.num} className="c2c-card overflow-hidden">
              <button
                id={moduleButtonId}
                type="button"
                onClick={() => setExpandedModuleNum(isExpanded ? null : module.num)}
                aria-expanded={isExpanded}
                aria-controls={modulePanelId}
                className="group flex min-h-11 w-full items-center gap-3 p-4 text-left transition-colors hover:bg-[var(--c2c-surface-hover)] sm:gap-4 sm:p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[var(--c2c-border)] bg-[var(--c2c-surface-raised)] font-mono text-sm font-bold text-[var(--c2c-primary)]">
                  {module.num}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block truncate font-heading text-base font-semibold text-[var(--c2c-text)] sm:text-lg">
                    {module.title}
                  </span>
                  <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[var(--c2c-text-muted)]">
                    <span>Module {Number(module.num)} of {dsaModules.length}</span>
                    <span aria-hidden="true">·</span>
                    <span>{topicQuestions.length} {topicQuestions.length === 1 ? 'problem' : 'problems'}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-medium text-emerald-400">{solvedInModule} solved</span>
                  </span>
                  <span className="mt-2 flex max-w-md items-center gap-3">
                    <span
                      className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--c2c-surface-raised)]"
                      role="progressbar"
                      aria-label={`${module.title} progress`}
                      aria-valuemin={0}
                      aria-valuemax={100}
                      aria-valuenow={progressPercent}
                    >
                      <span
                        className="block h-full rounded-full bg-emerald-500 transition-[width] duration-300"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </span>
                    <span className="w-9 text-right font-mono text-xs text-[var(--c2c-text-muted)]">
                      {progressPercent}%
                    </span>
                  </span>
                </span>

                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[var(--c2c-text-muted)] transition-colors group-hover:text-[var(--c2c-text)]"
                  aria-hidden="true"
                >
                  <i className={`fa-solid fa-chevron-down text-sm transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
                </span>
              </button>

              {isExpanded && (
                <div
                  id={modulePanelId}
                  role="region"
                  aria-labelledby={moduleButtonId}
                  className="border-t border-[var(--c2c-border)] bg-[var(--c2c-surface-raised)]/50 p-3 sm:p-4"
                >
                  {loading ? (
                    <div className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[var(--c2c-border)] text-center text-[var(--c2c-text-muted)]" role="status">
                      <span className="c2c-spinner text-[var(--c2c-primary)]" aria-hidden="true" />
                      <div>
                        <p className="text-sm font-semibold text-[var(--c2c-text)]">Loading problems</p>
                        <p className="mt-1 text-xs">Preparing this module for you…</p>
                      </div>
                    </div>
                  ) : topicQuestions.length === 0 ? (
                    <div className="flex min-h-36 flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[var(--c2c-border)] px-4 text-center">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--c2c-primary)]/10 text-[var(--c2c-primary)]" aria-hidden="true">
                        <i className="fa-solid fa-filter-circle-xmark" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-[var(--c2c-text)]">No matching problems</p>
                        <p className="mt-1 text-xs text-[var(--c2c-text-muted)]">
                          This module has no {statusFilter.toLowerCase()} problems right now.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ul className="flex flex-col gap-2" aria-label={`${module.title} problems`}>
                      {topicQuestions.map((q) => {
                        const isBookmarked = bookmarks.some((b) => b.itemId === q.id);

                        return (
                          <li key={q.id} className="rounded-xl border border-[var(--c2c-border)] bg-[var(--c2c-surface)] p-3 transition-colors hover:border-[var(--c2c-border-strong)] sm:p-4">
                            <div className="flex min-w-0 items-start gap-2 sm:items-center sm:gap-3">
                              <button
                                type="button"
                                onClick={(e) => handleSolveToggle(q.id, e)}
                                className={`c2c-icon-button shrink-0 rounded-full ${
                                  q.isSolved
                                    ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400'
                                    : ''
                                }`}
                                aria-label={q.isSolved ? `Mark ${q.title} as unsolved` : `Mark ${q.title} as solved`}
                                aria-pressed={q.isSolved}
                              >
                                <i className={`fa-${q.isSolved ? 'solid' : 'regular'} fa-circle-check`} aria-hidden="true" />
                              </button>

                              <div className="min-w-0 flex-1">
                                <Link
                                  to={`/problems/${q.slug}`}
                                  className="block font-semibold text-[var(--c2c-text)] transition-colors hover:text-[var(--c2c-primary)]"
                                >
                                  {q.title}
                                </Link>
                                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                                  <span
                                    className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-semibold ${
                                      q.difficulty === 'Easy'
                                        ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-400'
                                        : q.difficulty === 'Medium'
                                        ? 'border-amber-500/20 bg-amber-500/10 text-amber-400'
                                        : 'border-rose-500/20 bg-rose-500/10 text-rose-400'
                                    }`}
                                  >
                                    {q.difficulty}
                                  </span>
                                  {q.companies && q.companies.length > 0 && (
                                    <>
                                      {q.companies.slice(0, 3).map((comp) => (
                                        <span key={comp} className="rounded border border-[var(--c2c-border)] bg-[var(--c2c-surface-raised)] px-1.5 py-0.5 font-mono text-[10px] text-[var(--c2c-text-muted)]">
                                          {comp}
                                        </span>
                                      ))}
                                    </>
                                  )}
                                </div>
                              </div>

                              <button
                                type="button"
                                onClick={(e) => handleBookmarkToggle(q, e)}
                                className={`c2c-icon-button shrink-0 ${
                                  isBookmarked
                                    ? 'border-[var(--c2c-primary)]/40 bg-[var(--c2c-primary)]/10 text-[var(--c2c-primary)]'
                                    : ''
                                }`}
                                aria-label={isBookmarked ? `Remove bookmark from ${q.title}` : `Bookmark ${q.title}`}
                                aria-pressed={isBookmarked}
                              >
                                <i className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-bookmark`} aria-hidden="true" />
                              </button>
                            </div>

                            <Link
                              to={`/problems/${q.slug}`}
                              className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-lg border border-[var(--c2c-border)] bg-[var(--c2c-surface-raised)] px-4 text-sm font-semibold text-[var(--c2c-text)] transition-colors hover:border-[var(--c2c-primary)] hover:text-[var(--c2c-primary)] sm:ml-auto sm:mt-3 sm:w-fit"
                              aria-label={`Open ${q.title}`}
                            >
                              Solve problem
                              <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )}
            </article>
          );
        })}
        </section>
      </PageContainer>
    </main>
  );
};
