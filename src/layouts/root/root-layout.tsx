import type { TFCC } from '@/@types/common.type';
import { TailwindIndicator } from '@/components/tailwind-indicator';

import { SideBarLayout } from '../sidebar/sidebar-layout';

const RootLayout: TFCC = ({ children }) => (
  <div className='flex h-full w-full overflow-hidden'>
    <SideBarLayout>{children}</SideBarLayout>
    <TailwindIndicator isProduction={false} />
  </div>
);

export default RootLayout;
