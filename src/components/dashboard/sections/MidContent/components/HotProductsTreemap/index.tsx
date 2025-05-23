import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { ProductSalesBar } from '@/components/dashboard/charts/ProductSalesBar'
import { getHotProducts } from '@/service/api/index'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import './index.less'

// 产品类型切换
type ProductType = 'B_END' | 'C_END'

// 产品类型选项
const productTypeOptions = [
  { key: 'B_END', label: 'B端销售' },
  { key: 'C_END', label: 'C端销售' }
]

/**
 * 热门产品柱状图组件
 * 展示热门产品的销售额数据
 */
export function HotProductsTreemap() {
  // 当前选中的产品类型
  const [activeType, setActiveType] = useState<ProductType>('B_END')

  // 控制自动切换
  const [autoSwitch, setAutoSwitch] = useState(true)
  const switchInterval = 30000 // 30秒切换一次

  // 使用API获取热门产品数据
  const { data, loading } = useRequest(getHotProducts, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false, // 页面隐藏时不轮询
    loadingDelay: 300, // 延迟显示loading状态，避免闪烁
    refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
    onError: (error) => {
      console.error('获取热门产品数据失败:', error)
    }
  })

  // 从API获取的产品数据
  const productData = data?.data || []

  // 产品类型切换
  const handleTypeChange = (type: ProductType) => {
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
      const currentIndex = productTypeOptions.findIndex(
        (item) => item.key === activeType
      )
      // 计算下一个类型的索引，循环切换
      const nextIndex = (currentIndex + 1) % productTypeOptions.length
      // 设置下一个类型
      setActiveType(productTypeOptions[nextIndex].key as ProductType)
    }, switchInterval)

    // 清理定时器
    return () => clearInterval(timer)
  }, [activeType, autoSwitch, switchInterval])

  // 获取当前类型信息
  const currentType = productTypeOptions.find((item) => item.key === activeType)

  return (
    <DashboardCard
      title={`热门产品销量排行 - ${currentType?.label || ''}`}
      contentHeight="100%"
    >
      <div className="hot-products-content">
        <div className="product-type-tabs">
          {productTypeOptions.map((option) => (
            <div
              key={option.key}
              className={`product-type-tab ${activeType === option.key ? 'active' : ''}`}
              onClick={() => handleTypeChange(option.key as ProductType)}
            >
              {option.label}
            </div>
          ))}
        </div>
        <div className="chart-container" style={{ height: '100%' }}>
          <ProductSalesBar
            data={productData}
            loading={loading}
            notMerge={true}
            activeType={activeType}
          />
        </div>
      </div>
    </DashboardCard>
  )
}
