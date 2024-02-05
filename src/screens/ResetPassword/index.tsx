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
import { pinValidation, passwordValidation } from '../../validators';
import PasswordApi from '../../repositories/password';
import { useToast } from '../../hooks/toast';
import { AxiosError } from 'axios';
import { useNavigation } from '@react-navigation/native';
import { resetTo } from '../../services/navigation';

const schema = z.object({
  pin: pinValidation,
  password: passwordValidation,
});

const ResetPassword: React.FC = () => {
  const {
    colors: { gray1 },
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
  const navigation = useNavigation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { addToast } = useToast();
  const { password, pin } = watch();

  const handleResetPassword = useCallback(async () => {
    setButtonLoading(true);
    const data = getValues() as models.ResetPasswordFormData;
    try {
      await PasswordApi.reset(data);
      addToast({
        type: 'success',
        message: 'resetPassword',
      });

      resetTo(navigation, [{ name: 'Welcome' }, { name: 'Login' }]);
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
          title={i18n.t('screens.resetPassword.headerTitle')}
        />
        <S.LogoContainer>
          <Logo variant="all-white" width={52} height={12} />
        </S.LogoContainer>
        <S.Title>{i18n.t('screens.resetPassword.title')}</S.Title>
        <S.Description>
          {i18n.t('screens.resetPassword.description')}
        </S.Description>
        <S.Input
          placeholder={i18n.t('screens.resetPassword.inputs.pin')}
          control={control}
          name="pin"
          keyboardType="number-pad"
          error={getError(errors, 'pin')}
          containerStyle={{ marginBottom: 48 }}
          maxLength={6}
        />
        <S.Input
          placeholder={i18n.t('screens.resetPassword.inputs.password')}
          control={control}
          name="password"
          error={getError(errors, 'password')}
          secureTextEntry
        />

        <S.Footer>
          <S.Button
            disabled={!password || !pin}
            loading={buttonLoading}
            onPress={() => {
              if (!password || !pin) return;
              handleSubmit(handleResetPassword)();
            }}
          >
            {i18n.t('screens.resetPassword.button')}
          </S.Button>
        </S.Footer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default ResetPassword;
