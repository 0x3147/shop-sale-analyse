import { ReactNode } from 'react'

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
  return (
    // 大屏主容器，深色背景，满屏显示
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#0a1a3c] text-white">
      {/* 顶部标题区域 */}
      <header className="relative flex h-16 items-center justify-center border-b border-[#1d3b7b] bg-[#0c1f44]">
        <h1 className="text-2xl font-bold text-[#6fbbff]">{title}</h1>
        {/* 左上角装饰 */}
        <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-[#2483ff]"></div>
        {/* 右上角装饰 */}
        <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-[#2483ff]"></div>
      </header>

      {/* 主内容区域 */}
      <main className="flex-1 overflow-hidden p-4">
        <div className="grid h-full w-full grid-cols-12 grid-rows-6 gap-4">
          {children}
        </div>
      </main>

      {/* 底部版权区域 */}
      <footer className="h-8 border-t border-[#1d3b7b] bg-[#0c1f44] text-center text-xs leading-8 text-slate-400">
        数据更新时间: {new Date().toLocaleString()}
      </footer>
    </div>
  )
}
