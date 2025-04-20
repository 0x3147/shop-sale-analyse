import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { ProductSalesBar } from '@/components/dashboard/charts/ProductSalesBar'
import { getHotProducts } from '@/service/api/index'
import { useRequest } from 'ahooks'
import './index.less'

/**
 * 热门产品柱状图组件
 * 展示热门产品的销售额数据
 */
export function HotProductsTreemap() {
  // 使用API获取热门产品数据
  const { data, loading } = useRequest(getHotProducts, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false, // 页面隐藏时不轮询
    loadingDelay: 300, // 延迟显示loading状态，避免闪烁
    refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
    onError: (error) => {
      console.error('获取热门产品数据失败:', error)
    }
  })

  // 从API获取的产品数据
  const productData = data?.data || []

  return (
    <DashboardCard title="热门产品销量排行" contentHeight="100%">
      <div className="hot-products-content">
        <div className="chart-container" style={{ height: '100%' }}>
          <ProductSalesBar
            data={productData}
            loading={loading}
            notMerge={true}
          />
        </div>
      </div>
    </DashboardCard>
  )
}
