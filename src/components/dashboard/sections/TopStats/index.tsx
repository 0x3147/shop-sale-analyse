import { ShopDailySales } from './components/ShopDailySales'
import './index.less'

/**
 * 顶部统计区域组件
 * 展示各店铺日销售额数据
 */
export function TopStats() {
  return (
    <div className="top-stats">
      <ShopDailySales />
    </div>
  )
}
