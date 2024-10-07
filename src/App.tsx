import AppProvider from '@/providers/AppProvider';
import createRouter from '@/routes/createRouter';
import route from '@/routes/routes';
import { store } from '@/stores/redux/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { lazy } from 'react';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import './App.css';

const ErrorPage = lazy(() => import('@/pages/error/error'));

const queryClient = new QueryClient();

function App() {
  const router = createBrowserRouter(
    createRouter([
      {
        path: '/',
        component: <AppProvider />,
        errorElement: ErrorPage,
        children: [...route]
      }
    ])
  );

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
