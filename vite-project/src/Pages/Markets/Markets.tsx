import MCSS from './Markets.module.css'
import { GoLinkExternal } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { FiBarChart2 } from "react-icons/fi";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { HiOutlineChartBarSquare } from "react-icons/hi2";
<HiOutlineChartBarSquare/>

function Markets(){
    return(
        <div className={MCSS.PageContainer}>

            <div className={MCSS.SignUp}>
                <div className={MCSS.SignLeftSide}> 
                    <h2>Sign Up to AI BROKER Tiers and enjoy all the <br></br> perks</h2>
                    <div>Unlock exclusive acess to premium content, personalized insight
                     and unique perks by subscribing<br></br> to AI Broker tiers now !
                    </div>
                  </div>
                <div className={MCSS.SignBox}>
                    <div>Sign Up Now </div>
                    <GoLinkExternal /> 
                </div>
            </div>

            <div className={MCSS.Top5Container}>

                <div className={MCSS.Top5}>
                    <div className={MCSS.TopName}>
                        <div className={MCSS.Icon}><BsPeopleFill></BsPeopleFill></div>
                        <h2>Top 5 Soical Activity</h2>
                    </div>

                    <div className={MCSS.TopHeaders}>
                        <div>TOKEN</div>
                        <div>INTERACTIONS</div>
                    </div>

                    <div className={MCSS.TopSides}>
                        <div className={MCSS.TopLeft}>

                            <div className={MCSS.Token}>
                                <img src='coin.png'></img>
                                <div>
                                    <div>Kava</div>
                                    <div>KAVA</div>
                                </div>
                            </div>

                            <div className={MCSS.Token}>
                                <img src='coin.png'></img>
                                <div>
                                    <div>Kava</div>
                                    <div>KAVA</div>
                                </div>
                            </div>

                            <div className={MCSS.Token}>
                                <img src='coin.png'></img>
                                <div>
                                    <div>Kava</div>
                                    <div>KAVA</div>
                                </div>
                            </div>

                            <div className={MCSS.Token}>
                                <img src='coin.png'></img>
                                <div>
                                    <div>Kava</div>
                                    <div>KAVA</div>
                                </div>
                            </div>

                            <div className={MCSS.Token}>
                                <img src='coin.png'></img>
                                <div>
                                    <div>Kava</div>
                                    <div>KAVA</div>
                                </div>
                            </div>
                        </div>

                        <div className={MCSS.TopRight}>

                        <div className={MCSS.Interact}>
                            <div>64</div>
                            <div className={MCSS.SevenContainer}>
                                <div className={MCSS.Seven}>7d</div>
                                <div className={MCSS.Inc}>+255.56%</div>
                            </div>
                        </div>

                        <div className={MCSS.Interact}>
                            <div>64</div>
                            <div className={MCSS.SevenContainer}>
                                <div className={MCSS.Seven}>7d</div>
                                <div className={MCSS.Inc}>+255.56%</div>
                            </div>
                        </div>

                        <div className={MCSS.Interact}>
                            <div>64</div>
                            <div className={MCSS.SevenContainer}>
                                <div className={MCSS.Seven}>7d</div>
                                <div className={MCSS.Inc}>+255.56%</div>
                            </div>
                        </div>

                        <div className={MCSS.Interact}>
                            <div>64</div>
                            <div className={MCSS.SevenContainer}>
                                <div className={MCSS.Seven}>7d</div>
                                <div className={MCSS.Inc}>+255.56%</div>
                            </div>
                        </div>

                        <div className={MCSS.Interact}>
                            <div>64</div>
                            <div className={MCSS.SevenContainer}>
                                <div className={MCSS.Seven}>7d</div>
                                <div className={MCSS.Inc}>+255.56%</div>
                            </div>
                        </div>

                 
                        </div>

                    </div>
                </div>
            </div>
            
        </div>
    )

}

export default Markets