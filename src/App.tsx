import { store } from '@/stores/redux/store';
import '@/translation/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './App.css';
import AppProvider from './providers/app-provider';
import Protected from './routes/protected-route';
import PublicRoute from './routes/public-route';

const ErrorPage = lazy(() => import('@/pages/error/error'));
const LoginPage = lazy(() => import('@/pages/auth/auth'));
const HomePage = lazy(() => import('@/pages/home/home'));
const HomeChildPage = lazy(() => import('@/pages/home/home-child'));
const DashboardPage = lazy(() => import('@/pages/dashboard/dashboard'));
const HomeMainPage = lazy(() => import('@/pages/home/home-main'));
const NoPermission = lazy(() => import('@/pages/no-permission/no-permission'));

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Navigate to='/main' replace />
    },
    {
      path: '/',
      element: (
        <Protected role={['admin', 'user']}>
          <AppProvider />
        </Protected>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          children: [
            {
              path: 'main',
              element: <HomeMainPage />
            },
            {
              path: 'home',
              element: <HomePage />,
              children: [
                {
                  path: ':id',
                  element: <HomeChildPage />
                }
              ]
            }
          ]
        },
        {
          element: <Protected role={['admin']} />,
          children: [
            {
              path: 'dashboard',
              element: <DashboardPage />
            }
          ]
        }
      ]
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      )
    },
    {
      path: 'no-permission',
      element: <NoPermission />
    },
    {
      path: '*',
      element: <ErrorPage />
    }
  ]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <RouterProvider router={router} />
          <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
