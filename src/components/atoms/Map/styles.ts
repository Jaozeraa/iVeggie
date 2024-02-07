import MapView from 'react-native-maps';
import styled from 'styled-components/native';

export const Container = styled(MapView)`
  flex: 1;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

export const LoadingContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.gray5};
`;

export const Loading = styled.ActivityIndicator``;

export const Image = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;
