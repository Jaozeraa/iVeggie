import React, { useEffect } from 'react';
import { Animated } from 'react-native';
import { useTheme } from 'styled-components';

import * as S from './styles';

const icons = {
  error: 'x-circle',
  success: 'check-circle',
};

const Toast: React.FC<models.ToastProps> = ({ message, removeToast }) => {
  const translateY = new Animated.Value(-200);
  const {
    colors: { gray5 },
  } = useTheme();

  Animated.spring(translateY, {
    toValue: 0,
    useNativeDriver: true,
  }).start(() => {
    Animated.delay(1500).start(() => {
      Animated.spring(translateY, {
        toValue: -200,
        useNativeDriver: true,
      }).start();
    });
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  }, [removeToast]);

  return (
    <S.Container
      style={{
        transform: [
          {
            translateY,
          },
        ],
      }}
    >
      <S.Content>
        <S.TypeMessageView type={message.type}>
          <S.TypeMessageIcon
            name={icons[message.type || 'error'] as any}
            color={gray5}
          />
        </S.TypeMessageView>
        <S.Message numberOfLines={2} ellipsizeMode="tail">
          {message.message}
        </S.Message>
      </S.Content>
    </S.Container>
  );
};

export default Toast;
