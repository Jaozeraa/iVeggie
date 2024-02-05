import api from '../services/api';

const BASE_URL = '/restaurants/dishes';

const DishesApi = {
  getDishDetails: async (id: string) => {
    const { data } = await api.get(`${BASE_URL}/${id}`);

    return data as {
      dish: models.Dish;
      suggestedDishes: models.Dish[];
    };
  },
};

export default DishesApi;
