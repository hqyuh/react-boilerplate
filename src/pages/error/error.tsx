// import type { ErrorResponse } from 'react-router-dom';

const ErrorPage = () => (
  // const error = useRouteError();

  // const { statusText } = error as ErrorResponse;

  <div className='flex h-full w-full flex-col items-center justify-center gap-y-3'>
    <h1 className='text-4xl font-black'>Oops!</h1>
    <p className='text-xl'>Sorry, an unexpected error has occurred.</p>
  </div>
);
export default ErrorPage;
