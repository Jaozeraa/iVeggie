import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';
import { useAuth } from '../hooks/auth';

const Routes: React.FC = () => {
  const { user, loading } = useAuth();

  useEffect(() => {
    (async () => {
      if (!loading) {
        await SplashScreen.hideAsync();
      }
    })();
  }, [loading]);

  return user ? <AuthRoutes /> : <AppRoutes />;
};

export default Routes;
