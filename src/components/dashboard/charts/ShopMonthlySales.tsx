import { MonthSalesResponse } from '@/service/types'
import { EChartsOption } from 'echarts'
import { CSSProperties, useEffect, useMemo, useState } from 'react'
import { BaseEChart } from './BaseEChart'

/**
 * 店铺月度销售数据接口
 */
export interface ShopMonthlyData {
  id: number
  name: string
  color: string
  monthlySales: number[]
}

interface ShopMonthlySalesProps {
  /**
   * 店铺月度销售数据，API返回的格式
   */
  data: MonthSalesResponse
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
   * 是否显示图例
   */
  showLegend?: boolean
  /**
   * 最大显示店铺数量
   * 当店铺数量过多时，只显示销售额前N的店铺
   */
  maxShops?: number
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
 * 店铺月度销售额折线图组件
 * 展示各店铺每月销售额趋势
 */
export function ShopMonthlySales({
  data,
  style,
  className,
  loading = false,
  showLegend = true,
  maxShops = 5
}: ShopMonthlySalesProps) {
  // ECharts配置项
  const [option, setOption] = useState<EChartsOption>({})

  // 处理API数据并转换为图表所需格式
  const transformedData = useMemo(() => {
    if (!data || Object.keys(data).length === 0) {
      return {
        months: [],
        shopData: []
      }
    }

    // 提取所有日期并排序
    const allDates = new Set<string>()
    Object.values(data).forEach((salesArray) => {
      salesArray.forEach((item) => {
        if (item.date) {
          // 只取日期部分：如 2023-05-15 => 5-15
          const dateParts = item.date.split('-')
          if (dateParts.length === 3) {
            const formattedDate = `${parseInt(dateParts[1])}-${parseInt(dateParts[2])}`
            allDates.add(formattedDate)
          }
        }
      })
    })

    // 转换为排序后的日期数组
    const sortedDates = Array.from(allDates).sort((a, b) => {
      const [monthA, dayA] = a.split('-').map(Number)
      const [monthB, dayB] = b.split('-').map(Number)
      return monthA * 100 + dayA - (monthB * 100 + dayB)
    })

    // 转换店铺数据
    const shopData: ShopMonthlyData[] = Object.entries(data).map(
      ([shopName, salesArray], index) => {
        // 为每个日期找到对应的销售额
        const monthlySales = sortedDates.map((dateStr) => {
          const [month, day] = dateStr.split('-').map(Number)

          // 查找匹配日期的销售额
          const salesItem = salesArray.find((item) => {
            const itemDate = new Date(item.date)
            return (
              itemDate.getMonth() + 1 === month && itemDate.getDate() === day
            )
          })

          return salesItem ? salesItem.sales : 0
        })

        // 如果有数据，取第一条的店铺ID和分类
        const firstSales = salesArray[0] || { store_id: 0, category: '' }

        return {
          id: firstSales.store_id,
          name: shopName,
          color: DEFAULT_COLORS[index % DEFAULT_COLORS.length],
          monthlySales
        }
      }
    )

    return {
      months: sortedDates,
      shopData
    }
  }, [data])

  // 处理数据并更新图表配置
  useEffect(() => {
    if (
      !transformedData ||
      !transformedData.shopData ||
      transformedData.shopData.length === 0
    )
      return

    // 计算每个店铺的总销售额
    const shopsWithTotal = transformedData.shopData.map((shop) => {
      const totalSales = shop.monthlySales.reduce(
        (sum, sales) => sum + sales,
        0
      )
      return {
        ...shop,
        totalSales
      }
    })

    // 按总销售额排序并限制显示店铺数量
    const topShops = [...shopsWithTotal]
      .sort((a, b) => b.totalSales - a.totalSales)
      .slice(0, maxShops)

    // 准备折线图系列数据
    const series: any[] = topShops.map((shop) => ({
      name: shop.name,
      type: 'line',
      data: shop.monthlySales,
      itemStyle: {
        color: shop.color
      },
      lineStyle: {
        width: 3
      },
      symbolSize: 6,
      smooth: true,
      // 选中效果
      emphasis: {
        focus: 'series',
        lineStyle: {
          width: 5
        }
      },
      // 区域填充
      areaStyle: {
        opacity: 0.1,
        color: shop.color
      },
      // 数据标签
      label: {
        show: false,
        formatter: '{c}',
        position: 'top'
      }
    }))

    // 设置折线图配置
    const chartOption: any = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: 'rgba(255, 255, 255, 0.3)',
            width: 1,
            type: 'dashed'
          }
        },
        confine: true,
        position: function (
          pos: [number, number],
          size: { contentSize: [number, number]; viewSize: [number, number] }
        ) {
          // 计算tooltip应该显示的位置
          // 优先显示在鼠标上方，如果空间不足则显示在下方
          const obj: Record<string, number> = { top: 10 }
          const key = pos[0] < size.viewSize[0] / 2 ? 'left' : 'right'
          obj[key] = 30
          return obj
        },
        formatter: (params: any) => {
          const month = params[0].axisValue
          let html = `<div class="tooltip-title">${month}</div>`

          params.forEach((param: any) => {
            html += `
              <div class="tooltip-item" style="display:flex;align-items:center;margin:5px 0;">
                <span style="display:inline-block;width:10px;height:10px;background:${param.color};margin-right:5px;border-radius:50%;"></span>
                <span style="flex:1;text-align:left;">${param.seriesName}:</span>
                <span style="font-weight:bold;margin-left:10px;">¥${param.value.toLocaleString()}</span>
              </div>
            `
          })

          return html
        }
      },
      // 图例设置
      legend: {
        show: showLegend,
        type: 'scroll',
        orient: 'horizontal',
        bottom: 0,
        data: topShops.map((shop) => shop.name),
        textStyle: {
          color: '#a1b4d4'
        },
        pageIconColor: '#8fb3f1',
        pageTextStyle: {
          color: '#a1b4d4'
        },
        inactiveColor: '#555'
      },
      // 网格设置
      grid: {
        top: 60,
        left: '3%',
        right: '4%',
        bottom: showLegend ? 50 : 30,
        containLabel: true
      },
      // X轴设置
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: transformedData.months,
        axisLine: {
          lineStyle: {
            color: '#1d3b7b'
          }
        },
        axisLabel: {
          color: '#7a9ac5',
          rotate: 0
        }
      },
      // Y轴设置
      yAxis: {
        type: 'value',
        axisLine: {
          show: true,
          lineStyle: {
            color: '#1d3b7b'
          }
        },
        splitLine: {
          lineStyle: {
            color: 'rgba(29, 59, 123, 0.5)',
            type: 'dashed'
          }
        },
        axisLabel: {
          color: '#7a9ac5',
          formatter: (value: number) => {
            // 简化大数字显示
            if (value >= 1000000) {
              return (value / 1000000).toFixed(1) + 'm'
            } else if (value >= 1000) {
              return (value / 1000).toFixed(1) + 'k'
            }
            return value.toString()
          }
        }
      },
      // 数据系列
      series
    }

    setOption(chartOption)
  }, [transformedData, showLegend, maxShops])

  return (
    <BaseEChart
      option={option}
      loading={loading}
      style={style}
      className={className}
    />
  )
}
