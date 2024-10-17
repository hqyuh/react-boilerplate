import { useUser } from '@/context/custom-context';

export const User = () => {
  const { username } = useUser();

  return <h2 className='font-bold'>User: {username}</h2>;
};
