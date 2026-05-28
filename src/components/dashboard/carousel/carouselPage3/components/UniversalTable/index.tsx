import { Table } from 'antd'
import { ColumnsType } from 'antd/es/table'
import { CSSProperties } from 'react'
import './index.less'

// 通用列配置接口
export interface TableColumn<T = any> {
  title: string
  dataIndex: keyof T
  key: string
  width?: string | number
  render?: (value: any, record: T, index: number) => React.ReactNode
  ellipsis?: boolean
  align?: 'left' | 'right' | 'center'
}

// 通用表格组件属性
interface UniversalTableProps<T = any> {
  /**
   * 表格数据
   */
  data: T[]
  /**
   * 列配置
   */
  columns: TableColumn<T>[]
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
   * 表格行的唯一键字段名
   */
  rowKey?: keyof T | ((record: T, index: number) => string)
  /**
   * 表格大小
   */
  size?: 'large' | 'middle' | 'small'
}

/**
 * 通用表格组件
 * 支持任意数据类型和灵活的列配置
 * 样式与现有表格组件保持一致
 */
export default function UniversalTable<T = any>({
  data,
  columns,
  style,
  className,
  loading = false,
  rowKey,
  size = 'large'
}: UniversalTableProps<T>) {
  // 转换列配置为 Ant Design 格式
  const antColumns: ColumnsType<T> = columns.map((col) => ({
    title: col.title,
    dataIndex: col.dataIndex as string,
    key: col.key,
    width: col.width,
    render:
      col.render ||
      ((value: any) => {
        if (value === null || value === undefined) return '-'
        return value
      }),
    ellipsis: col.ellipsis !== false, // 默认开启省略
    align: col.align || 'left'
  }))

  // 为表格数据添加key
  const tableData = data.map((item, index) => {
    const key =
      typeof rowKey === 'function'
        ? rowKey(item, index)
        : rowKey
          ? item[rowKey as keyof T] || index
          : index

    return {
      ...item,
      key: String(key)
    }
  })

  return (
    <div className={`universal-table ${className || ''}`} style={style}>
      <Table
        columns={antColumns}
        dataSource={tableData}
        loading={loading}
        pagination={false}
        size={size}
        className="dashboard-table"
        scroll={{ y: '100%' }}
      />
    </div>
  )
}
