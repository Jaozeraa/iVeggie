import React from 'react';

import * as S from './styles';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

const Button: React.FC<models.ButtonProps> = ({
  backgroundColor,
  disabled = false,
  loading = false,
  onPress,
  textColor,
  variant = 'filled',
  containerStyle,
  children,
}) => {
  const { gray5 } = useTheme().colors;
  return (
    <S.Container
      variant={variant}
      backgroundColor={backgroundColor}
      disabled={disabled || loading}
      loading={loading}
      onPress={onPress}
      style={{ ...containerStyle, borderRadius: 8 }}
    >
      <S.Content
        variant={variant}
        backgroundColor={backgroundColor}
        disabled={disabled}
        style={{ borderRadius: 8 }}
      >
        {loading ? (
          <ActivityIndicator color={textColor} size="small" />
        ) : (
          <S.Text textColor={textColor || gray5}>{children}</S.Text>
        )}
      </S.Content>
    </S.Container>
  );
};

export default Button;
