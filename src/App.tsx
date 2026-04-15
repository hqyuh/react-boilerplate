import { store } from '@/stores/redux/store';
import '@/translation/i18n';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Matches, RouterContextProvider } from '@tanstack/react-router';
import { NuqsAdapter } from 'nuqs/adapters/tanstack-router';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';

import './App.css';
import AuthProvider from './providers/auth-provider';
import { router } from './router';

const queryClient = new QueryClient();

function App() {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <HelmetProvider>
          <AuthProvider>
            <RouterContextProvider router={router}>
              <NuqsAdapter>
                <Matches />
              </NuqsAdapter>
            </RouterContextProvider>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </HelmetProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
