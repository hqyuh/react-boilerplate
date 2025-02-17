import { Outlet } from 'react-router';

const HomePage = () => (
  <div className='flex h-full w-full items-center justify-center'>
    <div>
      <Outlet />
    </div>
  </div>
);

export default HomePage;
