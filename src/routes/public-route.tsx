import { useAuthContext } from '@/context/auth-context';
import { Suspense } from 'react';
import { Navigate } from 'react-router';
import TopBarProgress from 'react-topbar-progress-indicator';

type TPublic = {
  redirect?: string;
  children?: React.ReactNode;
};

export default function PublicRoute({ children, redirect = '/main' }: TPublic) {
  const data = useAuthContext();

  if (data.user) {
    return <Navigate to={redirect} replace />;
  }

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
}
