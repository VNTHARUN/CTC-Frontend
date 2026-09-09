import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../app/hooks';

const AuthRouteLoading: React.FC = () => (
  <div
    role="status"
    aria-label="Checking administrator access"
    className="flex min-h-[45vh] items-center justify-center"
  >
    <span className="c2c-spinner h-7 w-7" aria-hidden="true" />
  </div>
);

export const AdminRoute: React.FC = () => {
  const { initialized, isAuthenticated, loading, user } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!initialized || loading) return <AuthRouteLoading />;

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (user?.role?.toUpperCase() !== 'ADMIN') {
    return <Navigate to="/practice" replace />;
  }

  return <Outlet />;
};
