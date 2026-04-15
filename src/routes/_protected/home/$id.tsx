import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const HomeChildPage = lazy(() => import('@/pages/home/home-child'));

export const Route = createFileRoute('/_protected/home/$id')({
  component: () => (
    <RouteSuspense>
      <HomeChildPage />
    </RouteSuspense>
  )
});
