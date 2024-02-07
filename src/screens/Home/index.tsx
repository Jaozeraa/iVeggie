import React, { useCallback, useEffect, useRef, useState } from 'react';

import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { useForm } from 'react-hook-form';
import { i18n } from '../../services/translator';
import { useTheme } from 'styled-components';
import { RefreshControl } from 'react-native';
import RestaurantsApi from '../../repositories/restaurants';

const Home: React.FC = () => {
  const {
    colors: { gray5, primary },
  } = useTheme();
  const { control, watch } = useForm();
  const [restaurants, setRestaurants] = useState<models.Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { search } = watch();

  const reloadRestaurants = useCallback(() => {
    setLoading(true);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(async () => {
      const data = await RestaurantsApi.getRestaurants(search);

      setRestaurants(data);
      setLoading(false);
    }, 2000);
  }, [search]);

  useEffect(() => {
    reloadRestaurants();
  }, []);

  useEffect(() => {
    reloadRestaurants();
  }, [search]);

  return (
    <S.Container>
      <StatusBar style="light" animated />
      <S.WallpaperContainer>
        <S.BrandWallpaperVector width={'100%'} height={324} />
      </S.WallpaperContainer>
      <S.ContentContainer>
        <S.HeaderContainer>
          <S.HeaderContent>
            <S.Header variant="home" />
          </S.HeaderContent>
          <S.Title>{i18n.t('screens.home.title')}</S.Title>
          <S.Description>{i18n.t('screens.home.description')}</S.Description>
        </S.HeaderContainer>
        <S.Content>
          <S.SearchContainer>
            <S.Input
              variant="search"
              control={control}
              name="search"
              placeholder={i18n.t('screens.home.search')}
            />
          </S.SearchContainer>
          <S.BottomSheetContainer>
            <S.RestaurantList
              data={restaurants}
              refreshControl={
                <RefreshControl
                  progressBackgroundColor={gray5}
                  refreshing={loading}
                  onRefresh={reloadRestaurants}
                  tintColor={primary}
                  colors={[primary]}
                />
              }
              contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: 56,
                paddingBottom: 24,
              }}
              keyExtractor={(_restaurant, index) => String(index)}
              renderItem={({ item: restaurant, index }) => (
                <S.RestaurantCard
                  isLastItem={index === restaurants.length - 1}
                  restaurant={restaurant as models.Restaurant}
                />
              )}
            />
          </S.BottomSheetContainer>
        </S.Content>
      </S.ContentContainer>
    </S.Container>
  );
};

export default Home;
