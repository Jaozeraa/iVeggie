import * as z from 'zod';

import { i18n } from '../services/translator';

const passwordValidation = z
  .string()
  .min(6, { message: i18n.t('validations.password.min') });

export default passwordValidation;
