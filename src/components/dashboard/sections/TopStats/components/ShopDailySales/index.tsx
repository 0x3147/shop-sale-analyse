import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { ShopSalesBar } from '@/components/dashboard/charts/ShopSalesBar'
import { getStoreDailySales } from '@/service/api/index'
import { DailySales } from '@/service/types'
import { useRequest } from 'ahooks'
import { useState } from 'react'

import './index.less'

/**
 * 店铺日销售额组件
 * 展示各店铺实时销售额数据，包含数字翻牌器和横向柱状图
 */
export function ShopDailySales() {
  // 本地状态存储当前显示的数据
  const [salesData, setSalesData] = useState<DailySales[]>([])

  // 使用ahooks的useRequest获取数据并轮询
  const { loading } = useRequest(getStoreDailySales, {
    pollingInterval: 10000, // 延长轮询间隔到10秒
    pollingWhenHidden: false, // 页面隐藏时不轮询
    loadingDelay: 300, // 延迟显示loading状态，避免闪烁
    refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
    onSuccess: (result) => {
      if (result?.data && Array.isArray(result.data)) {
        setSalesData(result.data)
      }
    },
    onError: (error) => {
      console.error('获取店铺日销售额数据失败:', error)
    }
  })

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
