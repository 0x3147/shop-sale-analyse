import { ProductSummary } from '@/service/types'
import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { CSSProperties } from 'react'
import './ProductSalesTable.less'

interface ProductSalesTableProps {
  /**
   * 产品销售数据
   */
  data: ProductSummary[]
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
   * 当前激活的产品排名类型
   */
  activeType?: 'TOP5' | 'NEXT5'
}

/**
 * 产品销售表格组件
 * 用于展示热门产品的销售情况
 */
export function ProductSalesTable({
  data,
  style,
  className,
  loading = false
}: ProductSalesTableProps) {
  // 统一的表格列配置（B端和C端相同）
  const columns: ColumnsType<ProductSummary> = [
    {
      title: '商品名称',
      dataIndex: 'product_name',
      key: 'product_name',
      width: '40%',
      ellipsis: true
    },
    {
      title: '商品类目',
      dataIndex: 'product_category',
      key: 'product_category',
      width: '20%',
      ellipsis: true,
      render: (value) => value || '-'
    },
    {
      title: '支付金额',
      dataIndex: 'payment_amount',
      key: 'payment_amount',
      width: '13%',
      render: (value) => {
        if (value === null || value === undefined) return '-'
        return `¥${value.toLocaleString()}`
      }
    },
    {
      title: '商品访客数',
      dataIndex: 'product_visitors',
      key: 'product_visitors',
      width: '14%',
      render: (value) => {
        if (value === null || value === undefined) return '-'
        return value.toLocaleString()
      }
    },
    {
      title: '搜索曝光量',
      dataIndex: 'search_exposure',
      key: 'search_exposure',
      width: '13%',
      render: (value) => {
        if (value === null || value === undefined) return '-'
        return value.toLocaleString()
      }
    }
  ]

  // 为表格数据添加key
  const tableData = data.map((item, index) => ({
    ...item,
    key: `${item.product_name}_${index}`
  }))

  return (
    <div className={`product-sales-table ${className || ''}`} style={style}>
      <Table
        columns={columns}
        dataSource={tableData}
        loading={loading}
        pagination={false}
        size="large"
        className="dashboard-table"
      />
    </div>
  )
}
