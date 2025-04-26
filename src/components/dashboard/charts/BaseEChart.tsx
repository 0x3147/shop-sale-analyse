import { EChartsOption } from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { CSSProperties, useEffect, useRef, useState } from 'react'

interface BaseEChartProps {
  option: EChartsOption
  loading?: boolean
  style?: CSSProperties
  className?: string
  theme?: 'dark'
  notMerge?: boolean
}

/**
 * 基础ECharts组件
 * 封装echarts-for-react，提供统一的样式和配置
 */
export function BaseEChart({
  option,
  loading = false,
  style,
  className = '',
  theme = 'dark',
  notMerge = false
}: BaseEChartProps) {
  // 默认ECharts主题配置
  const [baseOption, setBaseOption] = useState<EChartsOption>({})
  const echartRef = useRef<ReactEcharts>(null)
  const prevLoadingRef = useRef(loading)

  // 合并默认配置和用户配置
  useEffect(() => {
    // 大屏默认主题配置
    const defaultOption: EChartsOption = {
      backgroundColor: 'transparent',
      textStyle: {
        color: '#a1b4d4'
      },
      title: {
        textStyle: {
          color: '#add6ff'
        }
      },
      legend: {
        textStyle: {
          color: '#a1b4d4'
        }
      },
      xAxis: {
        axisLine: {
          lineStyle: {
            color: '#1d3b7b'
          }
        },
        axisLabel: {
          color: '#7a9ac5'
        },
        splitLine: {
          lineStyle: {
            color: '#1d3b7b'
          }
        }
      },
      yAxis: {
        axisLine: {
          lineStyle: {
            color: '#1d3b7b'
          }
        },
        axisLabel: {
          color: '#7a9ac5'
        },
        splitLine: {
          lineStyle: {
            color: '#162c57'
          }
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '8%',
        containLabel: true
      },
      // 启用默认的动画
      animation: true
    }

    // 是否合并配置
    if (notMerge) {
      setBaseOption(option)
    } else {
      // 深度合并配置对象
      setBaseOption({ ...defaultOption, ...option })
    }
  }, [option, notMerge])

  // 处理加载状态变化，避免不必要的重绘
  useEffect(() => {
    // 只有当loading状态变化时才触发
    if (prevLoadingRef.current !== loading && echartRef.current) {
      const instance = echartRef.current.getEchartsInstance()

      if (loading) {
        instance.showLoading({
          text: '加载中...',
          color: '#1890ff',
          textColor: '#fff',
          maskColor: 'rgba(0, 0, 0, 0.3)'
        })
      } else {
        instance.hideLoading()
      }

      prevLoadingRef.current = loading
    }
  }, [loading])

  return (
    <ReactEcharts
      ref={echartRef}
      option={baseOption}
      style={{ height: '100%', width: '100%', ...style }}
      className={`echarts-container ${className}`}
      // 禁用内置loading效果，使用自定义loading
      showLoading={false}
      theme={theme}
      opts={{ renderer: 'canvas', devicePixelRatio: 2 }}
      // 使用merge模式而不是替换模式，减少重绘
      notMerge={false}
      // 允许动画，以确保正常的交互行为
      lazyUpdate={false}
    />
  )
}
