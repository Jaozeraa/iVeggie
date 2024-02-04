import React from 'react';

import * as S from './styles';

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
  return (
    <S.Container
      variant={variant}
      backgroundColor={backgroundColor}
      disabled={disabled || loading}
      onPress={onPress}
      style={{ ...containerStyle, borderRadius: 8 }}
    >
      <S.Content
        variant={variant}
        backgroundColor={backgroundColor}
        disabled={disabled}
        style={{ borderRadius: 8 }}
      >
        <S.Text textColor={textColor}>{children}</S.Text>
      </S.Content>
    </S.Container>
  );
};

export default Button;
