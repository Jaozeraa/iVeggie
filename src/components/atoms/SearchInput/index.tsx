import React from 'react';
import * as S from './styles';
import { useTheme } from 'styled-components';
import Feather from '@expo/vector-icons/Feather';

const SearchInput: React.FC<models.SearchInputProps> = ({
  control,
  name,
  containerStyle,
  ...rest
}) => {
  const {
    colors: { gray3, gray2 },
  } = useTheme();
  return (
    <S.Container style={containerStyle}>
      <Feather name="search" size={20} color={gray2} />
      <S.InputController
        control={control}
        name={name}
        render={({ field: { onChange, onBlur, value } }) => (
          <S.Input
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
    </S.Container>
  );
};

export default SearchInput;
