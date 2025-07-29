import HeaderCSS from './Header.module.css';
import { useLocation } from 'react-router-dom';
import { IoSearch } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { FaLanguage } from "react-icons/fa";
import { useLanguage } from '../LanguageContext';
import { useDarkMode } from '../DarkModeContext';

export default function Header() {
  const { language, toggleLanguage, isRTL } = useLanguage();
  const { darkMode, toggleDarkMode } = useDarkMode();

  const location = useLocation();

    const getPageTitle = () => {
    switch (location.pathname) {
      case '/markets':
        return language === 'en' ? 'Markets' : 'الأسواق';
      case '/watchlist':
        return language === 'en' ? 'AI Trading Bot' : 'بوت التداول بالذكاء الاصطناعي';
      case '/Chat':
        return language === 'en' ? 'Chat' : 'دردشة';
      default:
        return language === 'en' ? 'Chat' : 'بوت التداول بالذكاء الاصطناعي';
    }
  };

  return (
    <div className={HeaderCSS.HeaderContainer} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1>{getPageTitle()}</h1>
      <div className={HeaderCSS.RightContainer}>
        <span className={HeaderCSS.icon}><IoSearch aria-hidden="true" /></span>
        <span className={HeaderCSS.icon}><MdOutlineEmail aria-hidden="true" /></span>
        <span className={HeaderCSS.icon}><FaRegBell aria-hidden="true" /></span>
        
        <button
          onClick={toggleDarkMode}
          className={HeaderCSS.themeToggle}
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <span className={HeaderCSS.icon}>
            {darkMode ? <FaRegSun /> : <FaRegMoon />}
          </span>
        </button>
        
        <button
          className={HeaderCSS.Language}
          onClick={toggleLanguage}
          title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
          aria-label="Toggle language"
        >
          <span className={HeaderCSS.icon}><FaLanguage /></span>
        </button>
        
        <span className={HeaderCSS.icon}><RxExit aria-hidden="true" /></span>
      </div>
    </div>
  );
}