import React, { useCallback, useEffect, useState } from 'react';
import * as S from './styles';
import { StatusBar } from 'expo-status-bar';
import { i18n } from '../../services/translator';
import { useBag } from '../../hooks/bag';
import { useTheme } from 'styled-components';
import { Linking } from 'react-native';
import * as Location from 'expo-location';
import { useToast } from '../../hooks/toast';
import { useNavigation } from '@react-navigation/native';
import { navigateBack } from '../../services/navigation';
import { getDistance } from 'geolib';
import { calculateDeliveryTime } from '../../utils/calculateDeliveryTime';

const OrderTracking: React.FC = () => {
  const {
    colors: { gray2 },
  } = useTheme();
  const { restaurant, removeAllItems } = useBag();
  const { addToast } = useToast();
  const navigation = useNavigation();
  const [deliveryEstimatedTime, setDeliveryEstimatedTime] = useState<
    number | null
  >(null);
  const [userLocation, setUserLocation] = useState<models.UserLocation | null>(
    null,
  );

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        addToast({
          type: 'error',
          message: 'locationPermissionError',
        });
        navigateBack(navigation);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const distance = getDistance(
        {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        {
          latitude: restaurant?.latitude || 0,
          longitude: restaurant?.longitude || 0,
        },
      );

      setDeliveryEstimatedTime(calculateDeliveryTime(distance));

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  const callRestaurant = useCallback(() => {
    if (restaurant?.phoneNumber) {
      Linking.openURL(`tel:${restaurant.phoneNumber}`);
    }
  }, [restaurant]);

  return (
    <S.Container>
      <StatusBar style="light" animated />
      <S.WallpaperContainer>
        <S.BrandWallpaperVector width={'125%'} height={224} />
      </S.WallpaperContainer>
      <S.ContentContainer>
        <S.HeaderContainer>
          <S.HeaderContent>
            <S.Header
              title={i18n.t('screens.orderTracking.headerTitle')}
              onPress={removeAllItems}
            />
          </S.HeaderContent>
        </S.HeaderContainer>
        <S.Content>
          <S.OrderTrackingContainer>
            <S.OrderTrackCard estimatedMinutes={deliveryEstimatedTime} />
          </S.OrderTrackingContainer>
          <S.BottomSheetContainer>
            <S.Map userLocation={userLocation} restaurant={restaurant} />
            <S.Footer>
              <S.RestaurantCardContainer>
                <S.RestaurantCard
                  restaurant={restaurant as models.Restaurant}
                  isLastItem
                  disabled
                />
              </S.RestaurantCardContainer>
              <S.ActionButton
                style={{ borderRadius: 8 }}
                onPress={callRestaurant}
              >
                <S.ActionIcon name="phone" size={18} color={gray2} />
              </S.ActionButton>
            </S.Footer>
          </S.BottomSheetContainer>
        </S.Content>
      </S.ContentContainer>
    </S.Container>
  );
};

export default OrderTracking;
