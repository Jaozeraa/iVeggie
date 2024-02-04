import styled, { css } from 'styled-components/native';

export const Container = styled.Modal`
  flex: 1;
`;

export const Content = styled.View`
  flex: 1;
  background-color: #00000090;
`;

export const ModalContainer = styled.Modal`
  flex: 1;
`;

export const ModalContentContainer = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const ModalContent = styled.View`
  width: 100%;
  background-color: ${props => props.theme.colors.gray5};
  border-radius: 8px;
  align-items: center;
  justify-content: center;
`;
