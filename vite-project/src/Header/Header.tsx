import HeaderCSS from './Header.module.css';
import { IoSearch } from "react-icons/io5";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegBell } from "react-icons/fa6";
import { FaRegMoon } from "react-icons/fa";
import { FaRegSun } from "react-icons/fa6";
import { RxExit } from "react-icons/rx";
import { FaLanguage } from "react-icons/fa";
import { useLanguage } from '../LanguageContext'

function Header() {
  const { language, toggleLanguage, isRTL } = useLanguage();

  return (
    <div className={HeaderCSS.HeaderContainer} dir={isRTL ? 'rtl' : 'ltr'}>
      <h1>{language === 'en' ? 'AI Trading Bot' : 'بوت التداول بالذكاء الاصطناعي'}</h1>
      <div className={HeaderCSS.RightContainer}>
        <IoSearch/>
        <MdOutlineEmail/>
        <FaRegBell />
        <FaRegMoon/>
        <span 
          className={HeaderCSS.Language} 
          onClick={toggleLanguage}
          title={language === 'en' ? 'Switch to Arabic' : 'التبديل إلى الإنجليزية'}
        >
          <FaLanguage />
        </span>
        <span className={HeaderCSS.Sun}><FaRegSun/></span>
        <RxExit />
      </div>
    </div>
  );
}

export default Header;