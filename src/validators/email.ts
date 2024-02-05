import * as z from 'zod';

import { i18n } from '../services/translator';

const emailValidation = z
  .string()
  .email(i18n.t('validations.email.invalid'))
  .min(1, { message: i18n.t('validations.required') });

export default emailValidation;
