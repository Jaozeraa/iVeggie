import React from 'react';

import * as S from './styles';
import { formatCurrency } from '../../../utils/formatCurrency';
import { i18n } from '../../../services/translator';

const BagBar: React.FC<models.BagBarProps> = ({
  items,
  subtotal,
  openModal,
}) => {
  return (
    <S.Container>
      <S.PriceContainer>
        <S.PriceLabel>{i18n.t('components.bagBar.priceLabel')}</S.PriceLabel>
        <S.PriceTitleContainer>
          <S.Price>{formatCurrency(subtotal)}</S.Price>
          <S.ItemsLabel>
            / {items.length}{' '}
            {i18n.t(
              `components.bagBar.${
                items.length === 1 ? 'itemLabel' : 'itemsLabel'
              }`,
            )}
          </S.ItemsLabel>
        </S.PriceTitleContainer>
      </S.PriceContainer>
      <S.CheckoutButton
        style={{ borderRadius: 8 }}
        hitSlop={16}
        onPress={openModal}
      >
        <S.CheckoutButtonText>
          {i18n.t('components.bagBar.button')}
        </S.CheckoutButtonText>
      </S.CheckoutButton>
    </S.Container>
  );
};

export default BagBar;
