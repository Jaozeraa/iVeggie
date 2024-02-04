import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import Header from '../../components/molecules/Header';
import Feather from '@expo/vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';
import FoodCard from '../../components/molecules/FoodCard';
import Logo from '../../components/atoms/Logo';

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

export const Wallpaper = styled.ImageBackground`
  width: 100%;
  height: 50%;
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
  padding-top: 56px;
  justify-content: flex-end;
`;

export const HeaderContainer = styled.View`
  padding-horizontal: 24px;
  width: 100%;
  height: 100px;
  flex: 1;
`;

export const Content = styled.View`
  height: 92.5%;
  position: relative;
`;

export const ActionsContainer = styled.View`
  position: absolute;
  width: 100%;
  padding-horizontal: 24px;
  top: 0;
  z-index: 2;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
`;

export const Image = styled.Image`
  width: 96px;
  height: 96px;
  border-radius: 48px;
  border-width: 2px;
  border-color: ${props => props.theme.colors.gray4};
`;

export const ButtonsContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const ActionButton = styled(RectButton)`
  width: 48px;
  height: 48px;
  background-color: ${props => props.theme.colors.gray4};
  align-items: center;
  justify-content: center;
  margin-left: 8px;
`;

export const ActionIcon = styled(Feather)``;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 8px;
`;

export const Title = styled.Text`
  font-size: 32px;
  font-family: ${props => props.theme.fonts.tolyerMedium};
  color: ${props => props.theme.colors.gray1};
  margin-right: 8px;
  margin-bottom: 8px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Rating = styled.Text`
  font-family: ${props => props.theme.fonts.interSemiBold};
  font-size: 16px;
  color: ${props => props.theme.colors.yellowDark};
  margin-right: 4px;
`;

export const RatingIcon = styled(Feather)``;

export const Address = styled.Text`
  font-family: ${props => props.theme.fonts.interRegular};
  font-size: 16px;
  color: ${props => props.theme.colors.gray2};
`;

export const BottomSheetContainer = styled.View`
  flex: 1;
  margin-top: 48px;
  background-color: ${props => props.theme.colors.gray5};
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
`;

export const RestaurantDataContainer = styled.View`
  padding: 48px 24px 24px 24px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-color: ${props => props.theme.colors.gray4};
  border-bottom-width: 1px;
`;

export const FoodList = styled(FlatList)``;

export { Header, FoodCard, Logo };
