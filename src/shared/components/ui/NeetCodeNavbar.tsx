import React, { useState, useRef, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { logoutUser, openAuthModal } from '../../../features/auth/redux/authSlice';
import { useTheme } from '../../context/ThemeContext';

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
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileTriggerRef = useRef<HTMLButtonElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);

  const { isAuthenticated, user: reduxUser } = useAppSelector((state) => state.auth);
  const { theme, toggleTheme } = useTheme();

  const isLoggedIn = user !== undefined ? user !== null : (isAuthenticated && reduxUser !== null);
  const currentUser = reduxUser || user || null;
  const isAdmin = currentUser?.role?.toUpperCase() === 'ADMIN';

  // Derived display values from real auth user
  const displayName = currentUser
    ? `${currentUser.firstName ?? ''} ${currentUser.lastName ?? ''}`.trim()
    : '';
  const displayEmail = currentUser?.email ?? '';
  const avatarInitials = currentUser
    ? `${currentUser.firstName?.[0] ?? ''}${currentUser.lastName?.[0] ?? ''}`.toUpperCase()
    : 'U';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      if (isProfileDropdownOpen) {
        setIsProfileDropdownOpen(false);
        profileTriggerRef.current?.focus();
      }
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
        mobileTriggerRef.current?.focus();
      }
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen, isProfileDropdownOpen]);

  const handleLogout = () => {
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    if (onLogout) {
      onLogout();
    } else {
      dispatch(logoutUser());
    }
  };

  const navItems = [
    { to: '/practice', label: 'Practice', icon: 'fa-solid fa-code' },
    ...(isAdmin
      ? [{ to: '/admin/practice', label: 'Admin Practice', icon: 'fa-solid fa-shield-halved' }]
      : []),
    { to: '/aptitude', label: 'Aptitude', icon: 'fa-solid fa-brain' },
    { to: '/companies', label: 'Companies', icon: 'fa-solid fa-building' },
    { to: '/roadmaps', label: 'Roadmaps', icon: 'fa-solid fa-map' },
    { to: '/dsa-sheet', label: 'DSA Sheet', icon: 'fa-solid fa-file-code' },
  ];

  return (
    <>
    <header className="sticky top-0 z-50 w-full border-b border-(--c2c-border) bg-(--c2c-surface)/95 backdrop-blur-md font-sans">
      <div className="c2c-container">
        <div className="grid h-16 w-full grid-cols-[auto_1fr_auto] items-center gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:gap-4">
          <Link
            to="/"
            className="inline-flex min-w-0 items-center gap-2 justify-self-start sm:gap-2.5 group transition-opacity hover:opacity-90"
          >
            <img
              src="/logo-mark-transparent.png"
              alt="Connect 2 Code Logo"
              className="h-7 w-auto shrink-0 object-contain sm:h-9"
            />
            <span className="truncate font-sans text-sm font-bold tracking-tight text-(--c2c-text) sm:text-lg">
              Connect <span className="text-(--c2c-primary)">2</span> Code
            </span>
          </Link>

          <nav
            aria-label="Primary navigation"
            className="hidden items-center justify-center rounded-full border border-(--c2c-border) bg-(--c2c-surface-raised)/80 p-1 shadow-(--c2c-shadow-sm) lg:flex"
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex h-8 items-center justify-center gap-1.5 rounded-full px-3 text-xs font-semibold transition-colors ${
                    isActive
                      ? 'bg-(--c2c-surface) text-(--c2c-text) shadow-(--c2c-shadow-sm)'
                      : 'text-(--c2c-text-muted) hover:bg-(--c2c-surface)/70 hover:text-(--c2c-text)'
                  }`
                }
              >
                <i className={`${item.icon} text-[11px]`}></i>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>

          <div className="flex shrink-0 items-center justify-self-end gap-1.5 sm:gap-2">
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  ref={profileTriggerRef}
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsProfileDropdownOpen((prev) => !prev);
                  }}
                  className="c2c-tooltip c2c-icon-button group rounded-full"
                  aria-label="User menu"
                  aria-expanded={isProfileDropdownOpen}
                  aria-controls="profile-menu"
                  data-tooltip="User menu"
                >
                  <div className="relative">
                    {/* Avatar: initials-based since backend doesn't return avatarUrl */}
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#A3E635] group-hover:border-[#84CC16] transition-colors shadow-md shadow-[#A3E635]/20 bg-[#A3E635]/20 flex items-center justify-center">
                      <span className="text-xs font-bold text-[#A3E635]">{avatarInitials}</span>
                    </div>
                    <span className="absolute bottom-0 right-0 w-2 h-2 sm:w-2.5 sm:h-2.5 bg-[#A3E635] rounded-full ring-2 ring-(--c2c-surface)"></span>
                  </div>
                  <i className={`fa-solid fa-chevron-down text-[10px] text-gray-400 transition-transform duration-200 ${isProfileDropdownOpen ? 'rotate-180 text-[#A3E635]' : ''}`}></i>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div id="profile-menu" className="absolute right-0 top-full mt-2.5 w-56 bg-(--c2c-surface) border border-(--c2c-border-strong) rounded-xl shadow-(--c2c-shadow-md) backdrop-blur-md z-50 animate-fade-in flex flex-col p-2 gap-1 font-sans">
                    <div className="px-2.5 py-2 bg-(--c2c-surface-raised) border border-(--c2c-border) rounded-lg flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full border border-[#A3E635] bg-[#A3E635]/20 flex items-center justify-center shrink-0">
                        <span className="text-xs font-bold text-[#A3E635]">{avatarInitials}</span>
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-xs font-bold text-(--c2c-text) truncate font-heading">
                          {displayName || 'User'}
                        </span>
                        <span className="text-[10px] text-(--c2c-text-subtle) font-mono truncate">
                          {displayEmail}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-0.5 pt-1">
                      <Link
                        to="/profile"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-(--c2c-text-muted) hover:text-(--c2c-text) hover:bg-(--c2c-surface-raised) transition-colors font-sans"
                      >
                        <i className="fa-regular fa-user text-xs text-[#A3E635] w-4 text-center"></i>
                        <span>Profile Settings</span>
                      </Link>

                      <Link
                        to="/bookmarks"
                        onClick={() => setIsProfileDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-(--c2c-text-muted) hover:text-(--c2c-text) hover:bg-(--c2c-surface-raised) transition-colors font-sans"
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
            ) : (
              <button
                onClick={() => dispatch(openAuthModal({ mode: 'signup' }))}
              className="inline-flex items-center justify-center gap-1.5 rounded-lg bg-[#A3E635] hover:bg-[#84CC16] px-3 sm:px-4 py-1.5 sm:py-2 text-xs font-bold text-black shadow-sm transition-all active:translate-y-0.5 cursor-pointer font-sans shrink-0"
              >
                <i className="fa-solid fa-user-plus text-xs text-black"></i>
                <span>Sign up</span>
              </button>
            )}

            {/* THEME TOGGLE BUTTON - Placed to the RIGHT of Profile/Signup */}
            <button
              type="button"
              onClick={toggleTheme}
              className="c2c-tooltip c2c-icon-button"
              data-tooltip={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              <i className={`fa-solid ${theme === 'dark' ? 'fa-sun text-amber-400' : 'fa-moon text-indigo-400'} text-xs`}></i>
              <span className="sr-only">
                {theme === 'dark' ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* HAMBURGER TOGGLE BUTTON FOR MOBILE (< lg screens) */}
            <button
              ref={mobileTriggerRef}
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="c2c-icon-button lg:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <i className={`fa-solid ${isMobileMenuOpen ? 'fa-xmark' : 'fa-bars'} text-sm w-4 text-center`}></i>
            </button>
          </div>

        </div>
      </div>

      {/* SLEEK MOBILE NAVIGATION PANEL (Visible when mobile menu is toggled) */}
      {isMobileMenuOpen && (
        <div id="mobile-navigation" className="lg:hidden border-t border-(--c2c-border) bg-(--c2c-surface) backdrop-blur-xl px-4 py-3 shadow-(--c2c-shadow-md) animate-fade-in font-sans">
          <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-[#A3E635] text-black shadow-sm'
                      : 'text-(--c2c-text-muted) hover:bg-(--c2c-surface-raised) hover:text-(--c2c-text)'
                  }`
                }
              >
                <i className={`${item.icon} text-sm w-5 text-center`}></i>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
    <nav aria-label="Mobile primary navigation" className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-5 border-t border-(--c2c-border) bg-(--c2c-surface)/98 px-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden">
      {[
        { to: '/', label: 'Home', icon: 'fa-solid fa-house' },
        { to: '/practice', label: 'Practice', icon: 'fa-solid fa-code' },
        ...(isAdmin
          ? [{ to: '/admin/practice', label: 'Admin', icon: 'fa-solid fa-shield-halved' }]
          : []),
        { to: '/companies', label: 'Companies', icon: 'fa-solid fa-building' },
        { to: '/roadmaps', label: 'Roadmaps', icon: 'fa-solid fa-map' },
        ...(!isAdmin
          ? [{ to: '/dsa-sheet', label: 'DSA Sheet', icon: 'fa-solid fa-list-check' }]
          : []),
      ].map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) => `flex min-h-16 flex-col items-center justify-center gap-1 rounded-lg px-1 text-[10px] font-semibold ${
            isActive ? 'text-(--c2c-primary)' : 'text-(--c2c-text-muted)'
          }`}
        >
          <i aria-hidden="true" className={`${item.icon} text-sm`} />
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
    </>
  );
};
