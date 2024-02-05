import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { KeyboardAvoidingView, Platform } from 'react-native';

import * as S from './styles';
import { i18n } from '../../services/translator';
import { useForm } from 'react-hook-form';
import { getError } from '../../utils/getError';
import Logo from '../../components/atoms/Logo';
import { useTheme } from 'styled-components';
import { emailValidation, passwordValidation } from '../../validators';
import PasswordApi from '../../repositories/password';
import { useToast } from '../../hooks/toast';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { navigateTo } from '../../services/navigation';

const schema = z.object({
  email: emailValidation,
});

const ForgotPassword: React.FC = () => {
  const {
    colors: { gray5, gray1 },
  } = useTheme();
  const {
    control,
    getValues,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { addToast } = useToast();
  const { email } = watch();
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigation = useNavigation();

  const handleForgotPassword = useCallback(async () => {
    setButtonLoading(true);
    const data = getValues() as { email: string };
    try {
      await PasswordApi.forgot(data.email);
      addToast({
        type: 'success',
        message: 'forgotPassword',
      });
      navigateTo(navigation, 'ResetPassword');
    } catch (error) {
      if (error instanceof AxiosError) {
        return addToast({
          type: 'error',
          message: error.response?.data.message,
        });
      }

      addToast({
        type: 'error',
        message: 'generic',
      });
    } finally {
      setButtonLoading(false);
    }
  }, []);

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
          title={i18n.t('screens.forgotPassword.headerTitle')}
        />
        <S.LogoContainer>
          <Logo variant="all-white" width={52} height={12} />
        </S.LogoContainer>
        <S.Title>{i18n.t('screens.forgotPassword.title')}</S.Title>
        <S.Description>
          {i18n.t('screens.forgotPassword.description')}
        </S.Description>
        <S.Input
          placeholder={i18n.t('screens.forgotPassword.inputs.email')}
          control={control}
          name="email"
          error={getError(errors, 'email')}
          keyboardType="email-address"
          containerStyle={{ marginBottom: 48 }}
          autoCapitalize="none"
        />
        <S.Footer>
          <S.Button
            disabled={!email}
            loading={buttonLoading}
            onPress={() => {
              if (!email) return;
              handleSubmit(handleForgotPassword)();
            }}
          >
            {i18n.t('screens.forgotPassword.button')}
          </S.Button>
        </S.Footer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;
