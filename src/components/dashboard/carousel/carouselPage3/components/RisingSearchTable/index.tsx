import { getRisingSearchTerms } from '@/service/api'
import { RisingSearchItem } from '@/service/types'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import UniversalTable, { TableColumn } from '../UniversalTable'
import './index.less'

interface RisingSearchTableProps {
  /**
   * 是否显示加载状态
   */
  loading?: boolean
}

/**
 * 飙升词分析表格组件
 * 展示飙升词的搜索指数、飙升幅度、增长幅度等数据
 */
export default function RisingSearchTable({
  loading: externalLoading = false
}: RisingSearchTableProps) {
  const [tableData, setTableData] = useState<RisingSearchItem[]>([])

  // 获取飙升词分析数据
  const { data, loading } = useRequest(getRisingSearchTerms, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onError: (error) => {
      console.error('获取飙升词分析数据失败:', error)
    }
  })

  // 处理API数据
  useEffect(() => {
    if (data?.data) {
      // 根据实际API返回格式处理数据
      const responseData = data.data
      console.log('RisingSearchTable 接收到的数据:', responseData)

      if (responseData && Array.isArray(responseData.data)) {
        console.log('设置表格数据:', responseData.data)
        // 只显示前5条数据
        setTableData(responseData.data.slice(0, 5))
      } else {
        console.log('数据格式不符合预期:', responseData)
      }
    }
  }, [data])

  // 定义表格列配置
  const columns: TableColumn<RisingSearchItem>[] = [
    {
      title: '店铺名称',
      dataIndex: 'store_name',
      key: 'store_name',
      align: 'center',
      ellipsis: true
    },
    {
      title: '搜索词',
      dataIndex: 'search_term',
      key: 'search_term',
      align: 'center',
      ellipsis: true
    },
    {
      title: '是否品牌原词',
      dataIndex: 'is_brand_original',
      key: 'is_brand_original',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value === 'Y' ? '是' : '否'
      }
    },
    {
      title: '搜索指数',
      dataIndex: 'search_index',
      key: 'search_index',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    },
    {
      title: '搜索指数飙升幅度',
      dataIndex: 'search_index_growth',
      key: 'search_index_growth',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    },
    {
      title: '曝光商品数增长幅度',
      dataIndex: 'product_exposure_growth',
      key: 'product_exposure_growth',
      align: 'center',
      render: (value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }
    }
  ]

  const isLoading = loading || externalLoading

  return (
    <div className="rising-search-table">
      <UniversalTable<RisingSearchItem>
        data={tableData}
        columns={columns}
        loading={isLoading}
        className="rising-search-table-content"
        style={{ height: '100%' }}
        rowKey={(record, index) => `${record.search_term}_${index}`}
      />
    </div>
  )
}
