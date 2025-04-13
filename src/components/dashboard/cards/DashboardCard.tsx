import { ReactNode } from 'react'
import './DashboardCard.less'

interface DashboardCardProps {
  title: string
  children: ReactNode
  className?: string
  // 卡片内容高度
  contentHeight?: string | number
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
  contentHeight,
  showDecoration = true
}: DashboardCardProps) {
  // 生成内容样式
  const contentStyle = contentHeight ? { height: contentHeight } : {}

  return (
    <div className={`dashboard-card ${className}`}>
      {/* 卡片标题 */}
      <div className="dashboard-card-header">
        <h2 className="dashboard-card-title">{title}</h2>
      </div>

      {/* 卡片内容 */}
      <div className="dashboard-card-content" style={contentStyle}>
        {children}
      </div>

      {/* 装饰角 */}
      {showDecoration && (
        <>
          <div className="dashboard-card-corner dashboard-card-corner-tl"></div>
          <div className="dashboard-card-corner dashboard-card-corner-tr"></div>
          <div className="dashboard-card-corner dashboard-card-corner-bl"></div>
          <div className="dashboard-card-corner dashboard-card-corner-br"></div>
        </>
      )}
    </div>
  )
}
