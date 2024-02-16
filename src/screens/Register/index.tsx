import React, { useCallback, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import * as S from './styles';
import { i18n } from '../../services/translator';
import { useForm } from 'react-hook-form';
import { getError } from '../../utils/getError';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Logo from '../../components/atoms/Logo';
import { useTheme } from 'styled-components';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  emailValidation,
  passwordValidation,
  nameValidation,
} from '../../validators';
import UsersApi from '../../repositories/users';
import { useToast } from '../../hooks/toast';
import { AxiosError } from 'axios';
import { navigateBack } from '../../services/navigation';
import { useNavigation } from '@react-navigation/native';

const schema = z.object({
  name: nameValidation,
  email: emailValidation,
  password: passwordValidation,
});

const Register: React.FC = () => {
  const navigation = useNavigation();
  const [buttonLoading, setButtonLoading] = useState(false);
  const { addToast } = useToast();
  const {
    colors: { gray1 },
  } = useTheme();
  const {
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { name, email, password } = watch();

  const handleRegister = useCallback(async () => {
    setButtonLoading(true);
    const data = getValues() as models.RegisterFormData;
    try {
      await UsersApi.create(data);
      addToast({
        type: 'success',
        message: 'register',
      });
      navigateBack(navigation);
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
          keyboardType="email-address"
          autoCapitalize="none"
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
          <S.Button
            loading={buttonLoading}
            disabled={!name || !email || !password}
            onPress={() => {
              if (!name || !email || !password) return;
              handleSubmit(handleRegister)();
            }}
          >
            {i18n.t('screens.register.button')}
          </S.Button>
        </S.Footer>
      </S.Container>
    </KeyboardAvoidingView>
  );
};

export default Register;
