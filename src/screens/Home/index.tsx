import React, { useCallback, useEffect, useState } from 'react';

import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { set, useForm } from 'react-hook-form';
import { i18n } from '../../services/translator';
import { useTheme } from 'styled-components';
import { RefreshControl } from 'react-native';

const Home: React.FC = () => {
  const {
    colors: { gray5, primary },
  } = useTheme();
  const { control } = useForm();
  const [restaurants, setRestaurants] = useState<models.Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const reloadRestaurants = useCallback(() => {
    setLoading(true);
    setTimeout(() => {
      const loadedRestaurants = [
        {
          id: '1',
          imageUrl:
            'https://1000logos.net/wp-content/uploads/2017/11/Emblem-Chipotle.jpg',
          address: 'R. Presidente Venceslau, 54',
          name: 'Chipotle',
          rate: 4.8,
          liked: true,
        },
        {
          id: '2',
          imageUrl:
            'https://instagram.fcgh37-1.fna.fbcdn.net/v/t51.2885-19/313488096_825145558758747_6666285752531195656_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcgh37-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=ZWu_TP-BJPwAX-_61gW&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfCqy18P0uzv7IXangyaXw9F-m2x6jhn9IEksuS4kRVX2A&oe=65C3F862&_nc_sid=8b3546',
          address: 'R. Augusta, 123',
          name: 'Green Kitchen',
          rate: 4.2,
          liked: false,
        },
        {
          id: '3',
          imageUrl:
            'https://instagram.fcgh37-1.fna.fbcdn.net/v/t51.2885-19/374220463_1002251741003269_2422803089787941648_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcgh37-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=gpvxIqSY8xgAX-WpkVh&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBXdG5Srr0af9H6WY_2c0wfgc-Kd68iKwW9-NCnX4qZUw&oe=65C24191&_nc_sid=8b3546',
          address: 'R. Bela Cintra, 123',
          name: "Let's Vegan",
          rate: 3.9,
          liked: false,
        },
        {
          id: '3',
          imageUrl:
            'https://instagram.fcgh37-1.fna.fbcdn.net/v/t51.2885-19/130063283_512335286407780_5666021651891785611_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcgh37-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=fKHUHAp8SbkAX8V3Yyv&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAzL67olRiooKpk9i_p8tPOxH-rZSd5DF8sk8GJVCDNQg&oe=65C3E1CE&_nc_sid=8b3546',
          address: 'R. Francisco Leitão, 272',
          name: 'Piccoli cucina',
          rate: 3.9,
          liked: false,
        },
      ] as models.Restaurant[];
      setRestaurants(loadedRestaurants);
      setLoading(false);
    }, 2000);
  }, []);

  useEffect(() => {
    reloadRestaurants();
  }, []);

  return (
    <S.Container>
      <StatusBar style="light" animated />
      <S.WallpaperContainer>
        <S.BrandWallpaperVector width={'100%'} height={324} />
      </S.WallpaperContainer>
      <S.ContentContainer>
        <S.HeaderContainer>
          <S.HeaderContent>
            <S.Header variant="home" title="Av. Paulista, 1234" />
          </S.HeaderContent>
          <S.Title>{i18n.t('screens.home.title')}</S.Title>
          <S.Description>{i18n.t('screens.home.description')}</S.Description>
        </S.HeaderContainer>
        <S.Content>
          <S.SearchContainer>
            <S.SearchInput
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
