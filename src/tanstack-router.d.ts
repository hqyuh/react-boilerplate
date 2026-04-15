/* eslint-disable @typescript-eslint/consistent-type-definitions, @typescript-eslint/naming-convention */
import type { TAppRouter } from './router';

declare module '@tanstack/react-router' {
  interface Register {
    router: TAppRouter;
  }
}

export {};
