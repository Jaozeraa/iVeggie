import { AxiosError } from 'axios';
import api from '../services/api';

const BASE_URL = '/users/sessions';

const SessionsApi = {
  login: async (form: models.LoginFormData) => {
    const { data } = await api.post(BASE_URL, form);

    return data as models.AuthState;
  },

  refresh: async (refreshToken: string) => {
    const { data } = await api.put(BASE_URL, { refreshToken });

    return data as models.RefreshResponse;
  },
};

export default SessionsApi;
