import React, { useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertCircle,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Check,
  CheckCircle2,
  CirclePlus,
  Eye,
  EyeOff,
  FlaskConical,
  Link2,
  ListChecks,
  Plus,
  Sparkles,
  Tags,
  Trash2,
  X,
} from 'lucide-react';
import toast from 'react-hot-toast';
import { getPracticeApiErrorMessage, practiceService } from '../../../services/practiceService';
import { Button } from '../../../shared/components/ui/Button';
import { Input } from '../../../shared/components/ui/Input';
import { useScrollLock } from '../../../shared/hooks/useScrollLock';
import {
  CreateTestCasePayload,
  PracticeFilterOption,
} from '../practiceTypes';
import { PracticeCompanyFilter, PracticeFilterSelect } from './PracticeFilterDropdown';

interface AdminQuestionWorkspaceProps {
  isOpen: boolean;
  onClose: () => void;
  onCreated: () => void;
}

type WorkspaceStep = 'details' | 'tests';

interface QuestionFormState {
  title: string;
  slug: string;
  description: string;
  constraints: string;
  topicId: string;
  difficultyId: string;
  qpfId: string;
  companyIds: string[];
  hints: string[];
  hackerRankUrl: string;
  leetCodeUrl: string;
  gfgUrl: string;
  isOwnProblem: boolean;
  askedDate: string;
  isActive: boolean;
}

interface TestCaseDraft {
  key: string;
  input: string;
  expectedOutput: string;
  explanation: string;
  isHidden: boolean;
  displayOrder: number;
  typeId: string;
}

const emptyForm: QuestionFormState = {
  title: '',
  slug: '',
  description: '',
  constraints: '',
  topicId: '',
  difficultyId: '',
  qpfId: '',
  companyIds: [],
  hints: [''],
  hackerRankUrl: '',
  leetCodeUrl: '',
  gfgUrl: '',
  isOwnProblem: false,
  askedDate: '',
  isActive: true,
};

const createTestCase = (order: number): TestCaseDraft => ({
  key: `tc-${Date.now()}-${order}`,
  input: '',
  expectedOutput: '',
  explanation: '',
  isHidden: false,
  displayOrder: order,
  typeId: '',
});

const toSlug = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const isValidUrl = (value: string) => {
  if (!value.trim()) return true;
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

const FieldLabel: React.FC<{ htmlFor?: string; required?: boolean; children: React.ReactNode }> = ({
  htmlFor,
  required,
  children,
}) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-(--c2c-text-subtle)">
    {children}
    {required && <span className="ml-1 text-rose-400">*</span>}
  </label>
);

const SectionCard: React.FC<{
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}> = ({ id, icon, title, description, children }) => (
  <section id={id} className="scroll-mt-28 rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) p-5 shadow-(--c2c-shadow-sm) sm:p-6">
    <div className="mb-5 flex items-start gap-3">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-violet-500/25 bg-violet-500/10 text-violet-300 light:text-violet-700">
        {icon}
      </span>
      <div>
        <h2 className="text-base font-bold text-(--c2c-text)">{title}</h2>
        <p className="mt-1 text-sm text-(--c2c-text-muted)">{description}</p>
      </div>
    </div>
    {children}
  </section>
);

const TextArea: React.FC<{
  id: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  rows?: number;
  placeholder?: string;
}> = ({ id, value, onChange, error, rows = 5, placeholder }) => (
  <>
    <textarea
      id={id}
      value={value}
      onChange={(event) => onChange(event.target.value)}
      rows={rows}
      placeholder={placeholder}
      aria-invalid={Boolean(error)}
      className={`w-full resize-y rounded-xl border bg-(--c2c-surface-raised)/60 px-3.5 py-3 text-sm text-(--c2c-text) outline-none transition-colors placeholder:text-(--c2c-text-subtle) ${
        error ? 'border-rose-500/80' : 'border-(--c2c-border) focus:border-violet-500/55 focus:ring-2 focus:ring-violet-500/15'
      }`}
    />
    {error && <p className="mt-1.5 text-xs font-medium text-rose-400">{error}</p>}
  </>
);

export const AdminQuestionWorkspace: React.FC<AdminQuestionWorkspaceProps> = ({
  isOpen,
  onClose,
  onCreated,
}) => {
  const [mountNode, setMountNode] = useState<HTMLElement | null>(null);
  const [step, setStep] = useState<WorkspaceStep>('details');
  const [form, setForm] = useState<QuestionFormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof QuestionFormState | 'hints', string>>>({});
  const [submitError, setSubmitError] = useState('');
  const [isSavingQuestion, setIsSavingQuestion] = useState(false);
  const [isSavingTests, setIsSavingTests] = useState(false);
  const [createdQuestionId, setCreatedQuestionId] = useState<number | null>(null);
  const [createdTitle, setCreatedTitle] = useState('');
  const [testCases, setTestCases] = useState<TestCaseDraft[]>([createTestCase(1)]);
  const [testErrors, setTestErrors] = useState<Record<string, string>>({});
  const questionSubmitLock = useRef(false);
  const testSubmitLock = useRef(false);
  const titleFieldId = useId();

  const [topicOptions, setTopicOptions] = useState<PracticeFilterOption[]>([]);
  const [difficultyOptions, setDifficultyOptions] = useState<PracticeFilterOption[]>([]);
  const [qpfOptions, setQpfOptions] = useState<PracticeFilterOption[]>([]);
  const [companyOptions, setCompanyOptions] = useState<PracticeFilterOption[]>([]);
  const [testTypeOptions, setTestTypeOptions] = useState<PracticeFilterOption[]>([]);
  const [dropdownLoading, setDropdownLoading] = useState({
    topic: false,
    difficulty: false,
    qpf: false,
    company: false,
    testType: false,
  });

  useEffect(() => {
    setMountNode(document.body);
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    setStep('details');
    setForm(emptyForm);
    setErrors({});
    setSubmitError('');
    setCreatedQuestionId(null);
    setCreatedTitle('');
    setTestCases([createTestCase(1)]);
    setTestErrors({});
    questionSubmitLock.current = false;
    testSubmitLock.current = false;
  }, [isOpen]);

  useScrollLock(isOpen);

  const companyLabels = useMemo(
    () => Object.fromEntries(companyOptions.map((option) => [option.value, option.label])),
    [companyOptions]
  );

  const updateForm = <K extends keyof QuestionFormState>(field: K, value: QuestionFormState[K]) => {
    setForm((current) => {
      const next = { ...current, [field]: value };
      if (field === 'title' && (!current.slug || current.slug === toSlug(current.title))) {
        next.slug = toSlug(String(value));
      }
      return next;
    });
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const loadReferenceOptions = async (
    group: 'TOPIC' | 'DIFF' | 'QPF' | 'TESTCASETYPE',
    key: keyof typeof dropdownLoading,
    setter: React.Dispatch<React.SetStateAction<PracticeFilterOption[]>>
  ) => {
    setDropdownLoading((current) => ({ ...current, [key]: true }));
    try {
      const items = await practiceService.getReferenceLibrary(group);
      setter(
        items
          .filter((item) => item.id !== undefined && item.id !== null && item.refCode)
          .map((item) => ({ value: String(item.id), label: item.refCode }))
      );
    } catch (error) {
      setter([]);
      toast.error(getPracticeApiErrorMessage(error, `Failed to load ${group} options`));
    } finally {
      setDropdownLoading((current) => ({ ...current, [key]: false }));
    }
  };

  const loadCompanies = async () => {
    setDropdownLoading((current) => ({ ...current, company: true }));
    try {
      const items = await practiceService.getCompanies();
      setCompanyOptions(
        items
          .filter((item) => item.id !== undefined && item.id !== null && item.name)
          .map((item) => ({ value: String(item.id), label: item.name }))
      );
    } catch (error) {
      setCompanyOptions([]);
      toast.error(getPracticeApiErrorMessage(error, 'Failed to load companies'));
    } finally {
      setDropdownLoading((current) => ({ ...current, company: false }));
    }
  };

  const optionCode = (options: PracticeFilterOption[], id: string) =>
    options.find((option) => option.value === id)?.label ?? '';

  const validateQuestion = () => {
    const nextErrors: Partial<Record<keyof QuestionFormState | 'hints', string>> = {};
    if (form.title.trim().length < 4) nextErrors.title = 'Use at least 4 characters.';
    if (form.slug && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(form.slug)) {
      nextErrors.slug = 'Use lowercase words separated by hyphens.';
    }
    if (!form.description.trim()) nextErrors.description = 'Description is required.';
    if (!form.constraints.trim()) nextErrors.constraints = 'Constraints are required.';
    if (!form.topicId) nextErrors.topicId = 'Topic is required.';
    if (!form.difficultyId) nextErrors.difficultyId = 'Difficulty is required.';
    if (!form.qpfId) nextErrors.qpfId = 'QPF is required.';
    if (form.companyIds.length === 0) nextErrors.companyIds = 'Select at least one company.';
    if (!isValidUrl(form.hackerRankUrl)) nextErrors.hackerRankUrl = 'Enter a valid URL.';
    if (!isValidUrl(form.leetCodeUrl)) nextErrors.leetCodeUrl = 'Enter a valid URL.';
    if (!isValidUrl(form.gfgUrl)) nextErrors.gfgUrl = 'Enter a valid URL.';
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCreateQuestion = async () => {
    if (createdQuestionId) {
      setStep('tests');
      return;
    }
    if (questionSubmitLock.current || isSavingQuestion) return;
    if (!validateQuestion()) {
      toast.error('Please fix the highlighted fields before creating the question.');
      return;
    }

    const topicRefCode = optionCode(topicOptions, form.topicId);
    const difficultyRefCode = optionCode(difficultyOptions, form.difficultyId);
    const qpfRefCode = optionCode(qpfOptions, form.qpfId);
    if (!topicRefCode || !difficultyRefCode || !qpfRefCode) {
      toast.error('Open each classification dropdown so the latest options can load.');
      return;
    }

    questionSubmitLock.current = true;
    setIsSavingQuestion(true);
    setSubmitError('');
    try {
      const questionId = await practiceService.createQuestion({
        title: form.title.trim(),
        description: form.description.trim(),
        constraints: form.constraints.trim(),
        difficultyRefGroupCode: 'DIFF',
        difficultyRefCode,
        topicRefGroupCode: 'TOPIC',
        topicRefCode,
        qpfRefGroupCode: 'QPF',
        qpfRefCode,
        questionHints: form.hints.map((hint) => hint.trim()).filter(Boolean),
        companies: form.companyIds.map((id) => {
          const numeric = Number(id);
          return Number.isFinite(numeric) ? numeric : id;
        }),
        hackerRankUrl: form.hackerRankUrl.trim() || null,
        leetCodeUrl: form.leetCodeUrl.trim() || null,
        gfgUrl: form.gfgUrl.trim() || null,
        isOwnProblem: form.isOwnProblem,
        askedDate: form.askedDate || null,
        isActive: form.isActive,
      });
      setCreatedQuestionId(questionId);
      setCreatedTitle(form.title.trim());
      setStep('tests');
      toast.success('Question created. Add test cases next.');
    } catch (error) {
      const message = getPracticeApiErrorMessage(error, 'Could not create this question.');
      setSubmitError(message);
      toast.error(message);
    } finally {
      questionSubmitLock.current = false;
      setIsSavingQuestion(false);
    }
  };

  const updateTestCase = <K extends keyof TestCaseDraft>(key: string, field: K, value: TestCaseDraft[K]) => {
    setTestCases((current) =>
      current.map((item) => (item.key === key ? { ...item, [field]: value } : item))
    );
    setTestErrors((current) => {
      const next = { ...current };
      delete next[key];
      return next;
    });
  };

  const moveTestCase = (index: number, direction: -1 | 1) => {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= testCases.length) return;
    setTestCases((current) => {
      const next = [...current];
      const [item] = next.splice(index, 1);
      next.splice(nextIndex, 0, item);
      return next.map((testCase, order) => ({ ...testCase, displayOrder: order + 1 }));
    });
  };

  const validateTestCases = () => {
    const nextErrors: Record<string, string> = {};
    testCases.forEach((testCase, index) => {
      if (!testCase.input.trim() || !testCase.expectedOutput.trim() || !testCase.typeId) {
        nextErrors[testCase.key] = `Test case ${index + 1} needs input, expected output, and a type.`;
      }
    });
    setTestErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleCreateTestCases = async () => {
    if (!createdQuestionId || testSubmitLock.current || isSavingTests) return;
    if (testCases.length === 0) {
      toast.error('Add at least one test case.');
      return;
    }
    if (!validateTestCases()) {
      toast.error('Complete every test case before submitting.');
      return;
    }

    const missingType = testCases.some((testCase) => !optionCode(testTypeOptions, testCase.typeId));
    if (missingType) {
      toast.error('Open the test case type dropdown so options can load.');
      return;
    }

    testSubmitLock.current = true;
    setIsSavingTests(true);
    setSubmitError('');
    try {
      const payload: CreateTestCasePayload[] = testCases.map((testCase, index) => ({
        input: testCase.input.trim(),
        expectedOutput: testCase.expectedOutput.trim(),
        explanation: testCase.explanation.trim(),
        isHidden: testCase.isHidden,
        displayOrder: testCase.displayOrder || index + 1,
        typeRefGroupCode: 'TESTCASETYPE',
        typeRefCode: optionCode(testTypeOptions, testCase.typeId),
      }));
      await practiceService.createTestCases(createdQuestionId, payload);
      toast.success('Test cases saved.');
      onCreated();
      onClose();
    } catch (error) {
      const message = getPracticeApiErrorMessage(error, 'Could not save test cases.');
      setSubmitError(message);
      toast.error(message);
    } finally {
      testSubmitLock.current = false;
      setIsSavingTests(false);
    }
  };

  const handleClose = () => {
    if (isSavingQuestion || isSavingTests) return;
    onClose();
    if (createdQuestionId) onCreated();
  };

  const sections = [
    { id: 'details', label: 'Details' },
    { id: 'classification', label: 'Classification' },
    { id: 'hints', label: 'Hints' },
    { id: 'links', label: 'Links' },
    { id: 'additional', label: 'Additional' },
  ];

  if (!mountNode) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-70 flex flex-col bg-(--c2c-bg)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="admin-question-workspace-title"
        >
          <header className="sticky top-0 z-20 border-b border-(--c2c-border) bg-(--c2c-surface)/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
              <div className="flex min-w-0 items-center gap-3">
                <button type="button" onClick={handleClose} className="c2c-icon-button" aria-label="Back to questions">
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300 light:text-violet-700">
                    Admin authoring
                  </p>
                  <h1 id="admin-question-workspace-title" className="truncate text-lg font-bold text-(--c2c-text)">
                    {step === 'details' ? 'Add question' : 'Add test cases'}
                  </h1>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ol className="hidden items-center gap-2 sm:flex">
                  {(['details', 'tests'] as const).map((item, index) => {
                    const active = step === item;
                    const done = item === 'details' && createdQuestionId !== null;
                    return (
                      <li key={item} className="flex items-center gap-2">
                        <span
                          className={`inline-flex h-7 items-center gap-1.5 rounded-full px-2.5 text-xs font-semibold ${
                            active
                              ? 'bg-violet-600 text-white'
                              : done
                                ? 'bg-emerald-500/15 text-emerald-400'
                                : 'bg-(--c2c-surface-raised) text-(--c2c-text-subtle)'
                          }`}
                        >
                          {done ? <Check className="h-3.5 w-3.5" /> : index + 1}
                          {item === 'details' ? 'Question' : 'Test cases'}
                        </span>
                        {index === 0 && <span className="h-px w-6 bg-(--c2c-border)" />}
                      </li>
                    );
                  })}
                </ol>
                <button type="button" onClick={handleClose} className="c2c-icon-button" aria-label="Close workspace">
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </header>

          <div className="c2c-subtle-scrollbar flex-1 overflow-y-auto">
            <div className="mx-auto grid max-w-6xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[13rem_minmax(0,1fr)]">
              {step === 'details' ? (
                <>
                  <aside className="hidden lg:block">
                    <nav className="sticky top-28 space-y-1">
                      {sections.map((section) => (
                        <a
                          key={section.id}
                          href={`#${section.id}`}
                          className="block rounded-lg px-3 py-2 text-sm text-(--c2c-text-muted) hover:bg-(--c2c-surface-raised) hover:text-(--c2c-text)"
                        >
                          {section.label}
                        </a>
                      ))}
                    </nav>
                  </aside>

                  <div className="space-y-5">
                    <SectionCard
                      id="details"
                      icon={<Sparkles className="h-4 w-4" />}
                      title="Question details"
                      description="Write the problem the way a candidate should see it."
                    >
                      <div className="grid gap-4">
                        <Input
                          id={titleFieldId}
                          label="Title *"
                          value={form.title}
                          onChange={(event) => updateForm('title', event.target.value)}
                          error={errors.title}
                          placeholder="e.g. Merge overlapping intervals"
                          autoFocus
                        />
                        <Input
                          label="Slug"
                          value={form.slug}
                          onChange={(event) => updateForm('slug', event.target.value)}
                          error={errors.slug}
                          helperText="Generated from the title. You can edit it."
                          placeholder="merge-overlapping-intervals"
                        />
                        <div>
                          <FieldLabel htmlFor="question-description" required>
                            Description
                          </FieldLabel>
                          <TextArea
                            id="question-description"
                            value={form.description}
                            onChange={(value) => updateForm('description', value)}
                            error={errors.description}
                            rows={7}
                            placeholder="Describe the problem statement, input, and expected behavior."
                          />
                        </div>
                        <div>
                          <FieldLabel htmlFor="question-constraints" required>
                            Constraints
                          </FieldLabel>
                          <TextArea
                            id="question-constraints"
                            value={form.constraints}
                            onChange={(value) => updateForm('constraints', value)}
                            error={errors.constraints}
                            rows={4}
                            placeholder="1 <= n <= 10^5"
                          />
                        </div>
                      </div>
                    </SectionCard>

                    <SectionCard
                      id="classification"
                      icon={<Tags className="h-4 w-4" />}
                      title="Classification"
                      description="These values come from the backend reference libraries."
                    >
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <PracticeFilterSelect
                            label="Topic *"
                            value={form.topicId}
                            onChange={(value) => updateForm('topicId', value)}
                            options={topicOptions}
                            onOpen={() => void loadReferenceOptions('TOPIC', 'topic', setTopicOptions)}
                            loading={dropdownLoading.topic}
                            emptyText="No topics found"
                          />
                          {errors.topicId && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.topicId}</p>}
                        </div>
                        <div>
                          <PracticeFilterSelect
                            label="Difficulty *"
                            value={form.difficultyId}
                            onChange={(value) => updateForm('difficultyId', value)}
                            options={difficultyOptions}
                            onOpen={() => void loadReferenceOptions('DIFF', 'difficulty', setDifficultyOptions)}
                            loading={dropdownLoading.difficulty}
                            emptyText="No difficulties found"
                          />
                          {errors.difficultyId && (
                            <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.difficultyId}</p>
                          )}
                        </div>
                        <div>
                          <PracticeFilterSelect
                            label="QPF *"
                            value={form.qpfId}
                            onChange={(value) => updateForm('qpfId', value)}
                            options={qpfOptions}
                            onOpen={() => void loadReferenceOptions('QPF', 'qpf', setQpfOptions)}
                            loading={dropdownLoading.qpf}
                            emptyText="No QPF options found"
                          />
                          {errors.qpfId && <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.qpfId}</p>}
                        </div>
                        <div>
                          <PracticeCompanyFilter
                            options={companyOptions}
                            selectedValues={form.companyIds}
                            selectedLabels={companyLabels}
                            onToggle={(companyId) =>
                              updateForm(
                                'companyIds',
                                form.companyIds.includes(companyId)
                                  ? form.companyIds.filter((item) => item !== companyId)
                                  : [...form.companyIds, companyId]
                              )
                            }
                            onClear={() => updateForm('companyIds', [])}
                            onOpen={() => void loadCompanies()}
                            loading={dropdownLoading.company}
                          />
                          {errors.companyIds && (
                            <p className="mt-1.5 text-xs font-medium text-rose-400">{errors.companyIds}</p>
                          )}
                        </div>
                      </div>
                    </SectionCard>

                    <SectionCard
                      id="hints"
                      icon={<ListChecks className="h-4 w-4" />}
                      title="Hints"
                      description="Optional coaching notes. Empty hints are ignored."
                    >
                      <div className="space-y-3">
                        {form.hints.map((hint, index) => (
                          <div key={`hint-${index}`} className="flex items-start gap-2">
                            <span className="mt-3 text-xs font-semibold text-(--c2c-text-subtle)">{index + 1}</span>
                            <input
                              value={hint}
                              onChange={(event) => {
                                const next = [...form.hints];
                                next[index] = event.target.value;
                                updateForm('hints', next);
                              }}
                              placeholder="Give a useful hint without revealing the solution."
                              className="min-h-11 w-full rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised)/60 px-3.5 text-sm text-(--c2c-text) outline-none focus:border-violet-500/55"
                            />
                            <button
                              type="button"
                              className="c2c-icon-button mt-0.5"
                              aria-label={`Remove hint ${index + 1}`}
                              onClick={() =>
                                updateForm(
                                  'hints',
                                  form.hints.length === 1 ? [''] : form.hints.filter((_, hintIndex) => hintIndex !== index)
                                )
                              }
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        ))}
                        <Button
                          type="button"
                          variant="secondary"
                          size="sm"
                          leftIcon={<Plus className="h-4 w-4" />}
                          onClick={() => updateForm('hints', [...form.hints, ''])}
                        >
                          Add hint
                        </Button>
                      </div>
                    </SectionCard>

                    <SectionCard
                      id="links"
                      icon={<Link2 className="h-4 w-4" />}
                      title="External links"
                      description="Optional references on other platforms."
                    >
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          label="HackerRank URL"
                          value={form.hackerRankUrl}
                          onChange={(event) => updateForm('hackerRankUrl', event.target.value)}
                          error={errors.hackerRankUrl}
                          placeholder="https://"
                        />
                        <Input
                          label="LeetCode URL"
                          value={form.leetCodeUrl}
                          onChange={(event) => updateForm('leetCodeUrl', event.target.value)}
                          error={errors.leetCodeUrl}
                          placeholder="https://"
                        />
                        <Input
                          label="GFG URL"
                          value={form.gfgUrl}
                          onChange={(event) => updateForm('gfgUrl', event.target.value)}
                          error={errors.gfgUrl}
                          placeholder="https://"
                        />
                      </div>
                    </SectionCard>

                    <SectionCard
                      id="additional"
                      icon={<CirclePlus className="h-4 w-4" />}
                      title="Additional information"
                      description="Publishing and ownership metadata."
                    >
                      <div className="grid gap-4 sm:grid-cols-3">
                        <Input
                          label="Asked date"
                          type="date"
                          value={form.askedDate}
                          onChange={(event) => updateForm('askedDate', event.target.value)}
                        />
                        <label className="flex min-h-12 items-center justify-between rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised)/60 px-3.5 text-sm text-(--c2c-text)">
                          Own problem
                          <input
                            type="checkbox"
                            checked={form.isOwnProblem}
                            onChange={(event) => updateForm('isOwnProblem', event.target.checked)}
                            className="h-4 w-4 accent-violet-600"
                          />
                        </label>
                        <label className="flex min-h-12 items-center justify-between rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised)/60 px-3.5 text-sm text-(--c2c-text)">
                          Active
                          <input
                            type="checkbox"
                            checked={form.isActive}
                            onChange={(event) => updateForm('isActive', event.target.checked)}
                            className="h-4 w-4 accent-violet-600"
                          />
                        </label>
                      </div>
                    </SectionCard>
                  </div>
                </>
              ) : (
                <div className="lg:col-span-2 space-y-5">
                  <section className="rounded-2xl border border-emerald-500/20 bg-emerald-500/8 px-5 py-4">
                    <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">Question created</p>
                    <h2 className="mt-1 text-xl font-bold text-(--c2c-text)">{createdTitle}</h2>
                    <p className="mt-1 text-sm text-(--c2c-text-muted)">
                      Test cases will be saved to question ID <strong className="text-(--c2c-text)">{createdQuestionId}</strong>.
                    </p>
                  </section>

                  {testCases.length === 0 ? (
                    <div className="c2c-card flex flex-col items-center px-5 py-12 text-center">
                      <FlaskConical className="h-8 w-8 text-violet-400" />
                      <h3 className="mt-3 text-base font-bold text-(--c2c-text)">No test cases yet</h3>
                      <p className="mt-1 max-w-md text-sm text-(--c2c-text-muted)">
                        Add visible and hidden cases so the judge can evaluate submissions.
                      </p>
                      <Button
                        className="mt-4"
                        onClick={() => setTestCases([createTestCase(1)])}
                        leftIcon={<Plus className="h-4 w-4" />}
                      >
                        Add test case
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {testCases.map((testCase, index) => (
                        <article
                          key={testCase.key}
                          className="rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) p-5 shadow-(--c2c-shadow-sm)"
                        >
                          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wider text-(--c2c-text-subtle)">
                                Test case {index + 1}
                              </p>
                              <p className="text-sm text-(--c2c-text-muted)">
                                {testCase.isHidden ? 'Hidden from candidates' : 'Visible to candidates'}
                              </p>
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                className="c2c-icon-button"
                                aria-label="Move test case up"
                                disabled={index === 0}
                                onClick={() => moveTestCase(index, -1)}
                              >
                                <ArrowUp className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                className="c2c-icon-button"
                                aria-label="Move test case down"
                                disabled={index === testCases.length - 1}
                                onClick={() => moveTestCase(index, 1)}
                              >
                                <ArrowDown className="h-4 w-4" />
                              </button>
                              <button
                                type="button"
                                className="c2c-icon-button hover:border-rose-500/40 hover:text-rose-400"
                                aria-label={`Delete test case ${index + 1}`}
                                onClick={() =>
                                  setTestCases((current) =>
                                    current
                                      .filter((item) => item.key !== testCase.key)
                                      .map((item, order) => ({ ...item, displayOrder: order + 1 }))
                                  )
                                }
                              >
                                <Trash2 className="h-4 w-4" />
                              </button>
                            </div>
                          </div>

                          <div className="grid gap-4 lg:grid-cols-2">
                            <PracticeFilterSelect
                              label="Test case type *"
                              value={testCase.typeId}
                              onChange={(value) => updateTestCase(testCase.key, 'typeId', value)}
                              options={testTypeOptions}
                              onOpen={() =>
                                void loadReferenceOptions('TESTCASETYPE', 'testType', setTestTypeOptions)
                              }
                              loading={dropdownLoading.testType}
                              emptyText="No test case types found"
                            />
                            <Input
                              label="Display order"
                              type="number"
                              min={1}
                              value={String(testCase.displayOrder)}
                              onChange={(event) =>
                                updateTestCase(testCase.key, 'displayOrder', Number(event.target.value) || index + 1)
                              }
                            />
                            <div>
                              <FieldLabel htmlFor={`${testCase.key}-input`} required>
                                Input
                              </FieldLabel>
                              <TextArea
                                id={`${testCase.key}-input`}
                                value={testCase.input}
                                onChange={(value) => updateTestCase(testCase.key, 'input', value)}
                                rows={4}
                                placeholder="Input provided to the program"
                              />
                            </div>
                            <div>
                              <FieldLabel htmlFor={`${testCase.key}-output`} required>
                                Expected output
                              </FieldLabel>
                              <TextArea
                                id={`${testCase.key}-output`}
                                value={testCase.expectedOutput}
                                onChange={(value) => updateTestCase(testCase.key, 'expectedOutput', value)}
                                rows={4}
                                placeholder="Exact expected output"
                              />
                            </div>
                            <div className="lg:col-span-2">
                              <FieldLabel htmlFor={`${testCase.key}-explanation`}>Explanation</FieldLabel>
                              <TextArea
                                id={`${testCase.key}-explanation`}
                                value={testCase.explanation}
                                onChange={(value) => updateTestCase(testCase.key, 'explanation', value)}
                                rows={3}
                                placeholder="Why this output is correct"
                              />
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                            <button
                              type="button"
                              onClick={() => updateTestCase(testCase.key, 'isHidden', !testCase.isHidden)}
                              className={`inline-flex min-h-10 items-center gap-2 rounded-xl border px-3 text-sm font-semibold ${
                                testCase.isHidden
                                  ? 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                                  : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                              }`}
                            >
                              {testCase.isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                              {testCase.isHidden ? 'Hidden' : 'Visible'}
                            </button>
                            {testErrors[testCase.key] && (
                              <p className="text-xs font-medium text-rose-400">{testErrors[testCase.key]}</p>
                            )}
                          </div>
                        </article>
                      ))}
                      <Button
                        type="button"
                        variant="secondary"
                        leftIcon={<Plus className="h-4 w-4" />}
                        onClick={() => setTestCases((current) => [...current, createTestCase(current.length + 1)])}
                      >
                        Add test case
                      </Button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <footer className="border-t border-(--c2c-border) bg-(--c2c-surface)/95 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl flex-col-reverse gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="min-h-5">
                {submitError && (
                  <p role="alert" className="flex items-center gap-2 text-sm text-rose-400">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    {submitError}
                  </p>
                )}
              </div>
              <div className="flex flex-col-reverse gap-2 sm:flex-row">
                <Button type="button" variant="ghost" onClick={handleClose} disabled={isSavingQuestion || isSavingTests}>
                  {createdQuestionId && step === 'tests' ? 'Finish later' : 'Cancel'}
                </Button>
                {step === 'details' ? (
                  <Button
                    type="button"
                    onClick={() => void handleCreateQuestion()}
                    isLoading={isSavingQuestion}
                    disabled={isSavingQuestion}
                    leftIcon={<CheckCircle2 className="h-4 w-4" />}
                    className="border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
                  >
                    {createdQuestionId ? 'Continue to test cases' : 'Create question'}
                  </Button>
                ) : (
                  <Button
                    type="button"
                    onClick={() => void handleCreateTestCases()}
                    isLoading={isSavingTests}
                    disabled={isSavingTests || !createdQuestionId}
                    leftIcon={<FlaskConical className="h-4 w-4" />}
                    className="border-violet-500 bg-violet-600 text-white hover:bg-violet-500"
                  >
                    Save test cases
                  </Button>
                )}
              </div>
            </div>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>,
    mountNode
  );
};
