import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { CurrentTime } from '@/components/dashboard/layout/CurrentTime'
import CountryHotProducts from '../CountryHotProducts'
import './index.less'

export default function RightContent() {
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
  return (
    <div className="carousel-page2-right-content">
      <div className="time-section">
        <DashboardCard title="全球热门国家时间" contentHeight="100%">
          <CurrentTime fixedCountries={FIXED_COUNTRIES} />
        </DashboardCard>
      </div>

      <div className="products-section">
        <DashboardCard title="各国热销商品排行" contentHeight="100%">
          <CountryHotProducts switchInterval={10000} />
        </DashboardCard>
      </div>
    </div>
  )
}
