import { Outlet, createRootRoute } from '@tanstack/react-router';
import { lazy, Suspense } from 'react';

function loadRouterDevtools() {
  return import('@tanstack/react-router-devtools').then((m) => ({ default: m.TanStackRouterDevtools }));
}

const TanStackRouterDevtools = import.meta.env.DEV ? lazy(loadRouterDevtools) : () => null;

export const Route = createRootRoute({
  component: () => (
    <>
      <Outlet />
      {import.meta.env.DEV ? (
        <Suspense fallback={null}>
          <TanStackRouterDevtools />
        </Suspense>
      ) : null}
    </>
  )
});
