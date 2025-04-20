import { EChartsOption } from 'echarts'
import { CSSProperties, useEffect, useState } from 'react'
import { DailySales } from '../../../service/types'
import { BaseEChart } from './BaseEChart'

/**
 * 店铺销售额数据接口
 */
export interface ShopSalesData {
  id: number
  name: string
  color: string
  sales: number
  trend: number
}

interface ShopSalesBarProps {
  /**
   * 店铺销售额数据
   */
  data: DailySales[]
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
   * 是否自动排序
   */
  autoSort?: boolean
  /**
   * 单位
   */
  unit?: string
  /**
   * 颜色映射，如果没有提供，则使用默认颜色
   */
  colorMap?: Record<string, string>
}

// 默认颜色列表
const DEFAULT_COLORS = [
  '#5470c6',
  '#91cc75',
  '#fac858',
  '#ee6666',
  '#73c0de',
  '#3ba272',
  '#fc8452',
  '#9a60b4',
  '#ea7ccc',
  '#1d7fbc'
]

/**
 * 店铺销售额横向柱状图组件
 * 展示各店铺的销售额数据，支持自动排序
 */
export function ShopSalesBar({
  data,
  style,
  className,
  loading = false,
  autoSort = true,
  unit = '¥',
  colorMap = {}
}: ShopSalesBarProps) {
  // ECharts配置项
  const [option, setOption] = useState<EChartsOption>({})

  // 处理数据并更新图表配置
  useEffect(() => {
    if (!data || data.length === 0) return

    // 将接口数据转换为组件所需的数据格式
    const formattedData = data.map((item, index) => ({
      id: item.store_id,
      name: item.store_name,
      color:
        colorMap[item.store_name] ||
        DEFAULT_COLORS[index % DEFAULT_COLORS.length],
      sales: item.sales,
      trend: 0 // 接口数据中没有趋势数据，默认为0
    }))

    // 如果需要自动排序，则按销售额降序排列
    const sortedData = autoSort
      ? [...formattedData].sort((a, b) => b.sales - a.sales)
      : formattedData

    // 准备柱状图数据
    const shopNames = sortedData.map((item) => item.name)
    const shopColors = sortedData.map((item) => item.color)
    const salesData = sortedData.map((item) => item.sales)

    // 设置柱状图配置
    const chartOption: EChartsOption = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        formatter: (params: any) => {
          const data = params[0]
          const shop = sortedData.find((item) => item.name === data.name)

          return `
            <div class="tooltip-item">
              <div class="tooltip-title">${data.name}</div>
              <div class="tooltip-value">${unit}${data.value.toLocaleString()}</div>
            </div>
          `
        }
      },
      xAxis: {
        type: 'value',
        axisLabel: {
          formatter: (value: number) => {
            // 简化大数字显示，例如：1.2k、3.5m
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'm'
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'k'
            }
            return value.toString()
          }
        }
      },
      yAxis: {
        type: 'category',
        data: shopNames,
        axisLabel: {
          interval: 0,
          // 确保标签完整显示
          formatter: (value: string) => {
            if (value.length > 5) {
              return value.substring(0, 5) + '...'
            }
            return value
          }
        }
      },
      series: [
        {
          name: '销售额',
          type: 'bar',
          data: salesData,
          // 使用店铺定义的颜色
          itemStyle: {
            color: (params: any) => {
              return shopColors[params.dataIndex]
            }
          },
          // 显示数据标签
          label: {
            show: true,
            position: 'right',
            formatter: (params: any) => {
              return unit + params.value.toLocaleString()
            },
            color: '#fff'
          },
          // 柱状图样式
          barWidth: '60%',
          // 柱状图动画
          animation: true,
          animationDuration: 1500,
          animationEasing: 'elasticOut'
        }
      ],
      // 确保图表占满容器
      grid: {
        top: '60',
        left: '3%',
        right: '10%',
        bottom: '3%',
        containLabel: true
      }
    }

    setOption(chartOption)
  }, [data, autoSort, unit, colorMap])

  return (
    <BaseEChart
      option={option}
      loading={loading}
      style={style}
      className={className}
    />
  )
}
