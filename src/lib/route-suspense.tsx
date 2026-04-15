import { Suspense, type ReactNode } from 'react';
import TopBarProgress from 'react-topbar-progress-indicator';

export function RouteSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<TopBarProgress />}>{children}</Suspense>;
}
