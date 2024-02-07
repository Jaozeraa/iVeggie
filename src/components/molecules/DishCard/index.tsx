import React from 'react';
import * as S from './styles';
import { navigateTo } from '../../../services/navigation';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../../utils/formatCurrency';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const DishCard: React.FC<models.DishCardProps> = ({
  variant = 'vertical',
  dish,
  isLastItem,
  containerStyle,
  disabled,
  onPress,
  loading,
}) => {
  const navigation = useNavigation();
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <>
      {variant === 'vertical' && (
        <S.VerticalContainer
          disabled={loading || disabled}
          style={containerStyle}
          isLastItem={!loading && isLastItem}
          onPress={() => {
            onPress && onPress();
            navigateTo(navigation, 'DishDetails', { id: dish.id });
          }}
        >
          {loading ? (
            <ShimmerPlaceholder
              shimmerStyle={{
                width: 104,
                height: 80,
                borderRadius: 8,
                marginRight: 16,
              }}
              visible={!loading}
            />
          ) : (
            <S.Image
              source={{
                uri: dish?.imageUrl,
              }}
            />
          )}
          <S.InformationContainer>
            <ShimmerPlaceholder visible={!loading}>
              <S.Title numberOfLines={1} lineBreakMode="tail">
                {dish?.name}
              </S.Title>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={{
                marginTop: 4,
                height: 32,
              }}
              visible={!loading}
            >
              <S.Description numberOfLines={2} lineBreakMode="tail">
                {dish?.resume}
              </S.Description>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={{
                marginTop: 4,
                width: 50,
              }}
              visible={!loading}
            >
              <S.Price>{formatCurrency(dish?.price)}</S.Price>
            </ShimmerPlaceholder>
          </S.InformationContainer>
        </S.VerticalContainer>
      )}
      {variant === 'horizontal' && (
        <S.HorizontalContainer
          disabled={loading || disabled}
          style={containerStyle}
          onPress={() => {
            onPress && onPress();
            navigateTo(navigation, 'DishDetails', { id: dish.id });
          }}
        >
          {loading && (
            <ShimmerPlaceholder
              shimmerStyle={{
                width: 104,
                height: 80,
                borderRadius: 8,
                marginRight: 16,
              }}
              visible={!loading}
            />
          )}
          <S.Image
            source={{
              uri: dish?.imageUrl,
            }}
          />
          <S.InformationContainer>
            <ShimmerPlaceholder
              shimmerStyle={{
                width: '100%',
              }}
              visible={!loading}
            >
              <S.Title numberOfLines={1} lineBreakMode="tail">
                {dish?.name}
              </S.Title>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={{
                marginTop: 4,
                height: 32,
                width: '100%',
              }}
              visible={!loading}
            >
              <S.Description numberOfLines={2} lineBreakMode="tail">
                {dish?.resume}
              </S.Description>
            </ShimmerPlaceholder>
            <ShimmerPlaceholder
              shimmerStyle={{
                marginTop: 4,
                width: 50,
              }}
              visible={!loading}
            >
              <S.Price>{formatCurrency(dish?.price)}</S.Price>
            </ShimmerPlaceholder>
          </S.InformationContainer>
        </S.HorizontalContainer>
      )}
    </>
  );
};

export default DishCard;
