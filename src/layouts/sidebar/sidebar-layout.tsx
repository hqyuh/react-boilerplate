import { Menu } from '@/layouts/sidebar/menu/menu';
import { Blend } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const SideBarLayout = () => {
  const navigate = useNavigate();

  const handleRedirect = () => navigate('/');

  return (
    <div className='h-full w-[300px] bg-slate-50'>
      <div className='flex items-center justify-center py-7'>
        <Blend size={60} onClick={handleRedirect} />
      </div>
      <Menu />
    </div>
  );
};
