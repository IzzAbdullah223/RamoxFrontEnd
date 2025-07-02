import MCSS from './Markets.module.css'
import { GoLinkExternal } from "react-icons/go";
import { BsPeopleFill, BsFillLightningChargeFill } from "react-icons/bs";
import { LuRows2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { HiMiniBarsArrowDown } from "react-icons/hi2";
import { TbFileDescription,TbStar,TbStarFilled } from "react-icons/tb";
import { GoTriangleDown } from "react-icons/go";
import { useEffect, useState } from 'react';
import BitCoinImage from '../../BitcoinImage.png'; 
import DiscordImage from '../../Discord.SVG.svg'
import TwitterImage from '../../Twitter.SVG.svg'

type Token = {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      volume_24h: number;
      market_cap: number;
    };
  };
};

function Markets() {
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

          const topVolume = [...tokens]
            .sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h)
            .slice(0, 5);

          const gainers = [...tokens]
            .filter(token => token.quote.USD.percent_change_24h > 0)
            .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h);

          const topGainers = gainers.slice(0, 5);

          const topLosers = [...tokens]
            .filter(token => token.quote.USD.percent_change_24h < 0)
            .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h)
            .slice(0, 5);

          console.log('Gainers found:', gainers.length);

          setTopVolume(topVolume);
          setTopGainers(topGainers);
          setTopLosers(topLosers);
        } else {
          console.error('Unexpected API structure:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
      }
    };

    fetchTokens();
  }, []);

  return (
    <div className={MCSS.PageContainer}>
      <div className={MCSS.SignUp}>
        <div className={MCSS.SignLeftSide}>
          <h2>Sign Up to AI BROKER Tiers and enjoy all the <br /> perks</h2>
          <div>
            Unlock exclusive access to premium content, personalized insight
            and unique perks by subscribing<br /> to AI Broker tiers now!
          </div>
        </div>
        <div className={MCSS.SignBox}>
          <div>Sign Up Now </div>
          <GoLinkExternal />
        </div>
      </div>

      <div className={MCSS.Top5Container}>
        {/* TOP 5 VOLUME */}
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
                    <div className={
                      token.quote.USD.percent_change_24h >= 0
                        ? MCSS.Inc
                        : MCSS.Dec
                    }>
                      {token.quote.USD.percent_change_24h.toFixed(2)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP 5 GAINERS */}
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

        {/* TOP 5 LOSERS */}
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
                    <div className={MCSS.StarContainer}>
                        <TbStarFilled/>
                        <div>
                            <TbStar />
                            <TbFileDescription/>
                        </div>
                    </div>

                    <div className={MCSS.TokenContainer}>
                         <div className={MCSS.TokenTop}>
                            <h5>Token</h5>
                            <GoTriangleDown></GoTriangleDown>
                         </div>
                         <div className={MCSS.TokenBelow}>
                             <img src={BitCoinImage}></img>
                             <div>
                                <div>Bitcoin</div>
                                <div>BTC</div>
                             </div>
                         </div>
                    </div>

                    <div className={MCSS.PriceContainer}>
                        <div className={MCSS.TokenTop}>
                            <h5>Price</h5>
                            <GoTriangleDown></GoTriangleDown>
                         </div>
                         <div className={MCSS.PriceBelow}>
                            <h5>$29,025.99</h5>
                            <div className={MCSS.Prices}>
                                <div className={MCSS.Top24}>24h</div>
                                <div className={MCSS.Dec}>-2.39%</div>
                                <div className={MCSS.Top24}>7d</div>
                                <div className={MCSS.Inc}>+1.15%</div>
                            </div>
                         </div>
                    </div>

                    <div className={MCSS.MarketContainer}>
                        <div className={MCSS.TokenTop}>
                            <h5>Market Cap</h5>
                            <GoTriangleDown></GoTriangleDown>
                        </div>
                        <div className={MCSS.MarketBelow}>
                            <h5>$561.87B</h5>
                        </div>
                    </div>

                    <div className={MCSS.VolumeContainer}>
                        <div className={MCSS.TokenTop}>
                            <h5>Volume</h5>
                            <GoTriangleDown></GoTriangleDown>
                        </div>
                         <div className={MCSS.PriceBelow}>
                            <h5>$29,025.99</h5>
                            <div className={MCSS.Prices}>
                                <div className={MCSS.Top24}>24h</div>
                                <div className={MCSS.Inc}>+1.15%</div>
                            </div>
                         </div>
                    </div>
                    
                    <div className={MCSS.SocialContainer}>
                        <div className={MCSS.TokenTop}>
                            <h5>Soical Following</h5>
                            <GoTriangleDown></GoTriangleDown>
                        </div>
                        <div className={MCSS.SocialSides}>

                            <div className={MCSS.SocialLeft}>
                             <img src={DiscordImage}></img>
                            <div className={MCSS.SocialBelow}>
                                    <h5>Discord</h5>
                                    <div className={MCSS.Socials}>
                                        <div className={MCSS.Top24}>24h</div>
                                        <div className={MCSS.Inc}>+1.15%</div>
                                    </div>
                           </div>
                            </div>

                            <div className={MCSS.SocialRight}>
                             <img src={TwitterImage}></img>
                            <div className={MCSS.SocialBelow}>
                                    <h5>Twitter</h5>
                                    <div className={MCSS.Socials}>
                                        <div className={MCSS.Top24}>24h</div>
                                        <div className={MCSS.Inc}>+1.15%</div>
                                    </div>
                           </div>
                            </div>
                        </div>
                    </div>

                    <div className={MCSS.SocialContainer}>
                        <div className={MCSS.TokenTop}>
                            <h5>Soical Interaction</h5>
                            <GoTriangleDown></GoTriangleDown>
                        </div>
                        <div className={MCSS.SocialSides}>

                            <div className={MCSS.SocialLeft}>
                             <img src={DiscordImage}></img>
                            <div className={MCSS.SocialBelow}>
                                    <h5>25.75k</h5>
                                    <div className={MCSS.Socials}>
                                        <div className={MCSS.Top24}>24h</div>
                                        <div className={MCSS.Dec}>-29.24%</div>
                                    </div>
                           </div>
                            </div>

                            <div className={MCSS.SocialRight}>
                             <img src={TwitterImage}></img>
                            <div className={MCSS.SocialBelow}>
                                    <h5>12.65K</h5>
                                    <div className={MCSS.Socials}>
                                        <div className={MCSS.Top24}>24h</div>
                                        <div className={MCSS.Dec}>-46.12%</div>
                                    </div>
                           </div>
                            </div>
                        </div>
                    </div>

                    <div className={MCSS.CirculatingContainer}>
                        <div className={MCSS.TokenTop}>
                            <h5>Circulating Supply</h5>
                            <GoTriangleDown></GoTriangleDown>
                        </div>
                         <div className={MCSS.PriceBelow}>
                            <h5>19.36M BTC</h5>
                            <div className={MCSS.CirculatingBar}>
 
                            </div>
                         </div>
                        
                    </div>

                </div>

                </div>
            
            </div>

  );
}

export default Markets;