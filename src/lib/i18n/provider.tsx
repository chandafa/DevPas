'use client';

import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
  useCallback,
} from 'react';
import id from '@/locales/id.json';
import en from '@/locales/en.json';

const translations = { id, en };

type Locale = 'id' | 'en';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocaleState] = useState<Locale>('id');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedLocale = localStorage.getItem('locale') as Locale;
    if (savedLocale && ['id', 'en'].includes(savedLocale)) {
      setLocaleState(savedLocale);
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('locale', newLocale);
    }
  };

  const t = useCallback(
    (key: string): string => {
      const keys = key.split('.');
      let result: any = translations[locale];
      for (const k of keys) {
        result = result?.[k];
        if (result === undefined) {
          // Fallback to English if translation not found
          let fallbackResult: any = translations['en'];
          for (const fk of keys) {
            fallbackResult = fallbackResult?.[fk];
          }
          return fallbackResult || key;
        }
      }
      return result || key;
    },
    [locale]
  );
  
  if (!isMounted) {
    return null; // Avoid rendering children until locale is determined client-side
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};
