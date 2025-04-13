import { ReactNode, useState } from 'react'
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
  title = '店铺销售数据分析大屏'
}: DashboardLayoutProps) {
  const [activeStore, setActiveStore] = useState('all')

  const handleStoreChange = (storeId: string) => {
    setActiveStore(storeId)
    // 在实际项目中，这里可以触发数据重新加载
    console.log('切换到店铺:', storeId)
  }

  return (
    // 大屏主容器，深色背景，满屏显示
    <div className="dashboard-layout">
      {/* 顶部标题区域 */}
      <DashboardHeader title={title} onStoreChange={handleStoreChange} />

      {/* 主内容区域 */}
      <main className="dashboard-main">
        <div className="dashboard-content">{children}</div>
      </main>

      {/* 底部版权区域 */}
      <footer className="dashboard-footer">
        <span>数据更新时间: {new Date().toLocaleString()}</span>
        <span className="ml-8">
          当前门店: {activeStore === 'all' ? '全部门店' : `ID: ${activeStore}`}
        </span>
      </footer>
    </div>
  )
}
