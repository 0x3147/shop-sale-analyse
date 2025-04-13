import { EChartsOption } from 'echarts'
import { useEffect, useState } from 'react'
import { DashboardCard } from '../cards/DashboardCard'
import { randomFloat } from '../utils/mockData'
import { BaseEChart } from './BaseEChart'

interface ConversionData {
  date: string
  conversion: number
  click: number
}

/**
 * 生成模拟的转化率和点击率数据
 */
function generateConversionData(): ConversionData[] {
  // 生成最近30天的数据
  const data: ConversionData[] = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)
    const dateStr = date.toLocaleDateString('zh-CN', {
      month: 'numeric',
      day: 'numeric'
    })

    // 生成随机转化率和点击率，确保有一定的趋势性
    const baseConversion = 3 + Math.sin(i / 10) * 0.5 // 基础转化率在2.5%~3.5%之间波动
    const baseClick = 22 + Math.cos(i / 8) * 4 // 基础点击率在18%~26%之间波动

    // 添加随机波动
    const conversion = randomFloat(
      Math.max(2, baseConversion - 0.8),
      Math.min(5, baseConversion + 0.8),
      1
    )
    const click = randomFloat(
      Math.max(15, baseClick - 3),
      Math.min(30, baseClick + 3),
      1
    )

    data.push({
      date: dateStr,
      conversion,
      click
    })
  }

  return data
}

/**
 * 转化率和点击率图表组件
 */
export function ConversionChart() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<ConversionData[]>(generateConversionData())

  useEffect(() => {
    // 模拟数据加载
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // 定义图表配置
  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      formatter: function (params: any) {
        const date = params[0].name
        const conversion = params[0].value
        const click = params[1].value

        return `<div style="font-size:14px;color:#fff;font-weight:bold;margin-bottom:8px">${date}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params[0].color};"></span>
                  <span style="flex:1">转化率:</span>
                  <span style="font-weight:bold">${conversion}%</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params[1].color};"></span>
                  <span style="flex:1">点击率:</span>
                  <span style="font-weight:bold">${click}%</span>
                </div>`
      }
    },
    legend: {
      data: ['转化率', '点击率'],
      textStyle: {
        color: '#a1b4d4'
      },
      right: 10,
      top: 0
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
      boundaryGap: false,
      data: data.map((item) => item.date),
      axisLabel: {
        rotate: 45,
        interval: 'auto'
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '转化率',
        min: 0,
        max: 6,
        interval: 1,
        axisLabel: {
          formatter: '{value}%'
        },
        position: 'left',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#f59e0b'
          }
        },
        splitLine: {
          lineStyle: {
            color: '#162c57'
          }
        }
      },
      {
        type: 'value',
        name: '点击率',
        min: 0,
        max: 40,
        interval: 5,
        axisLabel: {
          formatter: '{value}%'
        },
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#3b82f6'
          }
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: '转化率',
        type: 'line',
        yAxisIndex: 0,
        data: data.map((item) => item.conversion),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: '#f59e0b'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(245, 158, 11, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(245, 158, 11, 0.05)'
              }
            ]
          }
        }
      },
      {
        name: '点击率',
        type: 'line',
        yAxisIndex: 1,
        data: data.map((item) => item.click),
        smooth: true,
        showSymbol: false,
        lineStyle: {
          width: 3,
          color: '#3b82f6'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0,
                color: 'rgba(59, 130, 246, 0.3)'
              },
              {
                offset: 1,
                color: 'rgba(59, 130, 246, 0.05)'
              }
            ]
          }
        }
      }
    ]
  }

  return (
    <DashboardCard title="转化率与点击率趋势" colSpan={6} rowSpan={2}>
      <BaseEChart
        option={option}
        loading={loading}
        style={{ height: '180px' }}
      />
    </DashboardCard>
  )
}
