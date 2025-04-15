import { EChartsOption } from 'echarts'
import * as echarts from 'echarts/core'
import { CSSProperties, useEffect, useState } from 'react'
import { ProductType } from '../utils/mockData'
import { BaseEChart } from './BaseEChart'

/**
 * 产品销售数据接口
 */
export interface ProductSalesData {
  id: number
  name: string
  type: ProductType
  sales: number
  growth: number
  shopSales: {
    shopId: number
    shopName: string
    sales: number
  }[]
}

interface ProductSalesBarProps {
  /**
   * 产品销售数据
   */
  data: ProductSalesData[]
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
   * 是否显示产品类型分组
   */
  showTypeGroup?: boolean
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
  showTypeGroup = false,
  notMerge = false
}: ProductSalesBarProps) {
  // ECharts配置项
  const [option, setOption] = useState<EChartsOption>({})

  // 处理数据并更新图表配置
  useEffect(() => {
    if (!data || data.length === 0) return

    // 按销售额排序
    const sortedData = [...data].sort((a, b) => b.sales - a.sales)

    // 产品名称和销售数据
    const productNames = sortedData.map((item) => item.name)
    const salesData = sortedData.map((item) => item.sales)

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
          const trendIcon = product.growth >= 0 ? '↑' : '↓'
          const trendClass = product.growth >= 0 ? 'trend-up' : 'trend-down'

          // 构建热门销售店铺列表
          let shopList = ''
          if (product.shopSales && product.shopSales.length > 0) {
            const topShops = product.shopSales.slice(0, 3)
            shopList = `
              <div class="tooltip-shops">
                <div class="tooltip-subtitle">销售前三店铺:</div>
                ${topShops
                  .map(
                    (
                      shop: { shopId: number; shopName: string; sales: number },
                      index: number
                    ) => `
                  <div class="tooltip-shop">
                    <span class="shop-rank">${index + 1}</span>
                    <span class="shop-name">${shop.shopName}</span>
                    <span class="shop-sales">¥${shop.sales.toLocaleString()}</span>
                  </div>
                `
                  )
                  .join('')}
              </div>
            `
          }

          return `
            <div class="tooltip-item">
              <div class="tooltip-title">${product.name}</div>
              <div class="tooltip-type">${product.type}</div>
              <div class="tooltip-sales">¥${product.sales.toLocaleString()}</div>
              <div class="tooltip-trend ${trendClass}">
                ${Math.abs(product.growth)}% ${trendIcon}
              </div>
              ${shopList}
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
              value: item.sales,
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
              return `¥${(params.value / 10000).toFixed(1)}万`
            },
            color: '#a1b4d4'
          }
        }
      ]
    }

    setOption(chartOption)
  }, [data, showTypeGroup])

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
