import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { i18nextPlugin } from "translation-check";
import * as en from "./locales/en.json";
import * as ru from "./locales/ru.json";

export const defaultNS = "translations";

export const resources = {
  en: {
    translations: {
      ...en,
    },
  },
  ru: {
    translations: {
      ...ru,
    },
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(i18nextPlugin)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    defaultNS,
    debug: true,
    fallbackLng: "en",

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
