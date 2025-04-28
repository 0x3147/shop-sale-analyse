import logoImg from '@/assets/logo.png'
import { DashboardCard } from '../../cards/DashboardCard'
import { CurrentTime } from '../../layout/CurrentTime'
import { DepartmentSummary } from './components/DepartmentSummary'
import { ShopDailySales } from './components/ShopDailySales'
import './index.less'

// 固定展示的国家列表
const FIXED_COUNTRIES = [
  '中国',
  '美国',
  '俄罗斯',
  '乌克兰',
  '墨西哥',
  '巴西',
  '意大利',
  '秘鲁'
]

/**
 * 顶部统计区域组件
 * 展示各店铺日销售额数据、logo、部门统计数据和时间组件
 */
export function TopStats() {
  return (
    <div className="top-stats">
      <div className="stats-grid">
        {/* 左侧：店铺日销售额 */}
        <div className="stats-cell daily-sales">
          <ShopDailySales />
        </div>

        {/* 中间：Logo和部门统计数据 */}
        <div className="stats-cell center-content">
          {/* Logo区域 */}
          <div className="logo-container">
            <img src={logoImg} alt="京科社技" className="logo-image" />
          </div>

          {/* 部门统计数据（简化版） */}
          <div className="department-summary-container">
            <DepartmentSummary simplified={true} />
          </div>
        </div>

        {/* 右侧：时间显示 - 使用DashboardCard包裹 */}
        <div className="stats-cell time-display">
          <DashboardCard title="热门国家时间" contentHeight="100%">
            <div className="time-display-container">
              {/* 固定展示指定国家时间 */}
              <CurrentTime fixedCountries={FIXED_COUNTRIES} />
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}
