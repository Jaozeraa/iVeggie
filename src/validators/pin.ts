import * as z from 'zod';

import { i18n } from '../services/translator';

const pinValidation = z
  .string()
  .length(6, { message: i18n.t('validations.pin.invalid') });

export default pinValidation;
