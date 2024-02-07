import React, { useState } from 'react';
import * as S from './styles';
import { useTheme } from 'styled-components';
import { navigateTo } from '../../../services/navigation';
import { useNavigation } from '@react-navigation/native';
import { formatRate } from '../../../utils/formatRate';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const RestaurantCard: React.FC<models.RestaurantCardProps> = ({
  isLastItem = false,
  restaurant,
  containerStyle,
  disabled,
  loading,
}) => {
  const navigation = useNavigation();
  const [isLiked, setIsLiked] = useState(restaurant?.liked);
  const {
    colors: { gray3, yellow, red },
  } = useTheme();

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <S.Container
      disabled={disabled || loading}
      style={containerStyle}
      isLastItem={!loading && isLastItem}
      onPress={() => {
        navigateTo(navigation, 'RestaurantDetails', {
          id: restaurant.id,
        });
      }}
    >
      <ShimmerPlaceholder
        shimmerStyle={{
          width: 56,
          height: 56,
          borderRadius: 28,
          marginRight: 16,
        }}
        visible={!loading}
      >
        <S.Image
          source={{
            uri: restaurant?.imageUrl,
          }}
        />
      </ShimmerPlaceholder>
      <S.InformationContainer>
        <S.TitleContainer>
          <ShimmerPlaceholder visible={!loading}>
            <S.Title>{restaurant?.name}</S.Title>
          </ShimmerPlaceholder>
          {!disabled && (
            <S.LikeContainer
              hitSlop={16}
              onPress={() => setIsLiked(state => !state)}
            >
              <S.LikeIcon
                size={14}
                name="heart"
                color={isLiked ? red : gray3}
              />
            </S.LikeContainer>
          )}
        </S.TitleContainer>
        <ShimmerPlaceholder
          shimmerStyle={{
            marginTop: 4,
            width: 100,
          }}
          visible={!loading}
        >
          <S.Address>{restaurant?.address}</S.Address>
        </ShimmerPlaceholder>
        <ShimmerPlaceholder
          shimmerStyle={{
            marginTop: 4,
            width: 50,
          }}
          visible={!loading}
        >
          <S.RatingContainer>
            <S.RatingIcon size={14} name="star" color={yellow} />
            <S.Rating>{formatRate(restaurant?.rate)}</S.Rating>
          </S.RatingContainer>
        </ShimmerPlaceholder>
      </S.InformationContainer>
    </S.Container>
  );
};

export default RestaurantCard;
