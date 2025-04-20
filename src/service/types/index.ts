export interface ApiResponse<T> {
  success: boolean
  msg: string
  data: T
}

export interface DailySales {
  id: number
  store_id: number
  store_name: string
  category: string
  date: string
  sales: number
}

/**
 * 月销售额数据类型
 */
export interface MonthlySales {
  store_id: number
  store_name: string
  category: string
  month: string // 月份(YYYY-MM)
  date: string // 日期(YYYY-MM-DD)
  sales: number
}

/**
 * 获取所有店铺月销售额接口返回类型
 * 以店铺名称为键，值为该店铺的销售数据数组
 */
export type MonthSalesResponse = Record<string, MonthlySales[]>
