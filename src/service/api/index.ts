import { get } from '../index'
import type {
  ApiResponse,
  DailySales,
  MonthSalesResponse,
  ProductSummary,
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
 * @returns 所有店铺的热门产品数据列表
 */
export function getHotProducts(): Promise<ApiResponse<ProductSummary[]>> {
  return get<ApiResponse<ProductSummary[]>>('/dashboard/hot_products/')
}

/**
 * 获取所有店铺流量数据
 * @returns 所有店铺的流量、访客、转化率和点击率数据
 */
export function getStoreTraffic(): Promise<ApiResponse<Traffic[]>> {
  return get<ApiResponse<Traffic[]>>('/dashboard/store_traffic/')
}
