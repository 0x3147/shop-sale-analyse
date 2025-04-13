import { HotProducts } from './components/HotProducts'
import { MonthlySales } from './components/MonthlySales'
import './index.less'

/**
 * 数据大屏中部区域组件
 * 包含月度销售趋势和热门产品销售排行
 */
export function MidContent() {
  return (
    <div className="mid-content">
      <MonthlySales />
      <HotProducts />
    </div>
  )
}
