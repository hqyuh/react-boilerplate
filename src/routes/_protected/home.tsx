import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/home/home'));

export const Route = createFileRoute('/_protected/home')({
  component: () => (
    <RouteSuspense>
      <HomePage />
    </RouteSuspense>
  )
});
