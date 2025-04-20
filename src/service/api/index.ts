import { get } from '../index'
import type { ApiResponse, DailySales } from '../types'

/**
 * 获取所有店铺日销售额
 * @returns 店铺日销售额数据列表
 */
export function getStoreDailySales(): Promise<ApiResponse<DailySales[]>> {
  return get<ApiResponse<DailySales[]>>('/dashboard/store_daily_sales/')
}
