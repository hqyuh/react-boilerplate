import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';

type TSideBarLayoutProps = {
  children: React.ReactNode;
};

export const SideBarLayout = ({ children }: TSideBarLayoutProps) => {
  const location = useLocation();
  const breadcrumbs = location.pathname
    .split('/')
    .filter((crumb) => crumb)
    .map((crumb, index, array) => ({
      title: crumb,
      url: array.slice(0, index + 1).join('/')
    }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='min-w-0'>
        <header className='flex h-16 shrink-0 items-center gap-2'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='ml-1' />
            <Separator orientation='vertical' className='mr-2 h-4' />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((breadcrumb, index) => (
                  <BreadcrumbItem key={breadcrumb.url}>
                    <BreadcrumbLink asChild>
                      <Link to={`/${breadcrumb.url}`}>{breadcrumb.title}</Link>
                    </BreadcrumbLink>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 overflow-x-auto p-4 pt-0'>{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};
