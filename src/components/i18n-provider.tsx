'use client';

import React, { useEffect } from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'vi'],
    debug: false,
    interpolation: {
      escapeValue: false, // React already does escaping
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
  });

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // This empty useEffect ensures the component is treated as a client component
    // and i18next initializes correctly on the client side.
  }, []);

  return <>{children}</>;
}
