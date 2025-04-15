import { EChartsOption } from 'echarts'
import { CSSProperties, useEffect, useState } from 'react'
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

interface ShopMonthlyDataSet {
  months: string[]
  shopData: ShopMonthlyData[]
}

interface ShopMonthlySalesProps {
  /**
   * 店铺月度销售数据
   */
  data: ShopMonthlyDataSet
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

  // 处理数据并更新图表配置
  useEffect(() => {
    if (!data || !data.shopData || data.shopData.length === 0) return

    // 计算每个店铺的总销售额
    const shopsWithTotal = data.shopData.map((shop) => {
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
        formatter: (params: any) => {
          const month = params[0].axisValue
          let html = `<div class="tooltip-title">${month}</div>`

          params.forEach((param: any) => {
            const shop = topShops.find((s) => s.name === param.seriesName)
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
        data: data.months,
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
  }, [data, showLegend, maxShops])

  return (
    <BaseEChart
      option={option}
      loading={loading}
      style={style}
      className={className}
    />
  )
}
