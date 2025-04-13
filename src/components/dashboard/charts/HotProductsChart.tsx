import { EChartsOption } from 'echarts'
import ReactECharts from 'echarts-for-react'
import React, { useEffect, useState } from 'react'
import { DashboardCard } from '../cards/DashboardCard'
import { generateHotProductsData } from '../utils/mockData'

interface HotProduct {
  name: string
  type: 'bEnd' | 'cEnd'
  sales: number
  growth: number
}

type ProductType = 'all' | 'bEnd' | 'cEnd'

const HotProductsChart: React.FC = () => {
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
      left: '3%',
      right: '4%',
      bottom: '3%',
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
    <DashboardCard title="热门产品销售排行" colSpan={4} rowSpan={5}>
      <div className="flex justify-end mb-3 space-x-2">
        <button
          className={`px-3 py-1 text-xs rounded-sm transition-colors ${
            type === 'all'
              ? 'bg-blue-500/30 text-blue-400'
              : 'text-slate-300 hover:bg-[#1c3e7a] hover:text-slate-200'
          }`}
          onClick={() => handleTypeChange('all')}
        >
          全部
        </button>
        <button
          className={`px-3 py-1 text-xs rounded-sm transition-colors ${
            type === 'bEnd'
              ? 'bg-blue-500/30 text-blue-400'
              : 'text-slate-300 hover:bg-[#1c3e7a] hover:text-slate-200'
          }`}
          onClick={() => handleTypeChange('bEnd')}
        >
          B端
        </button>
        <button
          className={`px-3 py-1 text-xs rounded-sm transition-colors ${
            type === 'cEnd'
              ? 'bg-blue-500/30 text-blue-400'
              : 'text-slate-300 hover:bg-[#1c3e7a] hover:text-slate-200'
          }`}
          onClick={() => handleTypeChange('cEnd')}
        >
          C端
        </button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center h-[400px] text-slate-400">
          加载中...
        </div>
      ) : (
        <ReactECharts option={option} style={{ height: 320 }} notMerge={true} />
      )}
    </DashboardCard>
  )
}

export default HotProductsChart
