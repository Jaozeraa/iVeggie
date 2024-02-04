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

export { navigateTo, navigateBack };
