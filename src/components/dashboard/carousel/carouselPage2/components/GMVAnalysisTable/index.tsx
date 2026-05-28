import { ProductSalesTable } from '@/components/dashboard/charts/ProductSalesTable'
import { getCountryAnalysis } from '@/service/api'
import {
  CountryAnalysisItem,
  CountryAnalysisResponse,
  ProductSummary
} from '@/service/types'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import './index.less'

interface GMVAnalysisTableProps {
  /**
   * 表格类型：'low' 为低GMV表格，'high' 为高GMV表格
   */
  type: 'low' | 'high'
  /**
   * 表格标题
   */
  title?: string
  /**
   * 切换间隔时间（毫秒）
   */
  switchInterval?: number
}

/**
 * GMV分析表格组件
 * 根据type参数自动在对应的两种增速类型间切换
 */
export default function GMVAnalysisTable({
  type,
  switchInterval = 15000
}: GMVAnalysisTableProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [tableData, setTableData] = useState<{
    types: string[]
    currentData: ProductSummary[]
    currentTitle: string
  }>({
    types: [],
    currentData: [],
    currentTitle: ''
  })

  // 获取国家分析数据
  const { data, loading } = useRequest(getCountryAnalysis, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onError: (error) => {
      console.error('获取国家分析数据失败:', error)
    }
  })

  // 处理API数据
  useEffect(() => {
    if (data?.data) {
      const responseData = data.data as CountryAnalysisResponse
      const typeGroups = responseData.type_groups

      // 根据type参数筛选对应的分组类型
      let availableTypes: string[] = []
      if (type === 'low') {
        // 低GMV表格：低GMV低增速 和 低GMV高增速
        availableTypes = Object.keys(typeGroups).filter((key) =>
          key.includes('低GMV')
        )
      } else {
        // 高GMV表格：高GMV低增速 和 高GMV高增速
        availableTypes = Object.keys(typeGroups).filter((key) =>
          key.includes('高GMV')
        )
      }

      if (availableTypes.length > 0) {
        setTableData((prev) => ({
          ...prev,
          types: availableTypes
        }))
      }
    }
  }, [data, type])

  // 自动切换类型
  useEffect(() => {
    if (tableData.types.length === 0) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % tableData.types.length)
    }, switchInterval)

    return () => clearInterval(timer)
  }, [tableData.types.length, switchInterval])

  // 更新当前显示的数据
  useEffect(() => {
    if (data?.data && tableData.types.length > 0) {
      const responseData = data.data as CountryAnalysisResponse
      const currentType = tableData.types[currentIndex]
      const currentTypeData = responseData.type_groups[currentType]

      if (currentTypeData) {
        // 只取前8条数据，并转换为ProductSummary格式
        const top8Data = currentTypeData.slice(0, 8).map(
          (item: CountryAnalysisItem): ProductSummary => ({
            product_name: item.store_name, // 店铺名称对应商品名称
            product_category: item.country_region, // 国家地区对应商品类目
            payment_amount: item.payment_amount_ratio, // 支付金额占比直接展示原始值
            product_visitors: parseInt(item.growth_index.replace(',', '')), // 上升指数对应访客数
            search_exposure: parseInt(item.logistics_days) // 物流天数对应搜索曝光量
          })
        )

        setTableData((prev) => ({
          ...prev,
          currentData: top8Data,
          currentTitle: currentType
        }))
      }
    }
  }, [data, currentIndex, tableData.types])

  // GMV表格的自定义配置
  const gmvColumnWidths = {
    category: '25%', // 国家地区列宽度
    payment: '25%', // 支付金额占比列宽度
    visitors: '25%', // 上升指数列宽度
    exposure: '25%' // 物流天数列宽度
  }

  const gmvColumnTitles = {
    category: '国家&地区', // GMV表格显示国家地区
    payment: '支付金额占比', // GMV表格显示支付金额占比
    visitors: '上升指数', // GMV表格显示上升指数
    exposure: '物流天数' // GMV表格显示物流天数
  }

  // 隐藏店铺名称列
  const hiddenColumns: (
    | 'productName'
    | 'category'
    | 'payment'
    | 'visitors'
    | 'exposure'
  )[] = ['productName']

  return (
    <div className="gmv-analysis-table">
      {/* 当前数据类型标识 */}
      <div className="data-type-indicator">
        <span className="type-title">
          {tableData.currentTitle || '数据加载中...'}
        </span>
      </div>

      {/* 表格内容 - 使用ProductSalesTable确保样式一致，但使用自定义列宽和列标题 */}
      <div className="table-content">
        <ProductSalesTable
          data={tableData.currentData}
          loading={loading}
          className="gmv-table"
          style={{ height: '100%' }}
          columnWidths={gmvColumnWidths}
          columnTitles={gmvColumnTitles}
          hiddenColumns={hiddenColumns}
        />
      </div>
    </div>
  )
}
