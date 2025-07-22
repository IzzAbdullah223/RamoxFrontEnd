import MCSS from './Markets.module.css';
import { GoLinkExternal, GoTriangleDown } from "react-icons/go";
import { BsPeopleFill, BsFillLightningChargeFill } from "react-icons/bs";
import { LuRows2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { HiMiniBarsArrowDown } from "react-icons/hi2";
import { TbFileDescription, TbStar, TbStarFilled } from "react-icons/tb";
import { useEffect, useState, useMemo } from 'react';
import BitCoinImage from '../../BitcoinImage.png'; 
import { FaDiscord, FaTwitter } from "react-icons/fa";
import { Line } from 'react-chartjs-2';
import { useTranslation } from '../../Hooks/useTranslations';
 
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from 'chart.js';



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

interface Token {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  price_data?: { price: number }[];
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

interface SocialData {
  followers: number;
  change24h: number;
  isPositive: boolean;
}

function Markets() {
  const [topVolume, setTopVolume] = useState<Token[]>([]);
  const [topGainers, setTopGainers] = useState<Token[]>([]);
  const [topLosers, setTopLosers] = useState<Token[]>([]);
  const [allTokens, setAllTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const { t } = useTranslation();

  const filterOptions = [
    { id: 'price_up', label: t('priceHighToLow') },
    { id: 'price_down', label: t('priceLowToHigh') },
    { id: 'volume_up', label: t('volumeHighToLow') },
    { id: 'volume_down', label: t('volumeLowToHigh') },
    { id: 'gainers', label: t('topGainers') },
    { id: 'losers', label: t('topLosers') },
  ];

const filteredTokens = useMemo(() => {
  let result = [...allTokens];
  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    result = result.filter(token => 
      token.name.toLowerCase().includes(term) || 
      token.symbol.toLowerCase().includes(term)
    ); // Added missing parenthesis here
  }
  selectedFilters.forEach(filter => {
    switch(filter) {
      case 'price_up': result.sort((a, b) => b.quote.USD.price - a.quote.USD.price); break;
      case 'price_down': result.sort((a, b) => a.quote.USD.price - b.quote.USD.price); break;
      case 'volume_up': result.sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h); break;
      case 'volume_down': result.sort((a, b) => a.quote.USD.volume_24h - b.quote.USD.volume_24h); break;
      case 'gainers': 
        result = result.filter(token => token.quote.USD.percent_change_24h > 0)
          .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h); 
        break;
      case 'losers': 
        result = result.filter(token => token.quote.USD.percent_change_24h < 0)
          .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h); 
        break;
    }
  });
  return result;
}, [allTokens, searchTerm, selectedFilters]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId) 
        : [...prev, filterId]
    );
  };

  const generatePriceData = (currentPrice: number): { price: number }[] => {
    return Array.from({ length: 24 }, (_, i) => ({
      price: currentPrice * (0.95 + Math.random() * 0.1)
    }));
  };

  useEffect(() => {
    const fetchTokens = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/tokens');
        const data = await response.json();
        if (data && data.data && Array.isArray(data.data)) {
          const tokens: Token[] = data.data.map((token: any) => ({
            ...token,
            price_data: generatePriceData(token.quote.USD.price)
          }));
          setTopVolume([...tokens].sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h).slice(0, 5));
          setTopGainers([...tokens].filter((token) => token.quote.USD.percent_change_24h > 0)
            .sort((a, b) => b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h).slice(0, 5));
          setTopLosers([...tokens].filter((token) => token.quote.USD.percent_change_24h < 0)
            .sort((a, b) => a.quote.USD.percent_change_24h - b.quote.USD.percent_change_24h).slice(0, 5));
          setAllTokens([...tokens].sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap).slice(0, 10));
          setLoading(false);
        }
      } catch (error) {
        console.error('Fetch error:', error);
        setLoading(false);
      }
    };
    fetchTokens();
  }, []);

  const MiniChart = ({ prices }: { prices: { price: number }[] }) => {
    const isUp = prices[prices.length - 1].price > prices[0].price;
    return (
      <div className={MCSS.ChartContainer}>
        <Line
          data={{
            labels: prices.map(() => ''),
            datasets: [{
              data: prices.map(p => p.price),
              borderColor: isUp ? '#61af95' : '#ea3943',
              borderWidth: 2,
              tension: 0.4,
              fill: false
            }]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { display: false }, y: { display: false } },
            plugins: { legend: { display: false } },
            elements: { point: { radius: 0 } }
          }}
        />
      </div>
    );
  };

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

  const getRandomSocialData = (): SocialData => {
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
          <h2>{t('signUpToTiers')}</h2>
          <div>{t('signUpDescription')}</div>
        </div>
        <div className={MCSS.SignBox}>
          <div>{t('signUpNow')}</div>
          <GoLinkExternal />
        </div>
      </div>

      <div className={MCSS.Top5Container}>
        <div className={MCSS.Top5}>
          <div className={MCSS.TopName}>
            <div className={MCSS.Icon}><LuRows2 /></div>
            <h2>{t('topVolume')}</h2>
          </div>
          <div className={MCSS.TopHeaders}>
            <div>{t('exchange')}</div>
            <div>{t('volume')}</div>
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
                    <div className={token.quote.USD.percent_change_24h >= 0 ? MCSS.Inc : MCSS.Dec}>
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
            <h2>{t('topGainers')}</h2>
          </div>
          <div className={MCSS.TopHeaders}>
            <div>{t('token')}</div>
            <div>{t('totalGain')}</div>
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
            <h2>{t('topLosers')}</h2>
          </div>
          <div className={MCSS.TopHeaders}>
            <div>{t('token')}</div>
            <div>{t('totalLoss')}</div>
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
          <h2>{t('allTokens')}</h2>
          <div className={MCSS.AllTokensRight}> 
            <div className={MCSS.SearchContainer}>
              <input 
                type='text' 
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <IoSearch />
            </div>
            <div className={MCSS.ColumnContainer}>
              <div>{t('columns')}</div>
              <LuRows2 />
            </div>
            <div 
              className={MCSS.FilterContainer}
              onClick={() => setShowFilters(!showFilters)}
            >
              <div>{t('filters')}</div>
              <HiMiniBarsArrowDown />
            </div>
            
            {showFilters && (
              <div className={MCSS.FilterDropdown}>
                {filterOptions.map(option => (
                  <div 
                    key={option.id}
                    className={`${MCSS.FilterOption} ${
                      selectedFilters.includes(option.id) ? MCSS.ActiveFilter : ''
                    }`}
                    onClick={() => toggleFilter(option.id)}
                  >
                    {option.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {loading ? (
          <div className={MCSS.Loading}>{t('loadingTokens')}</div>
        ) : (
          <div className={MCSS.AllTokensList}>
            <div className={MCSS.AllTokensHeader}>
              <div className={MCSS.StarHeader}>
                <TbStarFilled/>
              </div>
              <div className={MCSS.TokenHeader}>
                <h5>{t('token')}</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.PriceHeader}>
                <h5>{t('price')}</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.MarketHeader}>
                <h5>{t('marketCap')}</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.VolumeHeader}>
                <h5>{t('volume')}</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.SocialHeader}>
                <h5>{t('socialFollowing')}</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.ChartHeader}>
                <h5>{t('priceCurve24h')}</h5>
                <GoTriangleDown />
              </div>
              <div className={MCSS.CirculatingHeader}>
                <h5>{t('circulatingSupply')}</h5>
                <GoTriangleDown />
              </div>
            </div>

            {filteredTokens.map((token) => {
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

                  <div className={MCSS.ChartContainer}>
                    {token.price_data && <MiniChart prices={token.price_data} />}
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