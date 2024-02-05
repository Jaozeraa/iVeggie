import api from '../services/api';
const BASE_URL = '/users';

const UsersApi = {
  create: async (form: models.RegisterFormData) => {
    const { data } = await api.post(BASE_URL, form);

    return data as models.AuthState;
  },
};

export default UsersApi;
