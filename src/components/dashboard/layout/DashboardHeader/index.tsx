import { formatInTimeZone } from 'date-fns-tz'
import { useEffect, useState } from 'react'
import { CurrentTime } from '../CurrentTime'
import './index.less'

interface DashboardHeaderProps {
  title: string
}

/**
 * 数据大屏头部组件
 * 包含标题、店铺选择器和当前时间
 */
export function DashboardHeader({ title }: DashboardHeaderProps) {
  const [time, setTime] = useState(new Date())

  // 每秒更新当前时间
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // 格式化北京时间
  const beijingTime = formatInTimeZone(time, 'Asia/Shanghai', 'HH:mm:ss')
  const beijingDate = formatInTimeZone(time, 'Asia/Shanghai', 'yyyy-MM-dd')

  return (
    <header className="dashboard-header">
      {/* 标题居中显示 */}
      <h1 className="title">{title}</h1>

      {/* 左上角装饰 */}
      <div className="decoration decoration-left-top"></div>
      {/* 右上角装饰 */}
      <div className="decoration decoration-right-top"></div>

      {/* 右侧时间区域 */}
      <div className="time-wrapper">
        {/* 北京时间 */}
        <div className="beijing-time">
          <div className="city-label">北京时间</div>
          <div className="time-display">{beijingTime}</div>
          <div className="date-display">{beijingDate}</div>
        </div>

        {/* 其他国家时间 */}
        <div className="foreign-time">
          <CurrentTime excludeBeijing={true} />
        </div>
      </div>
    </header>
  )
}
