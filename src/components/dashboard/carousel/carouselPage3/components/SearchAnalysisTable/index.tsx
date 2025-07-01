import { getSearchAnalysis } from '@/service/api'
import { SearchAnalysisItem, SearchAnalysisResponse } from '@/service/types'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import UniversalTable, { TableColumn } from '../UniversalTable'
import './index.less'

interface SearchAnalysisTableProps {
  /**
   * 是否显示加载状态
   */
  loading?: boolean
}

/**
 * 热搜词分析表格组件
 * 展示热搜词的搜索人气、点击率、转化率等数据
 */
export default function SearchAnalysisTable({
  loading: externalLoading = false
}: SearchAnalysisTableProps) {
  const [tableData, setTableData] = useState<SearchAnalysisItem[]>([])

  // 获取热搜词分析数据
  const { data, loading } = useRequest(getSearchAnalysis, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onError: (error) => {
      console.error('获取热搜词分析数据失败:', error)
    }
  })

  // 处理API数据
  useEffect(() => {
    if (data?.data) {
      const responseData = data.data as SearchAnalysisResponse
      // 只显示前5条数据
      setTableData((responseData.data || []).slice(0, 5))
    }
  }, [data])

  // 定义表格列配置
  const columns: TableColumn<SearchAnalysisItem>[] = [
    {
      title: '搜索词',
      dataIndex: 'search_term',
      key: 'search_term',
      align: 'center',
      ellipsis: true
    },
    {
      title: '搜索人气',
      dataIndex: 'search_popularity',
      key: 'search_popularity',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return typeof value === 'number' ? value.toLocaleString() : value
      }
    },
    {
      title: '搜索指数',
      dataIndex: 'search_index',
      key: 'search_index',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return typeof value === 'number' ? value.toLocaleString() : value
      }
    },
    {
      title: '点击率',
      dataIndex: 'click_rate',
      key: 'click_rate',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    },
    {
      title: '支付转化率',
      dataIndex: 'payment_conversion_rate',
      key: 'payment_conversion_rate',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    },
    {
      title: '竞争指数',
      dataIndex: 'competition_index',
      key: 'competition_index',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return typeof value === 'number' ? value.toLocaleString() : value
      }
    },
    {
      title: 'Top3热搜国',
      dataIndex: 'top3_hot_countries',
      key: 'top3_hot_countries',
      align: 'center',
      ellipsis: true,
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return Array.isArray(value) ? value.join(', ') : value
      }
    }
  ]

  const isLoading = loading || externalLoading

  return (
    <div className="search-analysis-table">
      <UniversalTable<SearchAnalysisItem>
        data={tableData}
        columns={columns}
        loading={isLoading}
        className="search-analysis-table-content"
        style={{ height: '100%' }}
        rowKey={(record, index) => `${record.search_term}_${index}`}
      />
    </div>
  )
}
