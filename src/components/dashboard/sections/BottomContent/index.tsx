import { ConversionTrend } from './components/ConversionTrend'
import { RegionDistribution } from './components/RegionDistribution'
import './index.less'

/**
 * 数据大屏底部区域组件
 * 包含转化率趋势和地域分布（左侧），右侧为热门产品扩展区域
 */
export function BottomContent() {
  return (
    <div className="bottom-content">
      {/* 左侧：两个图表垂直排列 */}
      <div className="left-charts">
        <div className="chart-item">
          <ConversionTrend />
        </div>
        <div className="chart-item">
          <RegionDistribution />
        </div>
      </div>

      {/* 右侧：为热门产品预留空间 */}
      <div className="right-extension">
        {/* 这个区域将被热门产品组件占用 */}
      </div>
    </div>
  )
}
