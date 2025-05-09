import { EChartsOption } from 'echarts'
import { CSSProperties } from 'react'
import { BaseEChart } from './BaseEChart'

export interface RegionDataItem {
  name: string
  code?: string
  value: number
}

interface RegionPieChartProps {
  data: RegionDataItem[]
  loading?: boolean
  style?: CSSProperties
  className?: string
}

/**
 * 区域销售分布玫瑰图组件
 */
export function RegionPieChart({
  data,
  loading = false,
  style,
  className
}: RegionPieChartProps) {
  // 排序数据
  const sortedData = [...data].sort((a, b) => b.value - a.value)

  // 定义玫瑰图配置
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}个订单 ({d}%)'
    },
    // 隐藏X轴
    xAxis: {
      show: false
    },
    // 隐藏Y轴
    yAxis: {
      show: false
    },
    legend: {
      orient: 'vertical',
      right: 10,
      top: 'center',
      data: sortedData.map((item) => item.name),
      textStyle: {
        color: '#a1b4d4'
      },
      itemWidth: 10,
      itemHeight: 10,
      itemGap: 16,
      formatter: (name: string) => {
        const item = sortedData.find((d) => d.name === name)
        if (item) {
          return `${name} ${item.value}个`
        }
        return name
      }
    },
    series: [
      {
        name: '国家分布',
        type: 'pie',
        radius: ['10%', '70%'],
        center: ['35%', '50%'],
        roseType: 'area', // 设置为南丁格尔玫瑰图
        avoidLabelOverlap: true,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#0c2454',
          borderWidth: 2
        },
        label: {
          show: true,
          position: 'outside',
          formatter: '{b}',
          fontSize: 12,
          color: '#ffffff',
          textShadowColor: 'rgba(0, 0, 0, 0.8)',
          textShadowBlur: 3,
          textShadowOffsetX: 1,
          textShadowOffsetY: 1,
          backgroundColor: 'rgba(12, 36, 84, 0.6)',
          borderRadius: 3,
          padding: [3, 5]
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 14,
            fontWeight: 'bold'
          },
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        labelLine: {
          show: true,
          length: 10,
          length2: 15,
          smooth: true,
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.5)',
            width: 1
          }
        },
        data: sortedData.map((item) => ({
          value: item.value,
          name: item.name
        })),
        // 自定义颜色
        color: [
          '#3498db',
          '#9b59b6',
          '#2ecc71',
          '#f1c40f',
          '#e74c3c',
          '#1abc9c',
          '#34495e',
          '#16a085',
          '#27ae60',
          '#d35400'
        ]
      }
    ]
  }

  return (
    <BaseEChart
      option={option}
      loading={loading}
      style={style}
      className={className}
    />
  )
}
