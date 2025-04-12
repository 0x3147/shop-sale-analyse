import { useEffect, useState } from 'react'

interface DigitalFlopProps {
  value: number
  duration?: number
  precision?: number
  prefix?: string
  suffix?: string
  className?: string
}

/**
 * 数字翻牌器组件
 * 用于展示实时更新的重要数据，带有数字变化动画效果
 */
export function DigitalFlop({
  value,
  duration = 1000,
  precision = 0,
  prefix = '',
  suffix = '',
  className = ''
}: DigitalFlopProps) {
  // 当前显示的数值，用于动画过渡
  const [displayValue, setDisplayValue] = useState(0)

  // 格式化数字，添加千分位分隔符
  const formatNumber = (num: number) => {
    return num.toLocaleString('en-US', {
      minimumFractionDigits: precision,
      maximumFractionDigits: precision
    })
  }

  // 数字变化动画效果
  useEffect(() => {
    let startValue = displayValue
    const endValue = value
    const range = endValue - startValue

    // 如果值相同，不需要动画
    if (range === 0) return

    // 动画开始时间
    const startTime = Date.now()
    // 每帧更新间隔
    const frameInterval = 16 // 约60fps

    // 创建动画帧
    const updateFrame = () => {
      const now = Date.now()
      const elapsed = now - startTime

      // 动画结束
      if (elapsed >= duration) {
        setDisplayValue(endValue)
        return
      }

      // 计算当前应该显示的值，使用缓动函数使动画更自然
      const progress = elapsed / duration
      const easedProgress = easeOutCubic(progress)
      const currentValue = startValue + range * easedProgress

      setDisplayValue(currentValue)

      // 请求下一帧
      requestAnimationFrame(updateFrame)
    }

    // 启动动画
    requestAnimationFrame(updateFrame)

    // 缓动函数：缓出立方
    function easeOutCubic(x: number): number {
      return 1 - Math.pow(1 - x, 3)
    }
  }, [value, duration])

  return (
    <div className={`digital-flop ${className}`}>
      <span className="text-5xl font-bold tabular-nums text-[#15f4ee] drop-shadow-[0_0_8px_rgba(21,244,238,0.6)]">
        {prefix}
        {formatNumber(displayValue)}
        {suffix}
      </span>
    </div>
  )
}
