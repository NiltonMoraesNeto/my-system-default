import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './../locales/en/translation.json';
import translationPT from './../locales/pt/translation.json';
import translationES from './../locales/es/translation.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      pt: {
        translation: translationPT,
      },
      es: {
        translation: translationES,
      },
    },
    lng: 'pt', // Idioma padrão
    fallbackLng: 'en', // Idioma de fallback
    interpolation: {
      escapeValue: false, 
    },
  });

export default i18n;
