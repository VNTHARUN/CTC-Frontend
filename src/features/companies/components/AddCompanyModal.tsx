import React, { useEffect, useId, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { useAppDispatch } from '../../../app/hooks';
import { Button } from '../../../shared/components/ui/Button';
import { Modal } from '../../../shared/components/ui/Modal';
import { createCompany } from '../redux/companySlice';
import { getCreateCompanyErrorMessage } from '../utils/companyFeedback';

const optionalUrl = z
  .string()
  .trim()
  .transform((value) => {
    if (!value) return '';
    return /^https?:\/\//i.test(value) ? value : `https://${value}`;
  })
  .refine((value) => !value || /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(value), {
    message: 'Enter a valid URL, for example https://company.com',
  });

const schema = z.object({
  name: z.string().trim().min(1, 'Company name is required').min(2, 'Use at least 2 characters').max(80, 'Use 80 characters or fewer'),
  websiteUrl: optionalUrl,
  logoUrl: optionalUrl,
  description: z.string().trim().max(400, 'Use 400 characters or fewer'),
  isActive: z.boolean(),
});

type FormValues = z.infer<typeof schema>;

const emptyValues: FormValues = {
  name: '',
  websiteUrl: '',
  logoUrl: '',
  description: '',
  isActive: true,
};

const fieldClass = (invalid?: boolean) =>
  `min-h-11 w-full rounded-xl border bg-(--c2c-surface) px-3.5 py-2.5 text-sm text-(--c2c-text) shadow-(--c2c-shadow-sm) outline-none transition placeholder:text-(--c2c-text-subtle) ${
    invalid
      ? 'border-rose-500/80 focus-visible:ring-2 focus-visible:ring-rose-400/30'
      : 'border-(--c2c-border) hover:border-(--c2c-border-strong) focus-visible:border-[#A3E635] focus-visible:ring-2 focus-visible:ring-[#A3E635]/35'
  }`;

interface AddCompanyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddCompanyModal: React.FC<AddCompanyModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const submitLock = useRef(false);
  const nameRef = useRef<HTMLInputElement | null>(null);
  const [logoFailed, setLogoFailed] = useState(false);
  const [formError, setFormError] = useState('');
  const descriptionId = useId();
  const activeId = useId();
  const formErrorId = useId();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: emptyValues,
    mode: 'onTouched',
  });

  const { ref: nameRegisterRef, ...nameField } = register('name');
  const name = watch('name');
  const websiteUrl = watch('websiteUrl');
  const logoUrl = watch('logoUrl');
  const description = watch('description');
  const isActive = watch('isActive');

  useEffect(() => {
    setLogoFailed(false);
  }, [logoUrl]);

  useEffect(() => {
    if (!isOpen) {
      reset(emptyValues);
      setLogoFailed(false);
      setFormError('');
      submitLock.current = false;
      return;
    }
    const timer = window.setTimeout(() => nameRef.current?.focus(), 80);
    return () => window.clearTimeout(timer);
  }, [isOpen, reset]);

  const close = () => {
    if (isSubmitting) return;
    if (isDirty && !window.confirm('Discard this company? Unsaved details will be lost.')) return;
    onClose();
  };

  const onSubmit = handleSubmit(async (values) => {
    if (submitLock.current) return;
    submitLock.current = true;
    setFormError('');
    try {
      const result = await dispatch(
        createCompany({
          id: null,
          name: values.name.trim(),
          websiteUrl: values.websiteUrl.trim() || null,
          logoUrl: values.logoUrl.trim() || null,
          description: values.description.trim() || null,
          isActive: values.isActive,
        })
      ).unwrap();
      toast.success(result.message || `${result.company.name} was added to the directory.`, {
        id: 'create-company',
        duration: 4000,
      });
      reset(emptyValues);
      onClose();
    } catch (error) {
      const message = getCreateCompanyErrorMessage(error);
      setFormError(message);
      toast.error(message, { id: 'create-company', duration: 5000 });
    } finally {
      submitLock.current = false;
    }
  });

  const previewName = name.trim() || 'Company name';
  const previewLogo = Boolean(logoUrl.trim()) && !logoFailed;

  return (
    <Modal isOpen={isOpen} onClose={close} title="Add company" maxWidth="xl">
      <p className="-mt-2 mb-5 text-sm leading-6 text-(--c2c-text-muted)">
        Add a company to the same directory students browse on this page. Required fields are marked.
      </p>

      <form onSubmit={onSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(16rem,0.9fr)]" noValidate>
        <div className="space-y-4">
          {formError && (
            <p id={formErrorId} role="alert" className="rounded-xl border border-rose-500/25 bg-rose-500/10 px-3.5 py-3 text-sm text-rose-300">
              {formError}
            </p>
          )}

          <div className="flex flex-col gap-1.5">
            <label htmlFor="company-name" className="text-sm font-semibold text-(--c2c-text)">
              Company name <span className="text-[#A3E635]">*</span>
            </label>
            <input
              id="company-name"
              type="text"
              autoComplete="organization"
              placeholder="e.g. Freshworks"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'company-name-error' : undefined}
              className={fieldClass(Boolean(errors.name))}
              {...nameField}
              ref={(node) => {
                nameRegisterRef(node);
                nameRef.current = node;
              }}
            />
            {errors.name && (
              <span id="company-name-error" className="text-xs font-medium text-rose-400">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="company-website" className="text-sm font-semibold text-(--c2c-text)">
              Website URL
            </label>
            <input
              id="company-website"
              type="url"
              inputMode="url"
              placeholder="https://company.com"
              aria-invalid={Boolean(errors.websiteUrl)}
              className={fieldClass(Boolean(errors.websiteUrl))}
              {...register('websiteUrl')}
            />
            {errors.websiteUrl ? (
              <span className="text-xs font-medium text-rose-400">{errors.websiteUrl.message}</span>
            ) : (
              <span className="text-xs text-(--c2c-text-subtle)">Optional. Include https:// if you have it.</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="company-logo" className="text-sm font-semibold text-(--c2c-text)">
              Logo URL
            </label>
            <input
              id="company-logo"
              type="url"
              inputMode="url"
              placeholder="https://company.com/logo.svg"
              aria-invalid={Boolean(errors.logoUrl)}
              className={fieldClass(Boolean(errors.logoUrl))}
              {...register('logoUrl')}
            />
            {errors.logoUrl ? (
              <span className="text-xs font-medium text-rose-400">{errors.logoUrl.message}</span>
            ) : (
              <span className="text-xs text-(--c2c-text-subtle)">Optional. Use a public image link for the directory card.</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor={descriptionId} className="text-sm font-semibold text-(--c2c-text)">
              Description
            </label>
            <textarea
              id={descriptionId}
              rows={4}
              maxLength={400}
              placeholder="Short note about this company"
              aria-invalid={Boolean(errors.description)}
              className={`${fieldClass(Boolean(errors.description))} min-h-24`}
              {...register('description')}
            />
            <div className="flex justify-between gap-3">
              {errors.description ? (
                <span className="text-xs font-medium text-rose-400">{errors.description.message}</span>
              ) : (
                <span className="text-xs text-(--c2c-text-subtle)">Optional. Shown as supporting text.</span>
              )}
              <span className="text-xs text-(--c2c-text-subtle)">{description.length}/400</span>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 rounded-xl border border-(--c2c-border) bg-(--c2c-surface-raised)/40 px-4 py-3">
            <div>
              <label htmlFor={activeId} className="text-sm font-semibold text-(--c2c-text)">
                Active in directory
              </label>
              <p className="mt-0.5 text-xs leading-5 text-(--c2c-text-subtle)">
                Turn off to keep the company saved but hidden from most student views.
              </p>
            </div>
            <input
              id={activeId}
              type="checkbox"
              className="h-5 w-5 rounded border-(--c2c-border) accent-[#A3E635]"
              {...register('isActive')}
            />
          </div>
        </div>

        <aside>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-(--c2c-text-subtle)">
            Directory preview
          </p>
          <div className="c2c-card overflow-hidden p-3 sm:p-4">
            <div className="flex aspect-4/3 items-center justify-center rounded-xl border border-(--c2c-border) bg-white p-5">
              {previewLogo ? (
                <img
                  src={logoUrl.trim()}
                  alt=""
                  className="h-full w-full object-contain"
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                <div className="flex flex-col items-center gap-2 text-(--c2c-text-subtle)">
                  <i className={`fa-solid ${logoUrl.trim() ? 'fa-image' : 'fa-building'} text-2xl text-[#A3E635]`} aria-hidden="true" />
                  <span className="text-xs">{logoUrl.trim() ? 'Logo could not be loaded' : 'Logo preview'}</span>
                </div>
              )}
            </div>
            <div className="flex flex-1 flex-col pt-4">
              <h3 className="truncate font-heading text-lg font-bold text-(--c2c-text)">{previewName}</h3>
              <p className="mt-1 line-clamp-2 text-sm text-(--c2c-text-muted)">
                {description.trim() || 'Company description will appear here.'}
              </p>
              <div className="mt-auto flex items-center justify-between gap-2 pt-4 text-xs text-(--c2c-text-muted)">
                <span>{isActive ? 'Visible to students' : 'Hidden from students'}</span>
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#A3E635]/10 text-[#A3E635]">
                  <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                </span>
              </div>
            </div>
          </div>
          {websiteUrl.trim() && (
            <p className="mt-3 truncate text-xs text-(--c2c-text-subtle)">{websiteUrl.trim()}</p>
          )}
        </aside>

        <div className="flex flex-col-reverse gap-2 border-t border-(--c2c-border) pt-5 sm:flex-row sm:justify-end lg:col-span-2">
          <Button type="button" variant="ghost" onClick={close} disabled={isSubmitting}>
            Cancel
          </Button>
          <button
            type="submit"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#A3E635] px-5 text-sm font-bold text-black transition-colors hover:bg-[#BEF264] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A3E635] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <span className="c2c-spinner" aria-hidden="true" />
                <span>Saving company…</span>
              </>
            ) : (
              <>
                Add company
                <i className="fa-solid fa-plus text-[10px]" aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};
