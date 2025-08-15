import React from 'react';
import { Navigate } from 'react-router-dom';
import { auth } from '../auth';

export default function ProtectedRoute({ children, roles }: { children: React.ReactNode, roles?: string[] }) {
  const user = auth.state.user;
  if (!user) return <Navigate to="/login" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" replace />;
  return <>{children}</>;
}
