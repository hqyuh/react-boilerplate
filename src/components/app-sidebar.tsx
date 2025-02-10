import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import { Bot, Command, SquareTerminal } from 'lucide-react';
import * as React from 'react';
import { useNavigate } from 'react-router';

const data = {
  navMain: [
    {
      title: 'Home',
      url: '/home',
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'Child 1',
          url: '/home/child-1'
        },
        {
          title: 'Child 2',
          url: '/home/child-2'
        }
      ]
    },
    {
      title: 'Dashboard',
      url: '/dashboard',
      icon: Bot
    },
    {
      title: 'Kanban Board',
      url: '/kanban-board',
      icon: Bot
    }
  ],
  user: {
    name: 'Ho Wang Huy',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg'
  }
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  const handleRedirect = () => navigate('/main');

  return (
    <Sidebar variant='inset' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size='lg' asChild>
              <a onClick={handleRedirect}>
                <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                  <Command className='size-4' />
                </div>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate text-xl font-semibold'>X</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
