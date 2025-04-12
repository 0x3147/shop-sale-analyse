import { DashboardCard } from './cards/DashboardCard'
import { StatisticCard } from './cards/StatisticCard'
import { DashboardLayout } from './layout/DashboardLayout'

/**
 * 数据大屏主组件
 * 组合所有子组件，形成完整的数据大屏
 */
export function Dashboard() {
  return (
    <DashboardLayout>
      {/* 这里是大屏主要内容的占位，后续会添加真实组件 */}
      {/* 顶部区域 - 数据指标 */}
      <StatisticCard
        title="今日总销售额"
        value="1,234,567"
        prefix="¥"
        trend="up"
        trendValue="12.34%"
        colSpan={4}
      />
      <StatisticCard
        title="B端销售额"
        value="875,432"
        prefix="¥"
        trend="up"
        trendValue="8.5%"
        colSpan={4}
      />
      <StatisticCard
        title="C端销售额"
        value="359,135"
        prefix="¥"
        trend="up"
        trendValue="15.2%"
        colSpan={4}
      />

      {/* 中间区域 - 图表展示 */}
      <DashboardCard title="店铺月销售额" colSpan={6} rowSpan={3}>
        <div className="flex h-full items-center justify-center text-slate-500">
          图表区域 - 月销售额折线图+柱状图
        </div>
      </DashboardCard>

      <DashboardCard title="销售额分布" colSpan={6} rowSpan={3}>
        <div className="flex h-full items-center justify-center text-slate-500">
          图表区域 - 饼图/环形图
        </div>
      </DashboardCard>

      {/* 底部区域 - 更多图表 */}
      <DashboardCard title="今日销售热门产品" colSpan={4} rowSpan={2}>
        <div className="flex h-full items-center justify-center text-slate-500">
          图表区域 - 热门产品排行
        </div>
      </DashboardCard>

      <DashboardCard title="店铺实时转化率" colSpan={4} rowSpan={2}>
        <div className="flex h-full items-center justify-center text-slate-500">
          图表区域 - 转化率仪表盘
        </div>
      </DashboardCard>

      <DashboardCard title="热门国家分布" colSpan={4} rowSpan={2}>
        <div className="flex h-full items-center justify-center text-slate-500">
          图表区域 - 地图热力图
        </div>
      </DashboardCard>
    </DashboardLayout>
  )
}
