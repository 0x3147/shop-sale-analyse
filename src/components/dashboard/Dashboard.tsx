import { ConversionChart } from './charts/ConversionChart'
import { GeoDistributionChart } from './charts/GeoDistributionChart'
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
      <div className="col-span-12 row-span-1">
        <TopStats />
      </div>

      {/* 中部区域 - 销售趋势和热门产品 */}
      <div className="col-span-8 row-span-3 mt-4">
        <MonthlySalesChart />
      </div>
      <div className="col-span-4 row-span-3 mt-4">
        <HotProductsChart />
      </div>

      {/* 底部区域 - 转化率和地域分布 */}
      <div className="col-span-6 row-start-5 row-span-2 mt-4">
        <ConversionChart />
      </div>
      <div className="col-span-6 row-start-5 row-span-2 mt-4">
        <GeoDistributionChart />
      </div>
    </DashboardLayout>
  )
}
