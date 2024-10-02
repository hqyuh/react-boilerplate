import { Outlet } from 'react-router-dom';

const HomePage = () => (
  <div className='flex h-full w-full items-center justify-center'>
    Home at here
    <Outlet />
  </div>
);

export default HomePage;
