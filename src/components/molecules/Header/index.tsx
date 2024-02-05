import React from 'react';

import * as S from './styles';
import { useTheme } from 'styled-components';
import { navigateBack } from '../../../services/navigation';
import { useNavigation } from '@react-navigation/native';
import { i18n } from '../../../services/translator';
import { useAuth } from '../../../hooks/auth';

const Header: React.FC<models.HeaderProps> = ({
  variant = 'page',
  title,
  color,
  onPress,
}) => {
  const {
    colors: { gray5 },
  } = useTheme();
  const { signOut } = useAuth();
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
          <S.LogoutContainer
            onPress={() => {
              signOut();
              onPress && onPress();
            }}
          >
            <S.LogoutText color={color || gray5}>
              {i18n.t('components.header.signOut')}
            </S.LogoutText>
            <S.LogoutIcon size={16} name="log-out" color={color || gray5} />
          </S.LogoutContainer>
        </S.Container>
      )}
    </>
  );
};

export default Header;
