import type { TAuthContext } from '@/context/auth-context';
import { AuthProviderContext } from '@/context/auth-context';
import { useEffect, useState } from 'react';

type TAuthProviderType = { children: React.ReactNode };

const AuthProvider = ({ children }: TAuthProviderType) => {
  const [authInfo, setAuthInfo] = useState<TAuthContext>({
    user: null,
    checking: true
  });

  useEffect(() => {
    const unsubscribe = () => {
      setAuthInfo({
        user: {
          email: 'hqh@gmail.com',
          role: 'admin'
        }
      });
    };

    return () => {
      unsubscribe();
    };
  }, []);

  return <AuthProviderContext value={authInfo}>{children}</AuthProviderContext>;
};

export default AuthProvider;
