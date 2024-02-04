import React, { useCallback, useEffect, useState } from 'react';

import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { useTheme } from 'styled-components';
import { i18n } from '../../services/translator';
import * as Linking from 'expo-linking';
import { formatRate } from '../../utils/formatRate';
import { useBag } from '../../hooks/bag';
import { Platform } from 'react-native';

const RestaurantDetails: React.FC = () => {
  const bag = useBag();
  const {
    colors: { gray2, yellow, gray5 },
  } = useTheme();
  const [restaurant, setRestaurant] = useState<models.Restaurant | undefined>(
    undefined,
  );

  useEffect(() => {
    const loadedRestaurant = {
      id: '1',
      name: 'Piccoli Cucina',
      imageUrl:
        'https://instagram.fcgh37-1.fna.fbcdn.net/v/t51.2885-19/130063283_512335286407780_5666021651891785611_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.fcgh37-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=fKHUHAp8SbkAX8V3Yyv&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfAzL67olRiooKpk9i_p8tPOxH-rZSd5DF8sk8GJVCDNQg&oe=65C3E1CE&_nc_sid=8b3546',
      wallpaperUrl:
        'https://images.getinapp.com.br/f29db852-97dd-42f1-882a-ba22da6a1bec.jpg',
      phoneNumber: '11999999999',
      address: 'R. Presidente Venceslau, 54',
      rate: 4.8,
      liked: true,
      foods: [
        {
          id: '1',
          name: 'Rigatoni alla bolognese',
          imageUrl:
            'https://instagram.fcgh37-1.fna.fbcdn.net/v/t39.30808-6/424626396_18331050724108252_7158503594431682241_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyIn0&_nc_ht=instagram.fcgh37-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=heoQtmziwm4AX_yQTWy&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI5MTcwNzM1NTMyNTUzNzM3NQ%3D%3D.2-ccb7-5&oh=00_AfCpL7vf5oxXqEr0PPucAW05RajbXs0b5radhgtGt7fgbw&oe=65C2A7F9&_nc_sid=ee9879',
          description:
            'Apresentamos nosso prato vegano exclusivo: um Rigatoni que combina a robustez da massa com um molho rico em sabores vegetais. A textura satisfatória do Rigatoni se encontra com a intensidade dos tomates suculentos e a frescura das ervas, criando uma experiência culinária inigualável celebrando a excelência dos ingredientes',
          resume:
            'Um clássico feito aqui sem nenhum ingrediente de origem animal.',
          price: 57.9,
        },
        {
          id: '2',
          name: 'Cannoli salgado recheado',
          imageUrl:
            'https://instagram.fcgh37-1.fna.fbcdn.net/v/t39.30808-6/382597576_18312686926108252_4046157385990781126_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyIn0&_nc_ht=instagram.fcgh37-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=v3z6aNo-i9wAX9lo6U4&edm=ABmJApAAAAAA&ccb=7-5&ig_cache_key=MzIwMjc1MjQyNzk4NzgwODMxMw%3D%3D.2-ccb7-5&oh=00_AfAVSW400DwOug7lA_trf0E2WQ8uidIU7BgGk4M9eA_aTw&oe=65C45627&_nc_sid=b41fef',
          description:
            'Explore a requintada originalidade do nosso cannoli salgado recheado, uma experiência vegana que combina a delicadeza da massa crocante com um recheio irresistível. A base crocante do cannoli é cuidadosamente equilibrada com uma mistura de ingredientes vegetais de alta qualidade, proporcionando uma explosão de sabores.',
          resume:
            'Massa salgada recheada com nossa ricota da casa de limão siciliano com uma surpresinha.',
          price: 49.9,
        },
        {
          id: '3',
          name: 'spaghetti Sausage and Pepper ',
          imageUrl:
            'https://instagram.fcgh11-1.fna.fbcdn.net/v/t51.2885-15/328967885_738739761291103_6956253877478987606_n.jpg?stp=dst-jpg_e35&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xMjQ5eDEwMDAuc2RyIn0&_nc_ht=instagram.fcgh11-1.fna.fbcdn.net&_nc_cat=107&_nc_ohc=S_DbN5hu298AX94fxGB&edm=ABmJApABAAAA&ccb=7-5&ig_cache_key=MzAzMDIxNTE2Nzc4MzM1ODg3NA%3D%3D.2-ccb7-5&oh=00_AfCL24y9asv3BW44HjKqGI0ijQ-HTzywQnv6fS5p4TqUWA&oe=65C1D308&_nc_sid=b41fef',
          description:
            'Delicie-se com a sofisticação de nosso prato exclusivo: um autêntico Spaghetti de massa fresca, delicadamente envolto em azeite de alta qualidade, realçado pela explosão de sabores dos tomates cereja e amarelo. A adição da pimenta cambuci proporciona um toque sutil de picância, enquanto as ervas frescas elevam o aroma do prato.',
          resume:
            'Spaghetti de massa fresca puxado no azeite com tomate cereja e amarelo, pimenta cambuci.',
          price: 52.9,
        },
      ],
    } as models.Restaurant;
    setTimeout(() => {
      setRestaurant(loadedRestaurant);
    }, 2000);
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
          <S.Header title={i18n.t('screens.restaurantDetails.headerTitle')} />
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
            <S.FoodList
              data={restaurant.foods}
              contentContainerStyle={{ padding: 24 }}
              keyExtractor={(_item, index) => String(index)}
              renderItem={({ item: food, index }) => (
                <S.FoodCard
                  isLastItem={index === restaurant.foods.length - 1}
                  food={food as models.Food}
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
