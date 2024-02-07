import React, { useCallback } from 'react';

import * as S from './styles';
import { i18n } from '../../../services/translator';

const OrderTrackCard: React.FC<models.OrderTrackCardProps> = ({
  estimatedMinutes,
}) => {
  const getDeliveryHour = useCallback(() => {
    const date = new Date();
    date.setMinutes(date.getMinutes() + Math.ceil(Number(estimatedMinutes)));
    return date;
  }, []);

  return (
    <S.Container>
      <S.Label>{i18n.t('components.orderTrackCard.estimatedTime')}</S.Label>
      <S.Title>{`${getDeliveryHour()
        .toLocaleTimeString()
        .slice(0, 5)} - ${Math.ceil(Number(estimatedMinutes))} ${i18n.t(
        'components.orderTrackCard.minutes',
      )}`}</S.Title>
      <S.Progress />
      <S.Label>{i18n.t('components.orderTrackCard.onTheWay')}</S.Label>
    </S.Container>
  );
};

export default OrderTrackCard;
