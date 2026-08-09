import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { router } from './routes/appRoutes';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './shared/context/ThemeContext';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: '#111827',
            color: '#F9FAFB',
            border: '1px solid #1F2937',
            fontSize: '13px',
            fontFamily: 'Inter, sans-serif',
          },
          success: {
            iconTheme: {
              primary: '#10B981',
              secondary: '#111827',
            },
          },
          error: {
            iconTheme: {
              primary: '#F43F5E',
              secondary: '#111827',
            },
          },
        }}
      />
      <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
