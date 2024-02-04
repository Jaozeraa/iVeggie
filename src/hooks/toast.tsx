import React, { createContext, useContext, useCallback, useState } from 'react';

import ToastContainer from '../components/molecules/ToastContainer';
import { i18n } from '../services/translator';
import * as Crypto from 'expo-crypto';

const ToastContext = createContext<models.ToastContextData>(
  {} as models.ToastContextData,
);

export const ToastContextProvider: React.FC<models.DefaultComponentProps> = ({
  children,
}) => {
  const [message, setMessage] = useState<models.ToastMessage | null>(null);

  const addToast = useCallback(
    ({ type, message }: Omit<models.ToastMessage, 'id'>) => {
      const id = Crypto.randomUUID();

      const toast = {
        id,
        type,
        message: i18n.t(`messages.${type}.${message}`),
      };

      setMessage(toast);
    },
    [],
  );

  const removeToast = useCallback((): void => {
    setMessage(null);
  }, []);

  return (
    <>
      <ToastContext.Provider value={{ addToast, removeToast }}>
        {children}
        <ToastContainer message={message} removeToast={removeToast} />
      </ToastContext.Provider>
    </>
  );
};

export function useToast(): models.ToastContextData {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('Use toast must be used within a toast provider');
  }
  return context;
}
