import { EChartsOption } from 'echarts'
import { useEffect, useState } from 'react'
import { DashboardCard } from '../cards/DashboardCard'
import { randomInt } from '../utils/mockData'
import { BaseEChart } from './BaseEChart'

/**
 * 生成模拟的月销售额数据
 */
function generateMonthlySalesData() {
  const currentMonth = new Date().getMonth()
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthIndex = (i + currentMonth - 11) % 12
    return new Date(new Date().getFullYear(), monthIndex, 1).toLocaleString(
      'zh-CN',
      { month: 'short' }
    )
  })

  const bEndSales = months.map(() => randomInt(800000, 1500000))
  const cEndSales = months.map(() => randomInt(300000, 800000))

  // 确保有个大致的上升趋势
  for (let i = 1; i < 12; i++) {
    bEndSales[i] = Math.max(
      bEndSales[i],
      bEndSales[i - 1] * (0.9 + Math.random() * 0.3)
    )
    cEndSales[i] = Math.max(
      cEndSales[i],
      cEndSales[i - 1] * (0.85 + Math.random() * 0.3)
    )
  }

  // 计算总销售额和同比增长率
  const totalSales = months.map((_, i) => bEndSales[i] + cEndSales[i])
  const growthRate = months.map((_, i) => {
    if (i === 0) return 0
    return (
      ((totalSales[i] - totalSales[i - 1]) / totalSales[i - 1]) *
      100
    ).toFixed(1)
  })

  return { months, bEndSales, cEndSales, totalSales, growthRate }
}

/**
 * 月销售额图表组件
 * 展示B端和C端销售额的柱状图，以及总销售额的折线图
 */
export function MonthlySalesChart() {
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(generateMonthlySalesData())

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
      axisPointer: {
        type: 'shadow'
      },
      formatter: function (params: any) {
        const bEndValue = params[0].value.toLocaleString('en-US')
        const cEndValue = params[1].value.toLocaleString('en-US')
        const totalValue = params[2].value.toLocaleString('en-US')
        const growthRate = params[3].value

        return `<div style="font-size:14px;color:#fff;font-weight:bold;margin-bottom:8px">${params[0].name}</div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params[0].color};"></span>
                  <span style="flex:1">B端销售额:</span>
                  <span style="font-weight:bold">¥${bEndValue}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params[1].color};"></span>
                  <span style="flex:1">C端销售额:</span>
                  <span style="font-weight:bold">¥${cEndValue}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center">
                  <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params[2].color};"></span>
                  <span style="flex:1">总销售额:</span>
                  <span style="font-weight:bold">¥${totalValue}</span>
                </div>
                <div style="display:flex;justify-content:space-between;align-items:center;margin-top:5px">
                  <span style="margin-right:5px;display:inline-block;width:10px;height:10px;border-radius:50%;background-color:${params[3].color};"></span>
                  <span style="flex:1">环比增长:</span>
                  <span style="font-weight:bold;color:${Number(growthRate) >= 0 ? '#52c41a' : '#ff4d4f'}">${Number(growthRate) >= 0 ? '+' : ''}${growthRate}%</span>
                </div>`
      }
    },
    legend: {
      data: ['B端销售额', 'C端销售额', '总销售额', '环比增长'],
      textStyle: {
        color: '#a1b4d4'
      },
      icon: 'circle',
      right: 10,
      top: 0,
      itemGap: 20,
      padding: [0, 0, 15, 0]
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      top: '60px',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: data.months,
      axisTick: {
        alignWithLabel: true
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '销售额',
        min: 0,
        axisLabel: {
          formatter: function (value: number) {
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'M'
            } else if (value >= 1000) {
              return (value / 1000).toFixed(0) + 'K'
            }
            return value.toString()
          }
        }
      },
      {
        type: 'value',
        name: '增长率',
        position: 'right',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#675bba'
          }
        },
        axisLabel: {
          formatter: '{value}%'
        },
        splitLine: {
          show: false
        }
      }
    ],
    series: [
      {
        name: 'B端销售额',
        type: 'bar',
        stack: '销售额',
        barWidth: '50%',
        itemStyle: {
          color: '#3b82f6'
        },
        emphasis: {
          focus: 'series'
        },
        data: data.bEndSales
      },
      {
        name: 'C端销售额',
        type: 'bar',
        stack: '销售额',
        barWidth: '50%',
        itemStyle: {
          color: '#10b981'
        },
        emphasis: {
          focus: 'series'
        },
        data: data.cEndSales
      },
      {
        name: '总销售额',
        type: 'line',
        smooth: true,
        symbol: 'emptyCircle',
        symbolSize: 8,
        itemStyle: {
          color: '#f59e0b'
        },
        lineStyle: {
          width: 3,
          shadowColor: 'rgba(245, 158, 11, 0.3)',
          shadowBlur: 10,
          shadowOffsetY: 8
        },
        data: data.totalSales
      },
      {
        name: '环比增长',
        type: 'line',
        yAxisIndex: 1,
        symbol: 'circle',
        symbolSize: 6,
        lineStyle: {
          width: 2,
          type: 'dashed',
          color: '#675bba'
        },
        itemStyle: {
          color: '#675bba'
        },
        data: data.growthRate
      }
    ]
  }

  return (
    <DashboardCard title="月度销售趋势" colSpan={8} rowSpan={5}>
      <div className="h-full">
        <BaseEChart option={option} loading={loading} style={{ height: 360 }} />
      </div>
    </DashboardCard>
  )
}
