import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useTheme } from 'styled-components';

import Home from '../screens/Home';
import RestaurantDetails from '../screens/RestaurantDetails';
import FoodDetails from '../screens/FoodDetails';

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
    >
      <Auth.Screen name="Home" component={Home} />
      <Auth.Screen name="RestaurantDetails" component={RestaurantDetails} />
      <Auth.Screen
        name="FoodDetails"
        component={FoodDetails}
        options={{
          presentation: 'modal',
        }}
      />
    </Auth.Navigator>
  );
};

export default AuthRoutes;
