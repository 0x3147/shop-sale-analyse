import { useEffect, useState } from 'react'
import { DigitalFlop } from '../cards/DigitalFlop'
import { StatisticCard } from '../cards/StatisticCard'
import { generateSalesData, generateVisitorData } from '../utils/mockData'

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
    <>
      {/* 总销售额 - 数字翻牌器 */}
      <div className="col-span-4 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">今日总销售额</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <DigitalFlop value={salesData.total} prefix="¥" className="mb-2" />
          <div className="text-xs text-green-400">
            <span className="mr-1">↑</span>
            <span>{salesData.totalTrend.toFixed(2)}% 同比昨日</span>
          </div>
        </div>
      </div>

      {/* B端、C端销售额 */}
      <div className="col-span-4 flex flex-col gap-2">
        <StatisticCard
          title="B端销售额"
          value={salesData.bEnd.toLocaleString('en-US')}
          prefix="¥"
          trend="up"
          trendValue={`${salesData.bEndTrend.toFixed(2)}%`}
          rowSpan={1}
          colSpan={4}
        />
        <StatisticCard
          title="C端销售额"
          value={salesData.cEnd.toLocaleString('en-US')}
          prefix="¥"
          trend="up"
          trendValue={`${salesData.cEndTrend.toFixed(2)}%`}
          rowSpan={1}
          colSpan={4}
        />
      </div>

      {/* 访客数据 */}
      <div className="col-span-4 grid grid-cols-2 gap-2">
        {/* 实时访客 */}
        <div className="flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90 p-3">
          <h3 className="mb-1 text-xs font-medium text-slate-300">
            实时访客数
          </h3>
          <div className="flex items-center">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500"></span>
            </span>
            <span className="ml-2 text-2xl font-bold text-green-400">
              {visitorData.realTime}
            </span>
          </div>
          <div className="mt-2 text-xs text-slate-400">实时更新</div>
        </div>

        {/* 今日访客总数 */}
        <div className="flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90 p-3">
          <h3 className="mb-1 text-xs font-medium text-slate-300">
            今日访客总数
          </h3>
          <div className="text-2xl font-bold text-[#6fbbff]">
            {visitorData.total.toLocaleString('en-US')}
          </div>
          <div className="mt-2 text-xs text-slate-400">
            截至 {new Date().getHours()}:00
          </div>
        </div>

        {/* 转化率 */}
        <div className="flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90 p-3">
          <h3 className="mb-1 text-xs font-medium text-slate-300">
            实时转化率
          </h3>
          <div className="text-2xl font-bold text-yellow-400">
            {visitorData.conversion}%
          </div>
          <div className="mt-2 text-xs text-slate-400">高于平均水平</div>
        </div>

        {/* 时间信息 */}
        <div className="flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90 p-3">
          <h3 className="mb-1 text-xs font-medium text-slate-300">当前时间</h3>
          <CurrentTime />
        </div>
      </div>
    </>
  )
}

/**
 * 当前时间组件 - 实时更新
 */
function CurrentTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedDate = time.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const formattedTime = time.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return (
    <>
      <div className="text-lg font-bold text-[#6fbbff]">{formattedTime}</div>
      <div className="mt-2 text-xs text-slate-400">{formattedDate}</div>
    </>
  )
}
