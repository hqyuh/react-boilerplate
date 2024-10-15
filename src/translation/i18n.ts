import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import translationEnglish from './locales/en.json';
import translationVietnamese from './locales/vi.json';

const languages = ['en', 'vi'];

export const resources = {
  en: {
    translation: translationEnglish
  },
  vi: {
    translation: translationVietnamese
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: languages,
    fallbackLng: 'en',
    lng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    },
    detection: {
      order: ['cookie', 'localStorage', 'navigator', 'querystring', 'header', 'path', 'subdomain'],
      lookupQuerystring: 'lng',
      lookupCookie: 'i18next',
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage', 'cookie'],
      cookieMinutes: 10080, // 7 days
      cookieOptions: { path: '/', sameSite: 'strict' }
    }
  });

export default i18n;
