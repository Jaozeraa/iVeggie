import styled, { css } from 'styled-components/native';
import { Controller } from 'react-hook-form';

export const Container = styled.View`
  width: 100%;
`;

export const Content = styled.View<models.ContentInputProps>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border: 0 solid ${props => props.theme.colors.gray3};
  border-bottom-width: 1px;
  padding-bottom: 8px;

  ${props =>
    props.isFocused &&
    css`
      border-color: ${props.theme.colors.primary};
    `}
`;

export const InputController = styled(Controller)`
  width: 100%;
`;

export const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${props => props.theme.colors.gray1};
  font-family: ${props => props.theme.fonts.interRegular};
  padding-right: 16px;
`;

export const Error = styled.Text`
  font-size: 14px;
  font-family: ${props => props.theme.fonts.interRegular};
  color: ${props => props.theme.colors.red};
  margin-top: 4px;
`;

export { Controller };
