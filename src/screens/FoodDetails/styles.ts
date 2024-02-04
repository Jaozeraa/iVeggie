import styled from 'styled-components/native';
import Header from '../../components/molecules/Header';
import Button from '../../components/atoms/Button';
import FoodCard from '../../components/molecules/FoodCard';
import { Platform } from 'react-native';

export const LoadingContainer = styled.View`
  flex: 1;
  background: ${props => props.theme.colors.primary};
  align-items: center;
  justify-content: center;
`;

export const Loading = styled.ActivityIndicator``;

export const Container = styled.View`
  flex: 1;
  position: relative;
`;

export const FoodImage = styled.ImageBackground`
  width: 100%;
  height: 65%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: -1;
`;

export const ContentContainer = styled.View`
  flex: 1;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
  padding-top: ${Platform.OS === 'ios' ? 32 : 56}px;
  justify-content: flex-end;
`;

export const HeaderContainer = styled.View`
  padding-horizontal: 24px;
  width: 100%;
  height: 100px;
  flex: 1;
`;

export const Content = styled.View`
  height: 65%;
  position: relative;
`;

export const BottomSheetContainer = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.gray5};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  padding: 24px 0 40px;
`;

export const FoodDataContainer = styled.View`
  padding-horizontal: 24px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: ${props => props.theme.fonts.tolyerMedium};
  color: ${props => props.theme.colors.gray1};
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const Description = styled.Text`
  font-family: ${props => props.theme.fonts.interRegular};
  font-size: 16px;
  color: ${props => props.theme.colors.gray2};
`;

export const OrderBumpTitle = styled.Text`
  font-family: ${props => props.theme.fonts.tolyerMedium};
  font-size: 24px;
  color: ${props => props.theme.colors.gray1};
  margin: 16px 0 8px;
`;

export const OrderBumpList = styled.FlatList``;

export const FoodCardContainer = styled.View<models.RestaurantCardContainerProps>`
  width: 308px;
  height: 96px;
  padding: 8px;
  border: 1px solid ${props => props.theme.colors.gray4};
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  margin-right: ${props => (props.isLastItem ? '0' : '16px')};
`;

export const Footer = styled.View`
  margin-top: auto;
  width: 100%;
  padding-horizontal: 24px;
`;

export { Header, Button, FoodCard };
