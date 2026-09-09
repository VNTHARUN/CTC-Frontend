import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { Modal } from '../../../shared/components/ui/Modal';
import {
  PracticeDifficulty,
  PracticeQuestion,
  PracticeQuestionDraft,
} from '../practiceTypes';
import { PracticeFilterSelect } from './PracticeFilterDropdown';

interface PracticeQuestionFormProps {
  isOpen: boolean;
  question?: PracticeQuestion | null;
  onClose: () => void;
  onSave: (draft: PracticeQuestionDraft) => Promise<void>;
}

const emptyDraft: PracticeQuestionDraft = {
  title: '',
  slug: '',
  difficulty: 'Easy',
  topic: '',
  companies: '',
  description: '',
};

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const PracticeQuestionForm: React.FC<PracticeQuestionFormProps> = ({
  isOpen,
  question,
  onClose,
  onSave,
}) => {
  const [draft, setDraft] = useState<PracticeQuestionDraft>(emptyDraft);
  const [errors, setErrors] = useState<Partial<Record<keyof PracticeQuestionDraft, string>>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setDraft(
      question
        ? {
            title: question.title,
            slug: question.slug,
            difficulty: question.difficulty,
            topic: question.topic,
            companies: question.companies.join(', '),
            description: question.description,
          }
        : emptyDraft
    );
    setErrors({});
    setSubmitError('');
  }, [isOpen, question]);

  const update = (field: keyof PracticeQuestionDraft, value: string) => {
    setDraft((current) => {
      const next = { ...current, [field]: value };
      if (field === 'title' && !question && (!current.slug || current.slug === toSlug(current.title))) {
        next.slug = toSlug(value);
      }
      return next;
    });
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const validate = () => {
    const nextErrors: Partial<Record<keyof PracticeQuestionDraft, string>> = {};
    if (draft.title.trim().length < 4) nextErrors.title = 'Use at least 4 characters.';
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(draft.slug)) {
      nextErrors.slug = 'Use lowercase words separated by hyphens.';
    }
    if (!draft.topic.trim()) nextErrors.topic = 'Topic is required.';
    if (!draft.description.trim()) nextErrors.description = 'Description is required.';
    if (!draft.companies.split(',').some((company) => company.trim())) {
      nextErrors.companies = 'Add at least one company.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    setIsSaving(true);
    setSubmitError('');
    try {
      await onSave({
        ...draft,
        title: draft.title.trim(),
        slug: draft.slug.trim(),
        topic: draft.topic.trim(),
        companies: draft.companies
          .split(',')
          .map((company) => company.trim())
          .filter(Boolean)
          .join(', '),
        description: draft.description.trim(),
      });
      onClose();
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Could not save this question.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={question ? 'Edit question' : 'Add question'}
      maxWidth="xl"
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <div className="rounded-lg border border-[var(--c2c-border)] bg-[var(--c2c-surface-raised)] p-3 text-sm text-[var(--c2c-text-muted)]">
          Use the existing question fields only. Changes are saved in this browser for preview.
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Input
              label="Question title"
              value={draft.title}
              onChange={(event) => update('title', event.target.value)}
              error={errors.title}
              placeholder="e.g. Merge overlapping intervals"
              autoFocus
            />
          </div>
          <Input
            label="Slug"
            value={draft.slug}
            onChange={(event) => update('slug', event.target.value)}
            error={errors.slug}
            placeholder="merge-overlapping-intervals"
          />
          <Input
            label="Topic"
            value={draft.topic}
            onChange={(event) => update('topic', event.target.value)}
            error={errors.topic}
            placeholder="Arrays & Hashing"
          />
          <PracticeFilterSelect
            label="Difficulty"
            value={draft.difficulty}
            onChange={(value) => update('difficulty', value as PracticeDifficulty)}
            options={[
              { value: 'Easy', label: 'Easy' },
              { value: 'Medium', label: 'Medium' },
              { value: 'Hard', label: 'Hard' },
            ]}
          />
          <Input
            label="Companies"
            value={draft.companies}
            onChange={(event) => update('companies', event.target.value)}
            error={errors.companies}
            helperText="Separate company names with commas."
            placeholder="Amazon, Microsoft"
          />
        </div>

        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="question-description"
            className="font-mono text-[11px] font-semibold uppercase tracking-wider text-gray-400"
          >
            Description
          </label>
          <textarea
            id="question-description"
            value={draft.description}
            onChange={(event) => update('description', event.target.value)}
            aria-invalid={Boolean(errors.description)}
            aria-describedby={errors.description ? 'question-description-error' : undefined}
            rows={4}
            className={`w-full resize-y rounded-lg border bg-[var(--c2c-surface)] px-3.5 py-3 text-sm text-[var(--c2c-text)] outline-none transition-colors placeholder:text-[var(--c2c-text-subtle)] ${
              errors.description ? 'border-rose-500/80' : 'border-[var(--c2c-border)] focus:border-[var(--c2c-primary)]'
            }`}
            placeholder="Describe the problem statement."
          />
          {errors.description && (
            <span id="question-description-error" className="text-xs font-medium text-rose-400">
              {errors.description}
            </span>
          )}
        </div>

        {submitError && (
          <div role="alert" className="flex items-start gap-2 rounded-lg border border-rose-500/30 bg-rose-500/10 p-3 text-sm text-rose-300">
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
            {submitError}
          </div>
        )}

        <div className="flex flex-col-reverse gap-2 border-t border-[var(--c2c-border)] pt-4 sm:flex-row sm:justify-end">
          <Button type="button" variant="ghost" onClick={onClose} disabled={isSaving}>
            Cancel
          </Button>
          <Button
            type="submit"
            isLoading={isSaving}
            leftIcon={<CheckCircle2 className="h-4 w-4" />}
            className="!border-violet-500 !bg-violet-600 !text-white hover:!bg-violet-500"
          >
            {question ? 'Save changes' : 'Add question'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};
