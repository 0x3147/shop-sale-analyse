import { ShopMonthlySalesChart } from './components/ShopMonthlySalesChart'
import './index.less'

/**
 * 数据大屏中部区域组件
 * 只展示店铺月度销售额趋势
 */
export function MidContent() {
  return (
    <div className="mid-content">
      <div className="mid-grid">
        {/* 店铺月销售额趋势 - 占据全部宽度 */}
        <div className="mid-cell monthly-sales-full">
          <ShopMonthlySalesChart />
        </div>
      </div>
    </div>
  )
}
