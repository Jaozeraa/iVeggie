import { Animated } from 'react-native';
import styled, { css } from 'styled-components/native';
import Icon from '@expo/vector-icons/Feather';

export const Container = styled(Animated.View)`
  background: ${props => props.theme.colors.gray5};
  border-radius: 8px;

  ${props =>
    props.theme.activeTheme === 'dark' &&
    css`
      background: ${props => props.theme.colors.gray3};
    `}
`;

export const Content = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

export const MessageImage = styled.Image`
  width: 56px;
  height: 56px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
`;

const toastTypeVariations: models.ToastTypeVariations = {
  success: css`
    background: ${props => props.theme.colors.secondary};
  `,
  error: css`
    background: ${props => props.theme.colors.red};
  `,
};

export const TypeMessageView = styled.View<models.TypeMessageViewProps>`
  width: 56px;
  height: 56px;
  background: ${props => props.theme.colors.primary};
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  align-items: center;
  justify-content: center;

  ${props => toastTypeVariations[props.type || 'error']}
`;

export const TypeMessageIcon = styled(Icon).attrs({
  size: 32,
})``;

export const Message = styled.Text`
  font-family: ${props => props.theme.fonts.interMedium};
  font-size: 14px;
  color: ${props => props.theme.colors.gray1};
  padding: 12px;
  flex-shrink: 1;
`;
