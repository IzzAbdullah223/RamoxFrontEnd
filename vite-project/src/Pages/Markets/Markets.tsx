import MCSS from './Markets.module.css'
import { GoLinkExternal } from "react-icons/go";
import { BsPeopleFill } from "react-icons/bs";
import { LuRows2 } from "react-icons/lu";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { IoSearch } from "react-icons/io5";
import { HiMiniBarsArrowDown } from "react-icons/hi2";
import { FaStar } from "react-icons/fa";
import { GoTriangleDown } from "react-icons/go";
import { FaRegStar } from "react-icons/fa";
import { FaRegFileAlt } from "react-icons/fa";
import {useEffect,useState} from 'react';
 
type Token = {
  id: number;
  name: string;
  symbol: string;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      volume_24h: number;
      market_cap: number;
    };
  };
};

function Markets(){

const [topVolume, setTopVolume] = useState<Token[]>([]);
const [topGainers, setTopGainers] = useState<Token[]>([]);
const [topLosers, setTopLosers] = useState<Token[]>([]);
    

useEffect(() => {
  const fetchTokens = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/tokens');
      const data = await response.json();

      if (data && data.data && Array.isArray(data.data)) {
        const tokens = data.data;

        // Top 5 Volume
        const topVolume = [...tokens]
          .sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h)
          .slice(0, 5);

        // Top 5 Gainers (by % change 24h)
        const topGainers = [...tokens]
          .filter(token => token.quote.USD.percent_change_24h > 0)
          .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h)
          .slice(0, 5);

        // Top 5 Losers (by % change 24h)
        const topLosers = [...tokens]
          .filter(token => token.quote.USD.percent_change_24h < 0)
          .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
          .slice(0, 5);

        // For Social Activity: 
        // if you have social data, process it here
        // otherwise use placeholder or skip

        setTopVolume(topVolume);
        setTopGainers(topGainers);
        setTopLosers(topLosers);
        // setTopSocialActivity(...)  // if available
      } else {
        console.error('Unexpected API response structure:', data);
      }
    } catch (error) {
      console.error('Error fetching token data:', error);
    }
  };

  fetchTokens();
}, []);

  function test(){
 console.log(topVolume)
 console.log(topGainers)
 console.log(topLosers)
  }
    return(
        <div className={MCSS.PageContainer}>

            <div className={MCSS.SignUp} onClick={test}>
                <div className={MCSS.SignLeftSide}> 
                    <h2>Sign Up to AI BROKER Tiers and enjoy all the <br></br> perks</h2>
                    <div>Unlock exclusive acess to premium content, personalized insight
                     and unique perks by subscribing<br></br> to AI Broker tiers now !
                    </div>
                  </div>
                <div onClick={test} className={MCSS.SignBox}>
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

<div className={MCSS.Top5}>
  <div className={MCSS.TopName}>
    <div className={MCSS.Icon}><LuRows2 /></div>
    <h2>Top 5 Volume</h2>
  </div>

  <div className={MCSS.TopHeaders}>
    <div>EXCHANGE</div>
    <div>VOLUME</div>
  </div>

  <div className={MCSS.TopSides}>
    <div className={MCSS.TopLeft}>
      {topVolume.map(token => (
        <div className={MCSS.Token} key={token.id}>
          <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`} alt={token.name} />
          <div>
            <div>{token.name}</div>
            <div>{token.symbol}</div>
          </div>
        </div>
      ))}
    </div>

    <div className={MCSS.TopRight}>
      {topVolume.map(token => (
        <div className={MCSS.Interact} key={token.id}>
          <div>${(token.quote.USD.volume_24h / 1e6).toFixed(2)}M</div>
          <div className={MCSS.SevenContainer}>
            <div className={MCSS.Top24}>24h</div>
            <div
              className={
                token.quote.USD.percent_change_24h >= 0
                  ? MCSS.Inc
                  : MCSS.Dec
              }
            >
              {token.quote.USD.percent_change_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

<div className={MCSS.Top5}>
  <div className={MCSS.TopName}>
    <div className={MCSS.Icon}><BsFillLightningChargeFill /></div>
    <h2>Top 5 Gainers</h2>
  </div>

  <div className={MCSS.TopHeaders}>
    <div>TOKEN</div>
    <div>TOTAL GAIN</div>
  </div>

  <div className={MCSS.TopSides}>
    <div className={MCSS.TopLeft}>
      {topGainers.map(token => (
        <div className={MCSS.Token} key={token.id}>
          <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`} alt={token.name} />
          <div>
            <div>{token.name}</div>
            <div>{token.symbol}</div>
          </div>
        </div>
      ))}
    </div>

    <div className={MCSS.TopRight}>
      {topGainers.map(token => (
        <div className={MCSS.Interact} key={token.id}>
          <div>${token.quote.USD.price.toFixed(3)}</div>
          <div className={MCSS.SevenContainer}>
            <div className={MCSS.Top24}>24h</div>
            <div className={MCSS.Inc}>
              +{token.quote.USD.percent_change_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>

<div className={MCSS.Top5}>
  <div className={MCSS.TopName}>
    <div className={MCSS.Icon}><BsPeopleFill /></div>
    <h2>Top 5 Losers</h2>
  </div>

  <div className={MCSS.TopHeaders}>
    <div>TOKEN</div>
    <div>TOTAL LOSS</div>
  </div>

  <div className={MCSS.TopSides}>
    <div className={MCSS.TopLeft}>
      {topLosers.map(token => (
        <div className={MCSS.Token} key={token.id}>
          <img src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`} alt={token.name} />
          <div>
            <div>{token.name}</div>
            <div>{token.symbol}</div>
          </div>
        </div>
      ))}
    </div>

    <div className={MCSS.TopRight}>
      {topLosers.map(token => (
        <div className={MCSS.Interact} key={token.id}>
          <div>${token.quote.USD.price.toFixed(3)}</div>
          <div className={MCSS.SevenContainer}>
            <div className={MCSS.Top24}>24h</div>
            <div className={MCSS.Dec}>
              {token.quote.USD.percent_change_24h.toFixed(2)}%
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
            </div>


            <div className={MCSS.AllTokensContainer}>
                <div className={MCSS.AllTokensTop}>

                    <h2>All Tokens</h2>
                    <div className={MCSS.AllTokensRight}> 
                        <div className={MCSS.SearchContainer}>
                             <input type='text' placeholder='Search by Token name or tag'></input>
                         <IoSearch></IoSearch>
                        </div>

                        <div className={MCSS.ColumnContainer}>
                            <div>Columns</div>
                            <LuRows2></LuRows2>
                        </div>

                        <div className={MCSS.FilterContainer}>
                            <div>Filters</div>
                            <HiMiniBarsArrowDown></HiMiniBarsArrowDown>
                        </div>
                    </div>
                </div>

                <div className={MCSS.AllTokensSecond}>
                     <FaStar></FaStar>
                     <div className={MCSS.SecondRowContainer}>
                        <div>Token</div>
                        <GoTriangleDown></GoTriangleDown>
                     </div>
    
                     <div className={MCSS.SecondRowContainer}>
                        <div>Price</div>
                        <GoTriangleDown></GoTriangleDown>
                     </div>

                     <div className={MCSS.SecondRowContainer}>
                        <div>Market Cap</div>
                        <GoTriangleDown></GoTriangleDown>
                     </div>

                     <div className={MCSS.SecondRowContainer}>
                        <div>Volume</div>
                        <GoTriangleDown></GoTriangleDown>
                     </div>

                     <div className={MCSS.SecondRowContainer}>
                        <div>Social Following</div>
                        <GoTriangleDown></GoTriangleDown>
                     </div>

                     <div className={MCSS.SecondRowContainer}>
                        <div>Social Interactions</div>
                        <GoTriangleDown></GoTriangleDown>
                     </div>

                     <div className={MCSS.SecondRowContainer}>
                        <div>Circulating supply</div>
                        <GoTriangleDown></GoTriangleDown>
                     </div>
                     <div>24th Curve</div>
                </div>

                <div className={MCSS.AllTokensThird}>
                    <div className={MCSS.TwoIcons}>   
                    <FaRegStar></FaRegStar>
                    <FaRegFileAlt></FaRegFileAlt>
                    </div>
                    <div className={MCSS.Token}>
                        <img src='coin.png'></img>
                        <div>
                            <div>Kava</div>
                            <div>KAVA</div>
                        </div>
                    </div>

                    <div className={MCSS.Price}>
                        <h4>29,025.99</h4>
                        <div className={MCSS.PriceBelow}>
                            <div className={MCSS.Top24}>24</div>
                            <div className={MCSS.Dec}>-2.39%</div>
                            <div className={MCSS.Top24}>7d</div>
                        </div>
                    </div>  

                    <div className={MCSS.MarketCap}>
                        <h4>561.87B</h4>    
                    </div>

                    <div className={MCSS.Volume}>
                        <h4>29,025.99</h4>
                        <div className={MCSS.VolumeBelow}>
                            <div className={MCSS.Top24}>24</div>
                            <div className={MCSS.Inc}>19.23%</div>
                        </div>
                    </div>   

                    <div className={MCSS.SFollowing}>
                        <div className={MCSS.SFollowingLeft}>
                            <img src='coin.svg'></img>
                            <div className={MCSS.DiscordContainer}>
                                <div>Discord</div>
                                <div className={MCSS.Discord2}> 
                                    <div className={MCSS.Top24}>24</div>
                                    <div className={MCSS.Inc}>+75B</div>
                                </div>
                            </div>    
                        </div>

                        <div className={MCSS.SFollowingRight}>
                            <img src='coin.svg'></img>
                            <div className={MCSS.TwitterContainer}>
                                <div>Twitter</div>
                                <div className={MCSS.Twitter2}> 
                                    <div className={MCSS.Top24}>24</div>
                                    <div className={MCSS.Inc}>+136</div>
                                </div>
                            </div>    
                        </div> 
 
                    </div>
                    <div className={MCSS.SFollowing}>
                        <div className={MCSS.SFollowingLeft}>
                            <img src='coin.svg'></img>
                            <div className={MCSS.DiscordContainer}>
                                <div>25.75K</div>
                                <div className={MCSS.Discord2}> 
                                    <div className={MCSS.Top24}>24</div>
                                    <div className={MCSS.Inc}>-29.24%</div>
                                </div>
                            </div>    
                        </div>

                        <div className={MCSS.SFollowingRight}>
                            <img src='coin.svg'></img>
                            <div className={MCSS.TwitterContainer}>
                                <div>12.65K</div>
                                <div className={MCSS.Twitter2}> 
                                    <div className={MCSS.Top24}>24</div>
                                    <div className={MCSS.Inc}>-46.12%</div>
                                </div>
                            </div>    
                        </div> 

                        <div className={MCSS.Circulating}>
                            <h4>19.36M BTC</h4>
                            <div className={MCSS.BarContainer}></div>                            
                        </div>

                        <div className={MCSS.Curve24}>
                            <div>{/* Img div or what here for the chart?*/}</div>
                        </div>
 
                    </div> 
                </div>
            
            </div>
            
        </div>
    )

}

export default Markets