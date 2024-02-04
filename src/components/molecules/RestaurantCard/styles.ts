import styled from 'styled-components/native';
import Feather from '@expo/vector-icons/Feather';
import { css } from 'styled-components';

export const Container = styled.TouchableOpacity<models.RestaurantCardContainerProps>`
  width: 100%;
  padding-bottom: 16px;
  border-bottom-width: 1px;
  border-bottom-color: ${props => props.theme.colors.gray4};
  flex-direction: row;
  margin-bottom: ${props => (props.isLastItem ? '0' : '16px')};

  ${props =>
    props.isLastItem &&
    css`
      border-bottom-width: 0;
    `}
`;

export const Image = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 32px;
  margin-right: 16px;
  border-width: 1px;
  border-color: ${props => props.theme.colors.gray4};
`;

export const InformationContainer = styled.View`
  flex: 1;
`;

export const TitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${props => props.theme.fonts.tolyerMedium};
  font-size: 18px;
  color: ${props => props.theme.colors.gray1};
`;

export const LikeContainer = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
`;

export const LikeIcon = styled(Feather)``;

export const Address = styled.Text`
  font-family: ${props => props.theme.fonts.interRegular};
  font-size: 14px;
  color: ${props => props.theme.colors.gray2};
  margin-top: 4px;
`;

export const RatingContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 4px;
`;

export const Rating = styled.Text`
  font-family: ${props => props.theme.fonts.interSemiBold};
  font-size: 14px;
  color: ${props => props.theme.colors.yellowDark};
  margin-left: 4px;
`;

export const RatingIcon = styled(Feather)``;
