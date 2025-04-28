import { Traffic } from '@/service/types'
import { EChartsOption } from 'echarts'
import { CSSProperties, useEffect, useMemo, useRef, useState } from 'react'
import { BaseEChart } from './BaseEChart'

interface StoreTrafficChartProps {
  /**
   * 流量数据
   */
  data: Traffic[]
  /**
   * 组件样式
   */
  style?: CSSProperties
  /**
   * 组件类名
   */
  className?: string
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 当前选中的指标
   */
  activeMetric: 'exposure' | 'visitors' | 'conversion_rate' | 'click_rate'
}

// 指标映射配置
const metricConfig = {
  exposure: {
    name: '曝光量',
    color: '#5470c6',
    unit: '',
    formatter: (value: number) => value.toLocaleString()
  },
  visitors: {
    name: '访客数',
    color: '#91cc75',
    unit: '',
    formatter: (value: number) => value.toLocaleString()
  },
  conversion_rate: {
    name: '转化率',
    color: '#fac858',
    unit: '%',
    formatter: (value: number) => value.toFixed(2) + '%'
  },
  click_rate: {
    name: '点击率',
    color: '#ee6666',
    unit: '%',
    formatter: (value: number) => value.toFixed(2) + '%'
  }
}

/**
 * 店铺流量数据图表组件
 * 展示所有店铺的流量、访客、转化率和点击率数据
 */
export function StoreTrafficChart({
  data,
  style,
  className,
  loading = false,
  activeMetric
}: StoreTrafficChartProps) {
  // ECharts配置项
  const [option, setOption] = useState<EChartsOption>({})
  // 使用useRef跟踪上一次的配置和依赖
  const prevMetricRef = useRef(activeMetric)
  const prevStoreDataRef = useRef<any[]>([])

  // 处理数据生成图表配置
  const storeData = useMemo(() => {
    if (!data || data.length === 0) return []

    // 按店铺名称分组
    const storeMap = new Map<string, Traffic>()
    data.forEach((item) => {
      storeMap.set(item.store_name, item)
    })

    // 转换为图表所需格式
    return Array.from(storeMap.values())
      .sort((a, b) => {
        // 根据当前激活的指标排序
        if (activeMetric === 'exposure') {
          return b.exposure - a.exposure
        } else if (activeMetric === 'visitors') {
          return b.visitors - a.visitors
        } else if (activeMetric === 'conversion_rate') {
          return b.conversion_rate - a.conversion_rate
        } else {
          return b.click_rate - a.click_rate
        }
      })
      .slice(0, 10) // 最多显示10个店铺
  }, [data, activeMetric])

  // 更新图表配置
  useEffect(() => {
    if (!storeData || storeData.length === 0) return

    // 检查数据和指标是否真的变化了
    const metricChanged = prevMetricRef.current !== activeMetric
    const dataChanged =
      JSON.stringify(prevStoreDataRef.current) !== JSON.stringify(storeData)

    if (!metricChanged && !dataChanged) {
      return // 如果没有实质性变化，则不更新
    }

    // 更新引用值
    prevMetricRef.current = activeMetric
    prevStoreDataRef.current = [...storeData]

    const metric = metricConfig[activeMetric]
    const storeNames = storeData.map((item) => item.store_name)
    const metricValues = storeData.map((item) => item[activeMetric])

    const chartOption: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any) => {
          const dataIndex = params[0].dataIndex
          const store = storeData[dataIndex]

          return `
            <div class="tooltip-title">${store.store_name}</div>
            <div class="tooltip-item">
              <span class="label">${metric.name}:</span>
              <span class="value">${metric.formatter(store[activeMetric])}</span>
            </div>
            <div class="tooltip-category">分类: ${store.category}</div>
          `
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '50px',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: storeNames,
        axisLabel: {
          interval: 0,
          rotate: 45,
          color: '#a1b4d4',
          formatter: (value: string) => {
            if (value.length > 8) {
              return value.slice(0, 8) + '...'
            }
            return value
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(161, 180, 212, 0.3)'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: metric.name,
        nameTextStyle: {
          color: '#a1b4d4'
        },
        axisLabel: {
          color: '#a1b4d4',
          formatter: (value: number) => {
            if (activeMetric === 'exposure' || activeMetric === 'visitors') {
              if (value >= 10000) {
                return (value / 10000).toFixed(1) + '万'
              }
              return value.toString()
            } else {
              return value.toFixed(1) + '%'
            }
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(161, 180, 212, 0.1)'
          }
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(161, 180, 212, 0.3)'
          }
        }
      },
      series: [
        {
          name: metric.name,
          type: 'bar',
          data: metricValues,
          itemStyle: {
            color: metric.color
          },
          label: {
            show: true,
            position: 'top',
            color: '#a1b4d4',
            formatter: (params: any) => {
              return metric.formatter(params.value)
            }
          }
        }
      ]
    }

    // 使用函数形式的setState，避免依赖旧的state
    setOption((prevOption) => {
      // 如果实质上相同，则返回旧的option避免重渲染
      if (JSON.stringify(prevOption) === JSON.stringify(chartOption)) {
        return prevOption
      }
      return chartOption
    })
  }, [storeData, activeMetric])

  return (
    <BaseEChart
      option={option}
      loading={loading}
      style={style}
      className={className}
    />
  )
}
