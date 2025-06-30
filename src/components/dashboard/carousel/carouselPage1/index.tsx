import logoImg from '@/assets/logo.png'
import { getStoreDailySales, getStoreTraffic } from '@/service/api'
import { DailySales, Traffic } from '@/service/types'
import { useRequest } from 'ahooks'
import { useState } from 'react'
import { DashboardCard } from '../../cards/DashboardCard'
import { ShopSalesBar } from '../../charts/ShopSalesBar'
import { StoreTrafficChart } from '../../charts/StoreTrafficChart'
import { DashboardLayout } from '../../layout/DashboardLayout'
import { ShopMonthlySalesChart } from '../../sections/MidContent/components/ShopMonthlySalesChart'
import SimpleROI from '../components/simpleROI'
import './index.less'

/**
 * 轮播页面1 - 销售概览页面
 * 左右两侧组件向上延伸，中间保持Logo和ROI区域
 */
export default function CarouselPage1() {
  // 店铺日销售额数据
  const [salesData, setSalesData] = useState<DailySales[]>([])

  // 店铺流量数据
  const [trafficData, setTrafficData] = useState<Traffic[]>([])

  // 获取店铺日销售额数据
  const { loading: salesLoading } = useRequest(getStoreDailySales, {
    pollingInterval: 10000,
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onSuccess: (result) => {
      if (result?.data && Array.isArray(result.data)) {
        setSalesData(result.data)
      }
    },
    onError: (error) => {
      console.error('获取店铺日销售额数据失败:', error)
    }
  })

  // 获取店铺流量数据
  const { loading: trafficLoading } = useRequest(getStoreTraffic, {
    pollingInterval: 10000,
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onSuccess: (result) => {
      if (result?.data && Array.isArray(result.data)) {
        setTrafficData(result.data)
      }
    },
    onError: (error) => {
      console.error('获取店铺流量数据失败:', error)
    }
  })

  return (
    <DashboardLayout>
      <div className="carousel-page1-container">
        {/* 左侧 - 店铺曝光量排行（向上延伸） */}
        <div className="left-column">
          <DashboardCard title="店铺曝光量排行" contentHeight="100%">
            <StoreTrafficChart
              data={trafficData}
              activeMetric="exposure"
              loading={trafficLoading}
            />
          </DashboardCard>
        </div>

        {/* 中间列 */}
        <div className="center-column">
          {/* 顶部 - Logo和ROI区域 */}
          <div className="top-header">
            <div className="header-content">
              {/* Logo区域 */}
              <div className="logo-container">
                <img src={logoImg} alt="京科社技" className="logo-image" />
              </div>

              {/* 简化的ROI组件 */}
              <div className="roi-container">
                <SimpleROI />
              </div>
            </div>
          </div>

          {/* 底部 - 月销售趋势 */}
          <div className="bottom-chart">
            <ShopMonthlySalesChart />
          </div>
        </div>

        {/* 右侧 - 店铺日销售额（向上延伸） */}
        <div className="right-column">
          <DashboardCard title="店铺日销售额" contentHeight="100%">
            <div className="daily-sales-content">
              <ShopSalesBar
                data={salesData}
                autoSort={true}
                unit="¥"
                loading={salesLoading}
              />
            </div>
          </DashboardCard>
        </div>
      </div>
    </DashboardLayout>
  )
}
