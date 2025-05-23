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

  return (
    <div className="department-summary-content">
      {/* 统计数据展示 */}
      <div className={`summary-data-grid ${loading ? 'loading' : ''}`}>
        <div className="summary-item">
          <div className="item-label">总销售额</div>
          <div className="item-value">
            ¥ {formatNumber(summaryData.total_sales)}
          </div>
        </div>
        <div className="summary-item">
          <div className="item-label">广告成本</div>
          <div className="item-value">
            ¥ {formatNumber(summaryData.total_ad_cost)}
          </div>
        </div>
        <div className="summary-item">
          <div className="item-label">平均ROI</div>
          <div className="item-value">{formatNumber(summaryData.avg_roi)}</div>
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
  )
}
