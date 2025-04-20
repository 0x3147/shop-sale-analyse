import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig
} from 'axios'

// 根据环境确定baseURL
// 开发环境使用相对路径，让代理生效
// 生产环境使用完整URL
const BASE_URL = import.meta.env.DEV ? '' : 'http://8.141.124.102:8000/'

// 创建axios实例
const service: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 30000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 可以在这里添加token等认证信息
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config
  },
  (error) => {
    console.error('请求错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response

    // 如果响应成功但业务状态码不为成功
    if (!data.success && data.success !== undefined) {
      console.error('请求失败:', data.msg || '请求失败')
      return Promise.reject(new Error(data.msg || '请求失败'))
    }

    return data
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 封装GET请求
export function get<T>(url: string, params?: any): Promise<T> {
  return service.get(url, { params })
}

export default service
