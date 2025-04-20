import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { ShopSalesBar } from '@/components/dashboard/charts/ShopSalesBar'
import { getStoreDailySales } from '@/service/api/index'
import { useRequest } from 'ahooks'

import './index.less'

/**
 * 店铺日销售额组件
 * 展示各店铺实时销售额数据，包含数字翻牌器和横向柱状图
 */
export function ShopDailySales() {
  // 使用ahooks的useRequest获取数据并轮询
  const { data, loading } = useRequest(getStoreDailySales, {
    pollingInterval: 3000, // 每3秒轮询一次
    pollingWhenHidden: false, // 页面隐藏时不轮询
    onError: (error) => {
      console.error('获取店铺日销售额数据失败:', error)
    }
  })

  // 提取店铺销售数据
  const salesData = data?.data || []

  return (
    <DashboardCard title="店铺日销售额" contentHeight="100%">
      <div className="shop-daily-sales-content">
        {/* 店铺销售额横向柱状图 */}
        <div className="sales-chart">
          <ShopSalesBar
            data={salesData}
            autoSort={true}
            unit="¥"
            loading={loading}
          />
        </div>
      </div>
    </DashboardCard>
  )
}
