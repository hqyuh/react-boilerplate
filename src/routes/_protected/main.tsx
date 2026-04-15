import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const HomeMainPage = lazy(() => import('@/pages/home/home-main'));

export const Route = createFileRoute('/_protected/main')({
  component: () => (
    <RouteSuspense>
      <HomeMainPage />
    </RouteSuspense>
  )
});
