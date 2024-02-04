import styled, { css } from 'styled-components/native';
import BottomSheet from '../../atoms/BottomSheet';
import Feather from '@expo/vector-icons/Feather';
import FoodCard from '../../molecules/FoodCard';
import Header from '../../molecules/Header';

export const Container = styled.View`
  width: 100%;
`;

export const HeaderContainer = styled.View`
  width: 100%;
  padding: 24px;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-family: ${props => props.theme.fonts.tolyerMedium};
  color: ${props => props.theme.colors.gray1};
`;

export const CloseButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const CloseIcon = styled(Feather)``;

export const ItemsList = styled.FlatList`
  padding-horizontal: 24px;
`;

export const FoodCardContainer = styled.View<models.RestaurantCardContainerProps>`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.gray4};
  margin-bottom: 16px;

  ${props =>
    props.isLastItem &&
    css`
      border-bottom-width: 0px;
      margin-bottom: 0;
      padding-bottom: 0;
    `}
`;

export const FoodCardContent = styled.View`
  max-width: 296px;
  flex-direction: row;
`;

export const DeleteButton = styled.TouchableOpacity`
  max-width: 24px;
  max-height: 24px;
  align-items: center;
  justify-content: center;
`;

export const DeleteIcon = styled(Feather)``;

export const PriceTable = styled.View`
  padding-horizontal: 24px;
  margin-top: 24px;
`;

export const SubPriceTableLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

export const SubPriceText = styled.Text`
  font-size: 14px;
  font-family: ${props => props.theme.fonts.interRegular};
  color: ${props => props.theme.colors.gray2};
`;

export const PriceTableLine = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-top: 8px;
  border-top-width: 1px;
  border-color: ${props => props.theme.colors.gray3};
  margin-bottom: 24px;
`;

export const PriceText = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.interSemiBold};
  color: ${props => props.theme.colors.gray1};
`;

export const Footer = styled.View`
  padding: 24px 24px 40px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background: ${props => props.theme.colors.gray5};
  border-color: ${props => props.theme.colors.gray4};
  border-top-width: 1px;
`;

export const PriceContainer = styled.View``;

export const PriceTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Price = styled.Text`
  font-size: 16px;
  font-family: ${props => props.theme.fonts.interSemiBold};
  color: ${props => props.theme.colors.gray1};
`;

export const PriceLabel = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.gray2};
  margin-bottom: 4px;
`;

export const ItemsLabel = styled.Text`
  font-size: 14px;
  color: ${props => props.theme.colors.gray2};
  margin-left: 4px;
`;

export const CheckoutButton = styled.TouchableOpacity`
  padding: 8px 16px;
  background: ${props => props.theme.colors.primary};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;

export const CheckoutButtonText = styled.Text`
  font-size: 14px;
  font-family: ${props => props.theme.fonts.interSemiBold};
  color: ${props => props.theme.colors.gray5};
`;

export { BottomSheet, FoodCard, Header };
