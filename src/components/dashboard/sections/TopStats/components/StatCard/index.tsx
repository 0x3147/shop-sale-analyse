import { ReactNode } from 'react'
import './index.less'

interface StatCardProps {
  title: string
  children: ReactNode
  colSpan?: number
}

/**
 * 统计卡片组件
 * 用于展示各类统计数据，提供统一的卡片样式
 */
export function StatCard({ title, children, colSpan = 1 }: StatCardProps) {
  return (
    <div className={`stat-card col-span-${colSpan}`}>
      <div className="stat-card-header">
        <h3 className="stat-card-title">{title}</h3>
      </div>
      <div className="stat-card-content">{children}</div>
    </div>
  )
}
