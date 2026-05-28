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
  /**
   * 自定义列宽配置（用于不同场景的宽度需求）
   */
  columnWidths?: {
    productName?: string
    category?: string
    payment?: string
    visitors?: string
    exposure?: string
  }
  /**
   * 自定义列标题配置（用于不同场景的列名需求）
   */
  columnTitles?: {
    productName?: string
    category?: string
    payment?: string
    visitors?: string
    exposure?: string
  }
  /**
   * 隐藏的列（完全不显示这些列）
   */
  hiddenColumns?: (
    | 'productName'
    | 'category'
    | 'payment'
    | 'visitors'
    | 'exposure'
  )[]
}

/**
 * 产品销售表格组件
 * 用于展示热门产品的销售情况
 */
export function ProductSalesTable({
  data,
  style,
  className,
  loading = false,
  columnWidths,
  columnTitles,
  hiddenColumns = []
}: ProductSalesTableProps) {
  // 默认配置
  const defaultWidths = {
    productName: '45%',
    category: '18%',
    payment: '12%',
    visitors: '13%',
    exposure: '12%'
  }

  const defaultTitles = {
    productName: '商品名称',
    category: '商品类目',
    payment: '支付金额',
    visitors: '商品访客数',
    exposure: '搜索曝光量'
  }

  const widths = columnWidths
    ? { ...defaultWidths, ...columnWidths }
    : defaultWidths

  const titles = columnTitles
    ? { ...defaultTitles, ...columnTitles }
    : defaultTitles

  // 定义所有可能的列
  const allColumns = [
    {
      key: 'productName',
      column: {
        title: titles.productName,
        dataIndex: 'product_name',
        key: 'product_name',
        width: widths.productName,
        ellipsis: false
      }
    },
    {
      key: 'category',
      column: {
        title: titles.category,
        dataIndex: 'product_category',
        key: 'product_category',
        width: widths.category,
        ellipsis: true,
        render: (value: any) => value || '-'
      }
    },
    {
      key: 'payment',
      column: {
        title: titles.payment,
        dataIndex: 'payment_amount',
        key: 'payment_amount',
        width: widths.payment,
        render: (value: any) => {
          if (value === null || value === undefined) return '-'
          // 如果值是字符串类型，直接显示（如百分比字符串）
          if (typeof value === 'string') {
            return value
          }
          // 如果列标题包含"占比"，则显示为百分比格式
          if (titles.payment.includes('占比')) {
            return `${value.toFixed(2)}%`
          }
          return `¥${value.toLocaleString()}`
        }
      }
    },
    {
      key: 'visitors',
      column: {
        title: titles.visitors,
        dataIndex: 'product_visitors',
        key: 'product_visitors',
        width: widths.visitors,
        render: (value: any) => {
          if (value === null || value === undefined) return '-'
          return value.toLocaleString()
        }
      }
    },
    {
      key: 'exposure',
      column: {
        title: titles.exposure,
        dataIndex: 'search_exposure',
        key: 'search_exposure',
        width: widths.exposure,
        render: (value: any) => {
          if (value === null || value === undefined) return '-'
          return value.toLocaleString()
        }
      }
    }
  ]

  // 根据hiddenColumns过滤列
  const columns: ColumnsType<ProductSummary> = allColumns
    .filter(({ key }) => !hiddenColumns.includes(key as any))
    .map(({ column }) => column)

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
