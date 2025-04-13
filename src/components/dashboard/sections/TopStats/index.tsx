import { useEffect, useState } from 'react'
import { DigitalFlop } from '../../cards/DigitalFlop'
import { generateSalesData, generateVisitorData } from '../../utils/mockData'
import { RealTimeVisitor } from './components/RealTimeVisitor'
import { StatCard } from './components/StatCard'
import { TrendValue } from './components/TrendValue'
import './index.less'

/**
 * 顶部统计区域组件
 * 展示日销售额和访客数等实时关键指标
 */
export function TopStats() {
  // 销售额数据状态
  const [salesData, setSalesData] = useState(generateSalesData())
  // 访客数据状态
  const [visitorData, setVisitorData] = useState(generateVisitorData())

  // 模拟实时数据更新
  useEffect(() => {
    // 每5秒更新一次销售额数据
    const salesTimer = setInterval(() => {
      setSalesData((prev) => ({
        ...prev,
        total: prev.total + Math.floor(Math.random() * 5000),
        bEnd: prev.bEnd + Math.floor(Math.random() * 3500),
        cEnd: prev.cEnd + Math.floor(Math.random() * 1500)
      }))
    }, 5000)

    // 每2秒更新一次访客数据
    const visitorTimer = setInterval(() => {
      setVisitorData((prev) => ({
        ...prev,
        realTime: Math.max(
          150,
          prev.realTime + Math.floor(Math.random() * 21) - 10
        ),
        total: prev.total + Math.floor(Math.random() * 5) + 1,
        conversion: Number(
          (prev.conversion + (Math.random() * 0.2 - 0.1)).toFixed(1)
        )
      }))
    }, 2000)

    return () => {
      clearInterval(salesTimer)
      clearInterval(visitorTimer)
    }
  }, [])

  return (
    <div className="top-stats">
      {/* 总销售额 - 数字翻牌器 */}
      <StatCard title="今日总销售额" colSpan={3}>
        <DigitalFlop
          value={salesData.total}
          prefix="¥"
          className="sales-flop"
        />
        <TrendValue value={salesData.totalTrend} className="mt-2" />
      </StatCard>

      {/* B端销售额 */}
      <StatCard title="B端销售额" colSpan={2}>
        <div className="value-display">
          ¥{salesData.bEnd.toLocaleString('en-US')}
        </div>
        <TrendValue value={salesData.bEndTrend} />
      </StatCard>

      {/* C端销售额 */}
      <StatCard title="C端销售额" colSpan={2}>
        <div className="value-display">
          ¥{salesData.cEnd.toLocaleString('en-US')}
        </div>
        <TrendValue value={salesData.cEndTrend} />
      </StatCard>

      {/* 实时访客 */}
      <StatCard title="实时访客">
        <RealTimeVisitor value={visitorData.realTime} />
      </StatCard>

      {/* 今日访客总数 */}
      <StatCard title="访客总数">
        <div className="value-display blue">
          {visitorData.total.toLocaleString('en-US')}
        </div>
      </StatCard>

      {/* 转化率 */}
      <StatCard title="转化率">
        <div className="value-display yellow">{visitorData.conversion}%</div>
      </StatCard>

      {/* 点击率 */}
      <StatCard title="点击率">
        <div className="value-display blue">{visitorData.click}%</div>
      </StatCard>

      {/* 销售投产比 */}
      <StatCard title="投产比">
        <div className="value-display purple">
          {(salesData.total / (salesData.total * 0.12)).toFixed(1)}
        </div>
      </StatCard>
    </div>
  )
}
