import { NavigationProp } from '@react-navigation/native';

const navigateTo = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  to: string,
  params?: any,
) => {
  navigation.navigate(to, params);
};

const navigateBack = (navigation: any) => {
  navigation.goBack();
};

const resetTo = (
  navigation: NavigationProp<ReactNavigation.RootParamList>,
  routes: any[],
) => {
  navigation.reset({
    index: 0,
    routes,
  });
};

export { navigateTo, navigateBack, resetTo };
