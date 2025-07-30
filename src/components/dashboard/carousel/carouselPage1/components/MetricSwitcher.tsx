import { Traffic } from '@/service/types'
import { useEffect, useState } from 'react'
import { StoreTrafficChart } from '../../../charts/StoreTrafficChart'
import './MetricSwitcher.less'

// 流量指标类型定义
type TrafficMetric = 'exposure' | 'visitors' | 'conversion_rate' | 'click_rate'

// 指标配置
const metricConfig = {
  exposure: {
    name: '店铺曝光量排行',
    description: '展示各店铺的曝光量数据',
    icon: '👁️'
  },
  visitors: {
    name: '店铺访客数排行',
    description: '展示各店铺的访客数据',
    icon: '👥'
  },
  conversion_rate: {
    name: '店铺转化率排行',
    description: '展示各店铺的转化率数据',
    icon: '📈'
  },
  click_rate: {
    name: '店铺点击率排行',
    description: '展示各店铺的点击率数据',
    icon: '🖱️'
  }
}

interface MetricSwitcherProps {
  /**
   * 流量数据
   */
  data: Traffic[]
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 切换间隔时间（毫秒）
   */
  switchInterval?: number
}

/**
 * 指标切换器组件
 * 自动轮换展示不同的流量指标
 */
export function MetricSwitcher({
  data,
  loading = false,
  switchInterval = 10000
}: MetricSwitcherProps) {
  // 当前显示的流量指标
  const [currentMetric, setCurrentMetric] = useState<TrafficMetric>('exposure')
  
  // 指标轮换索引
  const [metricIndex, setMetricIndex] = useState(0)
  
  // 切换动画状态
  const [isTransitioning, setIsTransitioning] = useState(false)

  // 指标列表
  const metrics: TrafficMetric[] = ['exposure', 'visitors', 'conversion_rate', 'click_rate']

  // 自动轮换指标
  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransitioning(true)
      
      // 延迟切换指标，创建过渡效果
      setTimeout(() => {
        setMetricIndex((prevIndex) => {
          const nextIndex = (prevIndex + 1) % metrics.length
          setCurrentMetric(metrics[nextIndex])
          return nextIndex
        })
        setIsTransitioning(false)
      }, 300) // 300ms的过渡时间
      
    }, switchInterval)

    return () => clearInterval(timer)
  }, [switchInterval])

  // 获取当前指标配置
  const currentConfig = metricConfig[currentMetric]

  return (
    <div className="metric-switcher">
      {/* 指标信息头部 */}
      <div className="metric-header">
        <div className="metric-info">
          <span className="metric-icon">{currentConfig.icon}</span>
          <div className="metric-details">
            <h3 className="metric-title">{currentConfig.name}</h3>
            <p className="metric-description">{currentConfig.description}</p>
          </div>
        </div>
        
        {/* 进度指示器 */}
        <div className="metric-progress-container">
          <div className="metric-progress">
            <span className="current-index">{metricIndex + 1}</span>
            <span className="separator">/</span>
            <span className="total-count">{metrics.length}</span>
          </div>
          
          {/* 进度条 */}
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{
                width: `${((metricIndex + 1) / metrics.length) * 100}%`
              }}
            />
          </div>
        </div>
      </div>

      {/* 图表容器 */}
      <div className={`chart-container ${isTransitioning ? 'transitioning' : ''}`}>
        <StoreTrafficChart
          data={data}
          activeMetric={currentMetric}
          loading={loading}
        />
      </div>
    </div>
  )
}
