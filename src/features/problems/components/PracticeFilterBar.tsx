import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FilterX, Search, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { PracticeFilterOption, PracticeSort, PracticeStatus } from '../practiceTypes';
import { PracticeCompanyFilter, PracticeFilterSelect } from './PracticeFilterDropdown';

export interface PracticeActiveFilter {
  id: string;
  label: string;
  remove: () => void;
}

interface PracticeFilterBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  sort: PracticeSort;
  onSortChange: (value: PracticeSort) => void;
  status: PracticeStatus;
  onStatusChange: (value: PracticeStatus) => void;
  selectedTopicId: string;
  onTopicChange: (value: string) => void;
  topicOptions: PracticeFilterOption[];
  onTopicOpen: () => void;
  topicLoading: boolean;
  selectedDifficultyId: string;
  onDifficultyChange: (value: string) => void;
  difficultyOptions: PracticeFilterOption[];
  onDifficultyOpen: () => void;
  difficultyLoading: boolean;
  selectedCompanyIds: string[];
  companyOptions: PracticeFilterOption[];
  companyLabels: Record<string, string>;
  onCompanyToggle: (companyId: string) => void;
  onCompanyClear: () => void;
  onCompanyOpen: () => void;
  companyLoading: boolean;
  selectedQpfId: string;
  onQpfChange: (value: string) => void;
  qpfOptions: PracticeFilterOption[];
  onQpfOpen: () => void;
  qpfLoading: boolean;
  activeFilters: PracticeActiveFilter[];
  resultCount: number;
  isSearching: boolean;
  isBusy: boolean;
  onClearFilters: () => void;
  onViewResults: () => Promise<boolean>;
}

const isEditableTarget = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
};

export const PracticeFilterBar: React.FC<PracticeFilterBarProps> = ({
  search,
  onSearchChange,
  sort,
  onSortChange,
  status,
  onStatusChange,
  selectedTopicId,
  onTopicChange,
  topicOptions,
  onTopicOpen,
  topicLoading,
  selectedDifficultyId,
  onDifficultyChange,
  difficultyOptions,
  onDifficultyOpen,
  difficultyLoading,
  selectedCompanyIds,
  companyOptions,
  companyLabels,
  onCompanyToggle,
  onCompanyClear,
  onCompanyOpen,
  companyLoading,
  selectedQpfId,
  onQpfChange,
  qpfOptions,
  onQpfOpen,
  qpfLoading,
  activeFilters,
  resultCount,
  isSearching,
  isBusy,
  onClearFilters,
  onViewResults,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  const advancedCount = useMemo(
    () =>
      (selectedTopicId ? 1 : 0) +
      (selectedDifficultyId ? 1 : 0) +
      selectedCompanyIds.length +
      (selectedQpfId ? 1 : 0) +
      (status !== 'All' ? 1 : 0),
    [selectedCompanyIds.length, selectedDifficultyId, selectedQpfId, selectedTopicId, status]
  );

  const submitResults = useCallback(async () => {
    if (isBusy || isSearching) return;
    await onViewResults();
  }, [isBusy, isSearching, onViewResults]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const editable = isEditableTarget(event.target);

      if (event.key === 'Escape' && isFiltersOpen) {
        event.preventDefault();
        setIsFiltersOpen(false);
        return;
      }

      if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') {
        event.preventDefault();
        void submitResults();
        return;
      }

      if (editable) return;

      if (event.key === '/' || ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k')) {
        event.preventDefault();
        searchRef.current?.focus();
        return;
      }

      if (event.key.toLowerCase() === 'f' && !event.metaKey && !event.ctrlKey && !event.altKey) {
        event.preventDefault();
        setIsFiltersOpen((current) => !current);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isFiltersOpen, submitResults]);

  return (
    <section
      aria-label="Question search and filters"
      className="sticky top-20 z-30 mt-5 rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) p-3 shadow-(--c2c-shadow-sm) sm:p-4"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative min-w-0 flex-1">
          <label htmlFor="question-search" className="sr-only">
            Search questions, topics, or companies
          </label>
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-(--c2c-text-subtle)" />
          <input
            ref={searchRef}
            id="question-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                void submitResults();
              }
            }}
            placeholder="Search questions, topics, companies"
            className="min-h-12 w-full rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised)/70 pl-10 pr-4 text-sm text-(--c2c-text) outline-none transition-all placeholder:text-(--c2c-text-subtle) hover:border-(--c2c-border-strong) focus:border-violet-500/55 focus:bg-violet-500/5 focus:ring-2 focus:ring-violet-500/15"
          />
        </div>

        <div className="flex items-center justify-end gap-2 lg:shrink-0">
          <div className="hidden min-w-40 sm:block sm:w-44">
            <PracticeFilterSelect
              label="Sort"
              value={sort}
              onChange={(value) => onSortChange(value as PracticeSort)}
              options={[
                { value: 'submissions', label: 'Most submissions' },
                { value: 'newest', label: 'Newest first' },
                { value: 'title', label: 'Title A–Z' },
              ]}
            />
          </div>

          <button
            type="button"
            onClick={() => setIsFiltersOpen((current) => !current)}
            aria-expanded={isFiltersOpen}
            aria-controls="practice-filter-fields"
            aria-label={isFiltersOpen ? 'Hide filters' : 'Show filters'}
            className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 ${
              isFiltersOpen || advancedCount > 0
                ? 'border-violet-500/50 bg-violet-500/12 text-violet-200 light:text-violet-800'
                : 'border-(--c2c-border)bg-(--c2c-surface-raised)/70 text-(--c2c-text) hover:border-(--c2c-border-strong)'
            }`}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {advancedCount > 0 && (
              <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
                {advancedCount}
              </span>
            )}
          </button>

          <Button
            type="button"
            onClick={() => void submitResults()}
            isLoading={isSearching}
            disabled={isSearching || isBusy}
            leftIcon={<Sparkles className="h-4 w-4" />}
            className="min-h-12 border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
          >
            View Results
          </Button>
        </div>
      </div>

      {isFiltersOpen && (
        <div
          id="practice-filter-fields"
          className="mt-4 grid gap-3 border-t border-(--c2c-border)pt-4 sm:grid-cols-2 xl:grid-cols-5"
        >
          <PracticeFilterSelect
            label="Topic"
            value={selectedTopicId}
            onChange={onTopicChange}
            options={topicOptions}
            onOpen={onTopicOpen}
            loading={topicLoading}
            emptyText="No topics found"
          />
          <PracticeFilterSelect
            label="Difficulty"
            value={selectedDifficultyId}
            onChange={onDifficultyChange}
            options={difficultyOptions}
            onOpen={onDifficultyOpen}
            loading={difficultyLoading}
            emptyText="No difficulties found"
          />
          <PracticeCompanyFilter
            options={companyOptions}
            selectedValues={selectedCompanyIds}
            selectedLabels={companyLabels}
            onToggle={onCompanyToggle}
            onClear={onCompanyClear}
            onOpen={onCompanyOpen}
            loading={companyLoading}
          />
          <PracticeFilterSelect
            label="QPF"
            value={selectedQpfId}
            onChange={onQpfChange}
            options={qpfOptions}
            onOpen={onQpfOpen}
            loading={qpfLoading}
            emptyText="No QPF options found"
          />
          <PracticeFilterSelect
            label="Status"
            value={status}
            onChange={(value) => onStatusChange(value as PracticeStatus)}
            options={[
              { value: 'All', label: 'All statuses' },
              { value: 'Solved', label: 'Solved' },
              { value: 'Unsolved', label: 'Unsolved' },
              { value: 'Bookmarked', label: 'Bookmarked' },
            ]}
          />
          <div className="sm:hidden">
            <PracticeFilterSelect
              label="Sort"
              value={sort}
              onChange={(value) => onSortChange(value as PracticeSort)}
              options={[
                { value: 'submissions', label: 'Most submissions' },
                { value: 'newest', label: 'Newest first' },
                { value: 'title', label: 'Title A–Z' },
              ]}
            />
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <div className="flex min-h-8 flex-wrap items-center gap-2">
          {activeFilters.length === 0 ? (
            <p className="text-xs text-(--c2c-text-subtle)">No active filters</p>
          ) : (
            activeFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={filter.remove}
                aria-label={`Remove ${filter.label} filter`}
                className="inline-flex min-h-7 items-center gap-1.5 rounded-full border border-violet-500/25 bg-violet-500/10 px-2.5 py-1 text-[11px] font-medium text-violet-300 transition-colors hover:border-violet-400/50 hover:bg-violet-500/20 light:text-violet-700"
              >
                <span className="max-w-52 truncate">{filter.label}</span>
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            ))
          )}
        </div>
        <div className="ml-auto flex items-center gap-3">
          {activeFilters.length > 0 && (
            <button
              type="button"
              onClick={onClearFilters}
              className="inline-flex min-h-8 items-center gap-1.5 rounded-lg px-2.5 text-xs font-semibold text-(--c2c-text-muted) hover:bg-(--c2c-surface-raised) hover:text-(--c2c-text)"
            >
              <FilterX className="h-3.5 w-3.5" />
              Clear all
            </button>
          )}
          <span className="rounded-full bg-(--c2c-surface-raised) px-2.5 py-1 text-xs font-semibold text-(--c2c-text-muted)">
            {resultCount} results
          </span>
        </div>
      </div>
    </section>
  );
};
