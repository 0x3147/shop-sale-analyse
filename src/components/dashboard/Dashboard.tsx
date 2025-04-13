import HotProductsChart from './charts/HotProductsChart'
import { MonthlySalesChart } from './charts/MonthlySalesChart'
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

      {/* 中部区域 - 销售趋势和热门产品 */}
      <div className="col-span-8 row-span-5">
        <MonthlySalesChart />
      </div>
      <div className="col-span-4 row-span-5">
        <HotProductsChart />
      </div>
    </DashboardLayout>
  )
}
