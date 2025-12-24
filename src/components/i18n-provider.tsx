"use client";

import React, { useEffect } from "react";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Инициализируем i18next только в браузере, чтобы избежать SSR/SSG подвисаний
    if (typeof window === "undefined") return;
    if (!i18n.isInitialized) {
      i18n
        .use(HttpBackend)
        .use(LanguageDetector)
        .use(initReactI18next)
        .init({
          fallbackLng: "en",
          supportedLngs: ["en", "vi"],
          debug: false,
          interpolation: {
            escapeValue: false,
          },
          backend: {
            loadPath: "/locales/{{lng}}/translation.json",
          },
        });
    }
  }, []);

  return <>{children}</>;
}
