import './Dashboard.less'
import { DashboardLayout } from './layout/DashboardLayout'
import { BottomContent } from './sections/BottomContent'
import { MidContent } from './sections/MidContent'
import { TopStats } from './sections/TopStats/index'

/**
 * 数据大屏主组件
 * 组合所有子组件，形成完整的数据大屏
 */
export function Dashboard() {
  return (
    <DashboardLayout>
      {/* 顶部区域 - 实时关键指标 */}
      <div className="dashboard-section top-section">
        <TopStats />
      </div>

      {/* 中部区域 - 销售趋势和热门产品 */}
      <div className="dashboard-section mid-section">
        <MidContent />
      </div>

      {/* 底部区域 - 转化率和地域分布 */}
      <div className="dashboard-section bottom-section">
        <BottomContent />
      </div>
    </DashboardLayout>
  )
}
