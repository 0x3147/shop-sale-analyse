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
 * 店铺列表数据
 */
export const SHOPS = [
  { id: 1, name: '北京旗舰店', color: '#5470c6' },
  { id: 2, name: '上海中心店', color: '#91cc75' },
  { id: 3, name: '广州天河店', color: '#fac858' },
  { id: 4, name: '深圳科技店', color: '#ee6666' },
  { id: 5, name: '成都锦江店', color: '#73c0de' },
  { id: 6, name: '杭州西湖店', color: '#3ba272' },
  { id: 7, name: '武汉光谷店', color: '#fc8452' },
  { id: 8, name: '南京新街口', color: '#9a60b4' },
  { id: 9, name: '重庆解放碑', color: '#ea7ccc' },
  { id: 10, name: '西安大雁塔', color: '#0a9abd' }
]

/**
 * 商品类型
 */
export enum ProductType {
  B_END = 'B端',
  C_END = 'C端'
}

/**
 * 商品列表数据
 */
export const PRODUCTS = [
  { id: 1, name: '智能工业机器人', type: ProductType.B_END },
  { id: 2, name: '数据分析平台', type: ProductType.B_END },
  { id: 3, name: '企业云服务套件', type: ProductType.B_END },
  { id: 4, name: '工业物联网系统', type: ProductType.B_END },
  { id: 5, name: '智能生产线解决方案', type: ProductType.B_END },
  { id: 6, name: '办公协同软件', type: ProductType.B_END },
  { id: 7, name: '企业安全防护系统', type: ProductType.B_END },
  { id: 8, name: '智能手机Pro', type: ProductType.C_END },
  { id: 9, name: '智能家居套装', type: ProductType.C_END },
  { id: 10, name: '无线耳机MAX', type: ProductType.C_END },
  { id: 11, name: '超薄笔记本电脑', type: ProductType.C_END },
  { id: 12, name: '智能手表Ultra', type: ProductType.C_END },
  { id: 13, name: '4K高清投影仪', type: ProductType.C_END },
  { id: 14, name: '智能健康监测仪', type: ProductType.C_END },
  { id: 15, name: '无线充电套装', type: ProductType.C_END }
]

/**
 * 国家列表数据
 */
export const COUNTRIES = [
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

/**
 * 生成各店铺的实时访客数据
 * @returns 各店铺访客数据
 */
export function generateShopsVisitorData() {
  return SHOPS.map((shop) => ({
    ...shop,
    realTime: randomInt(100, 500), // 实时访客数
    total: randomInt(5000, 20000), // 总访客数
    conversion: randomFloat(1.5, 6.5, 1), // 转化率
    click: randomFloat(10, 35, 1), // 点击率
    exposure: randomInt(10000, 50000) // 曝光量
  }))
}

/**
 * 生成各店铺的销售额数据
 * @returns 各店铺销售额数据
 */
export function generateShopsSalesData() {
  return SHOPS.map((shop) => {
    // 为每个店铺生成不同范围的销售额，使数据更加多样化
    const scale = randomFloat(0.8, 1.2, 2) // 店铺规模系数
    const sales = Math.round(randomInt(100000, 500000) * scale)

    return {
      ...shop,
      sales, // 总销售额
      trend: randomFloat(-5, 15, 1) // 销售额环比趋势
    }
  }).sort((a, b) => b.sales - a.sales) // 按销售额降序排序
}

/**
 * 生成各店铺的月度销售数据
 * @returns 各店铺月度销售数据
 */
export function generateMonthlyShopSalesData() {
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

  // 季节性因素
  const seasonalFactors = [
    0.85, 0.9, 1.05, 1.0, 1.1, 1.15, 0.95, 0.9, 1.05, 1.1, 1.2, 1.3
  ]

  // 为每个店铺生成月度数据
  const shopData = SHOPS.map((shop) => {
    // 基础销售额 - 每个店铺有不同基础值
    const baseValue = randomInt(80000, 200000)

    // 生成该店铺12个月的数据
    const monthlySales = months.map((_, index) => {
      // 基础增长趋势
      const growthTrend = 1 + index * 0.02
      // 应用季节性因素和一些随机波动
      const seasonalValue = baseValue * growthTrend * seasonalFactors[index]
      const randomFactor = 1 + randomFloat(-0.1, 0.1, 2)

      return Math.round(seasonalValue * randomFactor)
    })

    return {
      ...shop,
      monthlySales
    }
  })

  return {
    months,
    shopData
  }
}

/**
 * 生成热门产品销售数据
 * @param count 产品数量
 * @returns 热门产品销售数据
 */
export function generateHotProductsData(count = 10) {
  return PRODUCTS.slice(0, count)
    .map((product) => {
      // B端产品销售额通常更高
      const baseValue =
        product.type === ProductType.B_END
          ? randomInt(500000, 1000000)
          : randomInt(200000, 500000)

      // 生成增长率
      const growth = randomFloat(-30, 30, 1)

      // 各店铺对该产品的销售情况
      const shopSales = SHOPS.map((shop) => ({
        shopId: shop.id,
        shopName: shop.name,
        sales: Math.round(baseValue * randomFloat(0.05, 0.2, 2))
      })).sort((a, b) => b.sales - a.sales)

      return {
        ...product,
        sales: baseValue,
        growth,
        shopSales
      }
    })
    .sort((a, b) => b.sales - a.sales)
}

/**
 * 生成各店铺热门国家订单数据
 * @returns 各国家订单占比数据
 */
export function generateCountriesOrderData() {
  // 计算各国家的总体权重
  const countriesWithWeight = COUNTRIES.map((country) => ({
    ...country,
    // 为每个国家分配一个基础权重
    baseWeight: randomInt(5, 30)
  }))

  // 为每个店铺生成国家订单分布
  const shopCountryData = SHOPS.map((shop) => {
    // 复制国家权重数据并添加一些店铺特定的随机因素
    const countryData = countriesWithWeight.map((country) => {
      const weight = Math.max(1, country.baseWeight + randomInt(-5, 5))
      return {
        ...country,
        weight
      }
    })

    // 计算总权重
    const totalWeight = countryData.reduce((sum, c) => sum + c.weight, 0)

    // 计算百分比
    const countryPercents = countryData.map((country) => ({
      ...country,
      value: Math.round((country.weight / totalWeight) * 100)
    }))

    // 调整以确保总和为100%
    let remaining = 100 - countryPercents.reduce((sum, c) => sum + c.value, 0)
    if (Math.abs(remaining) > 0) {
      // 将剩余或多出的百分比分配给最大的国家
      countryPercents.sort((a, b) => b.value - a.value)[0].value += remaining
    }

    return {
      ...shop,
      countryData: countryPercents.sort((a, b) => b.value - a.value)
    }
  })

  return shopCountryData
}

/**
 * 生成部门整体销售数据
 * @returns 部门销售投产数据
 */
export function generateDepartmentSalesData() {
  const totalSales = randomInt(8000000, 15000000)
  const marketingCost = Math.round(totalSales * randomFloat(0.08, 0.15, 2))
  const roi = Number((totalSales / marketingCost).toFixed(2))

  return {
    totalSales,
    marketingCost,
    roi
  }
}

/**
 * 兼容旧版API - 生成随机的热门国家数据
 * @param count 国家数量
 * @returns 热门国家数据数组
 * @deprecated 请使用 generateCountriesOrderData 替代
 */
export function generateHotCountriesData(count = 5) {
  // 复制前count个国家
  const selectedCountries = COUNTRIES.slice(0, count)

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
 * 兼容旧版API - 生成随机的访客数据
 * @returns 店铺访客数据
 * @deprecated 请使用 generateShopsVisitorData 替代
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
 * 兼容旧版API - 生成随机的销售额数据
 * @returns 销售额数据
 * @deprecated 请使用 generateShopsSalesData 替代
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
 * 兼容旧版API - 生成月度销售数据
 * @returns 月度销售数据
 * @deprecated 请使用 generateMonthlyShopSalesData 替代
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

  // 基础增长趋势
  const baseGrowthB = Array(12)
    .fill(0)
    .map((_, i) => {
      const trend = i * 50000 // 基础增长
      const fluctuation = Math.random() * 100000 - 50000 // 随机波动
      return Math.max(300000 + trend + fluctuation, 250000) // 确保最小值
    })

  const baseGrowthC = Array(12)
    .fill(0)
    .map((_, i) => {
      const trend = i * 60000 // 基础增长
      const fluctuation = Math.random() * 80000 - 40000 // 随机波动
      return Math.max(200000 + trend + fluctuation, 180000) // 确保最小值
    })

  // 季节性因素
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
