import { store } from '@/stores/redux/store';
import '@/translation/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import './App.css';
import AuthLayout from './layouts/auth-layout';
import MainLayout from './layouts/main-layout';
import AuthProvider from './providers/auth-provider';
import ProtectedRoute from './routes/protected-route';
import PublicRoute from './routes/public-route';

const lz = React.lazy;

const ErrorPage = lz(() => import('@/pages/error/error'));
const LoginPage = lz(() => import('@/pages/auth/auth'));
const HomePage = lz(() => import('@/pages/home/home'));
const HomeChildPage = lz(() => import('@/pages/home/home-child'));
const DashboardPage = lz(() => import('@/pages/dashboard/dashboard'));
const KanbanBoardPage = lz(() => import('@/pages/kanban-board/kanban-board'));
const HomeMainPage = lz(() => import('@/pages/home/home-main'));
const NoPermission = lz(() => import('@/pages/no-permission/no-permission'));
const HehePage = lz(() => import('@/pages/auth/hehe'));

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
        <ProtectedRoute roleRequired={['admin', 'user']}>
          <MainLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
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
        },
        {
          element: <ProtectedRoute roleRequired={['admin']} />,
          children: [
            {
              path: 'dashboard',
              element: <DashboardPage />
            },
            {
              path: 'kanban-board',
              element: <KanbanBoardPage />
            }
          ]
        }
      ]
    },
    {
      path: '/auth',
      element: (
        <PublicRoute>
          <AuthLayout />
        </PublicRoute>
      ),
      children: [
        {
          path: 'login',
          element: <LoginPage />
        },
        {
          path: 'register',
          element: <HehePage />
        }
      ]
    },
    {
      path: 'no-permission',
      element: <NoPermission />,
      errorElement: <ErrorPage />
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
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
