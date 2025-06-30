import { ProductSalesTable } from '@/components/dashboard/charts/ProductSalesTable'
import { getCountryHotProducts } from '@/service/api'
import { CountryHotProductsResponse, ProductSummary } from '@/service/types'
import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import './index.less'

interface CountryHotProductsProps {
  /**
   * 是否显示加载状态
   */
  loading?: boolean
  /**
   * 轮播间隔时间（毫秒）
   */
  switchInterval?: number
}

/**
 * 各国热门商品表格组件
 * 自动轮播展示不同国家的热门商品Top5
 */
export default function CountryHotProducts({
  loading: externalLoading = false,
  switchInterval = 10000
}: CountryHotProductsProps) {
  const [currentCountryIndex, setCurrentCountryIndex] = useState(0)
  const [countryData, setCountryData] = useState<{
    countries: string[]
    currentData: ProductSummary[]
    currentTitle: string
  }>({
    countries: [],
    currentData: [],
    currentTitle: ''
  })

  // 获取各国热门产品数据
  const { data, loading } = useRequest(getCountryHotProducts, {
    pollingInterval: 30000, // 每30秒轮询一次
    pollingWhenHidden: false,
    loadingDelay: 300,
    refreshOnWindowFocus: false,
    onError: (error) => {
      console.error('获取各国热门产品数据失败:', error)
    }
  })

  // 处理API数据
  useEffect(() => {
    if (data?.data) {
      const responseData = data.data as CountryHotProductsResponse

      // 提取所有国家名称（排除date和columns字段）
      const countries = Object.keys(responseData).filter(
        (key) => key !== 'date' && key !== 'columns'
      )

      if (countries.length > 0) {
        setCountryData((prev) => ({
          ...prev,
          countries
        }))
      }
    }
  }, [data])

  // 自动切换国家
  useEffect(() => {
    if (countryData.countries.length === 0) return

    const timer = setInterval(() => {
      setCurrentCountryIndex(
        (prev) => (prev + 1) % countryData.countries.length
      )
    }, switchInterval)

    return () => clearInterval(timer)
  }, [countryData.countries.length, switchInterval])

  // 更新当前显示的数据
  useEffect(() => {
    if (data?.data && countryData.countries.length > 0) {
      const responseData = data.data as CountryHotProductsResponse
      const currentCountry = countryData.countries[currentCountryIndex]
      const currentCountryData = responseData[currentCountry]

      if (currentCountryData) {
        setCountryData((prev) => ({
          ...prev,
          currentData: currentCountryData.data || [],
          currentTitle:
            currentCountryData.title || `${currentCountry} 热门商品 Top 5`
        }))
      }
    }
  }, [data, currentCountryIndex, countryData.countries])

  const isLoading = loading || externalLoading

  return (
    <div className="country-hot-products">
      {/* 当前国家标识 */}
      <div className="country-indicator">
        <span className="country-title">
          {countryData.currentTitle || '各国热门商品排行'}
        </span>
      </div>

      {/* 表格内容 */}
      <div className="table-content">
        <ProductSalesTable
          data={countryData.currentData}
          loading={isLoading}
          className="country-products-table"
          style={{ height: '100%' }}
        />
      </div>
    </div>
  )
}
