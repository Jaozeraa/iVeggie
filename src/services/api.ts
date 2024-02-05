import axios from 'axios';
import {
  getStorageItem,
  multiSetStorageItem,
  multiRemoveStorageItem,
  StorageItems,
} from './storage';
import urlsConfig from '../configs/urls.config';

const baseURL = urlsConfig.apiUrl;

const api = axios.create({
  baseURL,
});

api.interceptors.response.use(undefined, async error => {
  if (
    error.config &&
    error.response &&
    error.response.status === 401 &&
    error.response.data.message === 'invalidCredentials'
  ) {
    try {
      const oldRefreshToken = await getStorageItem(StorageItems.REFRESH_TOKEN);
      if (!oldRefreshToken) {
        throw new Error('invalidCredentials');
      }
      const response = await axios.put(`${baseURL}/users/sessions`, {
        refreshToken: oldRefreshToken,
      });

      const { newRefreshToken: refreshToken, accessToken } = response.data;

      await multiSetStorageItem([
        [StorageItems.REFRESH_TOKEN, refreshToken],
        [StorageItems.ACCESS_TOKEN, accessToken],
      ]);

      error.config.headers.authorization = `Bearer ${accessToken}`;

      return axios.request(error.config);
    } catch (error) {
      await multiRemoveStorageItem([
        StorageItems.REFRESH_TOKEN,
        StorageItems.ACCESS_TOKEN,
        StorageItems.USER,
      ]);
      return;
    }
  }

  return Promise.reject(error);
});

export default api;
