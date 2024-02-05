import api from '../services/api';

const BASE_URL = '/restaurants';

const RestaurantsApi = {
  getRestaurants: async (payload: string) => {
    const { data } = await api.get(BASE_URL, {
      params: { payload },
    });

    return data as models.Restaurant[];
  },

  getRestaurantDetails: async (id: string) => {
    const { data } = await api.get(`${BASE_URL}/${id}`);

    return data as models.Restaurant;
  },
};

export default RestaurantsApi;
