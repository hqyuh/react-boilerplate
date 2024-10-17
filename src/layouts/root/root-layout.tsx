import type { TFCC } from '@/@types/common.type';
import { TailwindIndicator } from '@/components/tailwind-indicator';
import Header from '@/layouts/root/header';

import { SideBarLayout } from '../sidebar/sidebar-layout';

const RootLayout: TFCC = ({ children }) => (
  <div className='flex h-full w-full overflow-hidden'>
    <SideBarLayout />
    <div className='h-full w-full'>
      <Header />
      <div className='flex h-[calc(100%-56px)]'>
        <main className='h-full w-full overflow-auto'>{children}</main>
      </div>
      <TailwindIndicator isProduction={false} />
    </div>
  </div>
);

export default RootLayout;
