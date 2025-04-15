import { ShopDailySales } from './components/ShopDailySales'
import './index.less'

/**
 * 顶部统计区域组件
 * 展示各店铺日销售额数据
 */
export function TopStats() {
  return (
    <div className="top-stats">
      <div className="stats-grid">
        {/* 店铺日销售额 */}
        <div className="stats-cell daily-sales">
          <ShopDailySales />
        </div>

        {/* 未来可以添加更多卡片 */}
      </div>
    </div>
  )
}
