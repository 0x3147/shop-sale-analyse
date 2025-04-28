import { EChartsOption } from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { CSSProperties, useEffect, useRef, useState } from 'react'

// 辅助函数：深拷贝对象
const deepClone = (obj: any): any => {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item))
  }

  const clonedObj: any = {}
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      clonedObj[key] = deepClone(obj[key])
    }
  }

  return clonedObj
}

// 辅助函数：检查两个对象是否有实质性变化
const hasChanged = (prevObj: any, nextObj: any): boolean => {
  return JSON.stringify(prevObj) !== JSON.stringify(nextObj)
}

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
  const prevOptionRef = useRef<EChartsOption>({})

  // 合并默认配置和用户配置
  useEffect(() => {
    // 检查option是否真的变化了，避免不必要的重渲染
    if (!hasChanged(prevOptionRef.current, option)) {
      return
    }

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

    // 创建option的深拷贝，避免引用问题
    const optionCopy = deepClone(option)
    prevOptionRef.current = optionCopy

    // 是否合并配置
    if (notMerge) {
      setBaseOption(optionCopy)
    } else {
      // 深度合并配置对象
      setBaseOption({ ...defaultOption, ...optionCopy })
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
      notMerge={notMerge}
      // 允许动画，以确保正常的交互行为
      lazyUpdate={false}
    />
  )
}
