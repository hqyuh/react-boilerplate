import type { TSidebarSubItem } from '@/layouts/SidebarLayout/menu/Menu';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

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
      className={cn('select-none list-none overflow-hidden transition-all duration-300 ease-in-out', {
        'h-auto': isOpen,
        'h-[48px]': !isOpen
      })}
    >
      {item.sub ? (
        <div
          onClick={handleToggleIsOpen}
          className={cn(
            'flex cursor-pointer items-center rounded-lg py-3 text-gray-700 transition-colors duration-300 ease-in-out',
            {
              'bg-blue-500 text-white': location?.pathname.includes(item?.path)
            }
          )}
          style={{
            paddingLeft: `${Number(currIndex) * 20}px`
          }}
        >
          <div className='flex w-full items-center justify-between px-3'>
            <div className='flex items-center space-x-2'>
              <div className='text-lg'>{item.icon}</div>
              <p className='text-base font-semibold leading-none'>{item.title}</p>
            </div>
            <ChevronDown
              className={cn('transition-transform duration-300', {
                'rotate-180': isOpen,
                'rotate-0': !isOpen
              })}
            />
          </div>
        </div>
      ) : (
        <NavLink
          end
          to={currPath + item?.path}
          className={({ isActive }) =>
            cn('flex items-center rounded-lg py-3 text-gray-700 transition-colors duration-300 ease-in-out', {
              'bg-blue-500 text-white': isActive
            })
          }
          style={{
            paddingLeft: `${Number(currIndex) * 20}px`
          }}
        >
          <div className='flex w-full items-center justify-between px-3'>
            <div className='flex items-center space-x-2'>
              <div className='text-lg'>{item.icon}</div>
              <p className='text-base font-semibold leading-none'>{item.title}</p>
            </div>
          </div>
        </NavLink>
      )}

      <ul
        className={cn('transition-max-height mt-1 space-y-1 overflow-hidden duration-300 ease-in-out', {
          'max-h-screen': isOpen,
          'max-h-0': !isOpen
        })}
      >
        {item?.sub &&
          item?.sub?.map((subItem, index) => (
            <MenuItem item={subItem} key={index} currIndex={currIndex + 1} currPath={currPath + item?.path} />
          ))}
      </ul>
    </li>
  );
};
