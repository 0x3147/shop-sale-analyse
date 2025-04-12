import { ReactNode } from 'react'

interface DashboardCardProps {
  title: string
  children: ReactNode
  className?: string
  // 网格跨列数，默认为3列宽
  colSpan?: number
  // 网格跨行数，默认为2行高
  rowSpan?: number
  // 是否显示边框装饰
  showDecoration?: boolean
}

/**
 * 数据大屏的卡片组件
 * 作为图表、数据的统一容器
 */
export function DashboardCard({
  title,
  children,
  className = '',
  colSpan = 3,
  rowSpan = 2,
  showDecoration = true
}: DashboardCardProps) {
  // 动态生成网格跨度类名
  const gridSpanClass = `col-span-${colSpan} row-span-${rowSpan}`

  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-sm border border-[#1c3e7a] bg-[#0c2454]/70 backdrop-blur ${gridSpanClass} ${className}`}
    >
      {/* 卡片标题 */}
      <div className="flex h-8 items-center border-b border-[#1c3e7a] bg-[#0c2b5d]/50 px-3">
        <h2 className="text-sm font-medium text-[#add6ff]">{title}</h2>
      </div>

      {/* 卡片内容 */}
      <div className="flex-1 p-3">{children}</div>

      {/* 装饰角 */}
      {showDecoration && (
        <>
          <div className="absolute left-0 top-0 h-2 w-2 border-l border-t border-[#5ec8ea]"></div>
          <div className="absolute right-0 top-0 h-2 w-2 border-r border-t border-[#5ec8ea]"></div>
          <div className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-[#5ec8ea]"></div>
          <div className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-[#5ec8ea]"></div>
        </>
      )}
    </div>
  )
}
