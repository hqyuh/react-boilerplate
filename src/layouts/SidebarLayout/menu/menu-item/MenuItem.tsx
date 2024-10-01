import { cn } from '@/lib/utils';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import type { TSidebarSubItem } from '../Menu';

type TOpenList = Record<string, boolean>;

type TMenuItemProps = {
  item: TSidebarSubItem;
  currIndex?: number;
  currPath?: string;
};

export const MenuItem = ({ item, currIndex = 0, currPath = '' }: TMenuItemProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(() => {
    const storedIsOpen = localStorage.getItem('isOpen');
    const isOpenList: TOpenList = storedIsOpen ? JSON.parse(storedIsOpen) : {};

    return isOpenList[`${currPath}${item?.path}`] || false;
  });

  const location = useLocation();

  const handleToggleIsOpen = (): void => {
    setIsOpen((prevState: boolean) => {
      const isUpdatedIsOpen = !prevState;
      const storedIsOpen = localStorage.getItem('isOpen');
      const isOpenList: TOpenList = storedIsOpen ? JSON.parse(storedIsOpen) : {};

      isOpenList[`${currPath}${item?.path}`] = isUpdatedIsOpen;
      localStorage.setItem('isOpen', JSON.stringify(isOpenList));

      return isUpdatedIsOpen;
    });
  };

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
            paddingLeft: Number(currIndex) * 20
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
          to={currPath + item?.path}
          className={({ isActive }) =>
            cn('flex items-center py-3 text-4xl text-black', isActive ? 'rounded bg-zinc-900 text-white' : '')
          }
          style={{
            paddingLeft: Number(currIndex) * 20
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
          item?.sub?.map((subItem, index) => (
            <MenuItem item={subItem} key={index} currIndex={currIndex + 1} currPath={currPath + item?.path} />
          ))}
      </ul>
    </li>
  );
};
