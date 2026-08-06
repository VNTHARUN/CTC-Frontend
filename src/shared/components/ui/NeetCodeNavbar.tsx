import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logoutUser, openAuthModal } from '../../../features/auth/redux/authSlice';

export interface NeetCodeNavbarProps {
  user?: any;
  onLogout?: () => void;
}

export const NeetCodeNavbar: React.FC<NeetCodeNavbarProps> = ({
  user,
  onLogout,
}) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user: reduxUser } = useAppSelector((state) => state.auth);

  // If user prop is explicitly passed use it; otherwise check Redux auth state
  const isLoggedIn = user !== undefined ? user !== null : (isAuthenticated && reduxUser !== null);
  const currentUser = user || reduxUser || {
    fullName: 'Alex Developer',
    email: 'alex.dev@Connect 2 Code.io',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      dispatch(logoutUser());
    }
  };

  const renderProfileDropdown = () => (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Image Trigger Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsProfileDropdownOpen((prev) => !prev);
        }}
        className="flex items-center gap-2 p-1 rounded-full hover:bg-white/10 transition-all focus:outline-none cursor-pointer group"
        aria-label="User menu"
      >
        <div className="relative">
          <img
            src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
            alt={currentUser.fullName || 'User Profile'}
            className="w-8 h-8 rounded-full object-cover border-2 border-[#A3E635] group-hover:border-[#84CC16] transition-colors shadow-md shadow-[#A3E635]/20"
          />
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#A3E635] rounded-full ring-2 ring-[#090A0C]"></span>
        </div>
        <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180 text-[#A3E635]' : ''}`}></i>
      </button>

      {/* Compact & Sleek Profile Dropdown Menu */}
      {isProfileDropdownOpen && (
        <div className="absolute right-0 top-full mt-2.5 w-52 bg-[#121316] border border-white/15 rounded-xl shadow-[0_12px_28px_rgba(0,0,0,0.7)] backdrop-blur-md z-50 animate-fade-in flex flex-col p-2 gap-1 text-sans">
          {/* User Info Header */}
          <div className="px-2.5 py-2 bg-[#090A0C] border border-white/10 rounded-lg flex items-center gap-2.5">
            <img
              src={currentUser?.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
              alt={currentUser?.fullName || 'User'}
              className="w-7 h-7 rounded-full object-cover border border-[#A3E635] shrink-0"
            />
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate font-heading">
                {currentUser?.fullName || 'Alex Developer'}
              </span>
              <span className="text-[10px] text-gray-400 font-mono truncate">
                {currentUser?.email || 'alex.dev@Connect 2 Code.io'}
              </span>
            </div>
          </div>

          {/* Compact Menu Links */}
          <div className="flex flex-col gap-0.5 pt-1">
            <Link
              to="/profile"
              onClick={() => setIsProfileDropdownOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors font-sans"
            >
              <i className="fa-regular fa-user text-xs text-[#A3E635] w-4 text-center"></i>
              <span>Profile Settings</span>
            </Link>

            <Link
              to="/bookmarks"
              onClick={() => setIsProfileDropdownOpen(false)}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/10 transition-colors font-sans"
            >
              <i className="fa-regular fa-bookmark text-xs text-amber-400 w-4 text-center"></i>
              <span>My Bookmarks</span>
            </Link>

            <div className="my-1 border-t border-white/10"></div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors font-sans w-full text-left cursor-pointer"
            >
              <i className="fa-solid fa-right-from-bracket text-xs text-rose-400 w-4 text-center"></i>
              <span>Log out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderRightAuthArea = () => {
    if (isLoggedIn) {
      return renderProfileDropdown();
    }
    return (
      <button
        onClick={() => dispatch(openAuthModal({ mode: 'signup' }))}
        className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#A3E635] hover:bg-[#84CC16] px-4 py-2 text-xs font-bold text-black shadow-sm transition-all active:translate-y-0.5 cursor-pointer font-sans"
      >
        <i className="fa-solid fa-user-plus text-xs text-black"></i>
        <span>Sign up</span>
      </button>
    );
  };

  if (!isHomePage) {
    // Inner App Navigation Header Bar
    return (
      <header className="sticky top-0 z-50 w-full bg-[#121316]/95 border-b border-white/10 shadow-lg backdrop-blur-md px-4 sm:px-8 py-2.5 transition-all">
        <div className="w-full max-w-7xl mx-auto flex h-11 items-center justify-between gap-4">
          {/* Brand Logo - Connect 2 Code */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 shrink-0"
            >
              <img
                src="/logo-mark-transparent.png"
                alt="Connect 2 Code Logo"
                className="h-8 sm:h-9 w-auto object-contain shrink-0"
              />
              <span className="text-base sm:text-lg font-bold text-white font-sans tracking-tight">
                Connect <span className="text-[#A3E635]">2</span> Code
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1.5 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-none">
            <NavLink
              to="/practice"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-code text-xs"></i>
              <span>Practice</span>
            </NavLink>

            <NavLink
              to="/aptitude"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-brain text-xs"></i>
              <span>Aptitude</span>
            </NavLink>

            <NavLink
              to="/companies"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-building text-xs"></i>
              <span>Companies</span>
            </NavLink>

            <NavLink
              to="/roadmaps"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-map text-xs"></i>
              <span>Roadmaps</span>
            </NavLink>

            <NavLink
              to="/dsa-sheet"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-lg px-3.5 py-1.5 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-file-code text-xs"></i>
              <span>DSA Sheet</span>
            </NavLink>
          </nav>

          {/* Right Profile / Auth Area */}
          <div className="flex items-center gap-2.5">
            {renderRightAuthArea()}
          </div>
        </div>
      </header>
    );
  }

  // Floating Header for Home / Landing page
  return (
    <div className="relative z-40 w-full bg-[#090A0C] px-4 pt-4">
      <header className="relative mx-auto max-w-5xl overflow-visible rounded-xl border border-white/10 bg-[#121316] shadow-[0_2px_12px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)] backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-b from-white/[0.02] to-transparent"></div>

        <div className="relative flex h-14 items-center justify-between gap-4 px-4">
          {/* Brand Logo - Connect 2 Code */}
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2.5 group transition-opacity hover:opacity-90 shrink-0"
            >
              <img
                src="/logo-mark-transparent.png"
                alt="Connect 2 Code Logo"
                className="h-8 sm:h-9 w-auto object-contain shrink-0"
              />
              <span className="text-base sm:text-lg font-bold text-white font-sans tracking-tight">
                Connect <span className="text-[#A3E635]">2</span> Code
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-1 overflow-x-auto text-xs sm:text-sm font-medium scrollbar-none">
            <NavLink
              to="/practice"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 py-2 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-code text-xs"></i>
              <span>Practice</span>
            </NavLink>

            <NavLink
              to="/aptitude"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 py-2 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-brain text-xs"></i>
              <span>Aptitude</span>
            </NavLink>

            <NavLink
              to="/companies"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 py-2 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-building text-xs"></i>
              <span>Companies</span>
            </NavLink>

            <NavLink
              to="/roadmaps"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 py-2 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-map text-xs"></i>
              <span>Roadmaps</span>
            </NavLink>

            <NavLink
              to="/dsa-sheet"
              className={({ isActive }) =>
                `inline-flex h-9 items-center justify-center gap-1.5 rounded-md px-3 py-2 font-medium transition-colors ${
                  isActive
                    ? 'bg-white/10 text-white font-semibold border border-white/20 shadow-xs'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <i className="fa-solid fa-file-code text-xs"></i>
              <span>DSA Sheet</span>
            </NavLink>
          </nav>

          {/* Right Profile / Auth Area */}
          <div className="flex items-center gap-2.5">
            {renderRightAuthArea()}
          </div>
        </div>
      </header>
    </div>
  );
};
