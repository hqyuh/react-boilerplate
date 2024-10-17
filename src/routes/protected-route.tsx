import { Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

type TProtected = {
  role?: string[];
  redirect?: string;
  redirectNoPermission?: string;
  children?: React.ReactNode;
};

export default function Protected({ children, role, redirect = '/login' }: TProtected) {
  const user = { role: 'user' };
  // const user: any = null;

  if (!user) {
    return <Navigate to={redirect} replace />;
  }

  if (role && !role.includes(user.role)) {
    return <Navigate to={'/no-permission'} replace />;
  }

  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
}
