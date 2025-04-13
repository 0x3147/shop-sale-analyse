import { EChartsOption } from 'echarts'
import { useEffect, useState } from 'react'
import { DashboardCard } from '../../../../cards/DashboardCard'
import { BaseEChart } from '../../../../charts/BaseEChart'
import { generateHotCountriesData } from '../../../../utils/mockData'
import './index.less'

interface CountryData {
  name: string
  code: string
  value: number
}

/**
 * 国家销售分布图表组件
 */
export function RegionDistribution() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<CountryData[]>([])

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      // 获取模拟数据
      const countriesData = generateHotCountriesData(6)
      setData(countriesData)
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 排序数据
  const sortedData = [...data].sort((a, b) => b.value - a.value)

  // 定义饼图配置
  const option: EChartsOption = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c}% ({d}%)'
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
          return `${name} ${item.value}%`
        }
        return name
      }
    },
    series: [
      {
        name: '国家分布',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['35%', '50%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 4,
          borderColor: '#0c2454',
          borderWidth: 2
        },
        label: {
          show: false
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
          show: false
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
    <DashboardCard title="销售地域分布" contentHeight="300px">
      <div className="region-distribution-chart">
        <BaseEChart
          option={option}
          loading={loading}
          style={{ height: '100%', width: '100%' }}
        />
      </div>
    </DashboardCard>
  )
}
