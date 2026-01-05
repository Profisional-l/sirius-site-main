"use client";

import React from "react";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

export function I18nProvider({
  children,
  resources,
}: {
  children: React.ReactNode;
  resources: any;
}) {
  const i18n = i18next.createInstance();
  
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      resources,
      lng: "en",
      fallbackLng: "en",
      supportedLngs: ["en", "vi"],
      debug: false,
      interpolation: {
        escapeValue: false,
      },
    });
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
