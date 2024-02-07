import { i18n } from '../services/translator';

export const formatTimeMinutes = (minutes: number): string => {
  if (minutes < 0) {
    return 'The number of minutes must be greater than or equal to zero.';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours === 0) {
    return `${minutes} ${i18n.t('components.orderTrackCard.minute')}s`;
  } else if (remainingMinutes === 0) {
    return `${hours} ${i18n.t('components.orderTrackCard.hour')}${
      hours === 1 ? '' : 's'
    }`;
  } else {
    return `${hours} ${i18n.t('components.orderTrackCard.hour')}${
      hours === 1 ? '' : 's'
    } ${i18n.t('components.orderTrackCard.and')} ${Math.ceil(
      remainingMinutes,
    )} ${i18n.t('components.orderTrackCard.minute')}${
      remainingMinutes === 1 ? '' : 's'
    }`;
  }
};
