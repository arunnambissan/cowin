import React, { useState } from 'react';
import AppRouter from './navigations/AppRouter';
import AuthContext from './auth/context';
import SplashNavigator from './navigations/SplashNavigator';
import { authRoutes, dashboardRoutes } from './routes';
import theme from './theme';
import { ThemeProvider } from '@material-ui/core';

export default function App() {

  const [user, setUser] = useState({});
  const [authInProgress, setAuthInProgress] = useState(true);

  return (
    <ThemeProvider theme={theme}>
      <AuthContext.Provider value={{
        user, setUser,
        authInProgress, setAuthInProgress,
      }}>

        {authInProgress ? (
          <SplashNavigator />
        ) : user && user.id ? (
          <AppRouter name="dashboard-router" routes={dashboardRoutes} />
        ) : (
          <AppRouter name="auth-router" routes={authRoutes} />
        )}

      </AuthContext.Provider>
    </ThemeProvider>
  );
}
