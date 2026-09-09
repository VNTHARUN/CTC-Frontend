import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

export const ProtectedRoute: React.FC = () => {
  const { initialized, isAuthenticated, loading } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!initialized || loading) {
    return (
      <div
        role="status"
        aria-label="Checking authentication"
        className="flex min-h-[45vh] items-center justify-center"
      >
        <span className="c2c-spinner h-7 w-7" aria-hidden="true" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};
