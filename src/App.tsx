import { store } from '@/stores/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';
import MainLayout from './layouts/MainLayout/MainLayout';
import DashboardPage from './pages/dashboard/Dashboard';
import ErrorPage from './pages/error/Error';
import HomePage from './pages/home/Home';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'use-state',
          element: <HomePage />,
          children: [
            {
              path: 'example-1',
              element: <HomePage />
            },
            {
              path: 'example-2',
              element: <HomePage />
            }
          ]
        },
        {
          path: 'use-effect',
          element: <DashboardPage />,
          children: [
            {
              path: 'example-1',
              element: <DashboardPage />
            },
            {
              path: 'example-2',
              element: <DashboardPage />
            }
          ]
        }
      ]
    }
  ]);

  return (
    <main className='h-full w-full'>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </main>
  );
}

export default App;
