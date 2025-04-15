import { useEffect, useState } from 'react'
import { DashboardCard } from '../../../../cards/DashboardCard'
import { ShopMonthlySales } from '../../../../charts/ShopMonthlySales'
import { generateMonthlyShopSalesData } from '../../../../utils/mockData'
import './index.less'

/**
 * 店铺月销售额图表组件
 * 展示各店铺每月销售额数据趋势
 */
export function ShopMonthlySalesChart() {
  // 店铺月度销售数据
  const [salesData, setSalesData] = useState(generateMonthlyShopSalesData())

  // 模拟数据定期更新
  useEffect(() => {
    // 每30秒更新一次数据
    const timer = setInterval(() => {
      setSalesData(generateMonthlyShopSalesData())
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  return (
    <DashboardCard title="店铺月销售额趋势" contentHeight="100%">
      <div className="shop-monthly-sales-content">
        <ShopMonthlySales
          data={salesData}
          showLegend={true}
          maxShops={7} // 最多显示7个店铺的数据，避免图表过于拥挤
        />
      </div>
    </DashboardCard>
  )
}
