import CustomProvider from '@/providers/custom-provider';

import { Login } from './login';
import { User } from './user';

export default function Auth() {
  // const dispatch = useAppDispatch();
  // const selector = useAppSelector(selectAuth);
  // // eslint-disable-next-line no-console
  // console.log('selector:', selector);

  // useEffect(() => {
  //   dispatch(loginAsync({ email: '', password: '' }));
  // }, [dispatch]);

  return (
    <>
      {/* <h2 className='text-3xl font-semibold'>Hello world!</h2>
      <Button className='bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3'>Click me</Button>
      <div className='p-4 pt-2'>22</div> */}

      <CustomProvider>
        <User />
        <Login />
      </CustomProvider>
      {/* <MyComponent /> */}
    </>
  );
}
