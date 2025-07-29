import { CiCircleCheck } from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { HiChartBar } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import LCSS from './LCSS.module.css';
import { useTranslation } from '../Hooks/useTranslations';
import icon from '../Icon.jpg'; 

function LeftColumn() {
    const [Verifed, setVerifed] = useState(true);
    const [percentage, setPercentage] = useState(true);
    const location = useLocation();
    const currentPath = location.pathname;
 const { t, isRTL } = useTranslation();

    return (
        <div className={LCSS.LeftColumn} dir={isRTL ? 'rtl' : 'ltr'}>
            <div className={LCSS.LCTop}>
                <img src={icon} className={LCSS.icon } alt="RAMOX Logo" />
                <h2>RAMOX</h2>
            </div>
            <div className={LCSS.Box}>
                <h4>{t('name')}</h4>
                <p>{t('verified')}
                    <span className={Verifed ? LCSS.checkIcon : LCSS.falseIcon}>
                        {Verifed ? <CiCircleCheck /> : <MdOutlineCancel />}
                    </span>
                </p>
            </div>
            <div className={LCSS.Balance}>
                <div>{t('totalBalance')}</div>
                <h3>$15,453.05 <span className={percentage ? LCSS.Inc : LCSS.Dec}> +9.34%</span></h3>
            </div>
            <div className={LCSS.Nav}>
                <Link
                    to="/markets"
                    className={`${LCSS.Market} ${currentPath === '/markets' ? LCSS.Active : ''}`}
                >
                    <HiChartBar />
                    <div>{t('markets')}</div>
                </Link>

                <Link
                    to="/watchlist"
                    className={`${LCSS.Market} ${currentPath === '/watchlist' ? LCSS.Active : ''}`}
                >
                    <IoEyeOutline />
                    <div>{t('aiTradingBot')}</div>
                </Link>

                <Link
                    to="/Chat"
                    className={`${LCSS.Market} ${currentPath === '/bot' ? LCSS.Active : ''}`}
                >
                    <RiRobot2Line />
                    <div>{t('chat')}</div>
                </Link>
            </div>
            <div className={LCSS.Upqrade}>
                <div>
                    <div>{t('upgradeTo')}</div>
                    <h4>{t('professionalTier')}</h4>
                </div>
                <img src="../assets/Coin.svg" alt="Upgrade Icon" />
            </div>
        </div>
    )
}

export default LeftColumn;