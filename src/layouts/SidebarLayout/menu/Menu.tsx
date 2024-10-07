import { MenuItem } from './menu-item/menu-item';

export type TSidebarSubItem = {
  title: string;
  path: string;
  icon?: JSX.Element;
  sub?: TSidebarSubItem[];
};

const SideBarData: TSidebarSubItem[] = [
  {
    title: 'Home',
    path: '/home',
    sub: [
      {
        title: 'H1',
        path: '/1'
      },
      {
        title: 'H2',
        path: '/2'
      }
    ]
  },
  {
    title: 'Dashboard',
    path: '/dashboard'
  }
];

export const Menu = () => (
  <ul className='space-y px-1'>
    {SideBarData.map((item, index) => (
      <MenuItem item={item} key={index} />
    ))}
  </ul>
);
