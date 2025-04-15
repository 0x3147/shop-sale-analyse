import { useEffect, useState } from 'react'
import { DashboardCard } from '../../../../cards/DashboardCard'
import { ProductSalesTreemap } from '../../../../charts/ProductSalesTreemap'
import {
  generateHotProductsData,
  ProductType
} from '../../../../utils/mockData'
import './index.less'

/**
 * 热门产品树图组件
 * 展示各类产品的销售额数据
 */
export function HotProductsTreemap() {
  // 产品销售数据
  const [productData, setProductData] = useState(generateHotProductsData())
  // 当前选中的产品类型
  const [activeType, setActiveType] = useState<ProductType>(ProductType.B_END)

  // 模拟数据定期更新
  useEffect(() => {
    // 每30秒更新一次数据
    const timer = setInterval(() => {
      setProductData(generateHotProductsData())
    }, 30000)

    return () => clearInterval(timer)
  }, [])

  // 根据选中的类型过滤数据
  const filteredData = productData.filter(
    (product) => product.type === activeType
  )

  return (
    <DashboardCard
      title={`热门${activeType}销售`}
      contentHeight="calc(100% - 40px)"
    >
      <div className="hot-products-content">
        <div className="product-type-tabs">
          <div
            className={`tab-item ${activeType === ProductType.B_END ? 'active' : ''}`}
            onClick={() => setActiveType(ProductType.B_END)}
          >
            B端产品
          </div>
          <div
            className={`tab-item ${activeType === ProductType.C_END ? 'active' : ''}`}
            onClick={() => setActiveType(ProductType.C_END)}
          >
            C端产品
          </div>
        </div>

        <div className="treemap-container">
          <ProductSalesTreemap
            key={`product-treemap-${activeType}`}
            data={filteredData}
            showTypeGroup={false}
            notMerge={true}
          />
        </div>
      </div>
    </DashboardCard>
  )
}
