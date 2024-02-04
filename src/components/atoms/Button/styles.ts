import { RectButton } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components/native';

export const Container = styled(RectButton)<models.ButtonProps>`
  width: 100%;
  height: 56px;
  background-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.primary};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};

  ${({ variant }) =>
    variant === 'outlined' &&
    css`
      background-color: transparent;
    `}
`;

export const Content = styled.View<models.ButtonProps>`
  flex: 1;
  border-width: 1px;
  background-color: transparent;
  border-color: ${({ theme, backgroundColor }) =>
    backgroundColor || theme.colors.primary};
  align-items: center;
  justify-content: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

export const Text = styled.Text<models.ButtonProps>`
  color: ${({ theme, textColor }) => textColor || theme.colors.gray5};
  font-family: ${({ theme }) => theme.fonts.tolyerMedium};
  font-size: 20px;
`;
