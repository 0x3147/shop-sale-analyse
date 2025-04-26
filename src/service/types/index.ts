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

/**
 * 热门产品数据类型
 */
export interface ProductSummary {
  product_id: number
  product_name: string
  total_sales: number
}

/**
 * 店铺流量数据类型
 */
export interface Traffic {
  id: number
  store_id: number
  store_name: string
  category: string
  timestamp: string
  exposure: number // 曝光量
  visitors: number // 访客数
  conversion_rate: number // 转化率
  click_rate: number // 点击率
}

/**
 * 热门国家数据类型
 */
export interface CountrySummary {
  country: string // 国家名称
  total_orders: number // 订单总数
}

export interface DepartmentState {
  stats: {
    id: number
    store_id: number
    date: string
    total_sales: number
    ad_cost: number
    roi: number
  }[]
  summary: {
    total_sales: number
    total_ad_cost: number
    avg_roi: number
  }
}
