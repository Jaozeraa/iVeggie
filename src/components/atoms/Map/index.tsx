import React from 'react';
import * as S from './styles';
import { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import keysConfig from '../../../configs/keys.config';
import { useTheme } from 'styled-components';
import MapPin from '../../../assets/map_pin.png';
import { Dimensions } from 'react-native';

const Map: React.FC<models.MapProps> = ({ userLocation, restaurant }) => {
  const { width, height } = Dimensions.get('window');
  const mapAspectRatio = width / height;
  const latitudeDelta = 0.0025;
  const longitudeDelta = latitudeDelta * mapAspectRatio;
  const {
    colors: { primary, primaryLight },
  } = useTheme();

  if (!userLocation || !restaurant) {
    return (
      <S.LoadingContainer>
        <S.Loading size="large" color={primary} />
      </S.LoadingContainer>
    );
  }

  return (
    <S.Container
      region={{
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta,
        longitudeDelta,
      }}
    >
      <Marker coordinate={userLocation} image={MapPin} />
      <Marker
        coordinate={{
          latitude: restaurant?.latitude || 0,
          longitude: restaurant?.longitude || 0,
        }}
      >
        <S.Image source={{ uri: restaurant.imageUrl }} />
      </Marker>
      <MapViewDirections
        language="pt-BR"
        origin={userLocation}
        destination={{
          latitude: restaurant?.latitude || 0,
          longitude: restaurant?.longitude || 0,
        }}
        apikey={keysConfig.googleMapsApiKey}
        strokeWidth={5}
        strokeColor={primaryLight}
        precision="low"
      />
    </S.Container>
  );
};

export default Map;
