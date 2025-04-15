import { useEffect, useState } from 'react'
import { DigitalFlop } from '../../../../cards/DigitalFlop'
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

  // 计算总销售额
  const totalSales = salesData.reduce((sum, shop) => sum + shop.sales, 0)

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
    <div className="shop-daily-sales">
      {/* 总销售额数字翻牌器 */}
      <div className="total-sales">
        <div className="label">今日总销售额</div>
        <DigitalFlop
          value={totalSales}
          precision={0}
          prefix="¥"
          className="digital-value"
        />
      </div>

      {/* 店铺销售额横向柱状图 */}
      <div className="sales-chart">
        <ShopSalesBar
          data={salesData}
          title="各店铺销售额"
          autoSort={true}
          unit="¥"
        />
      </div>
    </div>
  )
}
