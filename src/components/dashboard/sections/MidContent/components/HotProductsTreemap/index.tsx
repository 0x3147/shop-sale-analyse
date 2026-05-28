import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { ProductSalesTable } from '@/components/dashboard/charts/ProductSalesTable'
import { getHotProducts } from '@/service/api/index'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import './index.less'

// 产品排名类型切换
type ProductRankType = 'TOP5' | 'NEXT5'

// 产品排名选项
const productRankOptions = [
  { key: 'TOP5', label: 'Top 5' },
  { key: 'NEXT5', label: '6-10名' }
]

/**
 * 热门产品表格组件
 * 展示热门产品的销售数据
 */
export function HotProductsTreemap() {
  // 当前选中的产品排名类型
  const [activeType, setActiveType] = useState<ProductRankType>('TOP5')

  // 控制自动切换
  const [autoSwitch, setAutoSwitch] = useState(true)
  const switchInterval = 30000 // 30秒切换一次

  // 使用API获取热门产品数据（包含Top5和Next5）
  const { data, loading } = useRequest(getHotProducts, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false, // 页面隐藏时不轮询
    loadingDelay: 300, // 延迟显示loading状态，避免闪烁
    refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
    onError: (error) => {
      console.error('获取热门产品数据失败:', error)
    }
  })

  // 从API响应中提取Top5和Next5数据
  const top5Data = data?.data?.top5?.data || []
  const next5Data = data?.data?.next5?.data || []

  // 根据当前类型获取对应数据
  const currentData = activeType === 'TOP5' ? top5Data : next5Data

  // 获取当前数据的标题
  const currentTitle =
    activeType === 'TOP5' ? data?.data?.top5?.title : data?.data?.next5?.title

  // 产品类型切换
  const handleTypeChange = (type: ProductRankType) => {
    setActiveType(type)

    // 手动切换时暂停自动切换
    setAutoSwitch(false)
    // 5秒后恢复自动切换
    setTimeout(() => setAutoSwitch(true), 5000)
  }

  // 自动切换tab
  useEffect(() => {
    if (!autoSwitch) return

    const timer = setInterval(() => {
      // 找到当前类型的索引
      const currentIndex = productRankOptions.findIndex(
        (item) => item.key === activeType
      )
      // 计算下一个类型的索引，循环切换
      const nextIndex = (currentIndex + 1) % productRankOptions.length
      // 设置下一个类型
      setActiveType(productRankOptions[nextIndex].key as ProductRankType)
    }, switchInterval)

    // 清理定时器
    return () => clearInterval(timer)
  }, [activeType, autoSwitch, switchInterval])

  // 获取当前类型信息
  const currentType = productRankOptions.find((item) => item.key === activeType)

  return (
    <DashboardCard
      title={currentTitle || `热门产品销量排行 - ${currentType?.label || ''}`}
      contentHeight="100%"
    >
      <div className="hot-products-content">
        <div className="product-type-tabs">
          {productRankOptions.map((option) => (
            <div
              key={option.key}
              className={`product-type-tab ${activeType === option.key ? 'active' : ''}`}
              onClick={() => handleTypeChange(option.key as ProductRankType)}
            >
              {option.label}
            </div>
          ))}
        </div>
        <div className="table-container" style={{ height: '100%', flex: 1 }}>
          <ProductSalesTable
            data={currentData}
            loading={loading}
            activeType={activeType}
          />
        </div>
      </div>
    </DashboardCard>
  )
}
