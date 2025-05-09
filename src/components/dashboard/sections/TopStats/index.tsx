import logoImg from '@/assets/logo.png'
import { formatInTimeZone } from 'date-fns-tz'
import { useEffect, useState } from 'react'
import { DashboardCard } from '../../cards/DashboardCard'
import { CurrentTime } from '../../layout/CurrentTime'
import { DepartmentSummary } from './components/DepartmentSummary'
import { ShopDailySales } from './components/ShopDailySales'
import './index.less'

/**
 * 顶部统计区域组件
 * 展示各店铺日销售额数据、logo、部门统计数据和时间组件
 */
export function TopStats() {
  const [time, setTime] = useState(new Date())

  // 每秒更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 格式化北京时间
  const beijingTime = formatInTimeZone(time, 'Asia/Shanghai', 'HH:mm:ss')
  const beijingDate = formatInTimeZone(time, 'Asia/Shanghai', 'yyyy-MM-dd')

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
              {/* 北京时间 */}
              <div className="beijing-time-section">
                <div className="city-label">北京时间</div>
                <div className="time-display">{beijingTime}</div>
                <div className="date-display">{beijingDate}</div>
              </div>

              {/* 其他国家时间 - 使用下拉选择方式 */}
              <div className="foreign-time-section">
                <div className="city-selector">
                  <CurrentTime excludeBeijing={true} maxDisplay={1} />
                </div>
              </div>
            </div>
          </DashboardCard>
        </div>
      </div>
    </div>
  )
}
