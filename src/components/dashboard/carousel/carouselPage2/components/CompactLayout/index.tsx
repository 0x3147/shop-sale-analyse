import './index.less'

interface CompactLayoutProps {
  children: React.ReactNode
}

/**
 * 紧凑布局组件
 * 专门用于第二个轮播页面，去掉头部header以节省空间
 */
export default function CompactLayout({ children }: CompactLayoutProps) {
  return (
    <div className="compact-layout">
      {/* 直接显示内容，不包含header */}
      <div className="compact-content">{children}</div>
    </div>
  )
}
