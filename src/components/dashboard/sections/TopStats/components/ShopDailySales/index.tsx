import { useEffect, useState } from 'react'
import { DashboardCard } from '../../../../cards/DashboardCard'
import { ShopSalesBar } from '../../../../charts/ShopSalesBar'
import { generateShopsSalesData } from '../../../../utils/mockData'
import './index.less'

/**
 * 店铺日销售额组件
 * 展示各店铺实时销售额数据，包含数字翻牌器和横向柱状图
 */
export function ShopDailySales() {
  // 店铺销售额数据
  const [salesData, setSalesData] = useState(generateShopsSalesData())

  // 模拟实时数据更新
  useEffect(() => {
    // 每5秒更新一次销售额数据
    const timer = setInterval(() => {
      const newData = generateShopsSalesData()
      setSalesData(newData)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <DashboardCard title="店铺日销售额" contentHeight="100%">
      <div className="shop-daily-sales-content">
        {/* 店铺销售额横向柱状图 */}
        <div className="sales-chart">
          <ShopSalesBar data={salesData} autoSort={true} unit="¥" />
        </div>
      </div>
    </DashboardCard>
  )
}
