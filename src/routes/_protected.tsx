import ProtectedRoute from '@/guards/protected-route';
import MainLayout from '@/layouts/main-layout';
import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const ErrorPage = lazy(() => import('@/pages/error/error'));

export const Route = createFileRoute('/_protected')({
  component: () => (
    <ProtectedRoute roleRequired={['admin', 'user']}>
      <MainLayout />
    </ProtectedRoute>
  ),
  errorComponent: () => (
    <RouteSuspense>
      <ErrorPage />
    </RouteSuspense>
  )
});
