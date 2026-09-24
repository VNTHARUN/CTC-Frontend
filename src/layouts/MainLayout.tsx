import React, { useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { logoutUser, closeAuthModal } from '../features/auth/redux/authSlice';
import { NeetCodeNavbar } from '../shared/components/ui/NeetCodeNavbar';
import { Footer } from '../shared/components/ui/Footer';
import { Login } from '../features/auth/pages/Login';
import { OAuthReturnHandler } from '../features/auth/components/OAuthReturnHandler';
import { toastAuthFeedback, toAuthFeedback } from '../features/auth/utils/authToasts';
import { resetIdleDocumentScrollLock } from '../shared/hooks/useScrollLock';

export const MainLayout: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthModalOpen, isAuthenticated, initialized, loading } = useAppSelector((state) => state.auth);
  const isAuthRoute = location.pathname === '/login' || location.pathname === '/signup';
  // Auth routes already render Login in the outlet. Mounting it again here
  // stacked two document scroll locks and left overflow:hidden on later pages.
  const showAuthOverlay = isAuthModalOpen && !isAuthRoute;

  // If user logs out, redirect to login
  useEffect(() => {
    if (
      initialized &&
      !loading &&
      !isAuthenticated &&
      !isAuthRoute &&
      location.pathname !== '/dsa-sheet' &&
      location.pathname !== '/'
    ) {
      navigate('/login', { replace: true, state: {} });
    }
  }, [initialized, isAuthenticated, isAuthRoute, loading, location.pathname, navigate]);

  const handleLogout = async () => {
    const res = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(res)) {
      toastAuthFeedback({ message: res.payload.message, errors: null }, 'success');
    } else {
      toastAuthFeedback(toAuthFeedback(res.payload), 'error');
    }
    navigate('/login', { replace: true, state: {} });
  };

  useEffect(() => {
    if (!showAuthOverlay) {
      resetIdleDocumentScrollLock();
    }
  }, [showAuthOverlay, location.pathname]);

  const handleCloseModal = () => {
    dispatch(closeAuthModal());
    if (isAuthRoute) {
      navigate('/dsa-sheet');
    }
  };

  return (
    <div className="c2c-app-shell c2c-has-bottom-nav min-h-screen text-(--c2c-text) flex flex-col font-sans relative">
      <a href="#main-content" className="sr-only z-100 rounded-lg bg-(--c2c-primary) px-4 py-2 text-(--c2c-primary-foreground) focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to main content
      </a>
      <OAuthReturnHandler />
      {/* Top Navbar */}
      <NeetCodeNavbar user={user} onLogout={handleLogout} />

      {/* Main Content View (Full-width layout without constraints) */}
      <main id="main-content" className="flex-1 w-full overflow-x-hidden">
        <Outlet />
      </main>

      {/* Shared Footer */}
      <Footer />

      {/* Global Floating Auth Modal Overlay */}
      {showAuthOverlay && (
        <Login onCloseModal={handleCloseModal} />
      )}
    </div>
  );
};
