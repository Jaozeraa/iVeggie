import * as z from 'zod';

import { i18n } from '../services/translator';

const nameValidation = z
  .string()
  .min(1, { message: i18n.t('validations.name.invalid') });

export default nameValidation;
