import { useHeheContext } from '@/context/hehe-context';

export const Login = () => {
  const { handleSetUsername } = useHeheContext();

  return (
    <div>
      <input
        className='bg-gray-200 p-2'
        onChange={(event) => {
          handleSetUsername(event.target.value);
        }}
      />
    </div>
  );
};
