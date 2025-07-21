import { Outlet } from 'react-router-dom';
import Header from './Header/Header';
import LeftColumn from './LeftColumn/LeftColumn';
import LayOutCSS from './LayOut.module.css';
import { useLanguage } from './LanguageContext';

function LayOut() {
  const { isRTL } = useLanguage();

  return (
    <div className={LayOutCSS.PageContainer} dir={isRTL ? 'rtl' : 'ltr'}>
      <LeftColumn />
      <div className={LayOutCSS.MiddleContent}>
        <Header />
        <Outlet />
      </div>
    </div>
  );
}

export default LayOut;