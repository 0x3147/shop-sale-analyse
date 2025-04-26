import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { StoreTrafficChart } from '@/components/dashboard/charts/StoreTrafficChart'
import { getStoreTraffic } from '@/service/api/index'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
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

  // 控制自动切换
  const [autoSwitch, setAutoSwitch] = useState(true)
  const switchInterval = 10000 // 10秒切换一次

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
    // 手动切换时暂停自动切换
    setAutoSwitch(false)
    // 5秒后恢复自动切换
    setTimeout(() => setAutoSwitch(true), 5000)
  }

  // 自动切换tab
  useEffect(() => {
    if (!autoSwitch) return

    const timer = setInterval(() => {
      // 找到当前指标的索引
      const currentIndex = metricOptions.findIndex(
        (item) => item.key === activeMetric
      )
      // 计算下一个指标的索引，循环切换
      const nextIndex = (currentIndex + 1) % metricOptions.length
      // 设置下一个指标
      setActiveMetric(metricOptions[nextIndex].key as MetricType)
    }, switchInterval)

    // 清理定时器
    return () => clearInterval(timer)
  }, [activeMetric, autoSwitch, switchInterval])

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
