import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Language } from '../types/kumbati.types';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  t: (enText: string, cebText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const LANGUAGE_STORAGE_KEY = 'kumbati_user_language';

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (stored === 'en' || stored === 'ceb') {
        return stored;
      }
    } catch {
      // LocalStorage unavailable
    }
    return 'en';
  });

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, newLang);
    } catch {
      // Ignore storage errors
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ceb' : 'en');
  };

  /**
   * Helper translation function returning the appropriate localized string
   */
  const t = (enText: string, cebText: string): string => {
    return lang === 'ceb' ? cebText : enText;
  };

  useEffect(() => {
    document.documentElement.lang = lang === 'ceb' ? 'fil-PH' : 'en';
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
