import ProtectedRoute from '@/guards/protected-route';
import { RouteSuspense } from '@/lib/route-suspense';
import { createFileRoute } from '@tanstack/react-router';
import { lazy } from 'react';

const KanbanBoardPage = lazy(() => import('@/pages/kanban-board/kanban-board'));

function AdminOnly({ children }: { children: React.ReactNode }) {
  return <ProtectedRoute roleRequired={['admin']}>{children}</ProtectedRoute>;
}

export const Route = createFileRoute('/_protected/kanban-board')({
  component: () => (
    <AdminOnly>
      <RouteSuspense>
        <KanbanBoardPage />
      </RouteSuspense>
    </AdminOnly>
  )
});
