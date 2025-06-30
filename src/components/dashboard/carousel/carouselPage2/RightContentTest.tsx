import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import CompactLayout from './components/CompactLayout'
import LeftContent from './components/LeftContent'
import RightContent from './components/RightContent'
import WorldHotCountriesMap from './components/WorldHotCountriesMap'

/**
 * 第二个页面内容测试组件
 * 用于测试和预览完整的第二个页面效果
 */
export default function RightContentTest() {
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
