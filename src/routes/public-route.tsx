import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

type TPublic = {
  redirect?: string;
  children?: React.ReactNode;
};

export default function PublicRoute({ children, redirect = '/main' }: TPublic) {
  const user = { role: 'user' };
  // const user: any = null;

  if (user) {
    return <Navigate to={redirect} replace />;
  }

  return <Suspense fallback={<TopBarProgress />}>{children || <Outlet />}</Suspense>;
}
