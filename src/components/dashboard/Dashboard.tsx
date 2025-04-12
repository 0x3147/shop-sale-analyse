import { DashboardLayout } from './layout/DashboardLayout'
import { TopStats } from './sections/TopStats'

/**
 * 数据大屏主组件
 * 组合所有子组件，形成完整的数据大屏
 */
export function Dashboard() {
  return (
    <DashboardLayout>
      {/* 顶部区域 - 实时关键指标 */}
      <TopStats />
    </DashboardLayout>
  )
}
