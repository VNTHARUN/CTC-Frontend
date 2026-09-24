import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCompanies } from '../redux/companySlice';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { PageContainer } from '../../../shared/components/ui/Page';
import { AddCompanyModal } from '../components/AddCompanyModal';

export const CompanyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { companies, loading, error } = useAppSelector((state) => state.companies);
  const role = useAppSelector((state) => state.auth.user?.role);
  const isAdmin = role?.toUpperCase() === 'ADMIN';
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddOpen, setIsAddOpen] = useState(false);

  useEffect(() => {
    if (companies.length > 0 || loading) return;
    dispatch(fetchCompanies());
  }, [companies.length, dispatch, loading]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="c2c-page pb-24 font-sans">
      <PageContainer>
        <header className="relative overflow-hidden rounded-3xl border border-(--c2c-border) bg-(--c2c-surface) px-5 py-7 text-center shadow-(--c2c-shadow-sm) sm:px-8 sm:py-9">
          <div className="pointer-events-none absolute -left-16 -top-24 h-72 w-72 rounded-full bg-[#A3E635]/12 blur-3xl" />
          <div className="pointer-events-none absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-sky-500/10 blur-3xl" />
          <div className="relative mx-auto max-w-3xl">
            <p className="c2c-eyebrow">Company library</p>
            <h1 className="mt-3 font-heading text-3xl font-bold tracking-tight text-(--c2c-text) sm:text-5xl">
              Company-wise questions
            </h1>
            <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-(--c2c-text-muted) sm:text-base">
              Practice previous-year questions and prepare for the companies you want to join.
            </p>
          </div>
        </header>

        <div className={`mt-6 grid gap-4 ${isAdmin ? 'lg:grid-cols-2' : ''}`}>
          <section
            aria-labelledby="exam-patterns-title"
            className="c2c-card flex flex-col gap-5 overflow-hidden p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
          >
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A3E635]/25 bg-[#A3E635]/12 text-(--c2c-primary)">
                <i className="fa-solid fa-list-check" aria-hidden="true" />
              </span>
              <div>
                <h2 id="exam-patterns-title" className="font-heading text-lg font-bold text-(--c2c-text)">
                  Company exam patterns
                </h2>
                <p className="mt-1 text-sm leading-6 text-(--c2c-text-muted)">
                  Review recruitment stages, test formats, and syllabus before you begin.
                </p>
              </div>
            </div>
            <Link
              to="/company-patterns"
              className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#A3E635] px-5 text-sm font-bold text-black transition-colors hover:bg-[#BEF264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] focus-visible:ring-offset-2 focus-visible:ring-offset-(--c2c-bg)"
            >
              Explore patterns
              <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
            </Link>
          </section>

          {isAdmin && (
            <section
              aria-labelledby="add-company-title"
              className="c2c-card flex flex-col gap-5 overflow-hidden p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
            >
              <div className="flex items-start gap-4">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A3E635]/25 bg-[#A3E635]/12 text-(--c2c-primary)">
                  <i className="fa-solid fa-building-circle-arrow-right" aria-hidden="true" />
                </span>
                <div>
                  <h2 id="add-company-title" className="font-heading text-lg font-bold text-(--c2c-text)">
                    Add a company
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-(--c2c-text-muted)">
                    Publish a new company to the directory. Students will see it after it is saved.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddOpen(true)}
                className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#A3E635] px-5 text-sm font-bold text-black transition-colors hover:bg-[#BEF264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] focus-visible:ring-offset-2 focus-visible:ring-offset-(--c2c-bg)"
              >
                Add company
                <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
              </button>
            </section>
          )}
        </div>

        <section
          aria-label="Company directory"
          className="mt-6 rounded-3xl border border-(--c2c-border) bg-(--c2c-surface) p-4 shadow-(--c2c-shadow-sm) sm:p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-(--c2c-text)">Browse companies</h2>
              <p className="mt-1 text-sm text-(--c2c-text-muted)">
                {loading ? 'Loading company directory…' : `${filteredCompanies.length} ${filteredCompanies.length === 1 ? 'company' : 'companies'} available`}
              </p>
            </div>
            <div className="w-full sm:max-w-md">
              <label htmlFor="company-search" className="mb-2 block text-sm font-semibold text-(--c2c-text)">
                Search companies
              </label>
              <div className="relative">
                <i
                  className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-(--c2c-text-subtle)"
                  aria-hidden="true"
                />
                <input
                  id="company-search"
                  type="search"
                  placeholder="Search by name or industry"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised) py-2.5 pl-11 pr-4 text-sm text-(--c2c-text) shadow-(--c2c-shadow-sm) outline-none transition placeholder:text-(--c2c-text-subtle) hover:border-(--c2c-border-strong) focus-visible:border-[#A3E635] focus-visible:ring-2 focus-visible:ring-[#A3E635]/35"
                />
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-6">
              <EmptyState
                title="Unable to load companies"
                description={error}
                actionText="Try again"
                onAction={() => dispatch(fetchCompanies())}
                icon={<i className="fa-solid fa-triangle-exclamation text-2xl text-[#A3E635]" aria-hidden="true" />}
              />
            </div>
          ) : loading ? (
            <div
              className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4"
              aria-label="Loading companies"
              aria-live="polite"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface-raised) p-3 sm:p-4">
                  <Skeleton className="aspect-4/3 w-full rounded-xl" />
                  <Skeleton className="mt-4 h-5 w-3/4" />
                  <Skeleton className="mt-2 h-3.5 w-1/2" />
                  <Skeleton className="mt-4 h-3.5 w-2/3" />
                </div>
              ))}
            </div>
          ) : filteredCompanies.length === 0 ? (
            <div className="mt-6">
              <EmptyState
                title="No companies found"
                description={
                  searchTerm
                    ? `No company matches “${searchTerm}”. Try another name or industry.`
                    : isAdmin
                      ? 'No companies are in the directory yet. Add the first company.'
                      : 'No companies are available right now.'
                }
                actionText={searchTerm ? 'Clear search' : isAdmin ? 'Add company' : undefined}
                onAction={searchTerm ? () => setSearchTerm('') : isAdmin ? () => setIsAddOpen(true) : undefined}
                icon={<i className="fa-solid fa-building text-2xl text-[#A3E635]" aria-hidden="true" />}
              />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {filteredCompanies.map((company) => {
                const logoUrl = company.logo;
                const questionCount =
                  ('questionCount' in company && company.questionCount) ||
                  ('problemCount' in company && company.problemCount);

                return (
                  <Link
                    key={company.id}
                    to={`/companies/${company.id}`}
                    aria-label={`View ${company.name} questions`}
                    className="c2c-card-interactive group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface-raised) p-3 shadow-(--c2c-shadow-sm) focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] focus-visible:ring-offset-2 focus-visible:ring-offset-(--c2c-bg) sm:p-4"
                  >
                    <div className="company-logo-well flex aspect-4/3 items-center justify-center rounded-xl border border-(--c2c-border) p-5 sm:p-7">
                      {company.logo ? (
                        <img
                          className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                          width="200"
                          height="150"
                          loading="lazy"
                          alt={`${company.name} logo`}
                          src={logoUrl}
                          onError={(event) => {
                            const target = event.currentTarget;
                            target.style.display = 'none';
                            const fallback = target.nextElementSibling;
                            if (fallback instanceof HTMLElement) fallback.hidden = false;
                          }}
                        />
                      ) : null}
                      <span
                        hidden={Boolean(company.logo)}
                        className="flex flex-col items-center gap-2 text-(--c2c-text-subtle)"
                      >
                        <i className="fa-solid fa-building text-2xl text-(--c2c-primary)" aria-hidden="true" />
                        <span className="sr-only">{company.name} logo unavailable</span>
                      </span>
                    </div>
                    <div className="flex flex-1 flex-col pt-4">
                      <h3 className="truncate font-heading text-base font-bold text-(--c2c-text) sm:text-lg">
                        {company.name}
                      </h3>
                      {company.industry && (
                        <p className="mt-1 line-clamp-1 text-xs text-(--c2c-text-muted) sm:text-sm">
                          {company.industry}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-(--c2c-text-muted)">
                        <span>{questionCount ? `${questionCount} questions` : 'Practice questions'}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A3E635]/15 text-(--c2c-primary) transition-colors group-hover:bg-[#A3E635] group-hover:text-black">
                          <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </PageContainer>
      {isAdmin && <AddCompanyModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />}
    </main>
  );
};
