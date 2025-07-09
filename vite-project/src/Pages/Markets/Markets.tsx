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
import { FaDiscord, FaTwitter } from "react-icons/fa";

type Token = {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  quote: {
    USD: {
      price: number;
      percent_change_24h: number;
      percent_change_7d: number;
      volume_24h: number;
      market_cap: number;
    };
  };
};

function Markets() {
  const [topVolume, setTopVolume] = useState<Token[]>([]);
  const [topGainers, setTopGainers] = useState<Token[]>([]);
  const [topLosers, setTopLosers] = useState<Token[]>([]);
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);

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

          const allTokens = [...tokens]
            .sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap)
            .slice(0, 10);

          setTopVolume(topVolume);
          setTopGainers(topGainers);
          setTopLosers(topLosers);
          setAllTokens(allTokens);
          setLoading(false);
        } else {
          console.error('Unexpected API structure:', data);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    };

    fetchTokens();
  }, []);

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatSupply = (supply: number, symbol: string): string => {
    if (supply >= 1e9) return `${(supply / 1e9).toFixed(2)}B ${symbol}`;
    if (supply >= 1e6) return `${(supply / 1e6).toFixed(2)}M ${symbol}`;
    if (supply >= 1e3) return `${(supply / 1e3).toFixed(2)}K ${symbol}`;
    return `${supply.toFixed(2)} ${symbol}`;
  };

  const getRandomSocialData = () => {
    const followers = Math.floor(Math.random() * 50000) + 5000;
    const change24h = (Math.random() * 20 - 10).toFixed(2);
    return {
      followers,
      change24h: parseFloat(change24h),
      isPositive: parseFloat(change24h) > 0
    };
  };

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

        {loading ? (
          <div className={MCSS.Loading}>Loading tokens...</div>
        ) : (
          <div className={MCSS.AllTokensList}>
            {/* Header Row */}
            <div className={MCSS.AllTokensHeader}>
              <div className={MCSS.StarHeader}>
                <TbStarFilled/>
              </div>
              <div className={MCSS.TokenHeader}>
                <h5>Token</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.PriceHeader}>
                <h5>Price</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.MarketHeader}>
                <h5>Market Cap</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.VolumeHeader}>
                <h5>Volume</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.SocialHeader}>
                <h5>Social Following</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.CirculatingHeader}>
                <h5>Circulating Supply</h5>
                <GoTriangleDown />
              </div>
            </div>

            {/* Token Rows */}
            {allTokens.map((token) => {
              const discordData = getRandomSocialData();
              const twitterData = getRandomSocialData();
              
              return (
                <div className={MCSS.AllTokensSecond} key={token.id}>
                  <div className={MCSS.StarContainer}>
                    <div>
                      <TbStar />
                      <TbFileDescription/>
                    </div>
                  </div>

                  <div className={MCSS.TokenContainer}>
                    <div className={MCSS.TokenBelow}>
                      <img 
                        src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`} 
                        alt={token.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = BitCoinImage;
                        }}
                      />
                      <div>
                        <div>{token.name}</div>
                        <div>{token.symbol}</div>
                      </div>
                    </div>
                  </div>

                  <div className={MCSS.PriceContainer}>
                    <div className={MCSS.PriceBelow}>
                      <h5>${token.quote.USD.price.toFixed(2)}</h5>
                      <div className={MCSS.Prices}>
                        <div className={MCSS.Top24}>24h</div>
                        <div className={token.quote.USD.percent_change_24h >= 0 ? MCSS.Inc : MCSS.Dec}>
                          {token.quote.USD.percent_change_24h.toFixed(2)}%
                        </div>
                        <div className={MCSS.Top24}>7d</div>
                        <div className={token.quote.USD.percent_change_7d >= 0 ? MCSS.Inc : MCSS.Dec}>
                          {token.quote.USD.percent_change_7d?.toFixed(2) || '0.00'}%
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={MCSS.MarketContainer}>
                    <div className={MCSS.MarketBelow}>
                      <h5>{formatNumber(token.quote.USD.market_cap)}</h5>
                    </div>
                  </div>

                  <div className={MCSS.VolumeContainer}>
                    <div className={MCSS.PriceBelow}>
                      <h5>{formatNumber(token.quote.USD.volume_24h)}</h5>
                      <div className={MCSS.Prices}>
                        <div className={MCSS.Top24}>24h</div>
                        <div className={MCSS.Inc}>+{(Math.random() * 20).toFixed(2)}%</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className={MCSS.SocialContainer}>
                    <div className={MCSS.SocialSides}>
                      <div className={MCSS.SocialLeft}>
                        <FaDiscord size={20} color="#5865F2" />
                        <div className={MCSS.SocialBelow}>
                          <h5>{discordData.followers.toLocaleString()}</h5>
                          <div className={MCSS.Socials}>
                            <div className={MCSS.Top24}>24h</div>
                            <div className={discordData.isPositive ? MCSS.Inc : MCSS.Dec}>
                              {discordData.isPositive ? '+' : ''}{discordData.change24h}%
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className={MCSS.SocialRight}>
                        <FaTwitter size={20} color="#1DA1F2" />
                        <div className={MCSS.SocialBelow}>
                          <h5>{twitterData.followers.toLocaleString()}</h5>
                          <div className={MCSS.Socials}>
                            <div className={MCSS.Top24}>24h</div>
                            <div className={twitterData.isPositive ? MCSS.Inc : MCSS.Dec}>
                              {twitterData.isPositive ? '+' : ''}{twitterData.change24h}%
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className={MCSS.CirculatingContainer}>
                    <div className={MCSS.PriceBelow}>
                      <h5>{formatSupply(token.circulating_supply, token.symbol)}</h5>
                      <div className={MCSS.CirculatingBar}>
                        <div 
                          className={MCSS.BarFill}
                          style={{
                            width: Math.min(100, (token.circulating_supply / (token.circulating_supply * 1.2)) * 100) + '%'
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Markets; 