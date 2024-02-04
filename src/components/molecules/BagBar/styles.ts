import styled from 'styled-components/native';

export const Container = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  flex: 1;
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
