import { ReactNode } from 'react'

interface StatisticCardProps {
  title: string
  value: number | string
  prefix?: ReactNode
  suffix?: ReactNode
  trend?: 'up' | 'down' | 'flat'
  trendValue?: string
  icon?: ReactNode
  className?: string
  // 网格跨列数，默认为3列宽
  colSpan?: number
  // 网格跨行数，默认为1行高
  rowSpan?: number
}

/**
 * 数字指标卡组件
 * 用于展示重要的数字指标，可以包含趋势和图标
 */
export function StatisticCard({
  title,
  value,
  prefix,
  suffix,
  trend,
  trendValue,
  icon,
  className = '',
  colSpan = 3,
  rowSpan = 1
}: StatisticCardProps) {
  // 动态生成网格跨度类名
  const gridSpanClass = `col-span-${colSpan} row-span-${rowSpan}`

  // 根据趋势方向设置颜色
  const trendColor =
    trend === 'up'
      ? 'text-green-400'
      : trend === 'down'
        ? 'text-red-400'
        : 'text-gray-400'

  // 趋势图标
  const trendIcon = trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'

  return (
    <div
      className={`flex flex-col rounded-sm border border-[#1c3e7a] bg-gradient-to-b from-[#0c2454]/90 to-[#0a1a3c]/90 ${gridSpanClass} ${className}`}
    >
      <div className="flex h-full items-center justify-between p-4">
        {/* 左侧指标信息 */}
        <div className="flex flex-col">
          <h3 className="mb-2 text-sm font-normal text-slate-300">{title}</h3>
          <div className="flex items-baseline">
            {prefix && (
              <span className="mr-1 text-sm text-slate-400">{prefix}</span>
            )}
            <span className="text-3xl font-bold text-[#6fbbff]">{value}</span>
            {suffix && (
              <span className="ml-1 text-sm text-slate-400">{suffix}</span>
            )}
          </div>

          {/* 趋势信息 */}
          {trend && trendValue && (
            <div className={`mt-2 flex items-center text-xs ${trendColor}`}>
              <span className="mr-1">{trendIcon}</span>
              <span>{trendValue}</span>
            </div>
          )}
        </div>

        {/* 右侧图标 */}
        {icon && (
          <div className="ml-4 text-4xl text-[#3d68c3] opacity-80">{icon}</div>
        )}
      </div>
    </div>
  )
}
