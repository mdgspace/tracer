import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app';
import reportWebVitals from 'reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { store } from 'app/state/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from 'react-query';
import UserState from 'app/context/user/userState';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <UserState>
            <App />
          </UserState>
        </Provider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
