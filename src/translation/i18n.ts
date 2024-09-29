import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './locales/en.json';

const languages = ['en'];

export const resources = {
  en: {
    translation: translationEnglish
  }
};

i18n.use(initReactI18next).init({
  resources,
  supportedLngs: languages,
  fallbackLng: 'en',
  lng: 'en',
  debug: false,
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
