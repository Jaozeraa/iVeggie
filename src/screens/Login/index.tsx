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
import { useAuth } from '../../hooks/auth';
import { emailValidation, passwordValidation } from '../../validators';
import { navigateTo } from '../../services/navigation';
import { useNavigation } from '@react-navigation/native';

const schema = z.object({
  email: emailValidation,
  password: passwordValidation,
});

const Login: React.FC = () => {
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
  const [buttonLoading, setButtonLoading] = useState(false);
  const navigation = useNavigation();
  const { email, password } = watch();
  const { logIn } = useAuth();

  const handlePressForgotPassword = useCallback(async () => {
    navigateTo(navigation, 'ForgotPassword');
  }, []);

  const handleLogin = useCallback(async () => {
    setButtonLoading(true);
    const data = getValues() as models.LoginFormData;
    const { email, password } = data;

    await logIn({
      email,
      password,
    });
    setButtonLoading(false);
  }, [logIn]);

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
        <S.Header color={gray1} title={i18n.t('screens.login.headerTitle')} />
        <S.LogoContainer>
          <Logo variant="all-white" width={52} height={12} />
        </S.LogoContainer>
        <S.Title>{i18n.t('screens.login.title')}</S.Title>
        <S.Description>{i18n.t('screens.login.description')}</S.Description>
        <S.Input
          placeholder={i18n.t('screens.login.inputs.email')}
          control={control}
          name="email"
          error={getError(errors, 'email')}
          keyboardType="email-address"
          containerStyle={{ marginBottom: 48 }}
          autoCapitalize="none"
        />
        <S.Input
          placeholder={i18n.t('screens.login.inputs.password')}
          control={control}
          name="password"
          textContentType="password"
          error={getError(errors, 'password')}
          secureTextEntry
        />
        <S.Footer>
          <S.ForgotPassword onPress={handlePressForgotPassword}>
            <S.ForgotPasswordText>
              {i18n.t('screens.login.forgotPassword')}
            </S.ForgotPasswordText>
          </S.ForgotPassword>
          <S.Button
            disabled={!email || !password}
            loading={buttonLoading}
            onPress={() => {
              if (!email || !password) return;
              handleSubmit(handleLogin)();
            }}
          >
            {i18n.t('screens.login.button')}
          </S.Button>
        </S.Footer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default Login;
