import { ReactNode } from 'react'
import './DashboardCard.less'

interface DashboardCardProps {
  title: string
  children: ReactNode
  colSpan?: number
  rowSpan?: number
  contentHeight?: string
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
  colSpan = 4,
  rowSpan = 1,
  contentHeight = 'auto',
  showDecoration = true
}: DashboardCardProps) {
  return (
    <div
      className="dashboard-card"
      style={{
        gridColumn: `span ${colSpan}`,
        gridRow: `span ${rowSpan}`
      }}
    >
      {/* 装饰角 */}
      {showDecoration && (
        <>
          <div className="dashboard-card-corner dashboard-card-corner-tl"></div>
          <div className="dashboard-card-corner dashboard-card-corner-tr"></div>
          <div className="dashboard-card-corner dashboard-card-corner-bl"></div>
          <div className="dashboard-card-corner dashboard-card-corner-br"></div>
        </>
      )}

      {/* 卡片标题 */}
      <div className="dashboard-card-header">
        <h3 className="dashboard-card-title">{title}</h3>
      </div>

      {/* 卡片内容 */}
      <div className="dashboard-card-content" style={{ height: contentHeight }}>
        {children}
      </div>
    </div>
  )
}
