import ErrorBoundary from '@/components/error-boundary';
import { Outlet } from 'react-router';

const AuthLayout = () => (
  <ErrorBoundary>
    <div className='text-sm'></div>
    <Outlet />
  </ErrorBoundary>
);

export default AuthLayout;
