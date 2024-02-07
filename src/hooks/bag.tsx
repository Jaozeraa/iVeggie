import React, {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
  useMemo,
} from 'react';
import BagBar from '../components/molecules/BagBar';
import Bag from '../components/organisms/Bag';
import * as Crypto from 'expo-crypto';
import RestaurantsApi from '../repositories/restaurants';

const BagContext = createContext<models.BagContextData>(
  {} as models.BagContextData,
);

export const BagContextProvider: React.FC<models.DefaultComponentProps> = ({
  children,
}) => {
  const [restaurant, setRestaurant] = useState<models.Restaurant | null>(null);
  const [isBagVisible, setIsBagVisible] = useState(false);
  const [isBagBarVisible, setIsBagBarVisible] = useState(true);
  const [items, setItems] = useState<models.Dish[]>([]);
  const subtotal = useMemo(
    () => items.reduce((acc, dish) => acc + Number(dish.price), 0),
    [items],
  );

  useEffect(() => {
    if (items.length === 0) {
      setIsBagVisible(false);
      setRestaurant(null);
    }
  }, [items]);

  const addItem = useCallback(async (dish: models.Dish) => {
    const bagDishId = Crypto.randomUUID();
    const bagDish = {
      ...dish,
      bagDishId,
    };

    setItems(state => [...state, bagDish]);
    if (!restaurant) {
      const restaurant = await RestaurantsApi.getRestaurantDetails(
        dish.restaurantId,
      );
      setRestaurant(restaurant);
    }
  }, []);

  const removeItem = useCallback((bagDishId: string): void => {
    setItems(state => state.filter(item => item.bagDishId !== bagDishId));
  }, []);

  const removeAllItems = useCallback(() => {
    setItems([]);
    setRestaurant(null);
  }, []);

  const openModal = useCallback(() => {
    setIsBagVisible(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsBagVisible(false);
  }, []);

  const hideBar = useCallback(() => {
    setIsBagBarVisible(false);
  }, []);

  const showBar = useCallback(() => {
    setIsBagBarVisible(true);
  }, []);

  return (
    <>
      <BagContext.Provider
        value={{
          items,
          subtotal,
          restaurant,
          addItem,
          removeItem,
          removeAllItems,
          openModal,
          closeModal,
          hideBar,
          showBar,
        }}
      >
        {children}
        {items.length > 0 && isBagBarVisible && (
          <BagBar items={items} subtotal={subtotal} openModal={openModal} />
        )}
        <Bag
          items={items}
          subtotal={subtotal}
          removeItem={removeItem}
          hideBar={hideBar}
          isVisible={isBagVisible}
          setIsVisible={setIsBagVisible}
        />
      </BagContext.Provider>
    </>
  );
};

export function useBag(): models.BagContextData {
  const context = useContext(BagContext);
  if (!context) {
    throw new Error('Use bag must be used within a bag provider');
  }
  return context;
}
