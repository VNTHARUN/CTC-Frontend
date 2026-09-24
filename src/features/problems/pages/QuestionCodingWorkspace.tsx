import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { ArrowLeft, ChevronLeft, ChevronRight, ExternalLink, FileCode2, FlaskConical, Lightbulb, Maximize2, Minimize2, Play, RefreshCw, TerminalSquare, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useTheme } from '../../../shared/context/ThemeContext';
import { getCodeExecutionErrorMessage, getCodeExecutionErrorMessages, getPracticeApiErrorMessage, practiceService } from '../../../services/practiceService';
import { CodeExecutionResult, CodeLanguage, CodingQuestion } from '../practiceTypes';
import { Badge } from '../../../shared/components/ui/Badge';
import { Button } from '../../../shared/components/ui/Button';
import { Skeleton } from '../../../shared/components/ui/Skeleton';
import { CodeExecutionResultPanel } from '../components/CodeExecutionResultPanel';

type BottomTab = 'tests' | 'output' | 'console';

const getErrorStatus = (error: unknown) => {
  if (!error || typeof error !== 'object') return 0;
  const record = error as Record<string, unknown>;
  return Number(record.statusCode ?? record.status ?? 0);
};

const errorTitle = (error: unknown) => {
  const status = getErrorStatus(error);
  if (status === 404) return 'Question not found';
  if (status === 401 || status === 403) return 'Access denied';
  if (status >= 500) return 'The question service is unavailable';
  return 'Could not load this question';
};

const difficultyVariant = (difficulty: CodingQuestion['difficulty']) => difficulty.toLowerCase() as 'easy' | 'medium' | 'hard';

const QuestionPanel: React.FC<{ question: CodingQuestion }> = ({ question }) => {
  const visibleTests = [...question.testCases].filter((testCase) => !testCase.isHidden).sort((a, b) => a.displayOrder - b.displayOrder);
  return <div className="c2c-subtle-scrollbar h-full overflow-y-auto px-5 py-6 sm:px-7"><div className="space-y-8">
    <section><p className="mb-3 text-[11px] font-bold uppercase tracking-[0.16em] text-(--c2c-text-subtle)">Problem</p><div className="whitespace-pre-line text-sm leading-7 text-(--c2c-text-muted)">{question.description || 'No description provided.'}</div></section>
    <section><h2 className="mb-3 text-sm font-bold text-(--c2c-text)">Constraints</h2><div className="whitespace-pre-line rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised)/70 p-4 font-mono text-xs leading-6 text-(--c2c-text-muted)">{question.constraints || 'No constraints provided.'}</div></section>
    <section><div className="mb-3 flex items-center gap-2"><FlaskConical className="h-4 w-4 text-(--c2c-primary)" /><h2 className="text-sm font-bold text-(--c2c-text)">Examples</h2></div>{visibleTests.length === 0 ? <p className="text-sm text-(--c2c-text-subtle)">No visible examples are available.</p> : <div className="space-y-3">{visibleTests.map((testCase, index) => <div key={testCase.id} className="rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised)/55 p-4"><p className="mb-3 text-xs font-bold uppercase tracking-wider text-(--c2c-text-subtle)">Example {index + 1}</p><div className="space-y-3 font-mono text-xs"><div><span className="text-sky-400">Input</span><pre className="mt-1 whitespace-pre-wrap text-(--c2c-text-muted)">{testCase.input}</pre></div><div><span className="text-emerald-400">Expected output</span><pre className="mt-1 whitespace-pre-wrap text-(--c2c-text-muted)">{testCase.expectedOutput}</pre></div></div>{testCase.explanation && <p className="mt-3 border-t border-(--c2c-border) pt-3 text-xs leading-5 text-(--c2c-text-subtle)">{testCase.explanation}</p>}</div>)}</div>}</section>
    <section><h2 className="mb-3 text-sm font-bold text-(--c2c-text)">Companies</h2><div className="flex flex-wrap gap-2">{question.companies.length ? question.companies.map((company) => <Badge key={company} size="sm" variant="neutral">{company}</Badge>) : <span className="text-sm text-(--c2c-text-subtle)">No companies listed.</span>}</div></section>
    {question.resources.length > 0 && <section><h2 className="mb-3 text-sm font-bold text-(--c2c-text)">External resources</h2><div className="space-y-2">{question.resources.map((resource) => <a key={resource.url} href={resource.url} target="_blank" rel="noreferrer" className="flex items-center justify-between rounded-lg border border-(--c2c-border) px-3 py-2 text-sm text-(--c2c-text-muted) transition-colors hover:border-(--c2c-primary)/50 hover:text-(--c2c-primary)"><span>{resource.label}</span><ExternalLink className="h-3.5 w-3.5" /></a>)}</div></section>}
  </div></div>;
};

export const QuestionCodingWorkspace: React.FC = () => {
  const { questionId } = useParams<{ questionId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isAdmin = location.pathname.startsWith('/admin/');
  const listPath = isAdmin ? '/admin/practice' : '/practice';
  const [question, setQuestion] = useState<CodingQuestion | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<unknown>(null);
  const [languages, setLanguages] = useState<CodeLanguage[]>([]);
  const [languageId, setLanguageId] = useState('');
  const [languageLoading, setLanguageLoading] = useState(true);
  const [languageError, setLanguageError] = useState('');
  const [codeByLanguage, setCodeByLanguage] = useState<Record<string, string>>({});
  const [panelOpen, setPanelOpen] = useState(true);
  const [mobilePanelOpen, setMobilePanelOpen] = useState(false);
  const [hintsOpen, setHintsOpen] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [bottomTab, setBottomTab] = useState<BottomTab>('tests');
  const [runLoading, setRunLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [runResult, setRunResult] = useState<CodeExecutionResult | null>(null);
  const [submitResult, setSubmitResult] = useState<CodeExecutionResult | null>(null);
  const [runError, setRunError] = useState('');
  const [submitError, setSubmitError] = useState('');
  const executionControllerRef = useRef<AbortController | null>(null);
  const executionInFlightRef = useRef(false);
  const mountedRef = useRef(true);

  const loadQuestion = useCallback(async () => {
    if (!questionId) return;
    setLoading(true);
    setLoadError(null);
    setRunResult(null);
    setSubmitResult(null);
    setRunError('');
    setSubmitError('');
    executionControllerRef.current?.abort();
    executionInFlightRef.current = false;
    try {
      const nextQuestion = await practiceService.getQuestion(questionId);
      if (!mountedRef.current) return;
      setQuestion(nextQuestion);
      setCodeByLanguage({});
      setBottomTab('tests');
    } catch (error) {
      if (mountedRef.current) setLoadError(error);
    } finally {
      if (mountedRef.current) setLoading(false);
    }
  }, [questionId]);

  const loadLanguages = useCallback(async () => {
    setLanguageLoading(true);
    setLanguageError('');
    try {
      const nextLanguages = await practiceService.getCodeLanguages();
      if (!nextLanguages.length) throw new Error('No active programming languages are available.');
      if (!mountedRef.current) return;
      setLanguages(nextLanguages);
      setLanguageId((current) => current && nextLanguages.some((language) => language.id === current) ? current : nextLanguages[0].id);
    } catch (error) {
      if (!mountedRef.current) return;
      setLanguages([]);
      setLanguageId('');
      const message = getCodeExecutionErrorMessage(error);
      setLanguageError(message);
      toast.error(message);
    } finally {
      if (mountedRef.current) setLanguageLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void loadQuestion();
    void loadLanguages();
    return () => {
      mountedRef.current = false;
      executionControllerRef.current?.abort();
    };
  }, [questionId, loadLanguages, loadQuestion]);

  const sortedHints = useMemo(() => [...(question?.hints ?? [])].sort((a, b) => a.displayOrder - b.displayOrder), [question]);
  const visibleTests = useMemo(() => [...(question?.testCases ?? [])].filter((testCase) => !testCase.isHidden).sort((a, b) => a.displayOrder - b.displayOrder), [question]);
  const selectedLanguage = languages.find((language) => language.id === languageId);
  const sourceCode = selectedLanguage ? codeByLanguage[selectedLanguage.id] ?? question?.starterCode[selectedLanguage.refCode] ?? question?.starterCode[selectedLanguage.refName] ?? '' : '';
  const canExecute = Boolean(questionId && selectedLanguage && sourceCode.trim() && !languageLoading && !runLoading && !submitLoading);

  const execute = async (mode: 'RUN' | 'SUBMIT') => {
    if (!canExecute || executionInFlightRef.current || !questionId || !selectedLanguage) return;
    executionInFlightRef.current = true;
    const controller = new AbortController();
    executionControllerRef.current = controller;
    const setLoadingState = mode === 'RUN' ? setRunLoading : setSubmitLoading;
    const setResult = mode === 'RUN' ? setRunResult : setSubmitResult;
    const setError = mode === 'RUN' ? setRunError : setSubmitError;
    setLoadingState(true);
    setError('');
    setResult(null);
    setBottomTab('output');
    try {
      const result = await practiceService.executeCode(isAdmin ? 'ADMIN' : 'USER', mode, { questionId, languageId: selectedLanguage.id, sourceCode: sourceCode.trim() }, controller.signal);
      if (mountedRef.current && executionControllerRef.current === controller) {
        setResult(result);
        const feedback = result.message.trim() || (result.failedTestCases > 0
          ? `${result.failedTestCases} of ${result.totalTestCases} test cases failed.`
          : `${result.passedTestCases} of ${result.totalTestCases} test cases passed.`);
        const toastId = `${mode.toLowerCase()}-execution`;
        if (result.failedTestCases > 0) {
          toast.error(feedback, { id: toastId, duration: 5000 });
        } else {
          toast.success(feedback, { id: toastId, duration: 4000 });
        }
      }
    } catch (error) {
      if (!controller.signal.aborted && mountedRef.current) {
        const messages = getCodeExecutionErrorMessages(error);
        setError(messages[0] ?? getCodeExecutionErrorMessage(error));
        messages.forEach((message, index) => {
          toast.error(message, { id: `${mode.toLowerCase()}-execution-${index}`, duration: 5000 });
        });
      }
    } finally {
      if (mountedRef.current && executionControllerRef.current === controller) {
        setLoadingState(false);
        executionInFlightRef.current = false;
      }
    }
  };

  if (loading) return <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 p-4 sm:p-6"><Skeleton className="h-16 w-full rounded-2xl" /><div className="grid gap-4 lg:grid-cols-[minmax(20rem,0.8fr)_minmax(0,1.5fr)]"><Skeleton className="h-[calc(100vh-9rem)] min-h-144 rounded-2xl" /><Skeleton className="h-[calc(100vh-9rem)] min-h-144 rounded-2xl" /></div></div>;
  if (loadError || !question) return <main className="flex min-h-[70vh] items-center justify-center p-6"><div className="c2c-card w-full max-w-md p-8 text-center"><div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-rose-500/10 text-rose-400"><RefreshCw className="h-5 w-5" /></div><h1 className="mt-4 text-xl font-bold text-(--c2c-text)">{errorTitle(loadError)}</h1><p className="mt-2 text-sm leading-6 text-(--c2c-text-muted)">{getPracticeApiErrorMessage(loadError, 'Please try again in a moment.')}</p><div className="mt-6 flex justify-center gap-2"><Button variant="ghost" onClick={() => navigate(-1)}>Go back</Button><Button onClick={() => void loadQuestion()} leftIcon={<RefreshCw className="h-4 w-4" />}>Retry</Button></div></div></main>;

  const editorShell = fullscreen ? 'fixed inset-0 z-50 bg-(--c2c-bg) p-3 sm:p-5' : 'relative flex min-h-0 flex-1 flex-col';
  const outputContent = bottomTab === 'output' ? <div className="space-y-4">{!runResult && !submitResult && !runError && !submitError && <p className="text-xs text-(--c2c-text-subtle)">Run or submit your code to see execution results.</p>}<CodeExecutionResultPanel label="Run" result={runResult} error={runError} /><CodeExecutionResultPanel label="Submit" result={submitResult} error={submitError} /></div> : bottomTab === 'console' ? <p className="py-4 text-xs text-(--c2c-text-subtle)">Console messages will appear here during execution.</p> : visibleTests.length ? <div className="grid gap-2 sm:grid-cols-2">{visibleTests.map((testCase, index) => <div key={testCase.id} className="rounded-lg border border-(--c2c-border) bg-(--c2c-surface) p-3 font-mono text-xs"><p className="mb-2 font-sans font-semibold text-(--c2c-text)">Case {index + 1}</p><p className="whitespace-pre-wrap text-(--c2c-text-muted)">Input: {testCase.input}</p><p className="mt-1 whitespace-pre-wrap text-(--c2c-text-muted)">Expected: {testCase.expectedOutput}</p></div>)}</div> : <p className="py-4 text-xs text-(--c2c-text-subtle)">No visible test cases are available.</p>;

  return <main className="flex min-h-[calc(100vh-4rem)] flex-col bg-(--c2c-bg) text-(--c2c-text)">
    <header className="sticky top-0 z-40 border-b border-(--c2c-border) bg-(--c2c-surface)/95 px-3 py-3 shadow-(--c2c-shadow-sm) backdrop-blur sm:px-5"><div className="mx-auto flex max-w-[1600px] items-center gap-3"><button type="button" onClick={() => navigate(listPath)} className="c2c-icon-button c2c-tooltip shrink-0" aria-label={isAdmin ? 'Back to admin practice' : 'Back to practice'} data-tooltip={isAdmin ? 'Back to admin practice' : 'Back to practice'}><ArrowLeft className="h-4 w-4" /></button><div className="min-w-0 flex-1"><h1 className="truncate text-sm font-bold sm:text-base">{question.title}</h1><div className="mt-1 flex flex-wrap items-center gap-2"><Badge size="sm" variant={difficultyVariant(question.difficulty)}>{question.difficulty}</Badge><span className="text-xs text-(--c2c-text-subtle)">{question.topic}</span>{question.qpf && <><span className="text-(--c2c-text-subtle)">/</span><span className="text-xs text-(--c2c-text-subtle)">{question.qpf}</span></>}</div></div><button type="button" onClick={() => setMobilePanelOpen(true)} className="hidden min-h-10 rounded-lg border border-(--c2c-border) px-3 text-xs font-semibold text-(--c2c-text-muted) hover:border-(--c2c-border-strong) hover:text-(--c2c-text) lg:hidden sm:inline-flex">Question</button></div></header>
    <div className={`mx-auto flex w-full max-w-[1600px] min-h-0 flex-1 gap-3 p-3 sm:p-5 ${fullscreen ? 'h-full' : 'h-[calc(100vh-8rem)] min-h-168'}`}>
      <aside className={`hidden min-h-0 overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) transition-[width,opacity] duration-300 lg:block ${panelOpen ? 'w-[min(38vw,31rem)] opacity-100' : 'w-0 border-0 opacity-0'}`}><QuestionPanel question={question} /></aside>
      <section className={`${editorShell} min-w-0 overflow-hidden rounded-2xl border border-(--c2c-border) bg-(--c2c-surface) shadow-(--c2c-shadow-sm)`}>
        <div className="flex min-h-14 shrink-0 flex-wrap items-center justify-between gap-2 border-b border-(--c2c-border) bg-(--c2c-surface-raised) px-3 py-2"><div className="flex items-center gap-2"><button type="button" onClick={() => setPanelOpen((current) => !current)} className="c2c-icon-button c2c-tooltip hidden lg:inline-flex" aria-label={panelOpen ? 'Collapse question panel' : 'Expand question panel'} data-tooltip={panelOpen ? 'Collapse question panel' : 'Expand question panel'}>{panelOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}</button><span className="text-xs font-semibold text-(--c2c-text-muted)">Code editor</span></div><div className="flex flex-wrap items-center justify-end gap-2"><div className="relative"><button type="button" onClick={() => setHintsOpen((current) => !current)} className={`c2c-icon-button c2c-tooltip ${hintsOpen ? 'border-amber-400/50 bg-amber-400/10 text-amber-300' : ''}`} aria-label={`Show ${sortedHints.length} question hints`} aria-expanded={hintsOpen} data-tooltip="Question hints"><Lightbulb className="h-4 w-4" /><span className="absolute -right-1 -top-1 min-w-4 rounded-full bg-amber-500 px-1 text-center text-[9px] font-bold text-black">{sortedHints.length}</span></button>{hintsOpen && <div className="absolute right-0 top-12 z-50 w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-amber-400/25 bg-(--c2c-surface) p-4 shadow-2xl"><div className="mb-3 flex items-center justify-between"><h2 className="text-sm font-bold text-(--c2c-text)">Question hints</h2><button type="button" onClick={() => setHintsOpen(false)} aria-label="Close hints"><X className="h-4 w-4 text-(--c2c-text-subtle)" /></button></div>{sortedHints.length ? <div className="max-h-72 space-y-3 overflow-y-auto">{sortedHints.map((hint, index) => <div key={hint.id} className="rounded-xl bg-amber-400/8 p-3 text-sm leading-6 text-(--c2c-text-muted)"><span className="mr-2 text-xs font-bold uppercase tracking-wider text-amber-300">Hint {index + 1}</span>{hint.hintText}</div>)}</div> : <p className="text-sm text-(--c2c-text-subtle)">No hints are available for this question.</p>}</div>}</div><select value={languageId} onChange={(event) => setLanguageId(event.target.value)} disabled={languageLoading || !languages.length} aria-label="Execution language" className="h-10 max-w-36 rounded-lg border border-(--c2c-border) bg-(--c2c-surface) px-2 text-xs font-semibold text-(--c2c-text) outline-none focus:border-(--c2c-primary) sm:max-w-none sm:px-3"><option value="">{languageLoading ? 'Loading languages...' : 'Select language'}</option>{languages.map((language) => <option key={language.id} value={language.id}>{language.refName || language.refCode}</option>)}</select>{languageError && <button type="button" onClick={() => void loadLanguages()} className="text-xs font-semibold text-rose-500 hover:underline">Retry languages</button>}<Button type="button" size="sm" onClick={() => void execute('RUN')} disabled={!canExecute} isLoading={runLoading} leftIcon={<Play className="h-3.5 w-3.5" />} className="min-h-10 bg-(--c2c-primary) px-3 text-xs text-(--c2c-primary-foreground) hover:bg-(--c2c-primary-hover)">Run</Button><Button type="button" size="sm" onClick={() => void execute('SUBMIT')} disabled={!canExecute} isLoading={submitLoading} className="min-h-10 px-3 text-xs" variant="secondary">Submit</Button><button type="button" onClick={() => setFullscreen((current) => !current)} className="c2c-icon-button c2c-tooltip" aria-label={fullscreen ? 'Exit fullscreen editor' : 'Open fullscreen editor'} data-tooltip={fullscreen ? 'Exit fullscreen' : 'Fullscreen'}>{fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}</button></div></div>
        <div className="min-h-0 flex-1"><Editor theme={theme === 'light' ? 'vs' : 'vs-dark'} language={selectedLanguage?.monacoLanguage ?? 'plaintext'} value={sourceCode} onChange={(value) => selectedLanguage && setCodeByLanguage((current) => ({ ...current, [selectedLanguage.id]: value ?? '' }))} options={{ automaticLayout: true, minimap: { enabled: false }, fontSize: 14, padding: { top: 18 }, scrollBeyondLastLine: false, tabSize: 2, roundedSelection: false }} /></div>
        <div className="shrink-0 border-t border-(--c2c-border) bg-(--c2c-surface-raised)"><div className="flex items-center gap-1 px-3 pt-2">{([['tests', 'Test Cases', FlaskConical], ['output', 'Output', FileCode2], ['console', 'Console', TerminalSquare]] as const).map(([tab, label, Icon]) => <button type="button" key={tab} onClick={() => setBottomTab(tab)} className={`inline-flex items-center gap-2 border-b-2 px-3 py-2 text-xs font-semibold transition-colors ${bottomTab === tab ? 'border-(--c2c-primary) text-(--c2c-primary)' : 'border-transparent text-(--c2c-text-subtle) hover:text-(--c2c-text)'}`}><Icon className="h-3.5 w-3.5" />{label}{tab === 'tests' && <span className="rounded-full bg-(--c2c-surface-hover) px-1.5 py-0.5 text-[10px]">{visibleTests.length}</span>}</button>)}</div><div className="c2c-subtle-scrollbar h-48 overflow-y-auto px-4 pb-4 pt-2">{outputContent}</div></div>
      </section>
    </div>
    {mobilePanelOpen && <div className="fixed inset-0 z-50 lg:hidden"><button type="button" className="absolute inset-0 bg-black/60" onClick={() => setMobilePanelOpen(false)} aria-label="Close question panel" /><aside className="relative h-full w-[min(92vw,30rem)] max-w-120 border-r border-(--c2c-border) bg-(--c2c-surface) shadow-2xl"><div className="flex h-14 items-center justify-between border-b border-(--c2c-border) px-4"><h2 className="text-sm font-bold">Question details</h2><button type="button" onClick={() => setMobilePanelOpen(false)} className="c2c-icon-button" aria-label="Close question details"><X className="h-4 w-4" /></button></div><QuestionPanel question={question} /></aside></div>}
  </main>;
};
