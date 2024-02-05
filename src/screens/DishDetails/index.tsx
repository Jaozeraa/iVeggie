import React, { useCallback, useEffect, useState } from 'react';

import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { i18n } from '../../services/translator';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatCurrency } from '../../utils/formatCurrency';
import { useBag } from '../../hooks/bag';
import { navigateBack } from '../../services/navigation';
import { Platform } from 'react-native';
import { useTheme } from 'styled-components';
import DishesApi from '../../repositories/dishes';

const DishDetails: React.FC = () => {
  const {
    colors: { gray5 },
  } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const bag = useBag();
  const { id } = route.params as { id: string };
  const [dish, setDish] = useState<models.Dish | null>(null);
  const [suggestedDishes, setSuggestedDishes] = useState<models.Dish[]>([]);

  useEffect(() => {
    (async () => {
      const data = await DishesApi.getDishDetails(id);

      setDish(data.dish);
      setSuggestedDishes(data.suggestedDishes);
    })();
  }, [id]);

  const handleAddToBag = useCallback((dish: models.Dish) => {
    bag.addItem(dish);
    navigateBack(navigation);
    bag.showBar();
  }, []);

  if (!dish) {
    return (
      <S.LoadingContainer>
        <S.Logo variant="colored" height={32} width={140} />
        <S.Loading size="large" color={gray5} style={{ marginTop: 24 }} />
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <StatusBar style="light" animated />
      <S.DishImage
        source={{
          uri: dish.imageUrl,
        }}
        imageStyle={{ opacity: 0.8 }}
      />
      <S.ContentContainer>
        <S.HeaderContainer>
          <S.Header
            variant={Platform.OS === 'ios' ? 'modal' : 'page'}
            onPress={() => {
              navigateBack(navigation);
              bag.showBar();
            }}
          />
        </S.HeaderContainer>
        <S.Content>
          <S.BottomSheetContainer>
            <S.DishDataContainer>
              <S.Title numberOfLines={1} lineBreakMode="tail">
                {dish.name}
              </S.Title>
              <S.Description numberOfLines={8} lineBreakMode="tail">
                {dish.description}
              </S.Description>
              {suggestedDishes.length > 0 && (
                <S.OrderBumpTitle>
                  {i18n.t('screens.dishDetails.orderBump')}
                </S.OrderBumpTitle>
              )}
            </S.DishDataContainer>
            <S.OrderBumpList
              data={suggestedDishes}
              keyExtractor={(_item, index) => String(index)}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 24 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => (
                <S.DishCardContainer
                  isLastItem={index === suggestedDishes.length - 1}
                >
                  <S.DishCard
                    variant="horizontal"
                    dish={item as models.Dish}
                    isLastItem={index === suggestedDishes.length - 1}
                  />
                </S.DishCardContainer>
              )}
            />
            <S.Footer>
              <S.Button onPress={() => handleAddToBag(dish)}>
                {formatCurrency(dish.price)} -{' '}
                {i18n.t('screens.dishDetails.button')}
              </S.Button>
            </S.Footer>
          </S.BottomSheetContainer>
        </S.Content>
      </S.ContentContainer>
    </S.Container>
  );
};

export default DishDetails;
