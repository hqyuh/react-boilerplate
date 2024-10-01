import { Blend } from 'lucide-react';

import { Menu } from './menu/Menu';

export const SideBarLayout = () => (
  <div className='h-full w-[280px] bg-slate-50'>
    <div className='flex items-center justify-center py-7'>
      <Blend size={48} />
    </div>
    <Menu />
  </div>
);
