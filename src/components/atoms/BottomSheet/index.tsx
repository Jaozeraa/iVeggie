import React, { useEffect, useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';

import * as S from './styles';

const BottomSheet: React.FC<models.BottomSheetProps> = ({
  isVisible,
  setIsVisible,
  children,
}) => {
  const [realModalIsVisible, setRealModalIsVisible] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setRealModalIsVisible(true);

      return;
    }
    setRealModalIsVisible(false);
  }, [isVisible]);

  return (
    <S.Container
      animationType="fade"
      transparent
      visible={isVisible}
      statusBarTranslucent
      onRequestClose={() => {
        setIsVisible(false);
      }}
    >
      <S.Content>
        <S.ModalContainer
          animationType="slide"
          statusBarTranslucent
          visible={realModalIsVisible}
          transparent
          onRequestClose={() => {
            setIsVisible(false);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setIsVisible(false)}>
            <S.ModalContentContainer>
              <TouchableWithoutFeedback>
                <S.ModalContent>{children}</S.ModalContent>
              </TouchableWithoutFeedback>
            </S.ModalContentContainer>
          </TouchableWithoutFeedback>
        </S.ModalContainer>
      </S.Content>
    </S.Container>
  );
};

export default BottomSheet;
