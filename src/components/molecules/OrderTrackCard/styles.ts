import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  background-color: ${props => props.theme.colors.gray5};
  border-radius: 8px;
  padding: 24px;
`;

export const Label = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.gray2};
  font-family: ${props => props.theme.fonts.interRegular};
`;

export const Title = styled.Text`
  font-size: 32px;
  color: ${props => props.theme.colors.gray1};
  font-family: ${props => props.theme.fonts.tolyerMedium};
`;

export const Progress = styled.View`
  width: 100%;
  flex-direction: row;
  margin-vertical: 16px;
  background-color: ${props => props.theme.colors.gray4};
  border-radius: 2px;
  height: 8px;
  border-left-width: 8px;
  border-color: ${props => props.theme.colors.primary};
`;
