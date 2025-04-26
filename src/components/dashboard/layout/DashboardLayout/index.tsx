import { ReactNode } from 'react'
import { DashboardHeader } from '../DashboardHeader'
import './index.less'

interface DashboardLayoutProps {
  children: ReactNode
  title?: string
}

/**
 * 数据大屏的主布局组件
 * 提供深色背景、标题和整体容器
 */
export function DashboardLayout({
  children,
  title = '京科外贸部实时数据分析'
}: DashboardLayoutProps) {
  return (
    // 大屏主容器，深色背景，满屏显示
    <div className="dashboard-layout">
      {/* 顶部标题区域 */}
      <DashboardHeader title={title} />

      {/* 主内容区域 */}
      <main className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </main>

      {/* 底部版权区域 */}
      <footer className="dashboard-footer">
        <span>数据更新时间: {new Date().toLocaleString()}</span>
      </footer>
    </div>
  )
}
