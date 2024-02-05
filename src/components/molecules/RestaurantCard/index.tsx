import React, { useState } from 'react';
import * as S from './styles';
import { useTheme } from 'styled-components';
import { navigateTo } from '../../../services/navigation';
import { useNavigation } from '@react-navigation/native';
import { formatRate } from '../../../utils/formatRate';

const RestaurantCard: React.FC<models.RestaurantCardProps> = ({
  isLastItem = false,
  restaurant,
  containerStyle,
}) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(restaurant.liked);
  const {
    colors: { gray3, yellow, red },
  } = useTheme();

  return (
    <S.Container
      style={containerStyle}
      isLastItem={isLastItem}
      onPress={() => {
        navigateTo(navigation, 'RestaurantDetails', {
          id: restaurant.id,
        });
      }}
    >
      <S.Image
        source={{
          uri: restaurant.imageUrl,
        }}
      />
      <S.InformationContainer>
        <S.TitleContainer>
          <S.Title>{restaurant.name}</S.Title>
          <S.LikeContainer
            hitSlop={16}
            onPress={() => setIsLiked(state => !state)}
          >
            <S.LikeIcon size={14} name="heart" color={isLiked ? red : gray3} />
          </S.LikeContainer>
        </S.TitleContainer>
        <S.Address>{restaurant.address}</S.Address>
        <S.RatingContainer>
          <S.RatingIcon size={14} name="star" color={yellow} />
          <S.Rating>{formatRate(restaurant.rate)}</S.Rating>
        </S.RatingContainer>
      </S.InformationContainer>
    </S.Container>
  );
};

export default RestaurantCard;
