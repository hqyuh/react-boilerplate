import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp, House, LayoutDashboard } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

const SideBarData = [
  {
    title: 'Home',
    path: '/home',
    icon: <House />,
    sub: [
      {
        title: 'Home A',
        path: '/home1',
        icon: <LayoutDashboard />,
        sub: [
          {
            title: 'Home A',
            path: '/home12',
            icon: <LayoutDashboard />
          },
          {
            title: 'Home 2',
            path: '/home22',
            icon: <LayoutDashboard />
          }
        ]
      },
      {
        title: 'Home 2',
        path: '/home2',
        icon: <LayoutDashboard />
      }
    ]
  },
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <LayoutDashboard />,
    sub: [
      {
        title: 'Home A',
        path: '/dashboard1',
        icon: <LayoutDashboard />
      },
      {
        title: 'Home 2',
        path: '/dashboard2',
        icon: <LayoutDashboard />
      }
    ]
  }
];

const MenuItem = ({ item, indexTemp = 0, pathTemp = '' }: any) => {
  const [isOpen, setIsOpen] = useState(() => {
    const isOpenList = JSON.parse(localStorage.getItem('isOpen') || '{}');

    return isOpenList[pathTemp + item?.path];
  });
  const location = useLocation();

  const handleToggleIsOpen = () => {
    setIsOpen(!isOpen);
    const isOpenList = JSON.parse(localStorage.getItem('isOpen') || '{}');
    isOpenList[pathTemp + item?.path] = !isOpen;
    localStorage.setItem('isOpen', JSON.stringify(isOpenList));
  };

  // useEffect(() => {
  //   const isOpenList = JSON.parse(localStorage.getItem('isOpen') || '{}');

  //   if (isOpenList[pathTemp + item?.path]) {
  //     setIsOpen(isOpenList[pathTemp + item?.path]);
  //   }
  // }, [item?.path, pathTemp]);

  return (
    <li
      className={cn('h-[48px] select-none list-none overflow-hidden', {
        'h-fit': isOpen
      })}
    >
      {item.sub ? (
        <div
          onClick={handleToggleIsOpen}
          className={cn('flex items-center py-3 text-4xl text-black', {
            'rounded bg-zinc-900 text-white': location?.pathname.includes(item?.path)
          })}
          style={{
            paddingLeft: Number(indexTemp) * 20
          }}
        >
          <div className='flex w-full justify-between px-3'>
            <div className='flex'>
              <div>{item.icon}</div>
              <p className='pl-2 text-xl leading-none'>{item.title}</p>
            </div>
            {isOpen ? <ChevronUp /> : <ChevronDown />}
          </div>
        </div>
      ) : (
        <NavLink
          end
          to={pathTemp + item?.path}
          className={({ isActive }) =>
            cn('flex items-center py-3 text-4xl text-black', isActive ? 'rounded bg-zinc-900 text-white' : '')
          }
          style={{
            paddingLeft: Number(indexTemp) * 20
          }}
        >
          <div className='flex w-full justify-between px-3'>
            <div className='flex'>
              <div>{item.icon}</div>
              <p className={`pl-2 text-xl leading-none`}>{item.title}</p>
            </div>
          </div>
        </NavLink>
      )}

      <ul className='mt-1 space-y-1'>
        {item?.sub &&
          item?.sub?.map((subItem: any, index: any) => (
            <MenuItem item={subItem} key={index} indexTemp={indexTemp + 1} pathTemp={pathTemp + item?.path} />
          ))}
      </ul>
    </li>
  );
};

export const Menu = () => (
  <ul className='space-y px-1'>
    {SideBarData.map((item, index) => (
      <MenuItem item={item} key={index} />
    ))}
  </ul>
);
