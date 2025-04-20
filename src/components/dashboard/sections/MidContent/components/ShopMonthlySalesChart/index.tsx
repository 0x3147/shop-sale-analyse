import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { ShopMonthlySales } from '@/components/dashboard/charts/ShopMonthlySales'
import { getStoreMonthSales } from '@/service/api/index'
import { useRequest } from 'ahooks'
import './index.less'

/**
 * 店铺月销售额图表组件
 * 展示各店铺每月销售额数据趋势
 */
export function ShopMonthlySalesChart() {
  // 使用API获取月度销售数据
  const { data, loading } = useRequest(getStoreMonthSales, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false, // 页面隐藏时不轮询
    loadingDelay: 300, // 延迟显示loading状态，避免闪烁
    refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
    onError: (error) => {
      console.error('获取店铺月销售额数据失败:', error)
    }
  })

  return (
    <DashboardCard title="店铺月销售额趋势" contentHeight="100%">
      <div className="shop-monthly-sales-content">
        <ShopMonthlySales
          data={data?.data || {}}
          loading={loading}
          showLegend={true}
          maxShops={7} // 最多显示7个店铺的数据，避免图表过于拥挤
        />
      </div>
    </DashboardCard>
  )
}
