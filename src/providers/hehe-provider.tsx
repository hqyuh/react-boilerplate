import { HeheProviderContext } from '@/context/hehe-context';
import { useState } from 'react';

type THeheProviderType = { children: React.ReactNode };

const HeheProvider = ({ children }: THeheProviderType) => {
  const [username, setUsername] = useState<string>('');

  const handleSetUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  return <HeheProviderContext value={{ username, handleSetUsername }}>{children}</HeheProviderContext>;
};

export default HeheProvider;
