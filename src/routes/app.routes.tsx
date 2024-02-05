import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

import Welcome from '../screens/Welcome';
import Login from '../screens/Login';
import Register from '../screens/Register';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPassword from '../screens/ResetPassword';

const App = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  const {
    colors: { gray5 },
  } = useTheme();

  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: gray5 },
      }}
      initialRouteName="Welcome"
    >
      <App.Screen name="Welcome" component={Welcome} />
      <App.Screen name="Login" component={Login} />
      <App.Screen name="Register" component={Register} />
      <App.Screen name="ForgotPassword" component={ForgotPassword} />
      <App.Screen name="ResetPassword" component={ResetPassword} />
    </App.Navigator>
  );
};

export default AppRoutes;
