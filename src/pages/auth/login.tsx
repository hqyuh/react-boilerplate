import { useUser } from '@/context/CustomContext';

export const Login = () => {
  const { handleSetUsername } = useUser();

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
