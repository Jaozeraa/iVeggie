import React, { useCallback } from 'react';

import * as S from './styles';
import { i18n } from '../../../services/translator';
import { formatCurrency } from '../../../utils/formatCurrency';
import { useTheme } from 'styled-components';
import { useToast } from '../../../hooks/toast';

const Bag: React.FC<models.BagProps> = ({
  isVisible,
  setIsVisible,
  removeItem,
  removeAllItems,
  items,
  subtotal,
}) => {
  const toast = useToast();
  const {
    colors: { gray1, red },
  } = useTheme();
  const freight = 10;
  const totalPrice = freight + subtotal;

  const handleDeleteItem = useCallback((food: models.Food) => {
    removeItem(food.bagFoodId);
  }, []);

  const handleCheckout = useCallback(() => {
    removeAllItems();
    toast.addToast({
      type: 'success',
      message: 'bag.checkout',
    });
  }, []);

  return (
    <S.BottomSheet isVisible={isVisible} setIsVisible={setIsVisible}>
      <S.Container>
        <S.HeaderContainer>
          <S.Header
            variant="modal"
            onPress={() => setIsVisible(false)}
            title={i18n.t('components.bag.headerTitle')}
            color={gray1}
          />
        </S.HeaderContainer>
        <S.ItemsList
          data={items}
          keyExtractor={(_item, index) => String(index)}
          renderItem={({ item, index }) => (
            <S.FoodCardContainer isLastItem={index === items.length - 1}>
              <S.FoodCardContent>
                <S.FoodCard
                  food={item as models.Food}
                  variant="horizontal"
                  disabled
                />
              </S.FoodCardContent>
              <S.DeleteButton
                onPress={() => handleDeleteItem(item as models.Food)}
              >
                <S.DeleteIcon name="trash-2" size={20} color={red} />
              </S.DeleteButton>
            </S.FoodCardContainer>
          )}
        />
        <S.PriceTable>
          <S.SubPriceTableLine>
            <S.SubPriceText>{i18n.t('components.bag.subTotal')}</S.SubPriceText>
            <S.SubPriceText>{formatCurrency(subtotal)}</S.SubPriceText>
          </S.SubPriceTableLine>
          <S.SubPriceTableLine>
            <S.SubPriceText>{i18n.t('components.bag.freight')}</S.SubPriceText>
            <S.SubPriceText>{formatCurrency(freight)}</S.SubPriceText>
          </S.SubPriceTableLine>
          <S.PriceTableLine>
            <S.PriceText>{i18n.t('components.bag.total')}</S.PriceText>
            <S.PriceText>{formatCurrency(totalPrice)}</S.PriceText>
          </S.PriceTableLine>
        </S.PriceTable>
        <S.Footer>
          <S.PriceContainer>
            <S.PriceLabel>{i18n.t('components.bag.total')}</S.PriceLabel>
            <S.PriceTitleContainer>
              <S.Price>{formatCurrency(totalPrice)}</S.Price>
              <S.ItemsLabel>
                / {items.length}{' '}
                {i18n.t(
                  `components.bag.${
                    items.length === 1 ? 'itemLabel' : 'itemsLabel'
                  }`,
                )}
              </S.ItemsLabel>
            </S.PriceTitleContainer>
          </S.PriceContainer>
          <S.CheckoutButton
            style={{ borderRadius: 8 }}
            hitSlop={16}
            onPress={handleCheckout}
          >
            <S.CheckoutButtonText>
              {i18n.t('components.bag.button')}
            </S.CheckoutButtonText>
          </S.CheckoutButton>
        </S.Footer>
      </S.Container>
    </S.BottomSheet>
  );
};

export default Bag;
