import React, { useEffect, useRef } from 'react';

import * as S from './styles';
import { Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components/native';
import { i18n } from '../../services/translator';
import { useNavigation } from '@react-navigation/native';
import { navigateTo } from '../../services/navigation';

const Welcome: React.FC = () => {
  const {
    colors: { gray5, primary },
  } = useTheme();
  const navigation = useNavigation();
  const enterAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(enterAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [enterAnim]);

  return (
    <S.Container>
      <StatusBar style="light" animated />
      <Animated.View
        style={{
          transform: [
            {
              translateY: enterAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 0],
              }),
            },
          ],
        }}
      >
        <S.Button
          onPress={() => {
            navigateTo(navigation, 'Login');
          }}
          backgroundColor={gray5}
          textColor={primary}
          containerStyle={{ marginBottom: 16 }}
        >
          {i18n.t('screens.welcome.buttons.login')}
        </S.Button>
        <S.Button
          onPress={() => {
            navigateTo(navigation, 'Register');
          }}
          backgroundColor={gray5}
          textColor={gray5}
          variant="outlined"
        >
          {i18n.t('screens.welcome.buttons.register')}
        </S.Button>
      </Animated.View>
    </S.Container>
  );
};

export default Welcome;
