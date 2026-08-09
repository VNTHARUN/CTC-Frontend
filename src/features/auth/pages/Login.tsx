import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { loginUser, registerUser } from '../redux/authSlice';
import { toast } from 'react-hot-toast';

// Comprehensive GFG Colleges & Universities Database
const GFG_COMPREHENSIVE_COLLEGES = [
  'Indian Institute of Technology (IIT) Bombay',
  'Indian Institute of Technology (IIT) Delhi',
  'Indian Institute of Technology (IIT) Madras',
  'Indian Institute of Technology (IIT) Kharagpur',
  'Indian Institute of Technology (IIT) Kanpur',
  'Indian Institute of Technology (IIT) Roorkee',
  'Indian Institute of Technology (IIT) Guwahati',
  'Indian Institute of Technology (IIT) Hyderabad',
  'Indian Institute of Technology (IIT BHU) Varanasi',
  'Indian Institute of Technology (IIT) Indore',
  'Indian Institute of Technology (IIT) Ropar',
  'Indian Institute of Technology (IIT) Mandi',
  'Indian Institute of Technology (IIT) Gandhinagar',
  'Indian Institute of Technology (IIT) Jodhpur',
  'Indian Institute of Technology (IIT) Patna',
  'Indian Institute of Technology (IIT) Bhubaneswar',
  'Indian Institute of Technology (IIT) Tirupati',
  'Indian Institute of Technology (IIT) Palakkad',
  'Indian Institute of Technology (IIT) Goa',
  'Indian Institute of Technology (IIT) Jammu',
  'Indian Institute of Technology (IIT) Dharwad',
  'Indian Institute of Technology (IIT) Bhilai',
  'National Institute of Technology (NIT) Trichy',
  'National Institute of Technology (NIT) Surathkal',
  'National Institute of Technology (NIT) Warangal',
  'National Institute of Technology (NIT) Rourkela',
  'National Institute of Technology (NIT) Calicut',
  'National Institute of Technology (NIT) Jaipur',
  'National Institute of Technology (NIT) Allahabad',
  'National Institute of Technology (NIT) Kurukshetra',
  'National Institute of Technology (NIT) Silchar',
  'National Institute of Technology (NIT) Durgapur',
  'National Institute of Technology (NIT) Jalandhar',
  'International Institute of Information Technology (IIIT) Hyderabad',
  'International Institute of Information Technology (IIIT) Bangalore',
  'Indian Institute of Information Technology (IIIT) Allahabad',
  'Indian Institute of Information Technology (IIIT) Delhi',
  'Indian Institute of Information Technology (IIIT) Lucknow',
  'BITS Pilani (Birla Institute of Technology and Science)',
  'BITS Pilani, Goa Campus',
  'BITS Pilani, Hyderabad Campus',
  'VIT Vellore (Vellore Institute of Technology)',
  'VIT Chennai Campus',
  'SRM Institute of Science and Technology, Kattankulathur',
  'Manipal Institute of Technology, Manipal',
  'Delhi Technological University (DTU), Delhi',
  'Netaji Subhas University of Technology (NSUT), Delhi',
  'Anna University, Guindy, Chennai',
  'College of Engineering Guindy (CEG), Chennai',
  'Jadavpur University, Kolkata',
  'Thapar Institute of Engineering and Technology, Patiala',
  'PSG College of Technology, Coimbatore',
  'MS Ramaiah Institute of Technology, Bengaluru',
  'RV College of Engineering (RVCE), Bengaluru',
  'BMS College of Engineering, Bengaluru',
  'PES University, Bengaluru',
  'Amity University, Noida',
  'Chandigarh University, Mohali',
  'Lovely Professional University (LPU), Phagwara',
  'Parul University, Vadodara',
  'Chitkara University, Punjab',
  'Kalinga Institute of Industrial Technology (KIIT), Bhubaneswar',
  'University of Mumbai, Mumbai',
  'Visvesvaraya Technological University (VTU), Belagavi',
  'Savitribai Phule Pune University, Pune',
  'Osmania University, Hyderabad',
  'Jawaharlal Nehru Technological University (JNTU), Hyderabad',
  'JNTU Kakinada',
  'Andhra University, Visakhapatnam',
  'Gujarat Technological University (GTU), Ahmedabad',
  'Dr. A.P.J. Abdul Kalam Technical University (AKTU), Lucknow',
  'West Bengal University of Technology (MAKAUT), Kolkata',
  'Cochin University of Science and Technology (CUSAT), Kochi',
  'APJ Abdul Kalam Technological University (KTU), Kerala',
  'IK Gujral Punjab Technical University (PTU), Jalandhar',
  'Other Institution / Working Professional',
];

// Login Validation Schema
const loginSchema = z.object({
  email: z.string().min(3, 'Username or Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});
type LoginFormData = z.infer<typeof loginSchema>;

// Signup Validation Schema
const signupSchema = z.object({
  email: z.string().min(3, 'Username or Email is required'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  institution: z.string().min(2, 'Please select or enter your Institution / Organization'),
});
type SignupFormData = z.infer<typeof signupSchema>;

interface AuthPageProps {
  defaultMode?: 'login' | 'signup';
  onCloseModal?: () => void;
}

export const Login: React.FC<AuthPageProps> = ({ defaultMode, onCloseModal }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, authModalMode } = useAppSelector((state) => state.auth);

  const initialMode = defaultMode || authModalMode || (location.pathname === '/signup' ? 'signup' : 'login');
  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  useEffect(() => {
    if (authModalMode) {
      setMode(authModalMode);
    }
  }, [authModalMode]);

  // Institution Autocomplete State
  const [institutionQuery, setInstitutionQuery] = useState<string>('');
  const [institutionOptions, setInstitutionOptions] = useState<string[]>([]);
  const [isLoadingInstitutions, setIsLoadingInstitutions] = useState<boolean>(false);
  const [isInstitutionDropdownOpen, setIsInstitutionDropdownOpen] = useState<boolean>(false);
  const institutionRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (institutionRef.current && !institutionRef.current.contains(event.target as Node)) {
        setIsInstitutionDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter GFG Institution Data strictly based on user's input value
  useEffect(() => {
    const query = institutionQuery.trim();
    if (!query) {
      setInstitutionOptions([]);
      setIsInstitutionDropdownOpen(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoadingInstitutions(true);
      const matched = GFG_COMPREHENSIVE_COLLEGES.filter((c) =>
        c.toLowerCase().includes(query.toLowerCase())
      );
      setInstitutionOptions(matched);
      setIsLoadingInstitutions(false);
      setIsInstitutionDropdownOpen(true);
    }, 80);

    return () => clearTimeout(timer);
  }, [institutionQuery]);

  // Login Form
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: loginErrors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: 'alex.dev@Connect 2 Code.io',
      password: 'Password123!',
    },
  });

  // Signup Form
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    setValue: setSignupValue,
    formState: { errors: signupErrors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const handleClose = () => {
    if (onCloseModal) {
      onCloseModal();
    } else if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const onLoginSubmit = async (data: LoginFormData) => {
    const result = await dispatch(loginUser(data));
    if (loginUser.fulfilled.match(result)) {
      toast.success('Welcome back to Connect 2 Code!');
      handleClose();
      const fromPath = (location.state as any)?.from?.pathname;
      if (location.pathname === '/login' || location.pathname === '/signup') {
        if (fromPath && fromPath !== '/login' && fromPath !== '/signup') {
          navigate(fromPath);
        } else {
          navigate('/');
        }
      }
    } else {
      toast.error((result.payload as string) || 'Authentication failed');
    }
  };

  const onSignupSubmit = async (data: SignupFormData) => {
    const result = await dispatch(registerUser({
      fullName: data.email.split('@')[0] || 'User',
      email: data.email.includes('@') ? data.email : `${data.email}@Connect 2 Code.io`,
      password: data.password,
      institution: data.institution,
    }));
    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created successfully!');
      handleClose();
      const fromPath = (location.state as any)?.from?.pathname;
      if (location.pathname === '/login' || location.pathname === '/signup') {
        if (fromPath && fromPath !== '/login' && fromPath !== '/signup') {
          navigate(fromPath);
        } else {
          navigate('/');
        }
      }
    } else {
      toast.error((result.payload as string) || 'Registration failed');
    }
  };

  const handleOAuthLogin = (provider: string) => {
    toast.success(`Redirecting to ${provider} OAuth...`);
    dispatch(
      loginUser({
        email: `alex.${provider.toLowerCase()}@Connect 2 Code.io`,
        password: 'OAuthPassword123!',
      })
    ).then((res) => {
      if (loginUser.fulfilled.match(res)) {
        handleClose();
        const fromPath = (location.state as any)?.from?.pathname;
      if (location.pathname === '/login' || location.pathname === '/signup') {
        if (fromPath && fromPath !== '/login' && fromPath !== '/signup') {
          navigate(fromPath);
        } else {
          navigate('/');
        }
      }
      }
    });
  };

  const handleSelectInstitution = (inst: string) => {
    setInstitutionQuery(inst);
    setSignupValue('institution', inst, { shouldValidate: true });
    setIsInstitutionDropdownOpen(false);
  };

  return (
    /* Floating Overlay Modal Backdrop - Matching GFG Floating Container Design */
    <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in font-sans">
      
      {/* Floating Card Container */}
      <div className="relative w-full max-w-md w-full bg-[#121316] border border-white/15 rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.95)] p-5 sm:p-8 text-white my-auto max-h-[90vh] overflow-y-auto animate-scale-up">
        
        {/* Floating Modal Close Button (X) */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center transition-colors cursor-pointer z-10"
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark text-sm"></i>
        </button>

        {/* ======================================================== */}
        {/* MODE 1: LOG IN (Matching GFG Login Modal Structure) */}
        {/* ======================================================== */}
        {mode === 'login' ? (
          <div className="flex flex-col gap-5">
            {/* Modal Title & Subtitle */}
            <div className="flex flex-col gap-1 pr-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Log in
              </h1>
              <p className="text-xs text-gray-400 font-sans">
                New user ?{' '}
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className="text-[#A3E635] hover:underline font-bold cursor-pointer"
                >
                  Register Now
                </button>
              </p>
            </div>

            {/* Social Sign-In Area (Top of Login Modal) */}
            <div className="flex flex-col gap-3">
              {/* Main Google Button */}
              <button
                type="button"
                onClick={() => handleOAuthLogin('Google')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#090A0C] border border-white/15 hover:border-[#A3E635]/50 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer hover:bg-white/5 active:scale-[0.99] shadow-sm"
              >
                <i className="fa-brands fa-google text-rose-500 text-base"></i>
                <span>Continue with Google</span>
              </button>

              {/* Social Circle Buttons: Facebook, Twitter, GitHub, LinkedIn */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('Facebook')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-blue-500 hover:scale-110 transition-all cursor-pointer"
                  title="Sign in with Facebook"
                >
                  <i className="fa-brands fa-facebook-f text-sm"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('Twitter')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-sky-400 hover:scale-110 transition-all cursor-pointer"
                  title="Sign in with Twitter"
                >
                  <i className="fa-brands fa-x-twitter text-sm"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('GitHub')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer"
                  title="Sign in with GitHub"
                >
                  <i className="fa-brands fa-github text-sm"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('LinkedIn')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-blue-400 hover:scale-110 transition-all cursor-pointer"
                  title="Sign in with LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in text-sm"></i>
                </button>
              </div>

              {/* Social Divider */}
              <div className="relative flex items-center justify-center my-2">
                <div className="w-full border-t border-white/10"></div>
                <span className="absolute bg-[#121316] px-4 text-xs font-medium text-gray-400">
                  or
                </span>
              </div>
            </div>

            {/* Form Content Area */}
            <form onSubmit={handleSubmitLogin(onLoginSubmit)} className="flex flex-col gap-4">
              {/* Demo Credentials Hint */}
              <div className="p-3 bg-[#A3E635]/10 border border-[#A3E635]/30 rounded-xl text-xs flex items-center justify-between text-gray-300">
                <div className="flex items-center gap-2">
                  <i className="fa-solid fa-key text-[#A3E635]"></i>
                  <span>Demo: <strong className="text-white font-mono">alex.dev@Connect 2 Code.io</strong></span>
                </div>
                <span className="text-[10px] font-mono bg-[#A3E635] text-black font-bold px-2 py-0.5 rounded">Pre-filled</span>
              </div>

              {/* Field 1: Username or Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-200">
                  Username or Email
                </label>
                <input
                  type="text"
                  placeholder="Username or Email"
                  className="w-full bg-[#090A0C] border border-white/15 focus:border-[#A3E635] text-sm text-white placeholder-gray-500 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                  {...registerLogin('email')}
                />
                {loginErrors.email && (
                  <span className="text-xs text-rose-400 font-sans">{loginErrors.email.message}</span>
                )}
              </div>

              {/* Field 2: Password with eye toggle */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    maxLength={25}
                    className="w-full bg-[#090A0C] border border-white/15 focus:border-[#A3E635] text-sm text-white placeholder-gray-500 px-3.5 py-2.5 pr-10 rounded-lg outline-none transition-all"
                    {...registerLogin('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {loginErrors.password && (
                  <span className="text-xs text-rose-400 font-sans">{loginErrors.password.message}</span>
                )}
              </div>

              {/* Forgot Password Link */}
              <div className="flex justify-start">
                <Link to="/forgot-password" className="text-xs text-gray-400 hover:text-[#A3E635] transition-colors">
                  Forgot password
                </Link>
              </div>

              {error && <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg">{error}</div>}

              {/* Submit Button (Electric Lime Theme matching color palette) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 mt-2 bg-[#A3E635] hover:bg-[#84CC16] text-black font-extrabold text-base rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#A3E635]/20 active:scale-[0.99] disabled:opacity-50 font-sans"
              >
                <span>Sign In</span>
              </button>
            </form>

            {/* Privacy & Cookie Policy Footer */}
            <div className="pt-3 border-t border-white/10 text-center text-xs text-gray-400">
              By creating this account, you agree to our{' '}
              <a href="#" className="text-gray-200 underline hover:text-white">
                Privacy Policy
              </a>{' '}
              &{' '}
              <a href="#" className="text-gray-200 underline hover:text-white">
                Cookie Policy.
              </a>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* MODE 2: CREATE ACCOUNT (Matching GFG Register Modal Structure) */
          /* ======================================================== */
          <div className="flex flex-col gap-5">
            {/* Modal Title & Subtitle */}
            <div className="flex flex-col gap-1 pr-6">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Create Account
              </h1>
              <p className="text-xs text-gray-400 font-sans">
                Already have an account ?{' '}
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="text-[#A3E635] hover:underline font-bold cursor-pointer"
                >
                  Log in
                </button>
              </p>
            </div>

            {/* Form Content Area */}
            <form onSubmit={handleSubmitSignup(onSignupSubmit)} className="flex flex-col gap-4">
              {/* Field 1: Username or Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-200">
                  Username or Email
                </label>
                <input
                  type="text"
                  placeholder="Username or Email"
                  className="w-full bg-[#090A0C] border border-white/15 focus:border-[#A3E635] text-sm text-white placeholder-gray-500 px-3.5 py-2.5 rounded-lg outline-none transition-all"
                  {...registerSignup('email')}
                />
                {signupErrors.email && (
                  <span className="text-xs text-rose-400 font-sans">{signupErrors.email.message}</span>
                )}
              </div>

              {/* Field 2: Password with Eye Toggle */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-200">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter password"
                    maxLength={25}
                    className="w-full bg-[#090A0C] border border-white/15 focus:border-[#A3E635] text-sm text-white placeholder-gray-500 px-3.5 py-2.5 pr-10 rounded-lg outline-none transition-all"
                    {...registerSignup('password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 text-gray-400 hover:text-white transition-colors cursor-pointer text-xs"
                  >
                    <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                  </button>
                </div>
                {signupErrors.password && (
                  <span className="text-xs text-rose-400 font-sans">{signupErrors.password.message}</span>
                )}
              </div>

              {/* Field 3: Institution / Organization Search Autocomplete (Dynamic GFG Fetch + Local Fallback) */}
              <div className="flex flex-col gap-1.5" ref={institutionRef}>
                <label className="text-sm font-medium text-gray-200 mt-1">
                  Institution / Organization
                </label>
                <div className="relative z-50">
                  <input
                    type="text"
                    placeholder="Enter Institution / Organization name"
                    value={institutionQuery}
                    onFocus={() => {
                      if (institutionQuery.trim().length > 0) setIsInstitutionDropdownOpen(true);
                    }}
                    onChange={(e) => {
                      const val = e.target.value;
                      setInstitutionQuery(val);
                      setSignupValue('institution', val, { shouldValidate: true });
                      if (val.trim().length > 0) {
                        setIsInstitutionDropdownOpen(true);
                      } else {
                        setIsInstitutionDropdownOpen(false);
                      }
                    }}
                    className="w-full bg-[#090A0C] border border-white/15 focus:border-[#A3E635] text-sm text-white placeholder-gray-500 px-3.5 py-2.5 rounded-lg outline-none transition-all font-sans"
                  />

                  {/* Filtered Autocomplete Suggestions Dropdown based strictly on input value */}
                  {isInstitutionDropdownOpen && institutionQuery.trim().length > 0 && (
                    <div className="absolute left-0 top-full mt-1 w-full max-h-48 overflow-y-auto bg-[#090A0C] border border-white/20 rounded-lg shadow-2xl z-[999] flex flex-col divide-y divide-white/10">
                      {isLoadingInstitutions ? (
                        <div className="px-3.5 py-2.5 text-xs text-gray-400 flex items-center gap-2">
                          <i className="fa-solid fa-spinner animate-spin text-[#A3E635]"></i>
                          <span>Filtering institutions...</span>
                        </div>
                      ) : institutionOptions.length === 0 ? (
                        <button
                          type="button"
                          onClick={() => handleSelectInstitution(institutionQuery)}
                          className="px-3.5 py-2.5 text-left text-xs font-sans text-[#A3E635] hover:bg-[#A3E635]/15 cursor-pointer flex items-center justify-between font-semibold"
                        >
                          <span>Use custom institution: "{institutionQuery}"</span>
                          <i className="fa-solid fa-check text-[10px]"></i>
                        </button>
                      ) : (
                        institutionOptions.map((inst) => (
                          <button
                            key={inst}
                            type="button"
                            onClick={() => handleSelectInstitution(inst)}
                            className="w-full px-3.5 py-2.5 text-left text-xs font-sans text-gray-200 hover:bg-[#A3E635]/15 hover:text-[#A3E635] transition-colors cursor-pointer flex items-center gap-2"
                          >
                            <i className="fa-solid fa-graduation-cap text-[10px] text-gray-500 shrink-0"></i>
                            <span className="truncate">{inst}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
                {signupErrors.institution && (
                  <span className="text-xs text-rose-400 font-sans">{signupErrors.institution.message}</span>
                )}
              </div>

              {error && <div className="p-3 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs rounded-lg">{error}</div>}

              {/* Submit Button (Electric Lime Theme matching color palette) */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 mt-4 bg-[#A3E635] hover:bg-[#84CC16] text-black font-extrabold text-base rounded-lg transition-all cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-[#A3E635]/20 active:scale-[0.99] disabled:opacity-50 font-sans"
              >
                <span>Sign Up</span>
              </button>
            </form>

            {/* Social Sign-In Area (Bottom of Sign Up Modal) */}
            <div className="flex flex-col gap-3 pt-2">
              {/* Social Divider */}
              <div className="relative flex items-center justify-center my-1">
                <div className="w-full border-t border-white/10"></div>
                <span className="absolute bg-[#121316] px-4 text-xs font-medium text-gray-400">
                  or
                </span>
              </div>

              {/* Main Google Button */}
              <button
                type="button"
                onClick={() => handleOAuthLogin('Google')}
                className="w-full flex items-center justify-center gap-3 py-3 px-4 rounded-xl bg-[#090A0C] border border-white/15 hover:border-[#A3E635]/50 text-white font-semibold text-xs sm:text-sm transition-all cursor-pointer hover:bg-white/5 active:scale-[0.99] shadow-sm"
              >
                <i className="fa-brands fa-google text-rose-500 text-base"></i>
                <span>Continue with Google</span>
              </button>

              {/* Social Circle Buttons: Facebook, Twitter, GitHub, LinkedIn */}
              <div className="flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('Facebook')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-blue-500 hover:scale-110 transition-all cursor-pointer"
                  title="Sign up with Facebook"
                >
                  <i className="fa-brands fa-facebook-f text-sm"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('Twitter')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-sky-400 hover:scale-110 transition-all cursor-pointer"
                  title="Sign up with Twitter"
                >
                  <i className="fa-brands fa-x-twitter text-sm"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('GitHub')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-white hover:scale-110 transition-all cursor-pointer"
                  title="Sign up with GitHub"
                >
                  <i className="fa-brands fa-github text-sm"></i>
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthLogin('LinkedIn')}
                  className="w-10 h-10 rounded-full bg-[#090A0C] border border-white/15 hover:border-white/40 flex items-center justify-center text-blue-400 hover:scale-110 transition-all cursor-pointer"
                  title="Sign up with LinkedIn"
                >
                  <i className="fa-brands fa-linkedin-in text-sm"></i>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


