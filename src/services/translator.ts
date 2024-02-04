import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';
import ptBr from '../configs/languages/pt-br.json';

const i18n = new I18n({
  pt: ptBr,
});

i18n.locale = getLocales()[0].languageCode as string;

export { i18n };
