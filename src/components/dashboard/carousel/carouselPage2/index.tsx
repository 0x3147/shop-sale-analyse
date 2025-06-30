import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import CompactLayout from './components/CompactLayout'
import LeftContent from './components/LeftContent'
import RightContent from './components/RightContent'
import WorldHotCountriesMap from './components/WorldHotCountriesMap'

/**
 * 第二个轮播页面组件
 * 显示左侧内容、中间世界地图、右侧内容的完整布局
 */
export default function CarouselPage2() {
  return (
    <CompactLayout>
      <div
        style={{
          height: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr 2fr 1fr',
          gap: '15px'
        }}
      >
        {/* 左侧内容 */}
        <div style={{ height: '100%' }}>
          <LeftContent />
        </div>

        {/* 中间区域 - 世界热门国家地图 */}
        <div style={{ height: '100%' }}>
          <DashboardCard title="全球热门商品国家分布" contentHeight="100%">
            <WorldHotCountriesMap />
          </DashboardCard>
        </div>

        {/* 右侧内容 */}
        <div style={{ height: '100%' }}>
          <RightContent />
        </div>
      </div>
    </CompactLayout>
  )
}
