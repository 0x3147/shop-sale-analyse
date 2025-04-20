import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import {
  RegionDataItem,
  RegionPieChart
} from '@/components/dashboard/charts/RegionPieChart'
import { getHotCountries } from '@/service/api'
import { useRequest } from 'ahooks'
import { useState } from 'react'
import './index.less'

/**
 * 国家销售分布图表组件
 */
export function RegionDistribution() {
  const [chartData, setChartData] = useState<RegionDataItem[]>([])

  // 使用ahooks的useRequest实现轮询
  const { loading } = useRequest(
    async () => {
      const res = await getHotCountries()
      if (res.success) {
        // 将API返回的数据转换为图表所需的格式
        const formattedData = res.data.map((item) => ({
          name: item.country,
          value: item.total_orders
        }))
        setChartData(formattedData)
      }
      return res
    },
    {
      pollingInterval: 30000, // 每30秒轮询一次
      loadingDelay: 300, // 延迟显示loading状态，避免闪烁
      refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
      onError: (error) => {
        console.error('获取热门国家数据失败:', error)
      }
    }
  )

  return (
    <DashboardCard title="热门国家订单数据" contentHeight="300px">
      <div className="region-distribution-chart">
        <RegionPieChart
          data={chartData}
          loading={loading}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </DashboardCard>
  )
}
