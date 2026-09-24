import React, { useEffect } from 'react';
import { useParams, Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCompanyById } from '../redux/companySlice';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import { toggleSolveProblem } from '../../problems/redux/problemSlice';
import { toggleBookmarkItem } from '../../bookmarks/redux/bookmarkSlice';
import { openAuthModal } from '../../auth/redux/authSlice';
import { toast } from 'react-hot-toast';

export const CompanyDetails: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const dispatch = useAppDispatch();
  const { selectedCompany: company, companyProblems, detailLoading, detailError } = useAppSelector((state) => state.companies);
  const { bookmarks } = useAppSelector((state) => state.bookmarks);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const fromPatterns = (location.state as any)?.from === 'company-patterns';

  useEffect(() => {
    if (!slug) return;
    if (company && String(company.id) === String(slug)) return;
    void dispatch(fetchCompanyById(slug));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one GET /company/{id} per route id
  }, [dispatch, slug]);

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
        category: q.topic || company?.name || 'DSA',
      })
    );
    toast.success('Bookmark updated');
  };

  if (detailLoading || (!company && !detailError)) {
    return (
      <div className="c2c-page c2c-container flex flex-col gap-6 font-sans">
        <Skeleton className="h-10 w-48 rounded-xl" />
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-96 w-full rounded-2xl" />
      </div>
    );
  }

  if (detailError || !company) {
    return (
      <div className="c2c-page c2c-container font-sans">
        <EmptyState
          title="Company not available"
          description={detailError || 'That company could not be found.'}
          actionText="Back to companies"
          onAction={() => navigate('/companies')}
          icon={<i className="fa-solid fa-building text-2xl text-[#A3E635]" aria-hidden="true" />}
        />
      </div>
    );
  }

  const logoUrl = company.logo;

  return (
    <div className="c2c-page c2c-container flex flex-col gap-8 font-sans text-(--c2c-text)">
      <div>
        <Link
          to={fromPatterns ? "/company-patterns" : "/companies"}
          className="group inline-flex items-center gap-2 rounded-xl border border-(--c2c-border) bg-(--c2c-surface) px-4 py-2.5 text-xs font-semibold text-(--c2c-text-muted) shadow-(--c2c-shadow-sm) transition-all hover:border-[#A3E635]/40 hover:text-(--c2c-primary) sm:text-sm"
        >
          <i className="fa-solid fa-arrow-left text-xs text-(--c2c-primary) transition-transform group-hover:-translate-x-1"></i>
          <span>{fromPatterns ? "Back to Exam Patterns" : "Back to Companies"}</span>
        </Link>
      </div>

      <div className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) p-6 shadow-(--c2c-shadow-sm) sm:p-8 md:flex-row md:items-center">
        <div className="pointer-events-none absolute top-0 right-0 h-80 w-80 rounded-full bg-[#A3E635]/10 blur-3xl"></div>

        <div className="relative z-10 flex items-center gap-5">
          <div className="company-logo-well flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-(--c2c-border) p-3 shadow-(--c2c-shadow-sm) sm:h-20 sm:w-20">
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={company.name}
                className="h-full w-full object-contain"
                onError={(event) => {
                  const target = event.currentTarget;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling;
                  if (fallback instanceof HTMLElement) fallback.hidden = false;
                }}
              />
            ) : null}
            <span hidden={Boolean(logoUrl)} className="text-(--c2c-primary)">
              <i className="fa-solid fa-building text-xl" aria-hidden="true" />
            </span>
          </div>

          <div>
            <h1 className="mb-1 font-heading text-xl font-bold tracking-tight wrap-break-word text-(--c2c-text) sm:text-2xl md:text-3xl">
              {company.name} <span className="text-(--c2c-primary)">Placement Guide</span>
            </h1>
            <p className="flex flex-wrap items-center gap-2 font-sans text-xs text-(--c2c-text-muted) sm:text-sm">
              <span>{company.industry || 'Information Technology'}</span>
              <span>•</span>
              <span>HQ: {company.headquarters || 'Global'}</span>
            </p>
          </div>
        </div>

        <div className="relative z-10 flex w-full flex-wrap items-center gap-3 md:w-auto">
          <div className="flex-1 rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised) px-4 py-2.5 text-center font-mono md:flex-none">
            <span className="block text-[10px] uppercase text-(--c2c-text-subtle)">Tagged Problems</span>
            <span className="text-sm font-bold text-(--c2c-primary)">{company.problemCount || companyProblems.length} Questions</span>
          </div>

          <Link
            to={`/company-patterns/${company.slug}`}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#A3E635] px-4 py-2.5 font-sans text-xs font-bold text-black shadow-(--c2c-shadow-sm) transition-all hover:bg-[#84CC16]"
          >
            <i className="fa-solid fa-list-check text-xs text-black"></i>
            <span>Exam Pattern</span>
          </Link>
        </div>
      </div>

      {/* 3. INTERVIEW ROUND BREAKDOWN */}
      {company.rounds && company.rounds.length > 0 && (
        <div className="flex flex-col gap-5 rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) p-6 shadow-(--c2c-shadow-sm) sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#A3E635]/30 bg-[#A3E635]/10 text-(--c2c-primary)">
              <i className="fa-solid fa-layer-group text-base"></i>
            </div>
            <div>
              <h2 className="font-heading text-lg font-bold text-(--c2c-text) sm:text-xl">
                Interview Round Breakdown
              </h2>
              <p className="font-sans text-xs text-(--c2c-text-muted)">
                Typical selection process rounds for {company.name}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {company.rounds.map((round, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised) p-5 text-xs shadow-(--c2c-shadow-sm) transition-all hover:border-[#A3E635]/40 sm:text-sm"
              >
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#A3E635]/30 bg-[#A3E635]/15 font-mono text-xs font-bold text-(--c2c-primary)">
                    {idx + 1}
                  </span>
                  <span className="font-heading font-bold text-(--c2c-text)">
                    {round.name}
                  </span>
                </div>
                <p className="pt-1 font-sans text-xs leading-relaxed text-(--c2c-text-muted)">
                  {round.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {companyProblems.length > 0 && <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A3E635]/10 border border-[#A3E635]/30 flex items-center justify-center text-[#A3E635]">
              <i className="fa-solid fa-code text-base"></i>
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-heading font-bold text-white">
                Most Frequently Asked {company.name} Problems
              </h2>
              <p className="text-xs text-gray-400 font-sans">
                Practice official previous year interview questions
              </p>
            </div>
          </div>

          <span className="text-xs font-mono font-bold text-[#A3E635] bg-[#A3E635]/10 border border-[#A3E635]/20 px-3 py-1.5 rounded-xl">
            {companyProblems.length} Questions
          </span>
        </div>

        {/* Practice Sheet Styled Problem Cards Container */}
        <div className="p-6 bg-[#202225] border border-white/10 rounded-2xl shadow-xl flex flex-col gap-3">
          {companyProblems.map((q) => {
            const isBookmarked = bookmarks.some((b) => b.itemId === q.id);

            return (
              <div
                key={q.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-[#121113] hover:bg-[#1c1a1e] border border-white/10 hover:border-white/30 rounded-xl transition-all gap-3 shadow-md group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  {/* Tick / Untick Circle Button */}
                  <button
                    onClick={(e) => handleSolveToggle(q.id, e)}
                    className={`text-xl transition-colors shrink-0 cursor-pointer ${
                      q.isSolved ? 'text-[#A3E635]' : 'text-gray-600 hover:text-gray-400'
                    }`}
                    title={q.isSolved ? 'Mark as Not Answered' : 'Mark as Answered'}
                  >
                    <i className={`fa-solid ${q.isSolved ? 'fa-circle-check' : 'fa-circle'}`}></i>
                  </button>

                  {/* Bookmark Star Button */}
                  <button
                    onClick={(e) => handleBookmarkToggle(q, e)}
                    className={`p-2 rounded-lg border transition-all text-xs shrink-0 cursor-pointer ${
                      isBookmarked
                        ? 'bg-amber-500/15 border-amber-500/30 text-amber-400'
                        : 'bg-[#202225] border-white/10 text-gray-500 hover:text-amber-400 hover:border-amber-400/40'
                    }`}
                    title={isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
                  >
                    <i className={`fa-${isBookmarked ? 'solid' : 'regular'} fa-star`}></i>
                  </button>

                  {/* Title & Topic */}
                  <div className="flex flex-col min-w-0">
                    <Link
                      to={`/problems/${q.slug}`}
                      className="text-sm sm:text-base font-semibold text-white hover:text-[#A3E635] transition-colors truncate font-sans"
                    >
                      {q.title}
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-mono text-gray-400 bg-[#202225] px-2.5 py-0.5 rounded-md border border-white/5">
                        {q.topic || q.category || company.name}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto shrink-0">
                  {/* Difficulty Badge */}
                  <span
                    className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
                      q.difficulty.toLowerCase() === 'easy'
                        ? 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
                        : q.difficulty.toLowerCase() === 'medium'
                        ? 'text-amber-400 bg-amber-500/10 border-amber-500/20'
                        : 'text-rose-400 bg-rose-500/10 border-rose-500/20'
                    }`}
                  >
                    {q.difficulty}
                  </span>

                  {/* Solve Problem Button */}
                  <Link
                    to={`/problems/${q.slug}`}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#A3E635] hover:bg-[#84CC16] text-xs font-bold text-black transition-all shadow-sm font-sans"
                  >
                    <span>Solve Problem</span>
                    <i className="fa-solid fa-chevron-right text-[10px]"></i>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>}

    </div>
  );
};
