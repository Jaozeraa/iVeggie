import styled from 'styled-components/native';
import BrandWallpaperVector from '../../components/atoms/BrandWallpaperVector';
import Header from '../../components/molecules/Header';
import OrderTrackCard from '../../components/molecules/OrderTrackCard';
import Map from '../../components/atoms/Map';
import RestaurantCard from '../../components/molecules/RestaurantCard';
import { RectButton } from 'react-native-gesture-handler';
import Feather from '@expo/vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  background-color: ${props => props.theme.colors.primary};
  position: relative;
`;

export const WallpaperContainer = styled.View`
  width: 100%;
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
  justify-content: flex-end;
`;

export const HeaderContent = styled.View`
  margin-bottom: auto;
  width: 100%;
`;

export const Content = styled.View`
  height: 92.5%;
  position: relative;
`;

export const OrderTrackingContainer = styled.View`
  position: absolute;
  width: 100%;
  padding-horizontal: 24px;
  top: 0;
  z-index: 2;
`;

export const BottomSheetContainer = styled.View`
  flex: 1;
  margin-top: 72px;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  overflow: hidden;
`;

export const Footer = styled.View`
  padding: 16px 24px 40px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.gray5};
  border-top-width: 1px;
  border-color: ${props => props.theme.colors.gray4};
`;

export const RestaurantCardContainer = styled.View`
  flex: 1;
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

export { BrandWallpaperVector, Header, OrderTrackCard, RestaurantCard, Map };
