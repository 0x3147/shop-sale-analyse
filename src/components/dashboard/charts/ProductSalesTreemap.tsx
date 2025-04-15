import { EChartsOption } from 'echarts'
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

interface ProductSalesTreemapProps {
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
 * 产品销售矩形树图组件
 * 用于展示热门产品的销售情况
 */
export function ProductSalesTreemap({
  data,
  style,
  className,
  loading = false,
  showTypeGroup = true,
  notMerge = false
}: ProductSalesTreemapProps) {
  // ECharts配置项
  const [option, setOption] = useState<EChartsOption>({})

  // 处理数据并更新图表配置
  useEffect(() => {
    if (!data || data.length === 0) return

    // 准备树图数据
    let treeData: any[] = []

    // 是否按照产品类型分组
    if (showTypeGroup) {
      // 按类型分组统计
      const groupedData: Record<
        ProductType,
        {
          name: string
          value: number
          children: any[]
        }
      > = {
        [ProductType.B_END]: {
          name: 'B端产品',
          value: 0,
          children: []
        },
        [ProductType.C_END]: {
          name: 'C端产品',
          value: 0,
          children: []
        }
      }

      // 填充分组数据
      data.forEach((product) => {
        // 添加到对应类型组
        groupedData[product.type].children.push({
          name: product.name,
          value: product.sales,
          // 存储额外信息用于tooltip
          product
        })

        // 累加组销售额
        groupedData[product.type].value += product.sales
      })

      // 转换为树图数据结构
      treeData = [
        {
          name: '产品销售',
          children: Object.values(groupedData)
        }
      ]
    } else {
      // 不分组，直接展示产品
      treeData = [
        {
          name: '产品销售',
          children: data.map((product, index) => {
            // 为B端和C端产品分配不同的颜色范围
            const colors =
              product.type === ProductType.B_END
                ? ['#5470c6', '#7ec2f3', '#3ba272', '#91cc75', '#73c0de']
                : ['#ee6666', '#fac858', '#fc8452', '#9a60b4', '#ff8a9a']

            // 每个产品使用不同颜色
            const color = colors[index % colors.length]

            return {
              name: product.name,
              value: product.sales,
              product,
              // 明确设置颜色
              itemStyle: {
                color: color
              }
            }
          })
        }
      ]
    }

    // 设置矩形树图配置
    const chartOption: any = {
      // 禁用动画
      animation: false,
      // 完全隐藏坐标轴和网格
      grid: {
        show: false,
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: { show: false, splitLine: { show: false } },
      yAxis: { show: false, splitLine: { show: false } },
      // 自定义背景
      backgroundColor: 'transparent',
      tooltip: {
        formatter: (params: any) => {
          // 如果是产品项
          if (params.data.product) {
            const p = params.data.product
            const trendIcon = p.growth >= 0 ? '↑' : '↓'
            const trendClass = p.growth >= 0 ? 'trend-up' : 'trend-down'

            // 构建热门销售店铺列表
            let shopList = ''
            if (p.shopSales && p.shopSales.length > 0) {
              const topShops = p.shopSales.slice(0, 3)
              shopList = `
                <div class="tooltip-shops">
                  <div class="tooltip-subtitle">销售前三店铺:</div>
                  ${topShops
                    .map(
                      (
                        shop: {
                          shopId: number
                          shopName: string
                          sales: number
                        },
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
                <div class="tooltip-title">${p.name}</div>
                <div class="tooltip-type">${p.type}</div>
                <div class="tooltip-sales">¥${p.sales.toLocaleString()}</div>
                <div class="tooltip-trend ${trendClass}">
                  ${Math.abs(p.growth)}% ${trendIcon}
                </div>
                ${shopList}
              </div>
            `
          } else if (params.name === 'B端产品' || params.name === 'C端产品') {
            // 如果是类型组
            return `
              <div class="tooltip-item">
                <div class="tooltip-title">${params.name}</div>
                <div class="tooltip-sales">¥${params.value.toLocaleString()}</div>
                <div class="tooltip-count">产品数量: ${params.data.children.length}</div>
              </div>
            `
          }

          return params.name
        }
      },
      series: [
        {
          name: '产品销售',
          type: 'treemap',
          data: treeData[0].children,
          // 全局设置
          width: '100%',
          height: '100%',
          top: 45,
          left: 0,
          right: 0,
          bottom: 0,
          // 矩形样式
          itemStyle: {
            borderColor: '#0d1e43',
            borderWidth: 2,
            gapWidth: 2,
            // 增加阴影效果
            shadowBlur: 5,
            shadowColor: 'rgba(0, 0, 0, 0.3)'
          },
          // 标签样式
          label: {
            show: true,
            formatter: (params: any) => {
              // 标签内容：产品名称 + 销售额
              if (params.data.product) {
                return `{name|${params.name}}\n{value|¥${(params.value / 10000).toFixed(1)}万}`
              }
              return `{name|${params.name}}\n{value|¥${(params.value / 10000).toFixed(1)}万}`
            },
            rich: {
              name: {
                fontSize: 14,
                color: '#fff'
              },
              value: {
                fontSize: 12,
                color: '#a1b4d4',
                padding: [5, 0, 0, 0]
              }
            }
          },
          // 上层标签样式（类型分组）
          upperLabel: {
            show: showTypeGroup,
            height: 30,
            color: '#fff',
            backgroundColor: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(20, 80, 150, 0.8)' },
                { offset: 1, color: 'rgba(20, 80, 150, 0.5)' }
              ]
            }
          },
          // 视觉映射
          visualMin: 0,
          visualMax: Math.max(...data.map((item) => item.sales)),
          visualDimension: 0,
          levels: [
            {
              itemStyle: {
                borderWidth: 2,
                borderColor: '#0d1e43',
                gapWidth: 2
              }
            },
            {
              color: showTypeGroup
                ? [
                    // B端颜色
                    '#5470c6',
                    '#7ec2f3',
                    '#3ba272',
                    '#91cc75',
                    // C端颜色
                    '#ee6666',
                    '#fac858',
                    '#fc8452',
                    '#9a60b4'
                  ]
                : data.map((item, index) => {
                    // 为B端和C端产品分配不同的颜色范围
                    const colors =
                      item.type === ProductType.B_END
                        ? [
                            '#5470c6',
                            '#7ec2f3',
                            '#3ba272',
                            '#91cc75',
                            '#73c0de'
                          ]
                        : [
                            '#ee6666',
                            '#fac858',
                            '#fc8452',
                            '#9a60b4',
                            '#ff8a9a'
                          ]

                    // 循环使用颜色数组
                    return colors[index % colors.length]
                  }),
              colorMappingBy: 'value',
              itemStyle: {
                gapWidth: 1
              }
            }
          ],
          // 类型分组不同颜色
          breadcrumb: {
            show: false
          },
          // 添加强调效果
          emphasis: {
            focus: 'descendant',
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(0, 60, 220, 0.5)'
            }
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
