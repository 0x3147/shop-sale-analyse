import { DashboardCard } from '@/components/dashboard/cards/DashboardCard'
import { getDepartmentSales } from '@/service/api'
import { useRequest } from 'ahooks'
import { useRef, useState } from 'react'
import './index.less'

/**
 * 部门统计数据组件
 * 展示部门销售额、广告成本和ROI数据
 */
export interface DepartmentSummaryProps {
  /**
   * 是否使用简化模式，不显示效率分析部分
   */
  simplified?: boolean
}

export function DepartmentSummary({
  simplified = false
}: DepartmentSummaryProps) {
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

  // 存储历史数据用于计算趋势
  const [dataHistory, setDataHistory] = useState<Array<typeof summaryData>>([])
  // 最大历史记录数
  const MAX_HISTORY = 5
  // 是否是首次加载
  const isFirstLoad = useRef(true)

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

        // 记录历史数据用于趋势分析
        setDataHistory((prev) => {
          const newHistory = [...prev, result.data.summary]
          // 限制历史记录数量
          return newHistory.slice(-MAX_HISTORY)
        })

        // 首次加载后将标志设为false
        if (isFirstLoad.current) {
          isFirstLoad.current = false
        }
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

  // 计算趋势
  const calculateTrend = (key: keyof typeof summaryData) => {
    if (dataHistory.length < 2 || isFirstLoad.current) return 'flat'

    const current = dataHistory[dataHistory.length - 1][key]
    const previous = dataHistory[dataHistory.length - 2][key]

    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'flat'
  }

  // 计算趋势百分比
  const calculateTrendPercent = (key: keyof typeof summaryData) => {
    if (dataHistory.length < 2 || isFirstLoad.current) return '0%'

    const current = dataHistory[dataHistory.length - 1][key]
    const previous = dataHistory[dataHistory.length - 2][key]

    if (previous === 0) return '0%'

    const percent = (((current - previous) / previous) * 100).toFixed(1)
    return `${percent}%`
  }

  // 获取每个指标的趋势
  const salesTrend = calculateTrend('total_sales')
  const adCostTrend = calculateTrend('total_ad_cost')
  const roiTrend = calculateTrend('avg_roi')

  // 获取每个指标的趋势百分比
  const salesTrendPercent = calculateTrendPercent('total_sales')
  const adCostTrendPercent = calculateTrendPercent('total_ad_cost')
  const roiTrendPercent = calculateTrendPercent('avg_roi')

  return (
    <DashboardCard title="部门统计数据" contentHeight="100%">
      <div className="department-summary-content">
        {/* 统计数据展示 */}
        <div className={`summary-data-grid ${loading ? 'loading' : ''}`}>
          <div className="summary-item">
            <div className="item-icon sales-icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
            </div>
            <div className="item-label">总销售额</div>
            <div className="item-value">
              ¥ {formatNumber(summaryData.total_sales)}
            </div>
            <div className={`item-trend trend-${salesTrend}`}>
              {salesTrend === 'up' && <span className="trend-icon">↑</span>}
              {salesTrend === 'down' && <span className="trend-icon">↓</span>}
              {salesTrend === 'flat' && <span className="trend-icon">→</span>}
              <span className="trend-value">{salesTrendPercent}</span>
            </div>
          </div>
          <div className="summary-item">
            <div className="item-icon cost-icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M16 8a4 4 0 0 0-8 0v8" />
                <path d="M8 16a4 4 0 0 0 8 0" />
              </svg>
            </div>
            <div className="item-label">广告成本</div>
            <div className="item-value">
              ¥ {formatNumber(summaryData.total_ad_cost)}
            </div>
            <div className={`item-trend trend-${adCostTrend}`}>
              {adCostTrend === 'up' && <span className="trend-icon">↑</span>}
              {adCostTrend === 'down' && <span className="trend-icon">↓</span>}
              {adCostTrend === 'flat' && <span className="trend-icon">→</span>}
              <span className="trend-value">{adCostTrendPercent}</span>
            </div>
          </div>
          <div className="summary-item">
            <div className="item-icon roi-icon">
              <svg
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
              </svg>
            </div>
            <div className="item-label">平均ROI</div>
            <div className="item-value">
              {formatNumber(summaryData.avg_roi)}
            </div>
            <div className={`item-trend trend-${roiTrend}`}>
              {roiTrend === 'up' && <span className="trend-icon">↑</span>}
              {roiTrend === 'down' && <span className="trend-icon">↓</span>}
              {roiTrend === 'flat' && <span className="trend-icon">→</span>}
              <span className="trend-value">{roiTrendPercent}</span>
            </div>
          </div>
        </div>

        {/* 效率指标 - 销售成本比 - 仅在非简化模式下显示 */}
        {!simplified && (
          <div className="efficiency-section">
            <div className="section-title">效率分析</div>
            <div className="efficiency-gauge">
              <div className="gauge-label">销售/成本比</div>
              <div className="gauge-track">
                <div
                  className="gauge-fill"
                  style={{
                    width: `${Math.min(
                      (summaryData.total_sales /
                        (summaryData.total_ad_cost || 1)) *
                        20,
                      100
                    )}%`
                  }}
                >
                  <div className="gauge-shine"></div>
                </div>
              </div>
              <div className="gauge-value">
                {formatNumber(
                  summaryData.total_sales / (summaryData.total_ad_cost || 1)
                )}
              </div>
            </div>
            <div className="roi-description">
              <div className="roi-title">ROI健康度</div>
              <div
                className={`roi-status roi-status-${summaryData.avg_roi > 3 ? 'good' : summaryData.avg_roi > 2 ? 'normal' : 'warning'}`}
              >
                {summaryData.avg_roi > 3
                  ? '良好'
                  : summaryData.avg_roi > 2
                    ? '正常'
                    : '警告'}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardCard>
  )
}
