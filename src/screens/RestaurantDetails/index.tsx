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

const RestaurantDetails: React.FC = () => {
  const bag = useBag();
  const route = useRoute();
  const { id } = route.params as { id: string };
  const {
    colors: { gray2, yellow, gray5, primary },
  } = useTheme();
  const [loading, setLoading] = useState(true);
  const [restaurant, setRestaurant] = useState<models.Restaurant | undefined>(
    undefined,
  );

  const loadRestaurant = useCallback(async () => {
    setLoading(true);
    const loadedRestaurant = await RestaurantsApi.getRestaurantDetails(id);
    setRestaurant(loadedRestaurant);
    setLoading(false);
  }, [id]);

  useEffect(() => {
    (async () => {
      await loadRestaurant();
    })();
  }, []);

  const callRestaurant = useCallback(() => {
    if (restaurant?.phoneNumber) {
      Linking.openURL(`tel:${restaurant.phoneNumber}`);
    }
  }, [restaurant]);

  if (!restaurant) {
    return (
      <S.LoadingContainer>
        <S.Logo variant="colored" height={32} width={140} />
        <S.Loading size="large" color={gray5} style={{ marginTop: 24 }} />
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container>
      <S.Wallpaper
        source={{
          uri: restaurant.wallpaperUrl,
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
            <S.Image
              source={{
                uri: restaurant.imageUrl,
              }}
            />
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
          </S.ActionsContainer>
          <S.BottomSheetContainer>
            <S.RestaurantDataContainer>
              <S.TitleContainer>
                <S.Title>{restaurant.name}</S.Title>
                <S.RatingContainer>
                  <S.Rating>{formatRate(restaurant.rate)}</S.Rating>
                  <S.RatingIcon name="star" size={16} color={yellow} />
                </S.RatingContainer>
              </S.TitleContainer>
              <S.Address>{restaurant.address}</S.Address>
            </S.RestaurantDataContainer>
            <S.DishList
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={gray5}
                  refreshing={loading}
                  onRefresh={loadRestaurant}
                  tintColor={primary}
                  colors={[primary]}
                />
              }
              data={restaurant.dishes}
              contentContainerStyle={{ padding: 24 }}
              keyExtractor={(_item, index) => String(index)}
              renderItem={({ item: dish, index }) => (
                <S.DishCard
                  isLastItem={index === restaurant.dishes.length - 1}
                  dish={dish as models.Dish}
                  onPress={() => {
                    Platform.OS === 'android' && bag.hideBar();
                  }}
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
