import './index.less'

interface TrendValueProps {
  value: number
  unit?: string
  reverse?: boolean
  className?: string
}

/**
 * 趋势值组件
 * 显示一个带有上升或下降箭头的数值，根据数值正负显示不同颜色
 * @param value 数值，正数表示上升，负数表示下降
 * @param unit 单位，如%、元等
 * @param reverse 是否反转颜色（某些情况下上升是负面的）
 * @param className 自定义样式类名
 */
export function TrendValue({
  value,
  unit = '%',
  reverse = false,
  className = ''
}: TrendValueProps) {
  const isPositive = value > 0
  const isNegative = value < 0
  const isZero = value === 0

  // 根据正负和reverse决定颜色类名
  let colorClass = 'trend-neutral'
  if (isPositive) {
    colorClass = reverse ? 'trend-negative' : 'trend-positive'
  } else if (isNegative) {
    colorClass = reverse ? 'trend-positive' : 'trend-negative'
  }

  // 决定箭头方向
  const arrow = isPositive ? '↑' : isNegative ? '↓' : '-'

  // 格式化数值，去掉符号
  const formattedValue = Math.abs(value).toFixed(2)

  return (
    <div className={`trend-value ${colorClass} ${className}`}>
      <span className="trend-arrow">{arrow}</span>
      <span className="trend-number">
        {formattedValue}
        {unit}
      </span>
    </div>
  )
}
