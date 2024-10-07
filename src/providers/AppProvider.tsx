import ErrorBoundary from '@/components/error-boundary';
import RootLayout from '@/layouts/root/root-layout';
import { Outlet } from 'react-router-dom';

const AppProvider = () => (
  <>
    <ErrorBoundary>
      <RootLayout>
        <Outlet />
      </RootLayout>
    </ErrorBoundary>
  </>
);

export default AppProvider;
