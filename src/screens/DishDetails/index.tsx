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
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const DishDetails: React.FC = () => {
  const {
    colors: { gray5 },
  } = useTheme();
  const navigation = useNavigation();
  const route = useRoute();
  const bag = useBag();
  const { id } = route.params as { id: string };
  const [dish, setDish] = useState<models.Dish | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [suggestedDishes, setSuggestedDishes] = useState<models.Dish[]>([]);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await DishesApi.getDishDetails(id);

      setDish(data.dish);
      setSuggestedDishes(data.suggestedDishes);
      setLoading(false);
    })();
  }, [id]);

  const handleAddToBag = useCallback(async (dish: models.Dish) => {
    setButtonLoading(true);
    await bag.addItem(dish);
    navigateBack(navigation);
    bag.showBar();
    setButtonLoading(false);
  }, []);

  return (
    <S.Container>
      <StatusBar style="light" animated />
      <ShimmerPlaceholder
        visible={!loading}
        shimmerStyle={{
          width: '100%',
          height: '65%',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
        }}
      />
      <S.DishImage
        source={{
          uri: dish?.imageUrl,
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
              <ShimmerPlaceholder
                visible={!loading}
                shimmerStyle={{
                  marginRight: 8,
                  marginBottom: 8,
                  height: 24,
                  width: 300,
                }}
              >
                <S.Title numberOfLines={1} lineBreakMode="tail">
                  {dish?.name}
                </S.Title>
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                visible={!loading}
                shimmerStyle={{
                  height: 150,
                  width: '100%',
                }}
              >
                <S.Description numberOfLines={8} lineBreakMode="tail">
                  {dish?.description}
                </S.Description>
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                visible={!loading}
                shimmerStyle={{
                  marginTop: 16,
                  marginBottom: 8,
                  width: 100,
                }}
              >
                <S.OrderBumpTitle>
                  {i18n.t('screens.dishDetails.orderBump')}
                </S.OrderBumpTitle>
              </ShimmerPlaceholder>
            </S.DishDataContainer>
            <S.OrderBumpList
              data={loading ? Array.from({ length: 2 }) : suggestedDishes}
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
                    loading={loading}
                  />
                </S.DishCardContainer>
              )}
            />
            <S.Footer>
              <S.Button
                loading={loading || buttonLoading}
                onPress={() => handleAddToBag(dish as models.Dish)}
              >
                {formatCurrency(Number(dish?.price))} -{' '}
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
