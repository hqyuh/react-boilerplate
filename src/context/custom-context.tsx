import { createSafeContext } from '@/utils/createSafeContext';

type TCustomContext = {
  username: string;
  handleSetUsername: (name: string) => void;
};

export const [CustomProviderContext, useUser] = createSafeContext<TCustomContext>('');
