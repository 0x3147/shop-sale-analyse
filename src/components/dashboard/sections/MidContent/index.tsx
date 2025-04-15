import { HotProductsTreemap } from './components/HotProductsTreemap'
import { ShopMonthlySalesChart } from './components/ShopMonthlySalesChart'
import './index.less'

/**
 * 数据大屏中部区域组件
 * 展示店铺月度销售额趋势和热门产品销售
 */
export function MidContent() {
  return (
    <div className="mid-content">
      <div className="mid-grid">
        {/* 店铺月销售额趋势 */}
        <div className="mid-cell monthly-sales">
          <ShopMonthlySalesChart />
        </div>

        {/* 热门产品销售 */}
        <div className="mid-cell hot-products">
          <HotProductsTreemap />
        </div>
      </div>
    </div>
  )
}
