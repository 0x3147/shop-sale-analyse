import { useEffect, useState } from 'react'
import './index.less'

/**
 * 当前时间组件 - 实时更新
 */
export function CurrentTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const formattedDate = time.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  })

  const formattedTime = time.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })

  return (
    <>
      <div className="time">{formattedTime}</div>
      <div className="date">{formattedDate}</div>
    </>
  )
}
