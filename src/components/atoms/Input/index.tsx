import React, { useState } from 'react';
import * as S from './styles';
import { useTheme } from 'styled-components';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Input: React.FC<models.InputProps> = ({
  variant = 'form',
  control,
  required = false,
  error,
  name,
  containerStyle,
  secureTextEntry = false,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const {
    colors: { gray2, gray3 },
  } = useTheme();
  return (
    <>
      {variant === 'form' && (
        <S.Container style={containerStyle}>
          <S.Content isFocused={isFocused}>
            <S.InputController
              control={control}
              rules={{
                required,
              }}
              name={name}
              render={({ field: { onChange, onBlur, value } }) => (
                <S.Input
                  onBlur={() => {
                    onBlur();
                    setIsFocused(false);
                  }}
                  onChangeText={onChange}
                  onFocus={() => {
                    setIsFocused(true);
                  }}
                  value={value}
                  placeholderTextColor={gray2}
                  secureTextEntry={secureTextEntry && !showPassword}
                  {...rest}
                />
              )}
            />
            {secureTextEntry && (
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Feather
                  name={showPassword ? 'eye-off' : 'eye'}
                  size={20}
                  color={gray2}
                />
              </TouchableOpacity>
            )}
          </S.Content>
          {error && <S.Error>{error}</S.Error>}
        </S.Container>
      )}
      {variant === 'search' && (
        <S.SearchContainer style={containerStyle}>
          <Feather name="search" size={20} color={gray2} />
          <S.InputController
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value } }) => (
              <S.SearchInput
                hitSlop={{ top: 24, right: 16, bottom: 24, left: 32 }}
                onBlur={() => {
                  onBlur();
                }}
                onChangeText={onChange}
                value={value}
                placeholderTextColor={gray3}
                {...rest}
              />
            )}
          />
        </S.SearchContainer>
      )}
    </>
  );
};

export default Input;
