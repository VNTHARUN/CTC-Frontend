import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import { CodeExecutionResult } from '../practiceTypes';

interface CodeExecutionResultPanelProps {
  label: string;
  result: CodeExecutionResult | null;
  error: string;
}

const outputBlock = (title: string, value: string, tone: 'neutral' | 'success' | 'danger') => {
  const color =
    tone === 'success'
      ? 'text-emerald-600 dark:text-emerald-300'
      : tone === 'danger'
        ? 'text-rose-600 dark:text-rose-300'
        : 'text-(--c2c-text-muted)';
  return (
    <div>
      <p className="mb-1 font-sans text-[10px] uppercase tracking-wider text-(--c2c-text-subtle)">{title}</p>
      <pre className={`whitespace-pre-wrap ${color}`}>{value}</pre>
    </div>
  );
};

export const CodeExecutionResultPanel: React.FC<CodeExecutionResultPanelProps> = ({ label, result, error }) => {
  if (error) {
    return <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">{label}: {error}</div>;
  }
  if (!result) return null;

  const allPassed = result.totalTestCases > 0 && result.failedTestCases === 0;

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="text-xs font-bold uppercase tracking-wider text-(--c2c-text)">{label} results</h3>
        <div className="flex gap-2 text-[11px] font-semibold">
          <span className="rounded-md bg-(--c2c-surface) px-2 py-1 text-(--c2c-text-muted)">Total {result.totalTestCases}</span>
          <span className="rounded-md bg-emerald-500/10 px-2 py-1 text-emerald-600 dark:text-emerald-300">Passed {result.passedTestCases}</span>
          <span className="rounded-md bg-rose-500/10 px-2 py-1 text-rose-600 dark:text-rose-300">Failed {result.failedTestCases}</span>
          <span className={`rounded-md px-2 py-1 ${allPassed ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300' : 'bg-rose-500/15 text-rose-600 dark:text-rose-300'}`}>
            {allPassed ? 'All passed' : 'Has failures'}
          </span>
        </div>
      </div>
      <div className="space-y-2">
        {result.testCases.map((testCase) => (
          <article
            key={`${label}-${testCase.id}`}
            className={`rounded-lg border p-3 text-xs ${
              testCase.passed
                ? 'border-emerald-500/35 bg-emerald-500/8'
                : 'border-rose-500/35 bg-rose-500/8'
            }`}
          >
            <div className="flex flex-wrap items-center gap-2 font-semibold text-(--c2c-text)">
              {testCase.passed ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
              ) : (
                <XCircle className="h-4 w-4 text-rose-500" />
              )}
              <span>Test case {testCase.id}</span>
              <span className="font-normal text-(--c2c-text-subtle)">{testCase.type}</span>
              <span className={testCase.passed ? 'ml-auto text-emerald-600 dark:text-emerald-300' : 'ml-auto text-rose-600 dark:text-rose-300'}>
                {testCase.passed ? 'Passed' : 'Failed'}
              </span>
            </div>
            <div className="mt-3 grid gap-2 font-mono sm:grid-cols-3">
              {!testCase.isHidden && testCase.input !== null && outputBlock('Input', testCase.input, 'neutral')}
              {!testCase.isHidden && testCase.expectedOutput !== null && outputBlock('Expected', testCase.expectedOutput, 'neutral')}
              {!testCase.isHidden && testCase.actualOutput !== null && outputBlock('Actual', testCase.actualOutput, testCase.passed ? 'success' : 'danger')}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
