import React from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material';
import App from './App';
import { theme } from './theme';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { ModalProvider } from './hooks/useModal';
import 'react-toastify/dist/ReactToastify.css';
import './toast-styles.css';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <App />
          <ToastContainer />
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>
);
