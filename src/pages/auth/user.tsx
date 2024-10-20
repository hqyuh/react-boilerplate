import { useHeheContext } from '@/context/hehe-context';

export const User = () => {
  const { username } = useHeheContext();

  return <h2 className='font-bold'>User: {username}</h2>;
};
