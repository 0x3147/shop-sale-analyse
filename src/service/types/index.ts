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
