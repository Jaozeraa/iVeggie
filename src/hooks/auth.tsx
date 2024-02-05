import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';
import api from '../services/api';
import {
  multiGetStorageItem,
  multiRemoveStorageItem,
  multiSetStorageItem,
  StorageItems,
} from '../services/storage';
import SessionsApi from '../repositories/sessions';
import { useToast } from './toast';
import { AxiosError } from 'axios';

const AuthContext = createContext<models.AuthContextState>(
  {} as models.AuthContextState,
);

export const AuthContextProvider: React.FC<models.DefaultComponentProps> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<models.AuthState>(
    {} as models.AuthState,
  );
  const { addToast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);

      const [[, accessToken], [, refreshToken], [, user]] =
        await multiGetStorageItem([
          StorageItems.ACCESS_TOKEN,
          StorageItems.REFRESH_TOKEN,
          StorageItems.USER,
        ]);

      if (accessToken && refreshToken && user) {
        api.defaults.headers.authorization = `Bearer ${accessToken}`;

        setAuthData({
          accessToken,
          refreshToken,
          user: JSON.parse(user),
        });
      }

      setLoading(false);
    })();
  }, []);

  const logIn = useCallback(async (data: models.LoginFormData) => {
    try {
      const response = await SessionsApi.login(data);
      const { accessToken, refreshToken, user } = response;

      api.defaults.headers.authorization = `Bearer ${accessToken}`;

      await multiSetStorageItem([
        [StorageItems.ACCESS_TOKEN, accessToken],
        [StorageItems.REFRESH_TOKEN, refreshToken],
        [StorageItems.USER, JSON.stringify(user)],
      ]);

      const newAuthData = { accessToken, user, refreshToken };

      setAuthData(newAuthData);

      addToast({
        type: 'success',
        message: 'login',
      });
      return newAuthData;
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
    }
  }, []);

  const signOut = useCallback(async () => {
    try {
      await multiRemoveStorageItem([
        StorageItems.USER,
        StorageItems.ACCESS_TOKEN,
        StorageItems.REFRESH_TOKEN,
      ]);

      setAuthData({} as models.AuthState);
    } catch (error) {
      addToast({
        type: 'error',
        message: 'generic',
      });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: authData.user,
        loading,
        logIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): models.AuthContextState {
  const authState = useContext(AuthContext);

  if (!authState) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authState;
}
