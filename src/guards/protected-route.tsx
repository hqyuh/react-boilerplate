import { useAuthContext } from '@/context/auth-context';
import { Navigate, Outlet } from '@tanstack/react-router';
import { Suspense } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

type TProtectedRouteProps = {
  roleRequired?: string[];
  redirect?: string;
  redirectNoPermission?: string;
  children?: React.ReactNode;
};

export default function ProtectedRoute({ children, roleRequired, redirect = '/auth/login' }: TProtectedRouteProps) {
  const data = useAuthContext();

  const { user } = data;

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  if (roleRequired && (!user.role || !roleRequired.includes(user.role))) {
    return <Navigate to={'/no-permission'} replace />;
  }

  return <Suspense fallback={<TopBarProgress />}>{children || <Outlet />}</Suspense>;
}
