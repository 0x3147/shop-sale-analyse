import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { StoreTrafficChart } from '@/components/dashboard/charts/StoreTrafficChart'
import { getStoreTraffic } from '@/service/api/index'
import { useRequest } from 'ahooks'
import { useState } from 'react'
import './index.less'

// 指标切换类型
type MetricType = 'exposure' | 'visitors' | 'conversion_rate' | 'click_rate'

// 指标数据
const metricOptions = [
  { key: 'exposure', label: '曝光量' },
  { key: 'visitors', label: '访客数' },
  { key: 'conversion_rate', label: '转化率' },
  { key: 'click_rate', label: '点击率' }
]

/**
 * 转化率和点击率图表组件
 */
export function ConversionTrend() {
  // 当前选中的指标
  const [activeMetric, setActiveMetric] =
    useState<MetricType>('conversion_rate')

  // 使用API获取店铺流量数据
  const { data, loading } = useRequest(getStoreTraffic, {
    pollingInterval: 30000, // 每30秒轮询一次
    loadingDelay: 300, // 延迟显示loading状态，避免闪烁
    refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
    onError: (error) => {
      console.error('获取店铺流量数据失败:', error)
    }
  })

  // 从API获取的流量数据
  const trafficData = data?.data || []

  // 指标切换
  const handleMetricChange = (metric: MetricType) => {
    setActiveMetric(metric)
  }

  // 获取当前指标信息
  const currentMetric = metricOptions.find((item) => item.key === activeMetric)

  return (
    <DashboardCard
      title={`店铺${currentMetric?.label || '流量数据'}排行`}
      contentHeight="300px"
    >
      <div className="conversion-trend-chart">
        <div className="metric-tabs">
          {metricOptions.map((option) => (
            <div
              key={option.key}
              className={`metric-tab ${activeMetric === option.key ? 'active' : ''}`}
              onClick={() => handleMetricChange(option.key as MetricType)}
            >
              {option.label}
            </div>
          ))}
        </div>
        <div className="chart-container">
          <StoreTrafficChart
            data={trafficData}
            loading={loading}
            activeMetric={activeMetric}
          />
        </div>
      </div>
    </DashboardCard>
  )
}
