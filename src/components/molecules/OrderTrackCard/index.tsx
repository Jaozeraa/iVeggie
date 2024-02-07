import React, { useCallback } from 'react';

import * as S from './styles';
import { i18n } from '../../../services/translator';
import { formatTimeMinutes } from '../../../utils/formatTimeMinutes';

const OrderTrackCard: React.FC<models.OrderTrackCardProps> = ({
  estimatedMinutes,
}) => {
  return (
    <S.Container>
      <S.Label>{i18n.t('components.orderTrackCard.estimatedTime')}</S.Label>
      <S.Title>{`${formatTimeMinutes(Number(estimatedMinutes))}`}</S.Title>
      <S.Progress />
      <S.Label>{i18n.t('components.orderTrackCard.onTheWay')}</S.Label>
    </S.Container>
  );
};

export default OrderTrackCard;
