import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import { useEffect, useState } from 'react'
import { DashboardCard } from '../../../../cards/DashboardCard'
import { generateHotProductsData } from '../../../../utils/mockData'
import './index.less'

interface HotProduct {
  name: string
  type: 'bEnd' | 'cEnd'
  sales: number
  growth: number
}

type ProductType = 'all' | 'bEnd' | 'cEnd'

/**
 * 热门产品图表组件
 * 展示热门产品销售排行和增长数据
 */
export function HotProducts() {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<HotProduct[]>([])
  const [type, setType] = useState<ProductType>('all')

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        // 在实际应用中，这里会从API获取数据
        const hotProducts = generateHotProductsData(10) as HotProduct[]
        setData(hotProducts)
      } catch (error) {
        console.error('获取热门产品数据失败:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleTypeChange = (newType: ProductType) => {
    setType(newType)
  }

  const filteredData = data
    .filter((item) => {
      if (type === 'all') return true
      return item.type === type
    })
    .slice(0, 6) // 只展示前6个产品

  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return (num / 10000).toFixed(2) + '万'
    }
    return num.toString()
  }

  const option: EChartsOption = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      },
      formatter: (params: any) => {
        const dataIndex = params[0].dataIndex
        const item = filteredData[dataIndex]

        return `
          <div style="padding: 8px">
            <div style="font-weight: bold; margin-bottom: 5px">${item.name}</div>
            <div>销售额: ${formatNumber(item.sales)}元</div>
            <div>增长率: ${item.growth > 0 ? '+' : ''}${item.growth}%</div>
          </div>
        `
      }
    },
    grid: {
      left: '5%',
      right: '15%',
      bottom: '5%',
      top: '5%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed'
        }
      }
    },
    yAxis: {
      type: 'category',
      data: filteredData.map((item) => item.name),
      axisLabel: {
        width: 100,
        overflow: 'truncate',
        interval: 0
      }
    },
    series: [
      {
        name: '销售额',
        type: 'bar',
        data: filteredData.map((item) => item.sales),
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            return formatNumber(params.value)
          }
        },
        itemStyle: {
          color: '#3498db'
        }
      },
      {
        name: '增长率指示器',
        type: 'bar',
        z: 1,
        data: filteredData.map((item) => ({
          value: 5000, // 固定值，让所有增长率指示器条形图长度相同
          itemStyle: {
            color: item.growth >= 0 ? '#4CAF50' : '#FF5252'
          }
        })),
        barGap: '-100%', // 让两个条形图重叠
        barWidth: 8, // 设置为较窄的条形图
        yAxisIndex: 0,
        label: {
          show: true,
          position: 'right',
          formatter: (params: any) => {
            const index = params.dataIndex
            const growth = filteredData[index].growth
            return growth >= 0 ? `+${growth}%` : `${growth}%`
          }
        },
        silent: true // 禁用鼠标事件
      }
    ]
  }

  return (
    <DashboardCard title="热门产品销售排行" contentHeight="600px">
      <div className="hot-products-chart">
        <div className="filter-buttons">
          <button
            className={`filter-button ${type === 'all' ? 'active' : ''}`}
            onClick={() => handleTypeChange('all')}
          >
            全部
          </button>
          <button
            className={`filter-button ${type === 'bEnd' ? 'active' : ''}`}
            onClick={() => handleTypeChange('bEnd')}
          >
            B端
          </button>
          <button
            className={`filter-button ${type === 'cEnd' ? 'active' : ''}`}
            onClick={() => handleTypeChange('cEnd')}
          >
            C端
          </button>
        </div>
        {loading ? (
          <div className="loading-state">加载中...</div>
        ) : (
          <ReactECharts
            option={option}
            style={{ height: '100%', width: '100%' }}
            notMerge={true}
            opts={{ renderer: 'canvas', devicePixelRatio: 2 }}
          />
        )}
      </div>
    </DashboardCard>
  )
}
