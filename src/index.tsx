import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/state/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <App />
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
