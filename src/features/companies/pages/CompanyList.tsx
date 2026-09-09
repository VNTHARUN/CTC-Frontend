import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchCompanies } from '../redux/companySlice';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import { EmptyState } from '../../../shared/components/ui/EmptyState';
import { PageContainer, PageHeader } from '../../../shared/components/ui/Page';

const fallbackLogos: Record<string, string> = {
  accenture: 'https://upload.wikimedia.org/wikipedia/commons/c/cd/Accenture.svg',
  infosys: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Infosys_logo.svg',
  'tcs-nqt': 'https://cdn.worldvectorlogo.com/logos/tata-consultancy-services.svg',
  tcs: 'https://cdn.worldvectorlogo.com/logos/tata-consultancy-services.svg',
  adobe: 'https://gurucodes-data.pages.dev/img/companies/adobe.png',
};

export const CompanyList: React.FC = () => {
  const dispatch = useAppDispatch();
  const { companies, loading } = useAppSelector((state) => state.companies);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const filteredCompanies = companies.filter((company) =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="c2c-page pb-24 font-sans">
      <PageContainer>
        <PageHeader
          eyebrow="Company library"
          title="Company-wise questions"
          description="Practice previous-year questions and prepare for the companies you want to join."
        />

        <section
          aria-labelledby="exam-patterns-title"
          className="c2c-card mt-8 flex flex-col gap-5 overflow-hidden p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#A3E635]/20 bg-[#A3E635]/10 text-[#A3E635]">
              <i className="fa-solid fa-list-check" aria-hidden="true" />
            </span>
            <div>
              <h2 id="exam-patterns-title" className="font-heading text-lg font-bold text-[var(--c2c-text)]">
                Company exam patterns
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--c2c-text-muted)]">
                Review recruitment stages, test formats, and syllabus before you begin.
              </p>
            </div>
          </div>
          <Link
            to="/company-patterns"
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-[#A3E635] px-5 text-sm font-bold text-black transition-colors hover:bg-[#BEF264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c2c-bg)]"
          >
            Explore patterns
            <i className="fa-solid fa-chevron-right text-[10px]" aria-hidden="true" />
          </Link>
        </section>

        <section aria-label="Company directory" className="mt-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="font-heading text-xl font-bold text-[var(--c2c-text)]">Browse companies</h2>
              <p className="mt-1 text-sm text-[var(--c2c-text-muted)]">
                {loading ? 'Loading company directory…' : `${filteredCompanies.length} ${filteredCompanies.length === 1 ? 'company' : 'companies'} available`}
              </p>
            </div>
            <div className="w-full sm:max-w-md">
              <label htmlFor="company-search" className="mb-2 block text-sm font-semibold text-[var(--c2c-text)]">
                Search companies
              </label>
              <div className="relative">
                <i
                  className="fa-solid fa-magnifying-glass pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--c2c-text-subtle)]"
                  aria-hidden="true"
                />
                <input
                  id="company-search"
                  type="search"
                  placeholder="Search by name or industry"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="min-h-11 w-full rounded-xl border border-[var(--c2c-border)] bg-[var(--c2c-surface)] py-2.5 pl-11 pr-4 text-sm text-[var(--c2c-text)] shadow-[var(--c2c-shadow-sm)] outline-none transition placeholder:text-[var(--c2c-text-subtle)] hover:border-[var(--c2c-border-strong)] focus-visible:border-[#A3E635] focus-visible:ring-2 focus-visible:ring-[#A3E635]/35"
                />
              </div>
            </div>
          </div>

          {loading ? (
            <div
              className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4"
              aria-label="Loading companies"
              aria-live="polite"
            >
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="c2c-card overflow-hidden p-3 sm:p-4">
                  <Skeleton className="aspect-[4/3] w-full rounded-xl" />
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
                description={`No company matches “${searchTerm}”. Try another name or industry.`}
                actionText="Clear search"
                onAction={() => setSearchTerm('')}
                icon={<i className="fa-solid fa-building text-2xl text-[#A3E635]" aria-hidden="true" />}
              />
            </div>
          ) : (
            <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
              {filteredCompanies.map((company) => {
                const logoUrl = company.logo || fallbackLogos[company.slug] || `https://gurucodes-data.pages.dev/img/companies/${company.slug}.png`;
                const questionCount =
                  ('questionCount' in company && company.questionCount) ||
                  ('problemCount' in company && company.problemCount);

                return (
                  <Link
                    key={company.id}
                    to={`/companies/${company.slug}`}
                    aria-label={`View ${company.name} questions`}
                    className="c2c-card c2c-card-interactive group flex min-w-0 flex-col overflow-hidden p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--c2c-bg)] sm:p-4"
                  >
                    <div className="flex aspect-[4/3] items-center justify-center rounded-xl border border-[var(--c2c-border)] bg-white p-5 sm:p-7">
                      <img
                        className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                        width="200"
                        height="150"
                        loading="lazy"
                        alt={`${company.name} logo`}
                        src={logoUrl}
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (fallbackLogos[company.slug] && target.src !== fallbackLogos[company.slug]) {
                            target.src = fallbackLogos[company.slug];
                          } else {
                            target.onerror = null;
                            target.src = `https://logo.clearbit.com/${company.slug.replace('-nqt', '')}.com`;
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col pt-4">
                      <h3 className="truncate font-heading text-base font-bold text-[var(--c2c-text)] sm:text-lg">
                        {company.name}
                      </h3>
                      {company.industry && (
                        <p className="mt-1 line-clamp-1 text-xs text-[var(--c2c-text-muted)] sm:text-sm">
                          {company.industry}
                        </p>
                      )}
                      <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-[var(--c2c-text-muted)]">
                        <span>{questionCount ? `${questionCount} questions` : 'Practice questions'}</span>
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A3E635]/10 text-[#A3E635] transition-colors group-hover:bg-[#A3E635] group-hover:text-black">
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
    </main>
  );
};
