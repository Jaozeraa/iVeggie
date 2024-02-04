import React, { useState } from 'react';

import * as S from './styles';
import { useTheme } from 'styled-components';
import { navigateBack } from '../../../services/navigation';
import { useNavigation } from '@react-navigation/native';

const Header: React.FC<models.HeaderProps> = ({
  variant = 'page',
  title,
  color,
  onPress,
}) => {
  const {
    colors: { gray5 },
  } = useTheme();
  const navigation = useNavigation();

  return (
    <>
      {variant === 'page' && (
        <S.Container>
          <S.TitleContainer>
            <S.Title color={color || gray5}>{title}</S.Title>
          </S.TitleContainer>
          <S.BackButton
            onPress={() => {
              if (onPress) return onPress();
              navigateBack(navigation);
            }}
          >
            <S.BackIcon name={'arrow-left'} size={24} color={color || gray5} />
          </S.BackButton>
        </S.Container>
      )}
      {variant === 'modal' && (
        <S.Container>
          <S.ModalTitle color={color || gray5}>{title}</S.ModalTitle>
          <S.BackButton
            onPress={() => {
              if (onPress) return onPress();
            }}
          >
            <S.BackIcon
              name={'chevron-down'}
              size={24}
              color={color || gray5}
            />
          </S.BackButton>
        </S.Container>
      )}
      {variant === 'home' && (
        <S.Container>
          <S.Logo width={64} height={16} />
          <S.AddressContainer
            onPress={() => {
              onPress && onPress();
            }}
          >
            <S.AddressText color={color || gray5}>{title}</S.AddressText>
            <S.AddressIcon
              size={16}
              name="chevron-down"
              color={color || gray5}
            />
          </S.AddressContainer>
        </S.Container>
      )}
    </>
  );
};

export default Header;
