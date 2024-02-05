import { StatusBar } from 'expo-status-bar';
import RootProvider from './src/hooks';
import * as SplashScreen from 'expo-splash-screen';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import Routes from './src/routes';
import { NavigationContainer } from '@react-navigation/native';

SplashScreen.preventAutoHideAsync();
const App: React.FC = () => {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Regular': require('./assets/fonts/Inter-Regular.ttf'),
    'Inter-Medium': require('./assets/fonts/Inter-Medium.ttf'),
    'Inter-SemiBold': require('./assets/fonts/Inter-SemiBold.ttf'),
    'TolyerNo1-Medium': require('./assets/fonts/TolyerNo1-Medium.ttf'),
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootProvider>
          <Routes />
        </RootProvider>
        <StatusBar style="light" animated />
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;
