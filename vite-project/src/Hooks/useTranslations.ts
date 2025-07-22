import enTranslations from '../translations/en';
import arTranslations from '../translations/ar';
import { useLanguage } from '../LanguageContext';

type TranslationKey = keyof typeof enTranslations;

export const useTranslation = () => {
  const { language, isRTL } = useLanguage();
  const translations = language === 'en' ? enTranslations : arTranslations;
  
  const t = (key: TranslationKey) => translations[key] || key;

  return { t, isRTL };
};

// Keep this for old components that use t() directly
export const t = (key: TranslationKey) => {
  const { language } = useLanguage();
  const translations = language === 'en' ? enTranslations : arTranslations;
  return translations[key] || key;
};