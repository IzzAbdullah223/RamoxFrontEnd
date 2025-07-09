import WCSS from './Watchlist.module.css'
import { GoTriangleDown } from "react-icons/go";
import Ethernum from '../../../Etherneum.svg'
import Tether from '../../../Tether.svg'
//@ts-ignore
import { Sparklines, SparklinesLine } from 'react-sparklines';

const bots = [
  {
    id: 1,
    name: 'Bot 1',
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

];

function Watchlist() {
  return (
    <div className={WCSS.PageContainer}>
      <div className={WCSS.Top}>
        <h3>AI Trading Strategies</h3>
        <div className={WCSS.RightSide}>
          <div className={WCSS.AllBots}>
            <div>All Bots</div>
            <GoTriangleDown />
          </div>
          <div className={WCSS.AddStrategy}>
            <div>+ Add Strategy</div>
          </div>
        </div>
      </div>

      <div className={WCSS.BotsContainer}>
        {bots.map(bot => (
          <div className={WCSS.BotContainer} key={bot.id}>
            <h3>{bot.name}</h3>
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
                <div>Number of trades</div>
                <div>{bot.trades}</div>
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
                <div className={WCSS.Status}>Status</div>
                <div>{bot.status}</div>
              </div>

              {/* FIFTH COLUMN */}
              <div className={WCSS.BotFifth}>
                <div>Total Balance</div>
                <div className={WCSS.WorkingTime}>{bot.balance}</div>
                <div className={WCSS.Status}>Orders</div>
                <div className={WCSS.WorkingTime}>{bot.orders}</div>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Watchlist;