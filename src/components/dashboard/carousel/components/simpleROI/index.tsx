import { getDepartmentSales } from '@/service/api'
import { useRequest } from 'ahooks'
import { useState } from 'react'
import './index.less'

/**
 * 简单的ROI显示组件
 * 专门用于轮播页面，避免复杂的DepartmentSummary组件样式冲突
 */
export default function SimpleROI() {
  // 本地状态存储当前显示的数据
  const [summaryData, setSummaryData] = useState<{
    total_sales: number
    total_ad_cost: number
    avg_roi: number
  }>({
    total_sales: 0,
    total_ad_cost: 0,
    avg_roi: 0
  })

  // 使用ahooks的useRequest获取数据并轮询
  const { loading } = useRequest(getDepartmentSales, {
    pollingInterval: 10000, // 轮询间隔10秒
    pollingWhenHidden: false, // 页面隐藏时不轮询
    loadingDelay: 300, // 延迟显示loading状态，避免闪烁
    refreshOnWindowFocus: false, // 窗口获取焦点时不自动刷新
    onSuccess: (result) => {
      if (result?.data && result.data.summary) {
        // 直接使用接口返回的汇总数据
        setSummaryData(result.data.summary)
      }
    },
    onError: (error) => {
      console.error('获取部门统计数据失败:', error)
    }
  })

  // 格式化数字显示
  const formatNumber = (num: number) => {
    return num.toLocaleString('zh-CN', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
  }

  return (
    <div className={`simple-roi-container ${loading ? 'loading' : ''}`}>
      <div className="roi-item">
        <div className="roi-label">总销售额</div>
        <div className="roi-value">
          ¥ {formatNumber(summaryData.total_sales)}
        </div>
      </div>
      <div className="roi-item">
        <div className="roi-label">广告成本</div>
        <div className="roi-value">
          ¥ {formatNumber(summaryData.total_ad_cost)}
        </div>
      </div>
      <div className="roi-item">
        <div className="roi-label">平均ROI</div>
        <div className="roi-value">{formatNumber(summaryData.avg_roi)}</div>
      </div>
    </div>
  )
}
