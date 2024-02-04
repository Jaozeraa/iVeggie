import React from 'react';

import * as S from './styles';
import Toast from '../../atoms/Toast';

const ToastContainer: React.FC<models.ToastContainerProps> = ({
  message,
  removeToast,
}) => {
  return (
    <S.Container>
      {message && (
        <Toast key={message.id} message={message} removeToast={removeToast} />
      )}
    </S.Container>
  );
};

export default ToastContainer;
