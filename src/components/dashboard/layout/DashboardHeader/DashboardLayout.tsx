import { ReactNode, useEffect, useState } from 'react'
import { StoreSwitcher } from '../StoreSwitcher'
import './DashboardHeader.less'

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
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0a1a3c] text-white">
      {/* 顶部标题区域 */}
      <header className="dashboard-header">
        <h1 className="title">{title}</h1>
        {/* 店铺选择器 */}
        <StoreSwitcher onChange={handleStoreChange} />
        {/* 左上角装饰 */}
        <div className="decoration decoration-left-top"></div>
        {/* 右上角装饰 */}
        <div className="decoration decoration-right-top"></div>

        {/* 右侧当前时间 */}
        <div className="time-container">
          <CurrentTime />
        </div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-auto p-4 pb-10">
        <div className="grid h-full w-full grid-cols-12 grid-rows-6 gap-4">
          {children}
        </div>
      </main>

      {/* 底部版权区域 */}
      <footer className="h-8 border-t border-[#1d3b7b] bg-[#0c1f44] text-center text-xs leading-8 text-slate-400">
        <span>数据更新时间: {new Date().toLocaleString()}</span>
        <span className="ml-8">
          当前门店: {activeStore === 'all' ? '全部门店' : `ID: ${activeStore}`}
        </span>
      </footer>
    </div>
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
      <div className="time">{formattedTime}</div>
      <div className="date">{formattedDate}</div>
    </>
  )
}
