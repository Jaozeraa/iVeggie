import React from 'react';
import * as S from './styles';
import { navigateTo } from '../../../services/navigation';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../../utils/formatCurrency';

const FoodCard: React.FC<models.FoodCardProps> = ({
  variant = 'vertical',
  food,
  isLastItem,
  containerStyle,
  disabled,
  onPress,
}) => {
  const navigation = useNavigation();

  return (
    <>
      {variant === 'vertical' && (
        <S.VerticalContainer
          disabled={disabled}
          style={containerStyle}
          isLastItem={isLastItem}
          onPress={() => {
            onPress && onPress();
            navigateTo(navigation, 'FoodDetails', { food });
          }}
        >
          <S.Image
            source={{
              uri: food.imageUrl,
            }}
          />
          <S.InformationContainer>
            <S.Title numberOfLines={1} lineBreakMode="tail">
              {food.name}
            </S.Title>
            <S.Description numberOfLines={2} lineBreakMode="tail">
              {food.resume}
            </S.Description>
            <S.Price>{formatCurrency(food.price)}</S.Price>
          </S.InformationContainer>
        </S.VerticalContainer>
      )}
      {variant === 'horizontal' && (
        <S.HorizontalContainer
          disabled={disabled}
          style={containerStyle}
          onPress={() => {
            onPress && onPress();
            navigateTo(navigation, 'FoodDetails', { food });
          }}
        >
          <S.Image
            source={{
              uri: food.imageUrl,
            }}
          />
          <S.InformationContainer>
            <S.Title numberOfLines={1} lineBreakMode="tail">
              {food.name}
            </S.Title>
            <S.Description numberOfLines={2} lineBreakMode="tail">
              {food.resume}
            </S.Description>
            <S.Price>{formatCurrency(food.price)}</S.Price>
          </S.InformationContainer>
        </S.HorizontalContainer>
      )}
    </>
  );
};

export default FoodCard;
