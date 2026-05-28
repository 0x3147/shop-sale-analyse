import './Dashboard.less'
import { DashboardLayout } from './layout/DashboardLayout'
import { BottomContent } from './sections/BottomContent'
import { MidContent } from './sections/MidContent'
import { HotProductsTreemap } from './sections/MidContent/components/HotProductsTreemap'
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

      {/* 主内容区域 - 重新设计布局 */}
      <div className="dashboard-section main-content-area">
        {/* 左侧区域 */}
        <div className="left-area">
          {/* 中部：店铺月销售趋势 */}
          <div className="monthly-sales-section">
            <MidContent />
          </div>

          {/* 底部：转化率和地域分布 */}
          <div className="bottom-charts-section">
            <BottomContent />
          </div>
        </div>

        {/* 右侧区域：热门产品延伸 */}
        <div className="right-area">
          <HotProductsTreemap />
        </div>
      </div>
    </DashboardLayout>
  )
}
