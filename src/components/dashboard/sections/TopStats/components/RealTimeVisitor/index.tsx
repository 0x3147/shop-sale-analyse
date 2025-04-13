import './index.less'

interface RealTimeVisitorProps {
  value: number
}

/**
 * 实时访客组件
 * 显示实时访客数量，带有闪烁的指示点
 */
export function RealTimeVisitor({ value }: RealTimeVisitorProps) {
  return (
    <div className="real-time-visitor">
      <span className="pulse-dot">
        <span className="pulse-dot-inner"></span>
        <span className="pulse-dot-outer"></span>
      </span>
      <span className="visitor-count">{value}</span>
    </div>
  )
}
