import type { TRouter } from '@/routes/createRouter';
import { lazy } from 'react';

const HomePage = lazy(() => import('@/pages/home/home'));
const HomeChildPage = lazy(() => import('@/pages/home/home-child'));
const DashboardPage = lazy(() => import('@/pages/dashboard/dashboard'));
const HomeMainPage = lazy(() => import('@/pages/home/home-main'));

const route: TRouter[] = [
  {
    path: '/',
    redirectTo: 'main'
  },
  {
    path: 'main',
    element: HomeMainPage
  },
  {
    path: 'home',
    element: HomePage,
    children: [
      {
        path: ':id',
        element: HomeChildPage
      }
    ]
  },
  {
    path: 'dashboard',
    element: DashboardPage
  }
];

export default route;
