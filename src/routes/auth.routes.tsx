import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

import Home from '../screens/Home';
import RestaurantDetails from '../screens/RestaurantDetails';
import DishDetails from '../screens/DishDetails';
import OrderTracking from '../screens/OrderTracking';

const Auth = createNativeStackNavigator();

const AuthRoutes: React.FC = () => {
  const {
    colors: { primary },
  } = useTheme();

  return (
    <Auth.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: primary },
      }}
      initialRouteName="Home"
    >
      <Auth.Screen name="Home" component={Home} />
      <Auth.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Auth.Screen
        name="DishDetails"
        component={DishDetails}
        options={{
          presentation: 'modal',
        }}
      />
      <Auth.Screen name="OrderTracking" component={OrderTracking} />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
