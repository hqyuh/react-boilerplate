import { SideBarLayout } from '../SidebarLayout/SidebarLayout';

type TMainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: TMainLayoutProps) => (
  <>
    <div className='flex h-full w-full'>
      <SideBarLayout />
      <div className='h-full flex-1 overflow-auto'>
        <div className='h-full w-full bg-gray-300'>{children}</div>
      </div>
    </div>
  </>
);

export default MainLayout;
