import enTranslations from '../translations/en';
import arTranslations from '../translations/ar';
import { useLanguage } from '../LanguageContext'

export const useTranslation = () => {
  const { language } = useLanguage();
  const translations = language === 'en' ? enTranslations : arTranslations;
  
  return (key: keyof typeof enTranslations) => {
    return translations[key] || key;
  };
};