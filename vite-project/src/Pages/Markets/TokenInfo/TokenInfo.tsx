import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { 
  GoLinkExternal, 
  GoTriangleUp, 
  GoTriangleDown 
} from "react-icons/go";
import { 
  FaTwitter, 
  FaReddit, 
  FaGithub 
} from "react-icons/fa";
import { 
  TbStar, 
  TbStarFilled, 
  TbFileDescription 
} from "react-icons/tb";
import { 
  BsArrowUpRight
} from "react-icons/bs";
import TokenCSS from './Token.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface TokenData {
  id: number;
  name: string;
  symbol: string;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  quote: {
    USD: {
      price: number;
      volume_24h: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      market_cap: number;
      market_cap_dominance: number;
      fully_diluted_market_cap: number;
    };
  };
  platform?: {
    id: number;
    name: string;
    symbol: string;
    token_address: string;
  };
  date_added: string;
  tags: string[];
}

interface SocialData {
  twitter_followers: number;
  reddit_subscribers: number;
  github_contributors: number;
}

export default function TokenInfo() {
  const { tokenId } = useParams();
  const [token, setToken] = useState<TokenData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('24h');
  const [socialData, setSocialData] = useState<SocialData | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchTokenData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/tokens`);
        const data = await response.json();
        
        if (data && data.data) {
          const foundToken = data.data.find((t: any) => t.id === Number(tokenId));
          if (foundToken) {
            setToken(foundToken);
            setSocialData({
              twitter_followers: Math.floor(Math.random() * 500000) + 10000,
              reddit_subscribers: Math.floor(Math.random() * 100000) + 5000,
              github_contributors: Math.floor(Math.random() * 500) + 50,
            });
          }
        }
      } catch (error) {
        console.error('Error fetching token data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTokenData();
  }, [tokenId]);

  const generatePriceData = () => {
    const basePrice = token?.quote.USD.price || 1;
    const dataPoints = timeRange === '24h' ? 24 : timeRange === '7d' ? 7 : 30;
    
    return Array.from({ length: dataPoints }, (_, i) => {
      const fluctuation = 0.95 + Math.random() * 0.1;
      return {
        price: basePrice * fluctuation,
        time: timeRange === '24h' ? `${i}:00` : `Day ${i+1}`
      };
    });
  };

  const priceData = generatePriceData();

  const chartData = {
    labels: priceData.map(p => p.time),
    datasets: [
      {
        label: 'Price',
        data: priceData.map(p => p.price),
        borderColor: '#61af95',
        backgroundColor: 'rgba(97, 175, 149, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        }
      },
      y: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  const formatNumber = (num: number): string => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercentage = (num: number): string => {
    return `${num > 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  if (loading) {
    return <div className={TokenCSS.loading}>Loading token data...</div>;
  }

  if (!token) {
    return <div className={TokenCSS.notFound}>Token not found</div>;
  }

  return (
    <div className={TokenCSS.container}>
      <h1 className={TokenCSS.TInfo}>Token Info</h1>
      <div className={TokenCSS.header}>
        <div className={TokenCSS.tokenHeader}>
          <div className={TokenCSS.tokenInfo}>
            <img 
              src={`https://s2.coinmarketcap.com/static/img/coins/64x64/${token.id}.png`} 
              alt={token.name}
              className={TokenCSS.tokenLogo}
            />
            <div>
              
              <h1>{token.name} <span>{token.symbol}</span></h1>
              <div className={TokenCSS.tokenMeta}>
                <span>Rank #{token.id}</span>
                <span>Added {new Date(token.date_added).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
          <div className={TokenCSS.tokenActions}>
            <button 
              className={TokenCSS.favoriteButton} 
              onClick={() => setIsFavorite(!isFavorite)}
            >
              {isFavorite ? <TbStarFilled /> : <TbStar />}
            </button>
            <button className={TokenCSS.docsButton}>
              <TbFileDescription /> Docs
            </button>
          </div>
        </div>

        <div className={TokenCSS.priceSection}>
          <div className={TokenCSS.priceContainer}>
            <div className={TokenCSS.currentPrice}>
              ${token.quote.USD.price.toFixed(2)}
            </div>
            <div className={`${TokenCSS.priceChange} ${
              token.quote.USD.percent_change_24h >= 0 ? TokenCSS.positive : TokenCSS.negative
            }`}>
              {token.quote.USD.percent_change_24h >= 0 ? <GoTriangleUp /> : <GoTriangleDown />}
              {formatPercentage(token.quote.USD.percent_change_24h)}
              
            </div>
            
          </div>
            
  
        </div>

        <div className={TokenCSS.comparisonChart}>  HERE
  <h3>Daily fully diluted market cap vs. daily active users in the past 180 days</h3>
  <div className={TokenCSS.chartContainer}>
    <Line 
      data={{
        labels: Array.from({length: 180}, (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() - (180 - i));
          return `${date.getDate()} ${date.toLocaleString('default', {month: 'short'})}`;
        }),
        datasets: [
          {
            label: 'Fully diluted market cap',
            data: Array.from({length: 180}, () => 5 + Math.random() * 3),
            borderColor: '#3b82f6',
            backgroundColor: 'rgba(59, 130, 246, 0.2)',
            borderWidth: 2,
            tension: 0.1,
            yAxisID: 'y'
          },
          {
            label: 'Daily active users',
            data: Array.from({length: 180}, (_, i) => 30 + (i/180)*90 + Math.random()*10),
            borderColor: '#ec4899',
            backgroundColor: 'rgba(236, 72, 153, 0.2)',
            borderWidth: 2,
            tension: 0.1,
            yAxisID: 'y1'
          }
        ]
      }}
      options={{
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          y: {
            type: 'linear',
            position: 'left',
            min: 0,
            max: 8,
            ticks: {
              callback: function(value) {
                if (typeof value === 'number') {
                  return `$${value.toFixed(1)}B`;
                }
                return value;
              },
              stepSize: 1
            },
            grid: {
              color: 'rgba(255,255,255,0.1)'
            }
          },
          y1: {
            type: 'linear',
            position: 'right',
            min: 0,
            max: 120,
            ticks: {
              callback: function(value) {
                if (typeof value === 'number') {
                  return `${value}k`;
                }
                return value;
              },
              stepSize: 30
            },
            grid: {
              drawOnChartArea: false
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        }
      }}
    />
  </div>
  
  <div className={TokenCSS.filters}>
    <div className={TokenCSS.timeFilters}>
      {['24h', '7d', '30d', '90d', '180d', '365d'].map(filter => (
        <button 
          key={filter}
          className={TokenCSS.timeFilter}
        >
          {filter}
        </button>
      ))}
    </div>
  </div>
  
  <div className={TokenCSS.growthRates}>
    <div className={TokenCSS.growthRow}>
      <span>Fully diluted market cap</span>
      <div className={TokenCSS.growthValues}>
        <span className={TokenCSS.negative}>-10.9%</span>
      </div>
    </div>
    <div className={TokenCSS.growthRow}>
      <span>Daily active users</span>
      <div className={TokenCSS.growthValues}>
        <span className={TokenCSS.positive}>+93.0%</span>
      </div>
    </div>
  </div>
</div> HERE
      </div>
 

      <div className={TokenCSS.statsGrid}>
        <div className={TokenCSS.statCard}>
          <h3>Market Cap</h3>
          <p>{formatNumber(token.quote.USD.market_cap)}</p>
          <div className={`${TokenCSS.statChange} ${
            token.quote.USD.percent_change_24h >= 0 ? TokenCSS.positive : TokenCSS.negative
          }`}>
            {formatPercentage(token.quote.USD.percent_change_24h)}
          </div>
        </div>

        <div className={TokenCSS.statCard}>
          <h3>Volume (24h)</h3>
          <p>{formatNumber(token.quote.USD.volume_24h)}</p>
          <div className={`${TokenCSS.statChange} ${
            token.quote.USD.percent_change_24h >= 0 ? TokenCSS.positive : TokenCSS.negative
          }`}>
            {formatPercentage(token.quote.USD.percent_change_24h)}
          </div>
        </div>

        <div className={TokenCSS.statCard}>
          <h3>Circulating Supply</h3>
          <p>{token.circulating_supply.toLocaleString()} {token.symbol}</p>
          <div className={TokenCSS.supplyBar}>
            <div 
              className={TokenCSS.supplyFill}
              style={{
                width: `${(token.circulating_supply / token.max_supply) * 100}%`
              }}
            ></div>
          </div>
        </div>

        <div className={TokenCSS.statCard}>
          <h3>Max Supply</h3>
          <p>{token.max_supply ? token.max_supply.toLocaleString() : '∞'} {token.symbol}</p>
        </div>
      </div>

      <div className={TokenCSS.detailSections}>
        <div className={TokenCSS.section}>
          <h2>Key Metrics</h2>
          <div className={TokenCSS.metricsGrid}>
            <div className={TokenCSS.metricItem}>
              <span>1h Change</span>
              <span className={`${TokenCSS.metricValue} ${
                token.quote.USD.percent_change_1h >= 0 ? TokenCSS.positive : TokenCSS.negative
              }`}>
                {formatPercentage(token.quote.USD.percent_change_1h)}
              </span>
            </div>
            <div className={TokenCSS.metricItem}>
              <span>24h Change</span>
              <span className={`${TokenCSS.metricValue} ${
                token.quote.USD.percent_change_24h >= 0 ? TokenCSS.positive : TokenCSS.negative
              }`}>
                {formatPercentage(token.quote.USD.percent_change_24h)}
              </span>
            </div>
            <div className={TokenCSS.metricItem}>
              <span>7d Change</span>
              <span className={`${TokenCSS.metricValue} ${
                token.quote.USD.percent_change_7d >= 0 ? TokenCSS.positive : TokenCSS.negative
              }`}>
                {formatPercentage(token.quote.USD.percent_change_7d)}
              </span>
            </div>
            <div className={TokenCSS.metricItem}>
              <span>30d Change</span>
              <span className={`${TokenCSS.metricValue} ${
                token.quote.USD.percent_change_30d >= 0 ? TokenCSS.positive : TokenCSS.negative
              }`}>
                {formatPercentage(token.quote.USD.percent_change_30d)}
              </span>
            </div>
            <div className={TokenCSS.metricItem}>
              <span>Market Dominance</span>
              <span className={TokenCSS.metricValue}>
                {token.quote.USD.market_cap_dominance.toFixed(2)}%
              </span>
            </div>
            <div className={TokenCSS.metricItem}>
              <span>Fully Diluted Market Cap</span>
              <span className={TokenCSS.metricValue}>
                {formatNumber(token.quote.USD.fully_diluted_market_cap)}
              </span>
            </div>
          </div>
        </div>

        <div className={TokenCSS.section}>
          <h2>Social & Community</h2>
          {socialData && (
            <div className={TokenCSS.socialGrid}>
              <div className={TokenCSS.socialItem}>
                <span className={TokenCSS.socialIcon}><FaTwitter /></span>
                <div>
                  <span className={TokenCSS.socialLabel}>Twitter Followers</span>
                  <p>{socialData.twitter_followers.toLocaleString()}</p>
                </div>
                <span className={TokenCSS.socialTrend}><BsArrowUpRight /></span>
              </div>
              <div className={TokenCSS.socialItem}>
                <span className={TokenCSS.socialIcon}><FaReddit /></span>
                <div>
                  <span className={TokenCSS.socialLabel}>Reddit Subscribers</span>
                  <p>{socialData.reddit_subscribers.toLocaleString()}</p>
                </div>
                <span className={TokenCSS.socialTrend}><BsArrowUpRight /></span>
              </div>
              <div className={TokenCSS.socialItem}>
                <span className={TokenCSS.socialIcon}><FaGithub /></span>
                <div>
                  <span className={TokenCSS.socialLabel}>Github Contributors</span>
                  <p>{socialData.github_contributors.toLocaleString()}</p>
                </div>
                <span className={TokenCSS.socialTrend}><BsArrowUpRight /></span>
              </div>
            </div>
          )}
        </div>

        {token.platform && (
          <div className={TokenCSS.section}>
            <h2>Contract Information</h2>
            <div className={TokenCSS.contractInfo}>
              <div>
                <span>Platform</span>
                <p>{token.platform.name} ({token.platform.symbol})</p>
              </div>
              <div>
                <span>Contract Address</span>
                <p className={TokenCSS.contractAddress}>
                  {token.platform.token_address}
                  <GoLinkExternal />
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}