import { DashboardCard } from '../../cards/DashboardCard'
import CompactLayout from '../carouselPage2/components/CompactLayout'
import IndustryRankingTable from './components/IndustryRankingTable'
import RisingSearchTable from './components/RisingSearchTable'
import SearchAnalysisTable from './components/SearchAnalysisTable'
import './index.less'

export default function CarouselPage3() {
  return (
    <CompactLayout>
      <div className="carousel-page3-container">
        {/* 第一个表格 - 热搜词分析 */}
        <div className="table-section">
          <DashboardCard title="热搜词分析" contentHeight="100%">
            <SearchAnalysisTable />
          </DashboardCard>
        </div>

        {/* 第二个表格 - 飙升词分析 */}
        <div className="table-section">
          <DashboardCard title="飙升词分析" contentHeight="100%">
            <RisingSearchTable />
          </DashboardCard>
        </div>

        {/* 第三个表格 - 行业排行榜 */}
        <div className="table-section">
          <DashboardCard title="行业排行榜" contentHeight="100%">
            <IndustryRankingTable />
          </DashboardCard>
        </div>
      </div>
    </CompactLayout>
  )
}
