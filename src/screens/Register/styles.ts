import styled from 'styled-components/native';
import Button from '../../components/atoms/Button';
import Input from '../../components/atoms/Input';
import Header from '../../components/molecules/Header';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${props => props.theme.colors.gray5};
  padding: 0 24px 40px 24px;
  margin-top: 56px;
`;

export const LogoContainer = styled.View`
  align-self: flex-start;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 4px;
  background: ${props => props.theme.colors.secondary};
  margin-top: 24px;
`;

export const Title = styled.Text`
  font-size: 40px;
  font-family: ${({ theme }) => theme.fonts.tolyerMedium};
  color: ${props => props.theme.colors.gray1};
`;

export const Description = styled.Text`
  font-size: 16px;
  font-family: ${({ theme }) => theme.fonts.interRegular};
  color: ${props => props.theme.colors.gray1};
  margin: 8px 0 24px;
`;

export const Footer = styled.View`
  flex: 1;
  justify-content: flex-end;
  margin-top: 32px;
`;

export { Button, Input, Header };
