import React, { useCallback, useEffect, useState } from 'react';

import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { i18n } from '../../services/translator';
import * as Linking from 'expo-linking';
import { formatRate } from '../../utils/formatRate';
import { useBag } from '../../hooks/bag';
import { Platform, RefreshControl } from 'react-native';
import { useRoute } from '@react-navigation/native';
import RestaurantsApi from '../../repositories/restaurants';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';

const RestaurantDetails: React.FC = () => {
  const bag = useBag();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const {
    colors: { gray2, yellow, gray5, primary },
  } = useTheme();
  const [restaurantLoading, setRestaurantLoading] = useState(true);
  const [dishesLoading, setDishesLoading] = useState(false);
  const [restaurant, setRestaurant] = useState<models.Restaurant | undefined>(
    undefined,
  );

  const loadRestaurant = useCallback(async () => {
    setDishesLoading(true);
    const loadedRestaurant = await RestaurantsApi.getRestaurantDetails(id);
    setRestaurant(loadedRestaurant);
    setDishesLoading(false);
  }, [id]);

  useEffect(() => {
    (async () => {
      const loadedRestaurant = await RestaurantsApi.getRestaurantDetails(id);
      setRestaurant(loadedRestaurant);
      setRestaurantLoading(false);
    })();
  }, []);

  const callRestaurant = useCallback(() => {
    if (restaurant?.phoneNumber) {
      Linking.openURL(`tel:${restaurant.phoneNumber}`);
    }
  }, [restaurant]);

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  return (
    <S.Container>
      <ShimmerPlaceholder
        shimmerStyle={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '50%',
          width: '100%',
        }}
        visible={!restaurantLoading}
      />
      <S.Wallpaper
        source={{
          uri: restaurant?.wallpaperUrl,
        }}
        imageStyle={{ opacity: 0.6 }}
      />
      <StatusBar style="light" animated />
      <S.ContentContainer>
        <S.HeaderContainer>
          <S.Header
            title={i18n.t('screens.restaurantDetails.headerTitle')}
            onPress={() => {
              bag.removeAllItems();
            }}
          />
        </S.HeaderContainer>
        <S.Content>
          <S.ActionsContainer>
            {restaurantLoading && (
              <ShimmerPlaceholder
                shimmerStyle={{
                  height: 96,
                  width: 96,
                  borderRadius: 48,
                }}
              />
            )}
            <S.Image
              source={{
                uri: restaurant?.imageUrl,
              }}
            />
            {!restaurantLoading && (
              <S.ButtonsContainer>
                <S.ActionButton style={{ borderRadius: 8 }}>
                  <S.ActionIcon name="share-2" size={18} color={gray2} />
                </S.ActionButton>
                <S.ActionButton
                  style={{ borderRadius: 8 }}
                  onPress={callRestaurant}
                >
                  <S.ActionIcon name="phone" size={18} color={gray2} />
                </S.ActionButton>
              </S.ButtonsContainer>
            )}
          </S.ActionsContainer>
          <S.BottomSheetContainer>
            <S.RestaurantDataContainer>
              <ShimmerPlaceholder
                shimmerStyle={{ marginTop: 8, height: 24 }}
                visible={!restaurantLoading}
              >
                <S.TitleContainer>
                  <S.Title>{restaurant?.name}</S.Title>
                  <S.RatingContainer>
                    <S.Rating>{formatRate(Number(restaurant?.rate))}</S.Rating>
                    <S.RatingIcon name="star" size={16} color={yellow} />
                  </S.RatingContainer>
                </S.TitleContainer>
              </ShimmerPlaceholder>
              <ShimmerPlaceholder
                shimmerStyle={{ marginTop: 8, width: 100 }}
                visible={!restaurantLoading}
              >
                <S.Address>{restaurant?.address}</S.Address>
              </ShimmerPlaceholder>
            </S.RestaurantDataContainer>
            <S.DishList
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={gray5}
                  refreshing={false}
                  onRefresh={loadRestaurant}
                  tintColor={primary}
                  colors={[primary]}
                />
              }
              data={
                dishesLoading || restaurantLoading
                  ? Array.from({ length: 5 })
                  : restaurant?.dishes
              }
              contentContainerStyle={{ padding: 24 }}
              keyExtractor={(_item, index) => String(index)}
              renderItem={({ item: dish, index }) => (
                <S.DishCard
                  isLastItem={index === (restaurant?.dishes?.length ?? 0) - 1}
                  dish={dish as models.Dish}
                  onPress={() => {
                    Platform.OS === 'android' && bag.hideBar();
                  }}
                  loading={dishesLoading || restaurantLoading}
                />
              )}
            />
          </S.BottomSheetContainer>
        </S.Content>
      </S.ContentContainer>
    </S.Container>
  );
};

export default RestaurantDetails;
