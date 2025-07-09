import { useState } from 'react';
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

const initialBots: Bot[] = [
  {
    id: 1,
    name: 'ETH Scalper',
    pair: 'ETH/USDT',
    date: '27 Apr 2023 | 04:57',
    profitGained: 34.12,
    percentGain: 14.56,
    trades: 373,
    workingTime: '5h 23m',
    status: 'Active',
    balance: '$4,308.12',
    orders: 36,
    chartData: [5, 6, 7, 5, 9, 10, 8, 6, 5, 7],
    tradeRatio: { green: 30.6, red: 69.4 },
    icons: [Ethernum, Tether]
  },
  {
    id: 2,
    name: 'BTC Swing',
    pair: 'BTC/USDT',
    date: '28 Apr 2023 | 12:30',
    profitGained: 22.45,
    percentGain: 8.91,
    trades: 215,
    workingTime: '12h 45m',
    status: 'Active',
    balance: '$8,120.50',
    orders: 42,
    chartData: [8, 7, 6, 8, 9, 7, 8, 9, 10, 9],
    tradeRatio: { green: 45.2, red: 54.8 },
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

  const toggleDropdown = () => {
    setShowBotDropdown(!showBotDropdown);
  };

  const toggleBotStatus = (botId: number) => {
    setBots(bots.map(bot => 
      bot.id === botId 
        ? { ...bot, status: bot.status === 'Active' ? 'Inactive' : 'Active' } 
        : bot
    ));
    
    if (selectedBot && selectedBot.id === botId) {
      setSelectedBot({
        ...selectedBot,
        status: selectedBot.status === 'Active' ? 'Inactive' : 'Active'
      });
    }
  };

  const handleEditBot = (botId: number) => {
    // In a real app, this would open an edit modal
    const newName = prompt('Enter new strategy name:', 
      bots.find(bot => bot.id === botId)?.name || '');
    
    if (newName) {
      setBots(bots.map(bot => 
        bot.id === botId ? { ...bot, name: newName } : bot
      ));
      
      if (selectedBot && selectedBot.id === botId) {
        setSelectedBot({ ...selectedBot, name: newName });
      }
    }
  };

  return (
    <div className={WCSS.PageContainer}>
      <div className={WCSS.Top}>
        <h3>AI Trading Strategies</h3>
        <div className={WCSS.RightSide}>
          <div 
            className={WCSS.AllBots} 
            onClick={toggleDropdown}
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
        </div>
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
              {/* FIRST COLUMN */}
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

              {/* SECOND COLUMN */}
              <div className={WCSS.BotSecond}>
                <div>Trade Ratio</div>
                <div className={WCSS.GreenBarContainer}>
                  <div className={WCSS.GreenRatio} style={{ width: `${bot.tradeRatio.green}%` }}></div>
                  <div className={WCSS.RedRatio} style={{ width: `${bot.tradeRatio.red}%` }}></div>
                </div>
                <div className={WCSS.TradeStats}>
                  <span className={WCSS.GreenStat}>{bot.tradeRatio.green}% Win</span>
                  <span className={WCSS.RedStat}>{bot.tradeRatio.red}% Loss</span>
                </div>
                <div>Total Trades</div>
                <div className={WCSS.TradeCount}>{bot.trades}</div>
              </div>

              {/* THIRD COLUMN */}
              <div className={WCSS.BotThird}>
                <div>Profit Gained</div>
                <div className={WCSS.GainGreenThing}>
                  {bot.profitGained}%
                  <div className={WCSS.MiniChart}>
                    <Sparklines data={bot.chartData} width={60} height={20}>
                      <SparklinesLine color="#3fc174" style={{ fill: "#e4f7ef", strokeWidth: 2 }} />
                    </Sparklines>
                  </div>
                </div>

                <div>Percentage Gain</div>
                <div className={WCSS.PercentageChart}>
                  <div>{bot.percentGain}%</div>
                  <div className={WCSS.MiniChart}>
                    <Sparklines data={bot.chartData} width={60} height={20}>
                      <SparklinesLine color="#f55c47" style={{ fill: "#ffe4e1", strokeWidth: 2 }} />
                    </Sparklines>
                  </div>
                </div>
              </div>

              {/* FOURTH COLUMN */}
              <div className={WCSS.BotFourth}>
                <div>Working Time</div>
                <div className={WCSS.WorkingTime}>{bot.workingTime}</div>
                <div>Current Orders</div>
                <div className={WCSS.OrderCount}>{bot.orders}</div>
              </div>

              {/* FIFTH COLUMN */}
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