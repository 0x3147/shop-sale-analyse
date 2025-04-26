import { ProductSummary } from '@/service/types'
import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { CSSProperties, useEffect, useState } from 'react'
import { BaseEChart } from './BaseEChart'

interface ProductSalesBarProps {
  /**
   * 产品销售数据
   */
  data: ProductSummary[]
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
   * 是否禁用配置合并
   */
  notMerge?: boolean
}

/**
 * 产品销售柱状图组件
 * 用于展示热门产品的销售情况
 */
export function ProductSalesBar({
  data,
  style,
  className,
  loading = false,
  notMerge = false
}: ProductSalesBarProps) {
  // ECharts配置项
  const [option, setOption] = useState<EChartsOption>({})

  // 处理数据并更新图表配置
  useEffect(() => {
    if (!data || data.length === 0) return

    // 按销售额排序
    const sortedData = [...data]
      .sort((a, b) => b.total_sales - a.total_sales)
      .slice(0, 10)

    // 产品名称和销售数据
    const productNames = sortedData.map((item) => item.product_name)

    // 设置柱状图配置
    const chartOption: EChartsOption = {
      // 禁用动画
      animation: false,
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any) => {
          const dataIndex = params[0].dataIndex
          const product = sortedData[dataIndex]

          return `
            <div class="tooltip-item">
              <div class="tooltip-title">${product.product_name}</div>
              <div class="tooltip-sales">销量: ${product.total_sales.toLocaleString()}</div>
            </div>
          `
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        top: '10',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: productNames,
        axisLabel: {
          interval: 0,
          rotate: 45,
          formatter: (value: string) => {
            if (value.length > 10) {
              return value.slice(0, 10) + '...'
            }
            return value
          },
          color: '#a1b4d4'
        },
        axisLine: {
          lineStyle: {
            color: 'rgba(161, 180, 212, 0.3)'
          }
        }
      },
      yAxis: {
        type: 'value',
        name: '销量',
        nameTextStyle: {
          color: '#a1b4d4'
        },
        axisLabel: {
          formatter: (value: number) => {
            if (value >= 10000) {
              return (value / 10000).toFixed(1) + '万'
            }
            return value.toLocaleString()
          },
          color: '#a1b4d4'
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
          type: 'bar',
          data: sortedData.map((item) => {
            return {
              value: item.total_sales,
              itemStyle: {
                color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                  { offset: 0, color: 'rgba(80, 175, 255, 0.9)' },
                  { offset: 1, color: 'rgba(40, 110, 190, 0.5)' }
                ]),
                borderRadius: [4, 4, 0, 0]
              }
            }
          }),
          label: {
            show: true,
            position: 'top',
            formatter: (params: any) => {
              const value = params.value
              return value >= 10000
                ? `${(value / 10000).toFixed(1)}万`
                : value.toLocaleString()
            },
            color: '#a1b4d4'
          }
        }
      ]
    }

    setOption(chartOption)
  }, [data])

  return (
    <BaseEChart
      option={option}
      loading={loading}
      style={style}
      className={className}
      notMerge={notMerge}
    />
  )
}
