import { House, LayoutDashboard } from 'lucide-react';

import { MenuItem } from './menu-item/MenuItem';

export type TSidebarSubItem = {
  title: string;
  path: string;
  icon: JSX.Element;
  sub?: TSidebarSubItem[];
};

const SideBarData: TSidebarSubItem[] = [
  {
    title: 'UseState',
    path: '/use-state',
    icon: <House />,
    sub: [
      {
        title: 'Example 1',
        path: '/example-1',
        icon: <LayoutDashboard />
      },
      {
        title: 'Example 2',
        path: '/example-2',
        icon: <LayoutDashboard />
      }
    ]
  },
  {
    title: 'UseEffect',
    path: '/use-effect',
    icon: <LayoutDashboard />,
    sub: [
      {
        title: 'Example 1',
        path: '/example-1',
        icon: <LayoutDashboard />
      },
      {
        title: 'Example 2',
        path: '/example-2',
        icon: <LayoutDashboard />
      }
    ]
  }
];

export const Menu = () => (
  <ul className='space-y px-1'>
    {SideBarData.map((item, index) => (
      <MenuItem item={item} key={index} />
    ))}
  </ul>
);
