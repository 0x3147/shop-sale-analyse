import { ShopMonthlySalesChart } from './components/ShopMonthlySalesChart'
import './index.less'

/**
 * 数据大屏中部区域组件
 * 展示店铺月度销售额趋势
 */
export function MidContent() {
  return (
    <div className="mid-content">
      <ShopMonthlySalesChart />
    </div>
  )
}
