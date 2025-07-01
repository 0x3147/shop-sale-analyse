import { getIndustryRanking } from '@/service/api'
import { IndustryRankingItem } from '@/service/types'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import UniversalTable, { TableColumn } from '../UniversalTable'
import './index.less'


// 定义实际API返回的数据结构
interface ApiRankingTypes {
  [key: string]: IndustryRankingItem[]
}

interface IndustryRankingTableProps {
  /**
   * 是否显示加载状态
   */
  loading?: boolean
}

/**
 * 行业排行榜表格组件
 * 展示不同排行榜类型的商品数据，支持自动切换
 */
export default function IndustryRankingTable({
  loading: externalLoading = false
}: IndustryRankingTableProps) {
  const [tableData, setTableData] = useState<IndustryRankingItem[]>([])
  const [currentRankingType, setCurrentRankingType] = useState<string>('人气榜')
  const [availableTypes, setAvailableTypes] = useState<string[]>([])
  const [rankingData, setRankingData] = useState<ApiRankingTypes>({})

  // 获取行业排行榜数据
  const { data, loading } = useRequest(getIndustryRanking, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onError: (error) => {
      console.error('获取行业排行榜数据失败:', error)
    }
  })

  // 处理API数据
  useEffect(() => {
    if (data?.data) {
      const responseData = data.data
      console.log('IndustryRankingTable 接收到的数据:', responseData)

      if (responseData && (responseData as any).ranking_types) {
        const rankingTypes = (responseData as any)
          .ranking_types as ApiRankingTypes
        setRankingData(rankingTypes)

        const typeKeys = Object.keys(rankingTypes)
        setAvailableTypes(typeKeys)

        // 设置初始显示的排行榜类型
        if (typeKeys.length > 0) {
          const firstType = typeKeys[0]
          setCurrentRankingType(firstType)
          // 只显示前5条数据
          setTableData((rankingTypes[firstType] || []).slice(0, 5))
        }
      } else {
        console.log('行业排行榜数据格式不符合预期:', responseData)
      }
    }
  }, [data])

  // 自动切换排行榜类型 - 每10秒切换一次
  useEffect(() => {
    if (availableTypes.length === 0) return

    const timer = setInterval(() => {
      setCurrentRankingType((prevType) => {
        const currentIndex = availableTypes.indexOf(prevType)
        const nextIndex = (currentIndex + 1) % availableTypes.length
        const nextType = availableTypes[nextIndex]

        // 更新表格数据，只显示前5条
        setTableData((rankingData[nextType] || []).slice(0, 5))

        return nextType
      })
    }, 10000) // 每10秒切换一次

    return () => clearInterval(timer)
  }, [availableTypes, rankingData])

  // 定义表格列配置
  const columns: TableColumn<IndustryRankingItem>[] = [
    {
      title: '店铺名称',
      dataIndex: 'store_name',
      key: 'store_name',
      align: 'center',
      ellipsis: true
    },
    {
      title: '产品名称',
      dataIndex: 'product_name',
      key: 'product_name',
      align: 'center',
      ellipsis: true
    },
    {
      title: '市场规模',
      dataIndex: 'market_size',
      key: 'market_size',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    },
    {
      title: '市场增速',
      dataIndex: 'market_growth_rate',
      key: 'market_growth_rate',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    },
    {
      title: '市场供需',
      dataIndex: 'market_supply_demand',
      key: 'market_supply_demand',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    },
    {
      title: '市场转化',
      dataIndex: 'market_conversion',
      key: 'market_conversion',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    }
  ]

  const isLoading = loading || externalLoading

  return (
    <div className="industry-ranking-table">
      {/* 当前排行榜类型指示器 */}
      <div className="ranking-type-indicator">
        <span className="ranking-type-title">
          {currentRankingType || '行业排行榜'}
        </span>
      </div>

      {/* 表格内容 */}
      <div className="table-content">
        <UniversalTable<IndustryRankingItem>
          data={tableData}
          columns={columns}
          loading={isLoading}
          className="industry-ranking-table-content"
          style={{ height: '100%' }}
          rowKey={(record, index) => `${record.id}_${index}`}
        />
      </div>
    </div>
  )
}
