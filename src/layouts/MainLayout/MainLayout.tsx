import { Outlet } from 'react-router-dom';

import { SideBarLayout } from '../SidebarLayout/SidebarLayout';

const MainLayout = () => (
  <>
    <div className='flex h-full w-full'>
      <SideBarLayout />
      <div className='h-full flex-1 overflow-auto'>
        <div className='h-full w-full bg-gray-300'>
          <Outlet />
        </div>
      </div>
    </div>
  </>
);

export default MainLayout;
