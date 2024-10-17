import { Navigate } from 'react-router-dom';

type TPublic = {
  redirect?: string;
  children?: React.ReactNode;
};

export default function PublicRoute({ children, redirect = '/main' }: TPublic) {
  const user = { role: 'user' };
  // const user: any = null;

  if (user) {
    return <Navigate to={redirect} replace />;
  }

  return <>{children}</>;
}
