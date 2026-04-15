import ProtectedRoute from '@/guards/protected-route';
import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const DashboardPage = lazy(() => import('@/pages/dashboard/dashboard'));

function AdminOnly({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute roleRequired={['admin']}>{children}</ProtectedRoute>;
}

export const Route = createFileRoute('/_protected/dashboard')({
  component: () => (
    <AdminOnly>
      <RouteSuspense>
        <DashboardPage />
      </RouteSuspense>
    </AdminOnly>
  )
});
