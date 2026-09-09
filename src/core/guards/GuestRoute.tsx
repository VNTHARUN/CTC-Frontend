import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';
import { homePathForRole } from '../../features/auth/utils/authHome';

export const GuestRoute: React.FC = () => {
  const { initialized, isAuthenticated, loading, user } = useAppSelector((state) => state.auth);

  if (!initialized || loading) {
    return (
      <div
        role="status"
        aria-label="Checking authentication"
        className="flex min-h-screen items-center justify-center bg-(--c2c-bg)"
      >
        <span className="c2c-spinner h-7 w-7" aria-hidden="true" />
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={homePathForRole(user?.role)} replace />;
  }

  return <Outlet />;
};
