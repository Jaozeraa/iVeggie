import React, { useEffect } from 'react';

import AppRoutes from './app.routes';
import AuthRoutes from './auth.routes';

const Routes: React.FC = () => {
  //   const { user, loading } = useAuth();

  //   useEffect(() => {
  //     if (!loading) {
  //       SplashScreen.hide();
  //     }
  //   }, [loading]);

  //   return user ? <AuthRoutes /> : <AppRoutes />;
  return <AuthRoutes />;
};

export default Routes;
