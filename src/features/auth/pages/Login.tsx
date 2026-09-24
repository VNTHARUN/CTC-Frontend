import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loginUser, registerUser, clearAuthError } from '../redux/authSlice';
import { useTheme } from '../../../shared/context/ThemeContext';
import { toAuthFeedback, toastAuthFeedback } from '../utils/authToasts';
import { postLoginPath } from '../utils/authHome';
import { startGoogleOAuth } from '../utils/googleOAuth';
import { authInputClass } from '../utils/authStyles';
import { AuthField as Field } from '../components/AuthField';
import { PasswordStrengthMeter } from '../components/PasswordStrengthMeter';
import { PasswordResetCard } from '../components/PasswordResetCard';
import { AUTH_OVERLAY_Z_CLASS } from '../../../shared/components/ui/AppToaster';
import { useScrollLock } from '../../../shared/hooks/useScrollLock';

// ─── Schemas ──────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z.string().min(1, 'Password is required').min(6, 'At least 6 characters required'),
});
type LoginFormData = z.infer<typeof loginSchema>;

const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, 'First name is required')
    .min(2, 'At least 2 characters')
    .max(50)
    .regex(/^[a-zA-Z\s'-]+$/, 'Letters only'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .min(2, 'At least 2 characters')
    .max(50)
    .regex(/^[a-zA-Z\s'-]+$/, 'Letters only'),
  userName: z
    .string()
    .min(1, 'Username is required')
    .min(3, 'At least 3 characters')
    .max(30, 'Max 30 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Letters, numbers and underscores only')
    .regex(/^[a-zA-Z]/, 'Must start with a letter'),
  email: z.string().min(1, 'Email is required').email('Enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'At least 8 characters')
    .regex(/[A-Z]/, 'Add an uppercase letter')
    .regex(/[a-z]/, 'Add a lowercase letter')
    .regex(/[0-9]/, 'Add a number')
    .regex(/[@$!%*?&#^()_\-+=]/, 'Add a special character'),
});
type SignupFormData = z.infer<typeof signupSchema>;

// ─── Props ────────────────────────────────────────────────────────────────────

interface AuthPageProps {
  defaultMode?: 'login' | 'signup';
  onCloseModal?: () => void;
}

// ─── Component ────────────────────────────────────────────────────────────────

export const Login: React.FC<AuthPageProps> = ({ defaultMode, onCloseModal }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useTheme();

  const { loading, authModalMode } = useAppSelector((s) => s.auth);

  const initialMode =
    defaultMode || authModalMode || (location.pathname === '/signup' ? 'signup' : 'login');

  const [mode, setMode] = useState<'login' | 'signup' | 'forgot'>(initialMode);
  const [showLoginPwd, setShowLoginPwd] = useState(false);
  const [showSignupPwd, setShowSignupPwd] = useState(false);

  useEffect(() => { if (authModalMode) setMode(authModalMode); }, [authModalMode]);
  useEffect(() => { dispatch(clearAuthError()); }, [mode, dispatch]);
  useScrollLock(true);

  // ── Forms ─────────────────────────────────────────────────────────────────
  const {
    register: rL,
    handleSubmit: hL,
    formState: { errors: eL },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const {
    register: rS,
    handleSubmit: hS,
    watch,
    formState: { errors: eS, isSubmitted: sSubmitted },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const livePwd = watch('password') ?? '';

  // ── Helpers ───────────────────────────────────────────────────────────────
  const close = () => {
    if (onCloseModal) return onCloseModal();
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const postAuthNav = (role?: string) => {
    const from = (location.state as { from?: { pathname?: string } } | null)?.from?.pathname;
    navigate(postLoginPath(role, from), { replace: true });
  };

  const inputBase = (err: boolean) => authInputClass(theme, err);

  // ── Submits ───────────────────────────────────────────────────────────────
  const onLogin = async (data: LoginFormData) => {
    const res = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(res)) {
      toastAuthFeedback({ message: res.payload.message, errors: null }, 'success');
      if (onCloseModal) onCloseModal();
      postAuthNav(res.payload.user.role);
    } else {
      toastAuthFeedback(toAuthFeedback(res.payload), 'error');
    }
  };

  const onSignup = async (data: SignupFormData) => {
    const res = await dispatch(
      registerUser({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        labelUserName: data.userName.trim(),
        email: data.email.trim(),
        password: data.password,
      })
    );
    if (registerUser.fulfilled.match(res)) {
      toastAuthFeedback({ message: res.payload.message, errors: null }, 'success');
      setMode('login');
    } else {
      toastAuthFeedback(toAuthFeedback(res.payload), 'error');
    }
  };

  // How many signup fields have errors (for compact banner count)
  const errorCount = Object.keys(eS).length;

  return (
    <div className={`auth-overlay fixed inset-0 ${AUTH_OVERLAY_Z_CLASS} flex items-center justify-center p-4 overflow-y-auto font-sans animate-fade-in ${theme === 'dark' ? 'auth-overlay-dark' : 'auth-overlay-light'}`}>
      <div className={`auth-card relative w-full max-w-120 my-auto overflow-hidden transform transition-all duration-500 animate-slide-up ${theme === 'dark' ? 'auth-card-dark' : 'auth-card-light'}`}>

        {/* Top accent line with shimmer animation */}
        <div className="h-0.75 w-full bg-linear-to-r from-transparent via-[#A3E635] to-transparent animate-shimmer bg-size-[200%_100%]" />

        <div className="p-8 sm:p-10 relative">
          <div className="auth-card-wash pointer-events-none" aria-hidden="true" />

          {/* Close Button */}
          <button
            type="button"
            onClick={close}
            className={`absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 cursor-pointer z-20 hover-scale ${
              theme === 'dark'
                ? 'text-gray-400 hover:text-white bg-white/5 hover:bg-white/15 hover:shadow-lg'
                : 'text-gray-500 hover:text-gray-700 bg-gray-100 hover:bg-gray-200 hover:shadow-md'
            }`}
            aria-label="Close"
          >
            <i className="fa-solid fa-xmark text-base" />
          </button>

          {/* ============================================================ */}
          {/* LOGIN                                                          */}
          {/* ============================================================ */}
          {mode === 'forgot' ? (
            <PasswordResetCard theme={theme} onBackToLogin={() => setMode('login')} />
          ) : mode === 'login' ? (
            <div className="flex flex-col gap-7 relative z-10">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className={`text-3xl font-bold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Welcome back ✨</h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-[#A3E635] hover:text-[#b5f037] underline underline-offset-2 font-semibold cursor-pointer transition-colors"
                  >
                    Sign up free
                  </button>
                </p>
              </div>

              {/* Google OAuth with shimmer effect */}
              <button
                type="button"
                onClick={startGoogleOAuth}
                className={`w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-[0.98] hover-scale relative overflow-hidden group ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/15 hover:border-white/30 hover:bg-white/10 text-white hover:shadow-xl'
                    : 'bg-gray-50 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700 hover:shadow-lg'
                }`}
              >
                <i className="fa-brands fa-google text-[#EA4335] text-base group-hover:scale-110 transition-transform" />
                <span>Continue with Google</span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className={`flex-1 h-px ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                }`} />
                <span className={`text-xs uppercase tracking-widest font-bold ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                }`}>or</span>
                <div className={`flex-1 h-px ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                }`} />
              </div>

              {/* Form */}
              <form onSubmit={hL(onLogin)} className="flex flex-col gap-4" noValidate>
                <Field label="Email Address" error={eL.email?.message} theme={theme}>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!eL.email}
                    className={inputBase(!!eL.email)}
                    {...rL('email')}
                  />
                </Field>

                <Field label="Password" error={eL.password?.message} theme={theme}>
                  <div className="relative">
                    <input
                      type={showLoginPwd ? 'text' : 'password'}
                      placeholder="Your password"
                      autoComplete="current-password"
                      aria-invalid={!!eL.password}
                      className={`${inputBase(!!eL.password)} pr-12`}
                      {...rL('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPwd((v) => !v)}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                        theme === 'dark'
                          ? 'text-gray-500 hover:text-gray-300'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      aria-label={showLoginPwd ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-solid ${showLoginPwd ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                    </button>
                  </div>
                </Field>

                <div className="flex justify-end -mt-2">
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className={`text-xs hover:text-[#A3E635] transition-colors font-semibold cursor-pointer ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    Forgot password?
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 bg-[#A3E635] hover:bg-[#b5f037] text-black font-bold text-base rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgba(163,230,53,0.25)] hover:shadow-[0_12px_40px_rgba(163,230,53,0.35)] relative overflow-hidden group"
                >
                  {loading
                    ? <><i className="fa-solid fa-spinner animate-spin text-sm" /><span>Signing in…</span></>
                    : <><span>Sign In</span><i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" /></>
                  }
                </button>
              </form>

              <p className={`text-center text-xs ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
              }`}>
                By signing in you agree to our{' '}
                <a href="#" className={`underline font-semibold ${
                  theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}>Privacy Policy</a>
              </p>
            </div>

          ) : (
            /* ============================================================ */
            /* SIGNUP                                                         */
            /* ============================================================ */
            <div className="flex flex-col gap-6 relative z-10">
              {/* Header */}
              <div className="flex flex-col gap-2">
                <h1 className={`text-3xl font-bold tracking-tight ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>Create account 🚀</h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Already have one?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-[#A3E635] hover:text-[#b5f037] underline underline-offset-2 font-semibold cursor-pointer transition-colors"
                  >
                    Sign in
                  </button>
                </p>
              </div>

              {/* Google OAuth */}
              <button
                type="button"
                onClick={startGoogleOAuth}
                className={`w-full flex items-center justify-center gap-3 py-3.5 px-4 rounded-xl border-2 font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-[0.98] hover-scale relative overflow-hidden group ${
                  theme === 'dark'
                    ? 'bg-white/5 border-white/15 hover:border-white/30 hover:bg-white/10 text-white hover:shadow-xl'
                    : 'bg-gray-50 border-gray-300 hover:border-gray-400 hover:bg-gray-100 text-gray-700 hover:shadow-lg'
                }`}
              >
                <i className="fa-brands fa-google text-[#EA4335] text-base group-hover:scale-110 transition-transform" />
                <span>Continue with Google</span>
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              </button>

              {/* Divider */}
              <div className="flex items-center gap-4">
                <div className={`flex-1 h-px ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                }`} />
                <span className={`text-xs uppercase tracking-widest font-bold ${
                  theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                }`}>or</span>
                <div className={`flex-1 h-px ${
                  theme === 'dark' ? 'bg-white/10' : 'bg-gray-300'
                }`} />
              </div>

              {/* Compact error count banner */}
              {sSubmitted && errorCount > 0 && (
                <div role="alert" className={`flex items-center gap-2.5 px-4 py-3 rounded-xl border-2 text-sm animate-fade-in ${
                  theme === 'dark'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-400'
                    : 'bg-rose-50 border-rose-300 text-rose-600'
                }`}>
                  <i className="fa-solid fa-triangle-exclamation shrink-0" />
                  <span className="font-semibold">
                    {errorCount === 1
                      ? '1 field needs your attention'
                      : `${errorCount} fields need your attention`}
                  </span>
                </div>
              )}

              {/* Form */}
              <form onSubmit={hS(onSignup)} className="flex flex-col gap-4" noValidate>

                {/* First + Last name */}
                <div className="grid grid-cols-2 gap-3.5">
                  <Field label="First Name" error={eS.firstName?.message} theme={theme}>
                    <input
                      type="text"
                      placeholder="First name"
                      autoComplete="given-name"
                      aria-invalid={!!eS.firstName}
                      className={inputBase(!!eS.firstName)}
                      {...rS('firstName')}
                    />
                  </Field>
                  <Field label="Last Name" error={eS.lastName?.message} theme={theme}>
                    <input
                      type="text"
                      placeholder="Last name"
                      autoComplete="family-name"
                      aria-invalid={!!eS.lastName}
                      className={inputBase(!!eS.lastName)}
                      {...rS('lastName')}
                    />
                  </Field>
                </div>

                {/* Username */}
                <Field label="Username" error={eS.userName?.message} theme={theme}>
                  <div className="relative">
                    <span className={`absolute left-4 top-1/2 -translate-y-1/2 text-sm font-mono select-none pointer-events-none ${
                      theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                    }`}>
                      @
                    </span>
                    <input
                      type="text"
                      placeholder="username"
                      autoComplete="username"
                      aria-invalid={!!eS.userName}
                      className={`${inputBase(!!eS.userName)} pl-9`}
                      {...rS('userName')}
                    />
                  </div>
                </Field>

                {/* Email */}
                <Field label="Email Address" error={eS.email?.message} theme={theme}>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    aria-invalid={!!eS.email}
                    className={inputBase(!!eS.email)}
                    {...rS('email')}
                  />
                </Field>

                {/* Password + strength meter */}
                <Field label="Password" error={eS.password?.message} theme={theme}>
                  <div className="relative">
                    <input
                      type={showSignupPwd ? 'text' : 'password'}
                      placeholder="Create a strong password"
                      autoComplete="new-password"
                      aria-invalid={!!eS.password}
                      className={`${inputBase(!!eS.password)} pr-12`}
                      {...rS('password')}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSignupPwd((v) => !v)}
                      className={`absolute right-4 top-1/2 -translate-y-1/2 transition-colors cursor-pointer ${
                        theme === 'dark'
                          ? 'text-gray-500 hover:text-gray-300'
                          : 'text-gray-400 hover:text-gray-600'
                      }`}
                      aria-label={showSignupPwd ? 'Hide password' : 'Show password'}
                    >
                      <i className={`fa-solid ${showSignupPwd ? 'fa-eye-slash' : 'fa-eye'} text-sm`} />
                    </button>
                  </div>

                  <PasswordStrengthMeter password={livePwd} theme={theme} />
                </Field>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 mt-2 bg-[#A3E635] hover:bg-[#b5f037] text-black font-bold text-base rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-center gap-2.5 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_8px_30px_rgba(163,230,53,0.25)] hover:shadow-[0_12px_40px_rgba(163,230,53,0.35)] relative overflow-hidden group"
                >
                  {loading
                    ? <><i className="fa-solid fa-spinner animate-spin text-sm" /><span>Creating account…</span></>
                    : <><span>Create Account</span><i className="fa-solid fa-arrow-right text-sm group-hover:translate-x-1 transition-transform" /></>
                  }
                </button>
              </form>

              <p className={`text-center text-xs ${
                theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
              }`}>
                By creating an account you agree to our{' '}
                <a href="#" className={`underline font-semibold ${
                  theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}>Privacy Policy</a>
                {' '}&{' '}
                <a href="#" className={`underline font-semibold ${
                  theme === 'dark' ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-800'
                }`}>Terms of Service</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
