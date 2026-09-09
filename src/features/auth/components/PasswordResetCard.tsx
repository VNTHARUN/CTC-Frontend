import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { authService } from '../../../services/authService';
import { toAuthFeedback, toastAuthFeedback } from '../utils/authToasts';
import {
  authInputClass,
  authInputIconButtonClass,
  authPrimaryButtonClass,
  type AuthTheme,
} from '../utils/authStyles';
import { AuthField } from './AuthField';
import { OtpInput } from './OtpInput';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';

// ─── Schemas ──────────────────────────────────────────────────────────────────

const requestSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
});
type RequestFormData = z.infer<typeof requestSchema>;

const verifySchema = z
  .object({
    otp: z
      .string()
      .min(1, 'OTP is required')
      .regex(/^\d{6}$/, 'Enter the 6-digit OTP from your email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'At least 8 characters')
      .regex(/[A-Z]/, 'Add an uppercase letter')
      .regex(/[a-z]/, 'Add a lowercase letter')
      .regex(/[0-9]/, 'Add a number')
      .regex(/[@$!%*?&#^()_\-+=]/, 'Add a special character'),
    confirmPassword: z.string().min(1, 'Please re-enter your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
type VerifyFormData = z.infer<typeof verifySchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface PasswordResetCardProps {
  theme: AuthTheme;
  /** Returns the user to the sign-in form. */
  onBackToLogin: () => void;
  defaultEmail?: string;
}

const RESEND_COOLDOWN_SECONDS = 45;

// ─── Component ────────────────────────────────────────────────────────────────

export const PasswordResetCard: React.FC<PasswordResetCardProps> = ({
  theme,
  onBackToLogin,
  defaultEmail = '',
}) => {
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [email, setEmail] = useState(defaultEmail);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirmPwd, setShowConfirmPwd] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  const mutedText = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const headingText = theme === 'dark' ? 'text-white' : 'text-gray-900';

  // ── Resend cooldown ticker ────────────────────────────────────────────────
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // ── Forms ─────────────────────────────────────────────────────────────────
  const {
    register: rReq,
    handleSubmit: hReq,
    formState: { errors: eReq },
  } = useForm<RequestFormData>({
    resolver: zodResolver(requestSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { email: defaultEmail },
  });

  const {
    register: rVer,
    handleSubmit: hVer,
    control,
    watch,
    reset: resetVerify,
    formState: { errors: eVer },
  } = useForm<VerifyFormData>({
    resolver: zodResolver(verifySchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
    defaultValues: { otp: '', password: '', confirmPassword: '' },
  });

  const livePwd = watch('password') ?? '';

  // ── Step 1: request the OTP ───────────────────────────────────────────────
  const sendOtp = async (targetEmail: string) => {
    setSending(true);
    try {
      const res = await authService.generatePasswordResetOtp(targetEmail);
      toastAuthFeedback({ message: res.message, errors: null }, 'success');
      setEmail(targetEmail);
      setStep('verify');
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } catch (err: unknown) {
      toastAuthFeedback(toAuthFeedback(err), 'error');
    } finally {
      setSending(false);
    }
  };

  const onRequest = (data: RequestFormData) => sendOtp(data.email.trim());

  const onResend = () => {
    if (cooldown > 0 || sending) return;
    resetVerify({ otp: '', password: '', confirmPassword: '' });
    void sendOtp(email);
  };

  // ── Step 2: verify the OTP and set the new password ───────────────────────
  const onVerify = async (data: VerifyFormData) => {
    setVerifying(true);
    try {
      const res = await authService.verifyPasswordResetOtp({
        email,
        otp: data.otp,
        password: data.password,
      });
      toastAuthFeedback({ message: res.message, errors: null }, 'success');
      onBackToLogin();
    } catch (err: unknown) {
      toastAuthFeedback(toAuthFeedback(err), 'error');
    } finally {
      setVerifying(false);
    }
  };

  // ── Shared header ─────────────────────────────────────────────────────────
  const stepBadge = (
    <div className="flex items-center gap-2">
      {(['request', 'verify'] as const).map((s, index) => {
        const isActive = step === s;
        const isDone = step === 'verify' && s === 'request';
        return (
          <React.Fragment key={s}>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold transition-all duration-300 ${
                isDone
                  ? 'bg-[#A3E635] text-black'
                  : isActive
                    ? 'bg-[#A3E635]/20 text-[#A3E635] ring-2 ring-[#A3E635]/40'
                    : theme === 'dark'
                      ? 'bg-white/5 text-gray-500'
                      : 'bg-gray-100 text-gray-400'
              }`}
            >
              {isDone ? <i className="fa-solid fa-check text-[9px]" /> : index + 1}
            </span>
            {index === 0 && (
              <span
                className={`h-px w-8 ${
                  step === 'verify'
                    ? 'bg-[#A3E635]/60'
                    : theme === 'dark'
                      ? 'bg-white/10'
                      : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );

  return (
    <div className="flex flex-col gap-6 relative z-10">
      {/* Header */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#A3E635]/10 ring-1 ring-[#A3E635]/25">
            <i className={`fa-solid ${step === 'request' ? 'fa-key' : 'fa-shield-halved'} text-[#A3E635] text-lg`} />
          </div>
          {stepBadge}
        </div>

        <div className="flex flex-col gap-2">
          <h1 className={`text-3xl font-bold tracking-tight ${headingText}`}>
            {step === 'request' ? 'Forgot password?' : 'Verify & reset'}
          </h1>
          <p className={`text-sm ${mutedText}`}>
            {step === 'request' ? (
              <>Enter your registered email and we&apos;ll send you a 6-digit OTP.</>
            ) : (
              <>
                We sent a 6-digit OTP to{' '}
                <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {email}
                </span>
                . It expires shortly, so enter it soon.
              </>
            )}
          </p>
        </div>
      </div>

      {/* ── Step 1 ── */}
      {step === 'request' ? (
        <form onSubmit={hReq(onRequest)} className="flex flex-col gap-4" noValidate>
          <AuthField label="Email Address" error={eReq.email?.message} theme={theme}>
            <div className="relative">
              <input
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                autoFocus
                aria-invalid={!!eReq.email}
                className={`${authInputClass(theme, !!eReq.email)} pl-11`}
                {...rReq('email')}
              />
              <i
                className={`fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-sm pointer-events-none ${
                  theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                }`}
              />
            </div>
          </AuthField>

          <button type="submit" disabled={sending} className={authPrimaryButtonClass}>
            {sending ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-sm" />
                <span>Sending OTP…</span>
              </>
            ) : (
              <>
                <span>Send OTP</span>
                <i className="fa-solid fa-paper-plane text-sm group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      ) : (
        /* ── Step 2 ── */
        <form onSubmit={hVer(onVerify)} className="flex flex-col gap-4" noValidate>
          <AuthField
            label="Verification Code"
            error={eVer.otp?.message}
            theme={theme}
            hint="Paste or type the 6-digit code from your email."
          >
            <Controller
              control={control}
              name="otp"
              render={({ field }) => (
                <OtpInput
                  value={field.value}
                  onChange={field.onChange}
                  theme={theme}
                  hasError={!!eVer.otp}
                  disabled={verifying}
                />
              )}
            />
          </AuthField>

          <AuthField label="New Password" error={eVer.password?.message} theme={theme}>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'}
                placeholder="Create a strong password"
                autoComplete="new-password"
                aria-invalid={!!eVer.password}
                className={`${authInputClass(theme, !!eVer.password)} pr-12`}
                {...rVer('password')}
              />
              <button
                type="button"
                onClick={() => setShowPwd((v) => !v)}
                className={authInputIconButtonClass(theme)}
                aria-label={showPwd ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-solid ${showPwd ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
              </button>
            </div>
            <PasswordStrengthMeter password={livePwd} theme={theme} />
          </AuthField>

          <AuthField label="Confirm New Password" error={eVer.confirmPassword?.message} theme={theme}>
            <div className="relative">
              <input
                type={showConfirmPwd ? 'text' : 'password'}
                placeholder="Re-enter your new password"
                autoComplete="new-password"
                aria-invalid={!!eVer.confirmPassword}
                className={`${authInputClass(theme, !!eVer.confirmPassword)} pr-12`}
                {...rVer('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPwd((v) => !v)}
                className={authInputIconButtonClass(theme)}
                aria-label={showConfirmPwd ? 'Hide password' : 'Show password'}
              >
                <i className={`fa-solid ${showConfirmPwd ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
              </button>
            </div>
          </AuthField>

          <button type="submit" disabled={verifying} className={authPrimaryButtonClass}>
            {verifying ? (
              <>
                <i className="fa-solid fa-spinner animate-spin text-sm" />
                <span>Resetting password…</span>
              </>
            ) : (
              <>
                <span>Reset Password</span>
                <i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          {/* Resend / change email */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              type="button"
              onClick={() => setStep('request')}
              className={`text-xs font-semibold transition-colors cursor-pointer hover:text-[#A3E635] ${mutedText}`}
            >
              <i className="fa-solid fa-pen text-[10px] mr-1.5" />
              Change email
            </button>

            <button
              type="button"
              onClick={onResend}
              disabled={cooldown > 0 || sending}
              className={`text-xs font-semibold transition-colors ${
                cooldown > 0 || sending
                  ? `${mutedText} opacity-60 cursor-not-allowed`
                  : 'text-[#A3E635] hover:text-[#b5f037] cursor-pointer'
              }`}
            >
              {sending ? (
                <>
                  <i className="fa-solid fa-spinner animate-spin text-[10px] mr-1.5" />
                  Sending…
                </>
              ) : cooldown > 0 ? (
                `Resend OTP in ${cooldown}s`
              ) : (
                <>
                  <i className="fa-solid fa-rotate-right text-[10px] mr-1.5" />
                  Resend OTP
                </>
              )}
            </button>
          </div>
        </form>
      )}

      {/* Back to sign in */}
      <div className={`flex items-center gap-4`}>
        <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'}`} />
        <span className={`text-xs uppercase tracking-widest font-bold ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
          or
        </span>
        <div className={`flex-1 h-px ${theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'}`} />
      </div>

      <button
        type="button"
        onClick={onBackToLogin}
        className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-[0.98] ${
          theme === 'dark'
            ? 'bg-white/5 border-white/15 hover:border-white/30 hover:bg-white/10 text-white'
            : 'bg-gray-50 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700'
        }`}
      >
        <i className="fa-solid fa-arrow-left text-xs" />
        <span>Back to Sign In</span>
      </button>
    </div>
  );
};
