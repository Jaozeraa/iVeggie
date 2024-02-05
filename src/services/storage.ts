import AsyncStorage from '@react-native-async-storage/async-storage';

export const StorageItems = {
  USER: '@iVeggie/user',
  REFRESH_TOKEN: '@iVeggie/refreshToken',
  ACCESS_TOKEN: '@iVeggie/accessToken',
};

export const getStorageItem = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value;
  } catch (error) {
    throw error;
  }
};

export const multiGetStorageItem = async (keys: string[]) => {
  try {
    const values = await AsyncStorage.multiGet(keys);
    return values;
  } catch (error) {
    throw error;
  }
};

export const setStorageItem = async (key: string, value: string) => {
  await AsyncStorage.setItem(key, value);
};

export const multiSetStorageItem = async (
  keyValuePairs: [string, string][],
) => {
  await AsyncStorage.multiSet(keyValuePairs);
};

export const removeStorageItem = async (key: string) => {
  await AsyncStorage.removeItem(key);
};

export const multiRemoveStorageItem = async (keys: string[]) => {
  await AsyncStorage.multiRemove(keys);
};

export const clearStorage = async () => {
  await AsyncStorage.clear();
};
