import { get } from '../index'
import type {
  ApiResponse,
  CountryAnalysisResponse,
  CountryHotProductsResponse,
  DailySales,
  DepartmentState,
  HotProductsResponse,
  MonthSalesResponse,
  Traffic
} from '../types'

/**
 * 获取所有店铺日销售额
 * @returns 店铺日销售额数据列表
 */
export function getStoreDailySales(): Promise<ApiResponse<DailySales[]>> {
  return get<ApiResponse<DailySales[]>>('/dashboard/store_daily_sales/')
}

/**
 * 获取所有店铺月销售额
 * @returns 按店铺分组的月销售额数据
 */
export function getStoreMonthSales(): Promise<ApiResponse<MonthSalesResponse>> {
  return get<ApiResponse<MonthSalesResponse>>('/dashboard/store_monthly_sales/')
}

/**
 * 获取热门产品数据
 * @returns 包含B端和C端的热门产品数据
 */
export function getHotProducts(): Promise<ApiResponse<HotProductsResponse>> {
  return get<ApiResponse<HotProductsResponse>>('/dashboard/hot_products/')
}

/**
 * 获取所有店铺流量数据
 * @returns 所有店铺的流量、访客、转化率和点击率数据
 */
export function getStoreTraffic(): Promise<ApiResponse<Traffic[]>> {
  return get<ApiResponse<Traffic[]>>('/dashboard/store_traffic/')
}

/**
 * 获取所有店铺部门销售额数据
 * @returns 所有店铺的部门销售额数据
 */
export function getDepartmentSales(): Promise<ApiResponse<DepartmentState>> {
  return get<ApiResponse<DepartmentState>>('/dashboard/department_stats/')
}

/**
 * 获取各国家热门产品数据
 * @returns 各国家的热门产品Top5数据
 */
export function getCountryHotProducts(): Promise<
  ApiResponse<CountryHotProductsResponse>
> {
  return get<ApiResponse<CountryHotProductsResponse>>(
    '/dashboard/hot_products/'
  )
}

/**
 * 获取国家分析数据
 * @returns 按GMV和增速分组的国家分析数据
 */
export function getCountryAnalysis(): Promise<
  ApiResponse<CountryAnalysisResponse>
> {
  return get<ApiResponse<CountryAnalysisResponse>>(
    '/dashboard/country_analysis/'
  )
} 
