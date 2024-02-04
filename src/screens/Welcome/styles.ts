import styled from 'styled-components/native';
import background from '../../assets/welcome_background.jpg';
import Button from '../../components/atoms/Button';

export const Container = styled.ImageBackground.attrs({
  source: background,
  resizeMode: 'cover',
})`
  flex: 1;
  background-color: ${props => props.theme.colors.primary};
  padding: 56px 24px 40px 24px;
  justify-content: flex-end;
`;

export { Button };
