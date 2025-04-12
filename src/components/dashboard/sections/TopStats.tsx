import { useEffect, useState } from 'react'
import { DigitalFlop } from '../cards/DigitalFlop'
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
    <div className="col-span-12 mb-2 grid grid-cols-12 gap-4">
      {/* 总销售额 - 数字翻牌器 */}
      <div className="col-span-3 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
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

      {/* B端销售额 */}
      <div className="col-span-2 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">B端销售额</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <div className="mb-1 text-2xl font-bold text-[#6fbbff]">
            ¥{salesData.bEnd.toLocaleString('en-US')}
          </div>
          <div className="text-xs text-green-400">
            <span className="mr-1">↑</span>
            <span>{salesData.bEndTrend.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* C端销售额 */}
      <div className="col-span-2 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">C端销售额</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <div className="mb-1 text-2xl font-bold text-[#6fbbff]">
            ¥{salesData.cEnd.toLocaleString('en-US')}
          </div>
          <div className="text-xs text-green-400">
            <span className="mr-1">↑</span>
            <span>{salesData.cEndTrend.toFixed(2)}%</span>
          </div>
        </div>
      </div>

      {/* 实时访客 */}
      <div className="col-span-1 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">实时访客</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <div className="flex items-center">
            <span className="relative mr-1 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
            </span>
            <span className="text-xl font-bold text-green-400">
              {visitorData.realTime}
            </span>
          </div>
        </div>
      </div>

      {/* 今日访客总数 */}
      <div className="col-span-1 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">访客总数</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <div className="text-xl font-bold text-[#6fbbff]">
            {visitorData.total.toLocaleString('en-US')}
          </div>
        </div>
      </div>

      {/* 转化率 */}
      <div className="col-span-1 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">转化率</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <div className="text-xl font-bold text-yellow-400">
            {visitorData.conversion}%
          </div>
        </div>
      </div>

      {/* 点击率 */}
      <div className="col-span-1 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">点击率</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <div className="text-xl font-bold text-blue-400">
            {visitorData.click}%
          </div>
        </div>
      </div>

      {/* 销售投产比 */}
      <div className="col-span-1 flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90">
        <div className="border-b border-[#1c3e7a] px-3 py-2">
          <h3 className="text-sm font-medium text-slate-300">投产比</h3>
        </div>
        <div className="flex flex-1 flex-col items-center justify-center p-3">
          <div className="text-xl font-bold text-purple-400">
            {(salesData.total / (salesData.total * 0.12)).toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  )
}
