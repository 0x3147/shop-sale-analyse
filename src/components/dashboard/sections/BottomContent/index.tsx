import { ConversionTrend } from './components/ConversionTrend'
import { RegionDistribution } from './components/RegionDistribution'
import './index.less'

/**
 * 数据大屏底部区域组件
 * 包含转化率趋势和地域分布
 */
export function BottomContent() {
  return (
    <div className="bottom-content">
      <ConversionTrend />
      <RegionDistribution />
    </div>
  )
}
