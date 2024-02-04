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

const BagContext = createContext<models.BagContextData>(
  {} as models.BagContextData,
);

export const BagContextProvider: React.FC<models.DefaultComponentProps> = ({
  children,
}) => {
  const [isBagVisible, setIsBagVisible] = useState(false);
  const [isBagBarVisible, setIsBagBarVisible] = useState(true);
  const [items, setItems] = useState<models.Food[]>([]);
  const subtotal = useMemo(
    () => items.reduce((acc, food) => acc + food.price, 0),
    [items],
  );

  useEffect(() => {
    if (items.length === 0) {
      setIsBagVisible(false);
    }
  }, [items]);

  const addItem = useCallback((food: models.Food) => {
    const bagFoodId = Crypto.randomUUID();
    const bagFood = {
      ...food,
      bagFoodId,
    };

    setItems(state => [...state, bagFood]);
  }, []);

  const removeItem = useCallback((bagFoodId: string): void => {
    setItems(state => state.filter(item => item.bagFoodId !== bagFoodId));
  }, []);

  const removeAllItems = useCallback(() => {
    setItems([]);
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
          removeAllItems={removeAllItems}
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
