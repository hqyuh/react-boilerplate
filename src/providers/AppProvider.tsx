import RootLayout from '@/layouts/RootLayout/RootLayout';
import { Outlet } from 'react-router-dom';

const AppProvider = () => (
  <>
    <RootLayout>
      <Outlet />
    </RootLayout>
  </>
);

export default AppProvider;
