import { CustomProviderContext } from '@/context/custom-context';
import { useState } from 'react';

type TCustomProviderType = { children: React.ReactNode };

const CustomProvider = ({ children }: TCustomProviderType) => {
  const [username, setUsername] = useState<string>('');

  const handleSetUsername = (newUsername: string) => {
    setUsername(newUsername);
  };

  return <CustomProviderContext value={{ username, handleSetUsername }}>{children}</CustomProviderContext>;
};

export default CustomProvider;
