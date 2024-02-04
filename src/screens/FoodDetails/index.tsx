import React, { useCallback } from 'react';

import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { i18n } from '../../services/translator';
import { useNavigation, useRoute } from '@react-navigation/native';
import { formatCurrency } from '../../utils/formatCurrency';
import { useBag } from '../../hooks/bag';
import { navigateBack } from '../../services/navigation';
import { Platform } from 'react-native';

const FoodDetails: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const bag = useBag();
  const { food } = route.params as { food: models.Food };
  const restaurantFoods = [
    {
      id: '1',
      name: 'Rigatoni alla bolognese',
      imageUrl:
        'https://instagram.fcgh37-1.fna.fbcdn.net/v/t39.30808-6/424626396_18331050724108252_7158503594431682241_n.jpg?stp=dst-jpg_e15&efg=eyJ2ZW5jb2RlX3RhZyI6ImltYWdlX3VybGdlbi4xNDQweDE3OTkuc2RyIn0&_nc_ht=instagram.fcgh37-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=heoQtmziwm4AX_yQTWy&edm=ACWDqb8AAAAA&ccb=7-5&ig_cache_key=MzI5MTcwNzM1NTMyNTUzNzM3NQ%3D%3D.2-ccb7-5&oh=00_AfCpL7vf5oxXqEr0PPucAW05RajbXs0b5radhgtGt7fgbw&oe=65C2A7F9&_nc_sid=ee9879',
      description:
        'Apresentamos nosso prato vegano exclusivo: um Rigatoni que combina a robustez da massa com um molho rico em sabores vegetais. A textura satisfatória do Rigatoni se encontra com a intensidade dos tomates suculentos e a frescura das ervas, criando uma experiência culinária inigualável celebrando a excelência dos ingredientes',
      resume: 'Um clássico feito aqui sem nenhum ingrediente de origem animal.',
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
  ] as models.Food[];

  const foodSuggestions = restaurantFoods.filter(
    restaurantFood => restaurantFood.id !== food.id,
  );

  const handleAddToBag = useCallback((food: models.Food) => {
    bag.addItem(food);
    navigateBack(navigation);
    bag.showBar();
  }, []);

  return (
    <S.Container>
      <StatusBar style="light" animated />
      <S.FoodImage
        source={{
          uri: food.imageUrl,
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
            <S.FoodDataContainer>
              <S.Title numberOfLines={1} lineBreakMode="tail">
                {food.name}
              </S.Title>
              <S.Description numberOfLines={8} lineBreakMode="tail">
                {food.description}
              </S.Description>
              <S.OrderBumpTitle>
                {i18n.t('screens.foodDetails.orderBump')}
              </S.OrderBumpTitle>
            </S.FoodDataContainer>
            <S.OrderBumpList
              data={foodSuggestions}
              keyExtractor={(_item, index) => String(index)}
              horizontal
              contentContainerStyle={{ paddingHorizontal: 24 }}
              showsHorizontalScrollIndicator={false}
              renderItem={({ item: food, index }) => (
                <S.FoodCardContainer
                  isLastItem={index === foodSuggestions.length - 1}
                >
                  <S.FoodCard
                    variant="horizontal"
                    food={food as models.Food}
                    isLastItem={index === foodSuggestions.length - 1}
                  />
                </S.FoodCardContainer>
              )}
            />
            <S.Footer>
              <S.Button onPress={() => handleAddToBag(food)}>
                {formatCurrency(food.price)} -{' '}
                {i18n.t('screens.foodDetails.button')}
              </S.Button>
            </S.Footer>
          </S.BottomSheetContainer>
        </S.Content>
      </S.ContentContainer>
    </S.Container>
  );
};

export default FoodDetails;
