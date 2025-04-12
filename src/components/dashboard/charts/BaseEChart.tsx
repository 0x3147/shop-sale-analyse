import { EChartsOption } from 'echarts'
import ReactEcharts from 'echarts-for-react'
import { CSSProperties, useEffect, useState } from 'react'

interface BaseEChartProps {
  option: EChartsOption
  loading?: boolean
  style?: CSSProperties
  className?: string
  theme?: 'dark'
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
  theme = 'dark'
}: BaseEChartProps) {
  // 默认ECharts主题配置
  const [baseOption, setBaseOption] = useState<EChartsOption>({})

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
      }
    }

    // 深度合并配置对象
    setBaseOption({ ...defaultOption, ...option })
  }, [option])

  return (
    <ReactEcharts
      option={baseOption}
      style={{ height: '100%', width: '100%', ...style }}
      className={`echarts-container ${className}`}
      showLoading={loading}
      theme={theme}
      opts={{ renderer: 'canvas' }}
    />
  )
}
