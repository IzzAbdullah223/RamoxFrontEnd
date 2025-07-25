import { createContext, useContext, useState } from 'react';
import type { ReactNode, FC } from 'react';

type Language = 'en' | 'ar';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: FC<{children: ReactNode}> = ({ children }) => {
  // Initialize with 'en' by default
  const [language, setLanguage] = useState<Language>(() => {
    // Check localStorage only during initial render
    const savedLang = localStorage.getItem('language') as Language | null;
    return savedLang || 'en'; // Default to English if nothing in storage
  });
  
 

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'en' ? 'ar' : 'en';
      localStorage.setItem('language', newLang);
      return newLang;
    });
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};