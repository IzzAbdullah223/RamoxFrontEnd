import { CiCircleCheck} from "react-icons/ci";
import { MdOutlineCancel } from "react-icons/md";
import { HiChartBar } from "react-icons/hi";
import { IoEyeOutline } from "react-icons/io5";
import { RiRobot2Line } from "react-icons/ri";
import { CiWallet } from "react-icons/ci";
import { GoTag } from "react-icons/go";
import { MdPeopleOutline } from "react-icons/md";
import { CiHeart } from "react-icons/ci";

import { useState } from 'react'
import  LCSS from './LCSS.module.css'
function LeftColumn(){
    
    const [Verifed,setVerifed]= useState(true) // will put later in main
    const [percentage,setPercentage]= useState(true) //will put it lare in main

    return(
        <div className={LCSS.LeftColumn}>
            <div className={LCSS.LCTop}>
                <img src="../assets/Coin.svg"></img>
                <h2>AI BROKER</h2>
            </div>
            <div className={LCSS.Box}>
                <h4>Name</h4>
                <p>Verified
                <span className={Verifed? LCSS.checkIcon: LCSS.falseIcon}>
                    {Verifed
                    ?<CiCircleCheck/>
                    :<MdOutlineCancel/>}
                </span>
                </p>
            </div>
            <div className={LCSS.Balance}>
                <div>Total Balance</div>
                <h3>$15,453.05 <span className={percentage? LCSS.Inc: LCSS.Dec}> +9.34%</span></h3>
            </div>
            <div className={LCSS.Nav}>

                <div className={`${LCSS.Market} ${LCSS.Active}`}>
                    <HiChartBar />
                    <div>Markets</div>
                </div>

                <div className={LCSS.Market}>
                    <IoEyeOutline/>
                    <div>Watchlist</div>
                </div>   
                <div className={LCSS.Market}>
                    <RiRobot2Line/>
                    <div>AI Trading Bot</div>
                </div>   
                <div className={LCSS.Market}>
                    <CiWallet/>
                    <div>Wallet</div>
                </div>   
                <div className={LCSS.Market}>
                    <GoTag />
                    <div>Guides</div>
                </div>   
                <div className={LCSS.Market}>
                    <MdPeopleOutline />
                    <div>Community</div>
                </div>   
                <div className={LCSS.Market}>
                    <CiHeart/>
                    <div>Support</div>
                </div>   
                                                 
            </div>
            <div className={LCSS.Upqrade}>
                <div>
                    <div>UPQRADE TO</div>
                    <h4>Professional Tier</h4>
                </div>
                <img src="../assets/Coin.svg"/> 
            </div>
        </div>
 
    )

}
export default LeftColumn