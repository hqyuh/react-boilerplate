import { AppSidebar } from '@/components/app-sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { useLocation, useRouter } from '@tanstack/react-router';
import { Fragment } from 'react';

type TSideBarLayoutProps = {
  children: React.ReactNode;
};

/** Turn URL segments into short readable titles (kanban-board → Kanban Board). */
function formatBreadcrumbLabel(segment: string): string {
  try {
    const decoded = decodeURIComponent(segment);

    return decoded
      .split('-')
      .filter(Boolean)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  } catch {
    return segment;
  }
}

export const SideBarLayout = ({ children }: TSideBarLayoutProps) => {
  const router = useRouter();
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  const breadcrumbs = segments.map((segment, index, array) => ({
    label: formatBreadcrumbLabel(segment),
    url: array.slice(0, index + 1).join('/'),
    isLast: index === array.length - 1
  }));

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='min-w-0'>
        <header className='border-border/50 bg-muted/20 flex h-14 shrink-0 items-center gap-2 border-b backdrop-blur-sm'>
          <div className='flex min-w-0 flex-1 items-center gap-3 px-4'>
            <SidebarTrigger className='-ml-0.5 shrink-0' />
            <Separator orientation='vertical' className='h-5 shrink-0' />
            <Breadcrumb className='min-w-0'>
              <BreadcrumbList className='flex-nowrap gap-x-1 gap-y-1 sm:gap-x-1.5'>
                {breadcrumbs.map((crumb, index) => (
                  <Fragment key={crumb.url}>
                    {index > 0 ? (
                      <BreadcrumbSeparator className='text-muted-foreground/45 mx-0.5 [&>svg]:size-3.5'>
                        <span aria-hidden className='text-xs font-light select-none'>
                          /
                        </span>
                      </BreadcrumbSeparator>
                    ) : null}
                    <BreadcrumbItem className='max-w-[min(100%,12rem)] truncate sm:max-w-[16rem]'>
                      {crumb.isLast ? (
                        <BreadcrumbPage className='text-foreground font-medium' title={crumb.label}>
                          <span className='truncate'>{crumb.label}</span>
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink asChild>
                          <a
                            className='text-muted-foreground hover:text-foreground truncate'
                            href={`/${crumb.url}`}
                            title={crumb.label}
                            onClick={(e) => {
                              e.preventDefault();
                              void router.navigate({ to: `/${crumb.url}` });
                            }}
                          >
                            <span className='truncate'>{crumb.label}</span>
                          </a>
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </Fragment>
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
