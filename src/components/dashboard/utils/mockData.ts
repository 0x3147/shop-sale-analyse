/**
 * 生成指定范围内的随机整数
 * @param min 最小值
 * @param max 最大值
 * @returns 随机整数
 */
export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

/**
 * 生成指定范围内的随机浮点数，并保留指定小数位
 * @param min 最小值
 * @param max 最大值
 * @param decimals 小数位数
 * @returns 随机浮点数
 */
export function randomFloat(min: number, max: number, decimals = 2): number {
  const val = Math.random() * (max - min) + min
  return Number(val.toFixed(decimals))
}

/**
 * 生成随机的店铺访客数据
 * @returns 店铺访客数据
 */
export function generateVisitorData() {
  return {
    realTime: randomInt(200, 500),
    total: randomInt(10000, 20000),
    conversion: randomFloat(2.5, 5.5, 1),
    click: randomFloat(15, 35, 1)
  }
}

/**
 * 生成随机的销售额数据
 * @returns 销售额数据
 */
export function generateSalesData() {
  const total = randomInt(1000000, 2000000)
  const bEnd = Math.floor(total * randomFloat(0.6, 0.75, 2))
  const cEnd = total - bEnd

  return {
    total,
    bEnd,
    cEnd,
    bEndRatio: Number(((bEnd / total) * 100).toFixed(1)),
    cEndRatio: Number(((cEnd / total) * 100).toFixed(1)),
    totalTrend: randomFloat(8, 15, 2),
    bEndTrend: randomFloat(6, 12, 2),
    cEndTrend: randomFloat(10, 18, 2)
  }
}

/**
 * 生成随机的热门产品数据
 * @param count 产品数量
 * @returns 热门产品数据数组
 */
export function generateHotProductsData(count = 5) {
  const products = [
    '智能手机',
    '笔记本电脑',
    '平板电脑',
    '智能手表',
    '无线耳机',
    '游戏机',
    '相机',
    '音箱',
    '显示器',
    '键盘',
    '鼠标',
    '充电器'
  ]

  return Array.from({ length: count }, (_, i) => {
    const productName = products[randomInt(0, products.length - 1)]
    return {
      id: i + 1,
      name: productName,
      sales: randomInt(50000, 500000),
      growth: randomFloat(-10, 30, 1)
    }
  }).sort((a, b) => b.sales - a.sales)
}

/**
 * 生成随机的热门国家数据
 * @param count 国家数量
 * @returns 热门国家数据数组
 */
export function generateHotCountriesData(count = 5) {
  const countries = [
    { name: '中国', code: 'CN' },
    { name: '美国', code: 'US' },
    { name: '日本', code: 'JP' },
    { name: '英国', code: 'GB' },
    { name: '德国', code: 'DE' },
    { name: '法国', code: 'FR' },
    { name: '澳大利亚', code: 'AU' },
    { name: '加拿大', code: 'CA' },
    { name: '印度', code: 'IN' },
    { name: '巴西', code: 'BR' }
  ]

  // 随机选择几个国家
  const selectedCountries = [...countries]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)

  // 生成随机占比，并确保总和为100%
  let remaining = 100
  return selectedCountries
    .map((country, index) => {
      // 最后一个国家获取剩余的百分比
      if (index === selectedCountries.length - 1) {
        return {
          ...country,
          value: remaining
        }
      }

      // 为其他国家分配随机百分比
      const maxPercent = Math.floor(
        (remaining / (selectedCountries.length - index)) * 1.5
      )
      const minPercent = Math.max(
        5,
        Math.floor((remaining / (selectedCountries.length - index)) * 0.5)
      )
      const value = randomInt(minPercent, maxPercent)
      remaining -= value

      return {
        ...country,
        value
      }
    })
    .sort((a, b) => b.value - a.value)
}
