import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { router } from './routes/appRoutes';
import { ThemeProvider } from './shared/context/ThemeContext';
import { AppToaster } from './shared/components/ui/AppToaster';
import { useAppDispatch } from './app/hooks';
import { initializeAuth } from './features/auth/redux/authSlice';
import { consumeOAuthPending } from './features/auth/utils/googleOAuth';
import { toAuthFeedback, toastAuthFeedback } from './features/auth/utils/authToasts';
import { resetIdleDocumentScrollLock } from './shared/hooks/useScrollLock';

const AppInner: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    resetIdleDocumentScrollLock();
  }, []);

  useEffect(() => {
    void (async () => {
      const res = await dispatch(initializeAuth());
      if (initializeAuth.rejected.match(res) && consumeOAuthPending()) {
        toastAuthFeedback(toAuthFeedback(res.payload), 'error');
      }
    })();
  }, [dispatch]);

  return (
    <>
      <RouterProvider router={router} />
      <AppToaster />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppInner />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
