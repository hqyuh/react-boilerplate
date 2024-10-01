import { MainLayout } from '@/layouts/MainLayout';
import { DashboardPage } from '@/pages/dashboard';
import { ErrorPage } from '@/pages/error';
import { HomePage } from '@/pages/home';
import { store } from '@/stores/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <MainLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: 'home',
          element: <HomePage />,
          children: [
            {
              path: 'home1',
              element: <HomePage />,
              children: [
                {
                  path: 'home12',
                  element: <HomePage />
                },
                {
                  path: 'home22',
                  element: <HomePage />
                }
              ]
            },
            {
              path: 'home2',
              element: <HomePage />
            }
          ]
        },
        {
          path: 'dashboard',
          element: <DashboardPage />,
          children: [
            {
              path: 'dashboard1',
              element: <DashboardPage />
            },
            {
              path: 'dashboard2',
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
