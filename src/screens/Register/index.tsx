import React, { useCallback } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import { i18n } from '../../services/translator';
import { useForm } from 'react-hook-form';
import { getError } from '../../utils/getError';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Logo from '../../components/atoms/Logo';
import { useTheme } from 'styled-components';

const Register: React.FC = () => {
  const {
    colors: { gray1 },
  } = useTheme();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
      enabled
    >
      <StatusBar style="dark" animated />
      <S.Container
        contentContainerStyle={{
          flex: 1,
        }}
        keyboardShouldPersistTaps="handled"
      >
        <S.Header
          color={gray1}
          title={i18n.t('screens.register.headerTitle')}
        />
        <S.LogoContainer>
          <Logo variant="all-white" width={52} height={12} />
        </S.LogoContainer>
        <S.Title>{i18n.t('screens.register.title')}</S.Title>
        <S.Description>{i18n.t('screens.register.description')}</S.Description>
        <S.Input
          placeholder={i18n.t('screens.register.inputs.name')}
          control={control}
          name="name"
          textContentType="name"
          error={getError(errors, 'name')}
          containerStyle={{ marginBottom: 48 }}
        />
        <S.Input
          placeholder={i18n.t('screens.register.inputs.email')}
          control={control}
          name="email"
          error={getError(errors, 'email')}
          containerStyle={{ marginBottom: 48 }}
        />
        <S.Input
          placeholder={i18n.t('screens.register.inputs.password')}
          control={control}
          name="password"
          textContentType="password"
          error={getError(errors, 'password')}
          secureTextEntry
        />
        <S.Footer>
          <S.Button onPress={() => {}}>
            {i18n.t('screens.register.button')}
          </S.Button>
        </S.Footer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default Register;
