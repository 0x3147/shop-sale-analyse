import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import GMVAnalysisTable from '../GMVAnalysisTable'
import './index.less'

/**
 * 第二个页面左侧内容组件
 * 上半部分：低GMV表格（低增速/高增速切换）
 * 下半部分：高GMV表格（低增速/高增速切换）
 */
export default function LeftContent() {
  return (
    <div className="carousel-page2-left-content">
      {/* 上半部分 - 低GMV分析表格 */}
      <div className="low-gmv-section">
        <DashboardCard title="低GMV增速分析" contentHeight="100%">
          <GMVAnalysisTable type="low" switchInterval={15000} />
        </DashboardCard>
      </div>

      {/* 下半部分 - 高GMV分析表格 */}
      <div className="high-gmv-section">
        <DashboardCard title="高GMV增速分析" contentHeight="100%">
          <GMVAnalysisTable type="high" switchInterval={15000} />
        </DashboardCard>
      </div>
    </div>
  )
}
