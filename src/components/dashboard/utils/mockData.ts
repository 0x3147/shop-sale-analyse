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
export function generateHotProductsData(count: number = 10) {
  const products = [
    { name: '智能工业机器人', type: 'bEnd' },
    { name: '数据分析平台', type: 'bEnd' },
    { name: '企业云服务套件', type: 'bEnd' },
    { name: '工业物联网系统', type: 'bEnd' },
    { name: '智能生产线解决方案', type: 'bEnd' },
    { name: '办公协同软件', type: 'bEnd' },
    { name: '企业安全防护系统', type: 'bEnd' },
    { name: '智能手机Pro', type: 'cEnd' },
    { name: '智能家居套装', type: 'cEnd' },
    { name: '无线耳机MAX', type: 'cEnd' },
    { name: '超薄笔记本电脑', type: 'cEnd' },
    { name: '智能手表Ultra', type: 'cEnd' },
    { name: '4K高清投影仪', type: 'cEnd' },
    { name: '智能健康监测仪', type: 'cEnd' },
    { name: '无线充电套装', type: 'cEnd' }
  ]

  // 随机获取count个产品
  const selectedProducts = [...products]
    .sort(() => Math.random() - 0.5)
    .slice(0, count)

  return selectedProducts.map((product) => {
    // 生成更真实的销售数据，B端产品销售额通常更高
    const baseValue =
      product.type === 'bEnd'
        ? Math.floor(Math.random() * 500000) + 500000
        : Math.floor(Math.random() * 300000) + 200000

    // 生成增长率，正负5%到30%之间
    const growth = Math.floor(Math.random() * 60) - 30

    return {
      name: product.name,
      type: product.type,
      sales: baseValue,
      growth: growth
    }
  })
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

/**
 * 生成月度销售数据
 * @returns 月度销售数据
 */
export function generateMonthlySalesData() {
  const months = [
    '1月',
    '2月',
    '3月',
    '4月',
    '5月',
    '6月',
    '7月',
    '8月',
    '9月',
    '10月',
    '11月',
    '12月'
  ]

  // 基础增长趋势 - 确保整体呈上升趋势
  const baseGrowthB = Array(12)
    .fill(0)
    .map((_, i) => {
      // 添加一些随机波动，但保持总体增长趋势
      const trend = i * 50000 // 基础增长
      const fluctuation = Math.random() * 100000 - 50000 // 随机波动
      return Math.max(300000 + trend + fluctuation, 250000) // 确保最小值
    })

  const baseGrowthC = Array(12)
    .fill(0)
    .map((_, i) => {
      // C端销售额略低，但增长更快
      const trend = i * 60000 // 基础增长
      const fluctuation = Math.random() * 80000 - 40000 // 随机波动
      return Math.max(200000 + trend + fluctuation, 180000) // 确保最小值
    })

  // 添加季节性因素
  // 例如：Q1增长缓慢，Q2增长加速，Q3略有下降，Q4节日季快速增长
  const seasonalFactors = [
    0.9, 0.95, 1.1, 1.0, 1.05, 1.1, 0.95, 0.9, 1.0, 1.1, 1.15, 1.25
  ]

  // 应用季节性因素
  const bEndSales = baseGrowthB.map((value, i) =>
    Math.round(value * seasonalFactors[i])
  )
  const cEndSales = baseGrowthC.map((value, i) =>
    Math.round(value * seasonalFactors[i])
  )

  // 计算总销售额
  const totalSales = bEndSales.map((b, i) => b + cEndSales[i])

  return {
    months,
    bEndSales,
    cEndSales,
    totalSales
  }
}
