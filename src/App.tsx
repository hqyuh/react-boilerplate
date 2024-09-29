import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Provider } from 'react-redux';

import './App.css';
import Auth from './pages/auth/auth';
import { store } from './stores/store';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          {/* route */}
          <Auth />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
