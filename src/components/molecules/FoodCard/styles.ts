import styled from 'styled-components/native';
import { css } from 'styled-components';

export const VerticalContainer = styled.TouchableOpacity<models.RestaurantCardContainerProps>`
  width: 100%;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.gray4};
  flex-direction: row;
  align-items: center;
  margin-bottom: ${props => (props.isLastItem ? '0' : '16px')};

  ${props =>
    props.isLastItem &&
    css`
      border-bottom-width: 0;
    `}
`;

export const Image = styled.Image`
  width: 104px;
  height: 80px;
  border-radius: 8px;
  margin-right: 16px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.gray4};
`;

export const InformationContainer = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.tolyerMedium};
  font-size: 20px;
  color: ${props => props.theme.colors.gray1};
`;

export const Description = styled.Text`
  font-family: ${props => props.theme.fonts.interRegular};
  font-size: 14px;
  color: ${props => props.theme.colors.gray2};
  margin-top: 4px;
`;

export const Price = styled.Text`
  font-family: ${props => props.theme.fonts.interMedium};
  font-size: 14px;
  color: ${props => props.theme.colors.gray2};
  margin-top: 4px;
`;

export const HorizontalContainer = styled.TouchableOpacity`
  width: 100%;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
`;
