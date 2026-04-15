import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const LoginPage = lazy(() => import('@/pages/auth/auth'));

export const Route = createFileRoute('/auth/login')({
  component: () => (
    <RouteSuspense>
      <LoginPage />
    </RouteSuspense>
  )
});
