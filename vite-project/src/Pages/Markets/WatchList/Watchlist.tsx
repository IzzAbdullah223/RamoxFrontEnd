import { useState, useRef, useEffect } from 'react';
import WCSS from './Watchlist.module.css';
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import Ethernum from '../../../Etherneum.svg';
import Tether from '../../../Tether.svg';
//@ts-ignore
import { Sparklines, SparklinesLine } from 'react-sparklines';

type TradeRatio = {
  green: number;
  red: number;
};

type Bot = {
  id: number;
  name: string;
  pair: string;
  date: string;
  profitGained: number;
  percentGain: number;
  trades: number;
  workingTime: string;
  status: 'Active' | 'Inactive';
  balance: string;
  orders: number;
  chartData: number[];
  tradeRatio: TradeRatio;
  icons: string[];
};

// Helper function to increment time
const incrementTime = (timeStr: string): string => {
  if (!timeStr.includes('d')) {
    const [hours, minutes] = timeStr.split('h ').map(part => parseInt(part));
    let newMins = minutes + 1;
    let newHours = hours;
    if (newMins >= 60) {
      newMins = 0;
      newHours += 1;
    }
    return `${newHours}h ${newMins.toString().padStart(2, '0')}m`;
  } else {
    const [days, rest] = timeStr.split('d ');
    const [hours, minutes] = rest.split('h ').map(part => parseInt(part));
    let newMins = minutes + 1;
    let newHours = hours;
    if (newMins >= 60) {
      newMins = 0;
      newHours += 1;
    }
    if (newHours >= 24) {
      newHours = 0;
      return `${parseInt(days) + 1}d ${newHours}h ${newMins.toString().padStart(2, '0')}m`;
    }
    return `${days}d ${newHours}h ${newMins.toString().padStart(2, '0')}m`;
  }
};

// Initial bots data with realistic starting values
const initialBots: Bot[] = [
  {
    id: 1,
    name: 'ETH Scalper',
    pair: 'ETH/USDT',
    date: new Date().toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).replace(',', ' |'),
    profitGained: 342.18,
    percentGain: 14.56,
    trades: 127,
    workingTime: '2h 45m',
    status: 'Active',
    balance: '$4,308.12',
    orders: 8,
    chartData: [12, 14, 13, 15, 16, 15, 17, 16, 15, 16],
    tradeRatio: { green: 68.3, red: 31.7 },
    icons: [Ethernum, Tether]
  },
  {
    id: 2,
    name: 'BTC Swing',
    pair: 'BTC/USDT',
    date: new Date(Date.now() - 86400000).toLocaleDateString('en-GB', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    }).replace(',', ' |'),
    profitGained: 892.41,
    percentGain: 8.91,
    trades: 43,
    workingTime: '1d 3h',
    status: 'Active',
    balance: '$12,420.50',
    orders: 5,
    chartData: [42, 43, 44, 43, 45, 46, 45, 44, 45, 46],
    tradeRatio: { green: 72.1, red: 27.9 },
    icons: [Ethernum, Tether]
  },
];

const newBotTemplate: Bot = {
  id: 0,
  name: 'New Strategy',
  pair: 'BTC/USDT',
  date: new Date().toLocaleDateString('en-GB', { 
    day: 'numeric', 
    month: 'short', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  }).replace(',', ' |'),
  profitGained: 0,
  percentGain: 0,
  trades: 0,
  workingTime: '0h 00m',
  status: 'Inactive',
  balance: '$0.00',
  orders: 0,
  chartData: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  tradeRatio: { green: 0, red: 100 },
  icons: [Ethernum, Tether]
};

function Watchlist() {
  const [bots, setBots] = useState<Bot[]>(initialBots);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [showBotDropdown, setShowBotDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Simulate live data updates for active bots
  useEffect(() => {
    const interval = setInterval(() => {
      setBots(prevBots => prevBots.map(bot => {
        // Only update the first two bots when active
        if ((bot.id === 1 || bot.id === 2) && bot.status === 'Active') {
          const smallRandom = () => (Math.random() - 0.4) * (bot.id === 1 ? 1.2 : 0.8);
          const newChartValue = bot.chartData[bot.chartData.length - 1] + smallRandom() * 2;
          
          return {
            ...bot,
            profitGained: Math.max(0, +(bot.profitGained + smallRandom()).toFixed(2)),
            percentGain: +(bot.percentGain + smallRandom() * 0.1).toFixed(2),
            trades: bot.trades + (Math.random() > 0.7 ? 1 : 0),
            workingTime: incrementTime(bot.workingTime),
            chartData: [...bot.chartData.slice(1), newChartValue],
            orders: Math.max(0, bot.orders + (Math.random() > 0.8 ? 1 : (Math.random() > 0.9 ? -1 : 0))),
            tradeRatio: {
              green: Math.min(100, Math.max(0, bot.tradeRatio.green + (Math.random() > 0.5 ? 0.2 : -0.2))),
              red: Math.min(100, Math.max(0, bot.tradeRatio.red + (Math.random() > 0.5 ? -0.2 : 0.2)))
            }
          };
        }
        return bot;
      }));
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowBotDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const addNewBot = () => {
    const newBotId = bots.length > 0 ? Math.max(...bots.map(bot => bot.id)) + 1 : 1;
    const newBot: Bot = { 
      ...newBotTemplate, 
      id: newBotId,
      name: `Strategy ${newBotId}`,
      date: new Date().toLocaleDateString('en-GB', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      }).replace(',', ' |')
    };
    setBots([...bots, newBot]);
    setSelectedBot(newBot);
    setShowBotDropdown(false);
  };

  const handleBotSelect = (bot: Bot | null) => {
    setSelectedBot(bot);
    setShowBotDropdown(false);
  };

  const toggleBotStatus = (botId: number) => {
    setBots(bots.map(bot => 
      bot.id === botId 
        ? { ...bot, status: bot.status === 'Active' ? 'Inactive' : 'Active' } 
        : bot
    ));
    
    if (selectedBot?.id === botId) {
      setSelectedBot({
        ...selectedBot,
        status: selectedBot.status === 'Active' ? 'Inactive' : 'Active'
      });
    }
  };

  const handleEditBot = (botId: number) => {
    const newName = prompt('Edit strategy name:', bots.find(bot => bot.id === botId)?.name || '');
    if (newName) {
      setBots(bots.map(bot => bot.id === botId ? { ...bot, name: newName } : bot));
      if (selectedBot?.id === botId) {
        setSelectedBot({ ...selectedBot, name: newName });
      }
    }
  };

  return (
    <div className={WCSS.PageContainer}>
      <div className={WCSS.Top}>
        <h3>AI Trading Strategies</h3>
        <div className={WCSS.RightSide} ref={dropdownRef}>
          <div 
            className={WCSS.AllBots} 
            onClick={() => setShowBotDropdown(!showBotDropdown)}
          >
            <div>{selectedBot ? selectedBot.name : 'All Strategies'}</div>
            {showBotDropdown ? <GoTriangleUp /> : <GoTriangleDown />}
          </div>
          <div 
            className={WCSS.AddStrategy}
            onClick={addNewBot}
          >
            <div>+ Add Strategy</div>
          </div>

          {showBotDropdown && (
            <div className={WCSS.BotDropdown}>
              <div 
                className={WCSS.BotDropdownItem}
                onClick={() => handleBotSelect(null)}
              >
                All Strategies
              </div>
              {bots.map(bot => (
                <div 
                  key={bot.id} 
                  className={`${WCSS.BotDropdownItem} ${selectedBot?.id === bot.id ? WCSS.ActiveBot : ''}`}
                  onClick={() => handleBotSelect(bot)}
                >
                  {bot.name}
                  <span className={WCSS.BotPair}>{bot.pair}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={WCSS.BotsContainer}>
        {(selectedBot ? [selectedBot] : bots).map(bot => (
          <div className={WCSS.BotContainer} key={bot.id}>
            <div className={WCSS.BotHeader}>
              <h3>{bot.name}</h3>
              <span className={WCSS.BotStatus} data-status={bot.status.toLowerCase()}>
                {bot.status}
              </span>
            </div>
            <div className={WCSS.BotItemsContainer}>
              <div className={WCSS.BotFirst}>
                <div className={WCSS.BotTop}> 
                  <img src={bot.icons[0]} alt="left coin" />
                  <img className={WCSS.RightImage} src={bot.icons[1]} alt="right coin" />
                  <div>{bot.pair}</div>
                </div>
                <div className={WCSS.Date}>{bot.date}</div>
                <div className={WCSS.ChartContainer}>
                  <Sparklines data={bot.chartData} width={100} height={30}>
                    <SparklinesLine color="#4b9fff" style={{ strokeWidth: 1.5 }} />
                  </Sparklines>
                </div>
              </div>

              <div className={WCSS.BotSecond}>
                <div>Trade Ratio</div>
                <div className={WCSS.GreenBarContainer}>
                  <div className={WCSS.GreenRatio} style={{ width: `${bot.tradeRatio.green}%` }}></div>
                  <div className={WCSS.RedRatio} style={{ width: `${bot.tradeRatio.red}%` }}></div>
                </div>
                <div className={WCSS.TradeStats}>
                  <span className={WCSS.GreenStat}>{bot.tradeRatio.green.toFixed(1)}% Win</span>
                  <span className={WCSS.RedStat}>{bot.tradeRatio.red.toFixed(1)}% Loss</span>
                </div>
                <div>Total Trades</div>
                <div className={WCSS.TradeCount}>{bot.trades}</div>
              </div>

              <div className={WCSS.BotThird}>
                <div>Profit Gained</div>
                <div className={WCSS.GainGreenThing}>
                  ${bot.profitGained.toFixed(2)}
                  <div className={WCSS.MiniChart}>
                    <Sparklines data={bot.chartData} width={60} height={20}>
                      <SparklinesLine color="#3fc174" style={{ fill: "#e4f7ef", strokeWidth: 2 }} />
                    </Sparklines>
                  </div>
                </div>

                <div>Percentage Gain</div>
                <div className={WCSS.PercentageChart}>
                  <div>{bot.percentGain.toFixed(2)}%</div>
                  <div className={WCSS.MiniChart}>
                    <Sparklines data={bot.chartData} width={60} height={20}>
                      <SparklinesLine color="#f55c47" style={{ fill: "#ffe4e1", strokeWidth: 2 }} />
                    </Sparklines>
                  </div>
                </div>
              </div>

              <div className={WCSS.BotFourth}>
                <div>Working Time</div>
                <div className={WCSS.WorkingTime}>{bot.workingTime}</div>
                <div>Current Orders</div>
                <div className={WCSS.OrderCount}>{bot.orders}</div>
              </div>

              <div className={WCSS.BotFifth}>
                <div>Total Balance</div>
                <div className={WCSS.Balance}>{bot.balance}</div>
                <div>Actions</div>
                <div className={WCSS.BotActions}>
                  <button 
                    className={WCSS.ActionButton}
                    onClick={() => handleEditBot(bot.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className={`${WCSS.ActionButton} ${bot.status === 'Active' ? WCSS.StopButton : WCSS.StartButton}`}
                    onClick={() => toggleBotStatus(bot.id)}
                  >
                    {bot.status === 'Active' ? 'Stop' : 'Start'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;