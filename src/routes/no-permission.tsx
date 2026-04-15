import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const NoPermission = lazy(() => import('@/pages/no-permission/no-permission'));
const ErrorPage = lazy(() => import('@/pages/error/error'));

export const Route = createFileRoute('/no-permission')({
  component: () => (
    <RouteSuspense>
      <NoPermission />
    </RouteSuspense>
  ),
  errorComponent: () => (
    <RouteSuspense>
      <ErrorPage />
    </RouteSuspense>
  )
});
