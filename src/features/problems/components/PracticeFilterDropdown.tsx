import React, { useEffect, useId, useRef, useState } from 'react';
import { Check, ChevronDown, Search } from 'lucide-react';
import { PracticeFilterOption } from '../practiceTypes';

export type { PracticeFilterOption };

interface DropdownShellProps {
  label: string;
  summary: string;
  isOpen: boolean;
  onToggle: () => void;
  children: React.ReactNode;
  panelId: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const DropdownShell: React.FC<DropdownShellProps> = ({
  label,
  summary,
  isOpen,
  onToggle,
  children,
  panelId,
  containerRef,
}) => (
  <div ref={containerRef} className="relative min-w-0">
    <button
      type="button"
      onClick={onToggle}
      aria-haspopup="listbox"
      aria-expanded={isOpen}
      aria-controls={panelId}
      className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/45 ${
        isOpen
          ? 'border-violet-500/55 bg-violet-500/5 shadow-[0_0_0_3px_rgba(139,92,246,0.08)]'
          : 'border-(--c2c-border) bg-(--c2c-surface-raised)/60 hover:border-(--c2c-border-strong) hover:bg-(--c2c-surface-raised)'
      }`}
    >
      <span className="min-w-0">
        <span className="block text-[10px] font-bold uppercase tracking-[0.12em] text-(--c2c-text-subtle)">
          {label}
        </span>
        <span className="mt-0.5 block truncate text-sm font-medium text-(--c2c-text)">
          {summary}
        </span>
      </span>
      <ChevronDown
        className={`h-4 w-4 shrink-0 text-(--c2c-text-subtle) transition-transform ${
          isOpen ? 'rotate-180 text-violet-400' : ''
        }`}
        aria-hidden="true"
      />
    </button>
    {isOpen && children}
  </div>
);

interface PracticeFilterSelectProps {
  label: string;
  value: string;
  options: PracticeFilterOption[];
  onChange: (value: string) => void;
  onOpen?: () => void;
  loading?: boolean;
  emptyText?: string;
}

export const PracticeFilterSelect: React.FC<PracticeFilterSelectProps> = ({
  label,
  value,
  options,
  onChange,
  onOpen,
  loading = false,
  emptyText = 'No options found',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const selectedLabel = options.find((option) => option.value === value)?.label ?? value;
  const dataOptions = options.filter((option) => option.value !== '');

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <DropdownShell
      label={label}
      summary={selectedLabel}
      isOpen={isOpen}
      onToggle={() => {
        if (!isOpen) onOpen?.();
        setIsOpen((current) => !current);
      }}
      panelId={panelId}
      containerRef={containerRef}
    >
      <div
        id={panelId}
        role="listbox"
        aria-label={label}
        className="c2c-subtle-scrollbar absolute left-0 z-80 mt-2 max-h-72 w-full min-w-52 overflow-y-auto rounded-xl border border-(--c2c-border-strong) bg-(--c2c-surface) p-1.5 shadow-2xl"
      >
        {loading ? (
          <div className="flex items-center gap-2 px-3 py-6 text-xs text-(--c2c-text-muted)" role="status">
            <span className="c2c-spinner h-4 w-4" aria-hidden="true" />
            Loading…
          </div>
        ) : (
          <>
            {options.map((option) => {
              const selected = option.value === value;
              return (
                <button
                  key={option.value || `${label}-all`}
                  type="button"
                  role="option"
                  aria-selected={selected}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex min-h-10 w-full items-center justify-between gap-3 rounded-lg px-3 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50 ${
                    selected
                      ? 'bg-violet-500/12 font-semibold text-violet-300 light:text-violet-700'
                      : 'text-(--c2c-text-muted) hover:bg-(--c2c-surface-raised) hover:text-(--c2c-text)'
                  }`}
                >
                  <span className="truncate">{option.label}</span>
                  {selected && <Check className="h-4 w-4 shrink-0" aria-hidden="true" />}
                </button>
              );
            })}
            {dataOptions.length === 0 && (
              <p className="px-3 py-6 text-center text-xs text-(--c2c-text-subtle)">{emptyText}</p>
            )}
          </>
        )}
      </div>
    </DropdownShell>
  );
};

interface PracticeCompanyFilterProps {
  options: PracticeFilterOption[];
  selectedValues: string[];
  selectedLabels?: Record<string, string>;
  onToggle: (companyId: string) => void;
  onClear: () => void;
  onOpen?: () => void;
  loading?: boolean;
}

export const PracticeCompanyFilter: React.FC<PracticeCompanyFilterProps> = ({
  options,
  selectedValues,
  selectedLabels = {},
  onToggle,
  onClear,
  onOpen,
  loading = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const panelId = useId();
  const visibleOptions = options.filter((company) =>
    company.label.toLowerCase().includes(query.trim().toLowerCase())
  );
  const summary =
    selectedValues.length === 0
      ? 'All companies'
      : selectedValues.length === 1
        ? selectedLabels[selectedValues[0]] || options.find((option) => option.value === selectedValues[0])?.label || selectedValues[0]
        : `${selectedValues.length} companies`;

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('mousedown', close);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('mousedown', close);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, []);

  return (
    <DropdownShell
      label="Company"
      summary={summary}
      isOpen={isOpen}
      onToggle={() => {
        if (!isOpen) onOpen?.();
        setIsOpen((current) => !current);
      }}
      panelId={panelId}
      containerRef={containerRef}
    >
      <div
        id={panelId}
        className="absolute left-0 z-80 mt-2 w-full min-w-64 rounded-xl border border-(--c2c-border-strong) bg-(--c2c-surface) p-2 shadow-2xl"
      >
        <div className="flex items-center justify-between px-1 pb-2">
          <span className="text-xs font-semibold text-(--c2c-text)">Select companies</span>
          {selectedValues.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="rounded-md px-2 py-1 text-xs font-semibold text-violet-400 hover:bg-violet-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/50 light:text-violet-700"
            >
              Clear
            </button>
          )}
        </div>
        <div className="relative mb-2">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-(--c2c-text-subtle)"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search companies"
            placeholder="Find a company"
            className="h-9 w-full rounded-lg border border-(--c2c-border) bg-(--c2c-surface-raised) pl-9 pr-3 text-xs text-(--c2c-text) outline-none placeholder:text-(--c2c-text-subtle) focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/15"
          />
        </div>
        <div
          role="listbox"
          aria-label="Companies"
          aria-multiselectable="true"
          className="c2c-subtle-scrollbar max-h-56 overflow-y-auto pr-1"
        >
          {loading ? (
            <div className="flex items-center gap-2 px-3 py-6 text-xs text-(--c2c-text-muted)" role="status">
              <span className="c2c-spinner h-4 w-4" aria-hidden="true" />
              Loading…
            </div>
          ) : (
            <>
              {visibleOptions.map((company) => {
                const selected = selectedValues.includes(company.value);
                return (
                  <button
                    key={company.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    onClick={() => onToggle(company.value)}
                    className={`flex min-h-10 w-full items-center gap-2.5 rounded-lg px-2.5 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-violet-500/50 ${
                      selected
                        ? 'bg-violet-500/12 font-medium text-violet-300 light:text-violet-700'
                        : 'text-(--c2c-text-muted) hover:bg-(--c2c-surface-raised) hover:text-(--c2c-text)'
                    }`}
                  >
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border ${
                        selected
                          ? 'border-violet-500 bg-violet-600 text-white'
                          : 'border-(--c2c-border-strong) bg-(--c2c-surface-raised)'
                      }`}
                      aria-hidden="true"
                    >
                      {selected && <Check className="h-3 w-3" />}
                    </span>
                    <span className="truncate">{company.label}</span>
                  </button>
                );
              })}
              {visibleOptions.length === 0 && (
                <p className="px-3 py-6 text-center text-xs text-(--c2c-text-subtle)">
                  No companies found
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </DropdownShell>
  );
};
