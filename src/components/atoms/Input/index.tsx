import React, { useState } from 'react';
import * as S from './styles';
import { useTheme } from 'styled-components';
import Feather from '@expo/vector-icons/Feather';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Input: React.FC<models.InputProps> = ({
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
    colors: { gray2 },
  } = useTheme();
  return (
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
  );
};

export default Input;
