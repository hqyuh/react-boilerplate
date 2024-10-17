import AppProvider from '@/providers/AppProvider';
import Protected from '@/routes/protectedRoute';
import PublicRoute from '@/routes/publicRoute';
import { store } from '@/stores/redux/store';
import '@/translation/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy, Suspense } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import TopBarProgress from 'react-topbar-progress-indicator';

import './App.css';

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
      path: 'login',
      element: (
        <PublicRoute>
          <Suspense fallback={<TopBarProgress />}>
            <LoginPage />
          </Suspense>
        </PublicRoute>
      )
    },
    {
      path: 'no-permission',
      element: (
        <Suspense fallback={<TopBarProgress />}>
          <NoPermission />
        </Suspense>
      )
    },
    {
      path: '/',
      element: (
        <Protected role={['admin', 'user']}>
          <AppProvider />
        </Protected>
      ),
      errorElement: (
        <Suspense fallback={<TopBarProgress />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        {
          children: [
            {
              path: 'main',
              element: (
                <Suspense fallback={<TopBarProgress />}>
                  <HomeMainPage />
                </Suspense>
              )
            },
            {
              path: 'home',
              element: (
                <Suspense fallback={<TopBarProgress />}>
                  <HomePage />
                </Suspense>
              ),
              children: [
                {
                  path: ':id',
                  element: (
                    <Suspense fallback={<TopBarProgress />}>
                      <HomeChildPage />
                    </Suspense>
                  )
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
              element: (
                <Suspense fallback={<TopBarProgress />}>
                  <DashboardPage />
                </Suspense>
              )
            }
          ]
        }
      ]
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
