import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const HehePage = lazy(() => import('@/pages/auth/hehe'));

export const Route = createFileRoute('/auth/register')({
  component: () => (
    <RouteSuspense>
      <HehePage />
    </RouteSuspense>
  )
});
