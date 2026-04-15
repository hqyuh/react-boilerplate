import { createRouter } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

import { routeTree } from './routeTree.gen';

const ErrorPage = lazy(() => import('@/pages/error/error'));

function SuspenseLazy({ children }: { children: React.ReactNode }) {
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
}

export const router = createRouter({
  routeTree,
  defaultNotFoundComponent: () => (
    <SuspenseLazy>
      <ErrorPage />
    </SuspenseLazy>
  )
});

export type TAppRouter = typeof router;
