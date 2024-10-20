import { createSafeContext } from '@/utils/createSafeContext';

type THeheContext = {
  username: string;
  handleSetUsername: (name: string) => void;
};

export const [HeheProviderContext, useHeheContext] = createSafeContext<THeheContext>('');
