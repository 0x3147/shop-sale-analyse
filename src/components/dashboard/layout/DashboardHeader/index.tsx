import { CurrentTime } from '../CurrentTime'
import './index.less'

interface DashboardHeaderProps {
  title: string
}

/**
 * 数据大屏头部组件
 * 包含标题、店铺选择器和当前时间
 */
export function DashboardHeader({ title }: DashboardHeaderProps) {
  return (
    <header className="dashboard-header">
      {/* 标题居中显示 */}
      <h1 className="title">{title}</h1>

      {/* 左上角装饰 */}
      <div className="decoration decoration-left-top"></div>
      {/* 右上角装饰 */}
      <div className="decoration decoration-right-top"></div>

      {/* 右侧当前时间 */}
      <div className="time-container">
        <CurrentTime />
      </div>
    </header>
  )
}
