import type { TNullable } from '@/@types/common.type';
import { createSafeContext } from '@/utils/createSafeContext';

export type TAuthenUser = {
  email?: string;
  role?: string;
};

export type TAuthContext = {
  user: TNullable<TAuthenUser>;
  checking?: boolean;
};

export const [AuthProviderContext, useAuthContext] = createSafeContext<TAuthContext>('Error at AuthProviderContext');
