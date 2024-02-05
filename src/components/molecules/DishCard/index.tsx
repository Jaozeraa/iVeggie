import React from 'react';
import * as S from './styles';
import { navigateTo } from '../../../services/navigation';
import { useNavigation } from '@react-navigation/native';
import { formatCurrency } from '../../../utils/formatCurrency';

const DishCard: React.FC<models.DishCardProps> = ({
  variant = 'vertical',
  dish,
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
            navigateTo(navigation, 'DishDetails', { id: dish.id });
          }}
        >
          <S.Image
            source={{
              uri: dish.imageUrl,
            }}
          />
          <S.InformationContainer>
            <S.Title numberOfLines={1} lineBreakMode="tail">
              {dish.name}
            </S.Title>
            <S.Description numberOfLines={2} lineBreakMode="tail">
              {dish.resume}
            </S.Description>
            <S.Price>{formatCurrency(dish.price)}</S.Price>
          </S.InformationContainer>
        </S.VerticalContainer>
      )}
      {variant === 'horizontal' && (
        <S.HorizontalContainer
          disabled={disabled}
          style={containerStyle}
          onPress={() => {
            onPress && onPress();
            navigateTo(navigation, 'DishDetails', { id: dish.id });
          }}
        >
          <S.Image
            source={{
              uri: dish.imageUrl,
            }}
          />
          <S.InformationContainer>
            <S.Title numberOfLines={1} lineBreakMode="tail">
              {dish.name}
            </S.Title>
            <S.Description numberOfLines={2} lineBreakMode="tail">
              {dish.resume}
            </S.Description>
            <S.Price>{formatCurrency(dish.price)}</S.Price>
          </S.InformationContainer>
        </S.HorizontalContainer>
      )}
    </>
  );
};

export default DishCard;
