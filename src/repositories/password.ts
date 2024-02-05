import api from '../services/api';
const BASE_URL = '/users/password';

const PasswordApi = {
  forgot: async (email: string) => {
    await api.post(`${BASE_URL}/forgot`, { email });

    return;
  },
  reset: async (form: models.ResetPasswordFormData) => {
    await api.post(`${BASE_URL}/reset`, form);

    return;
  },
};

export default PasswordApi;
