import { Outlet } from 'react-router-dom';

const HomePage = () => (
  <div className='flex h-full w-full items-center justify-center'>
    <div className=''>
      <Outlet />
    </div>
  </div>
);

export default HomePage;
